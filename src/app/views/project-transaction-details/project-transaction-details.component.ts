import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { Location } from '@angular/common';

import { CommonService } from '../../_services/common.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-main-project-transaction-details',
    templateUrl: 'project-transaction-details.component.html',
    styleUrls: ['project-transaction-details.component.scss']
})
export class ProjectStatementComponent implements OnInit {
    @ViewChild('addCategoryModal') public addCategoryModal: ModalDirective;
    submitted = false;
    returnUrl: string;
    currentUser: any = null;

    entryForm: FormGroup;
    modalTitle = 'Add New Project Category';
    btnSaveText = 'Save';

    filter_project_id = null;

    project_id;
    item_category = null;

    project_details;
    is_loaded = false;

    total_budget_amount = 0;
    total_received = 0;
    total_disbursed = 0;
    total_balance = 0;

    projectList: Array<any> = [];
    itemUnitList: Array<any> = [];

    breakdownList: Array<any> = [];

    @BlockUI() blockUI: NgBlockUI;

    constructor(
        private routeLocation: Location,
        private _service: CommonService,
        public formBuilder: FormBuilder,
        private authService: AuthenticationService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router
    ) {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/login']);
        }
    }

    ngOnInit() {
        this.entryForm = this.formBuilder.group({
            id: [null],
            project_id: [null, [Validators.required]],
            budget_type_id: [null, [Validators.required]],
            remarks: [null],
            is_active: [true],
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        //this.project_id = this.route.snapshot.paramMap.get("project_id");
        //this.entryForm.controls['project_id'].setValue(this.project_id);

        this.getProjectList();
        //this.getBreakdownList();
        //this.getProjectDetails();
    }

    get f() {
        return this.entryForm.controls;
    }
    
    backToLocation() {
        this.routeLocation.back();
    }

    getProjectList() {
        this._service.get('project-list').subscribe(res => {
            this.projectList = res.data;
        }, err => { }
        );
    }

    getBreakdownList(project) {
        if(project){
            this.total_budget_amount = this.total_received = this.total_disbursed = this.total_balance = 0;
            this.blockUI.start('Loading...')
            this._service.get('breakdown-list-by-id/' + project.id).subscribe(res => {
                this.breakdownList = res.data;
                this.breakdownList.forEach(item => {
                    this.total_budget_amount = this.total_budget_amount + item.budget_amount;
                    this.total_received = this.total_received + item.receive_amount;
                    this.total_disbursed = this.total_disbursed + item.disbursed_amount;
                });
                this.total_balance = this.total_budget_amount - this.total_disbursed;
                this.blockUI.stop();
            }, err => { 
                this.blockUI.stop();
            }
            );
        }else{
            this.breakdownList = [];
        }
        
    }

    getProjectDetails() {
        this._service.get('project-details-by-id/' + this.project_id).subscribe(res => {
            this.project_details = res.data;
            this.is_loaded = true;
        }, err => { }
        );
    }


    editItem(item){
        this.modalTitle = 'Update Project Category';
        this.btnSaveText = 'Update';
        
        this.entryForm.controls['id'].setValue(item.id);
        this.entryForm.controls['project_id'].setValue(item.project_id);
        this.entryForm.controls['budget_type_id'].setValue(item.budget_type_id);
        this.entryForm.controls['remarks'].setValue(item.remarks);
        this.entryForm.controls['is_active'].setValue(item.is_active);
        this.addCategoryModal.show();
    }

    onFormSubmit(){
        this.submitted = true;
        if (this.entryForm.invalid) {
            return;
        }

        this.entryForm.value.id ? this.blockUI.start('Saving...') : this.blockUI.start('Updating...');

        this._service.post('add-update-project-transaction-details', this.entryForm.value).subscribe(
            data => {
                this.blockUI.stop();
                if (data.success) {
                    this.toastr.success(data.message, 'Success!', { timeOut: 2000 });
                    this.modalHide();
                    //this.getBreakdownList();
                } else {
                    this.toastr.error(data.message, 'Error!', { timeOut: 2000 });
                }
            },
            err => {
                this.blockUI.stop();
                this.toastr.error(err.message || err, 'Error!', { timeOut: 2000 });
            }
        );
    }

    modalHide() {
        this.addCategoryModal.hide();
        this.entryForm.reset();
        this.submitted = false;
        this.entryForm.controls['is_active'].setValue(true);
        this.entryForm.controls['project_id'].setValue(this.project_id);
        this.modalTitle = 'Add New Project Category';
        this.btnSaveText = 'Save';
    }

}
