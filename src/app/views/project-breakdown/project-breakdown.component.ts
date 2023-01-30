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
    selector: 'app-main-project-breakdown',
    templateUrl: 'project-breakdown.component.html',
    styleUrls: ['project-breakdown.component.scss']
})
export class ProjectBreakdownComponent implements OnInit {
    @ViewChild('addCategoryModal') public addCategoryModal: ModalDirective;
    submitted = false;
    returnUrl: string;
    currentUser: any = null;

    entryForm: FormGroup;
    modalTitle = 'Add New Project Category';
    btnSaveText = 'Save';

    project_id;
    item_category = null;

    project_details;
    is_loaded = false;

    itemTypeList: Array<any> = [];
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
        this.project_id = this.route.snapshot.paramMap.get("project_id");
        this.entryForm.controls['project_id'].setValue(this.project_id);

        this.getBreakdownList();
        this.getItemTypeList();
        this.getProjectDetails();
    }

    get f() {
        return this.entryForm.controls;
    }
    
    backToLocation() {
        this.routeLocation.back();
    }

    getBreakdownList() {
        let params = {
            category : this.item_category
        }
        this._service.get('breakdown-list-by-id/' + this.project_id).subscribe(res => {
            this.breakdownList = res.data;
        }, err => { }
        );
    }

    getProjectDetails() {
        this._service.get('project-details-by-id/' + this.project_id).subscribe(res => {
            this.project_details = res.data;
            this.is_loaded = true;
        }, err => { }
        );
    }

    getItemTypeList() {
        this._service.get('category-list').subscribe(res => {
            this.itemTypeList = res.data;
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

        this._service.post('add-update-project-breakdown', this.entryForm.value).subscribe(
            data => {
                this.blockUI.stop();
                if (data.success) {
                    this.toastr.success(data.message, 'Success!', { timeOut: 2000 });
                    this.modalHide();
                    this.getBreakdownList();
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
