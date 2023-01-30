import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import { CommonService } from '../../_services/common.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {ModalDirective} from 'ngx-bootstrap/modal';
import * as moment from 'moment';

@Component({
    selector: 'app-main-project',
    templateUrl: 'project.component.html',
    styleUrls: ['project.component.scss']
})
export class ProjectComponent implements OnInit {
    @ViewChild('addCategoryModal') public addCategoryModal: ModalDirective;
    submitted = false;
    returnUrl: string;
    currentUser: any = null;

    entryForm: FormGroup;
    modalTitle = 'Add New Product';
    btnSaveText = 'Save';

    item_category = null;

    statusList = [
        { id: "OnGoing", name: "OnGoing" },
        { id: "Paused", name: "Paused" },
        { id: "Completed", name: "Completed" },
        { id: "Postponed", name: "Postponed" },
        { id: "Cancelled", name: "Cancelled" }
    ]

    projectList: Array<any> = [];

    @BlockUI() blockUI: NgBlockUI;

    constructor(
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
        //"name", "address", "contact_person", "remarks", "project_version", "deadline", "status", "is_active",
        this.entryForm = this.formBuilder.group({
            id: [null],
            name: [null, [Validators.required]],
            address: [null, [Validators.required]],
            contact_person: [null, [Validators.required]],
            remarks: [null, [Validators.required]],
            status: ['OnGoing'],
            deadline: [null],
            is_active: [true],
        });


        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.getItemList();
    }

    get f() {
        return this.entryForm.controls;
    }

    getItemList() {
        let params = {
            category : this.item_category
        }
        this._service.get('project-list').subscribe(res => {
            this.projectList = res.data;
        }, err => { }
        );
    }

    editItem(item){
        this.modalTitle = 'Update Project';
        this.btnSaveText = 'Update';
        
        //"name", "address", "contact_person", "remarks", "deadline", "status", "is_active",

        this.entryForm.controls['id'].setValue(item.id);
        this.entryForm.controls['name'].setValue(item.name);
        this.entryForm.controls['address'].setValue(item.address);
        this.entryForm.controls['contact_person'].setValue(item.contact_person);
        this.entryForm.controls['remarks'].setValue(item.remarks);
        this.entryForm.controls['status'].setValue(item.status);
        this.entryForm.controls['deadline'].setValue(this.getDateFormatModal(item.deadline));
        this.entryForm.controls['is_active'].setValue(item.is_active);
        this.addCategoryModal.show();
    }

    onFormSubmit(){
        this.submitted = true;
        if (this.entryForm.invalid) {
            return;
        }

        this.entryForm.value.id ? this.blockUI.start('Saving...') : this.blockUI.start('Updating...');

        let params = {
            id: this.entryForm.value.id ? this.entryForm.value.id : 0, 
            name: this.entryForm.value.name.trim(), 
            address: this.entryForm.value.address, 
            contact_person: this.entryForm.value.contact_person, 
            remarks: this.entryForm.value.remarks, 
            deadline: this.validateDateTimeFormat(this.entryForm.value.deadline), 
            status: this.entryForm.value.status, 
            is_active: this.entryForm.value.is_active, 
        }

        this._service.post('add-update-project', params).subscribe(
            data => {
                this.blockUI.stop();
                if (data.success) {
                    this.toastr.success(data.message, 'Success!', { timeOut: 2000 });
                    this.modalHide();
                    this.getItemList();
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
        this.entryForm.controls['status'].setValue("OnGoing");
        this.modalTitle = 'Add New Project';
        this.btnSaveText = 'Save';
    }

    validateDateTimeFormat(value: Date) {
        return moment(value).format('YYYY-MM-DD');
    }

    getDateFormatModal(value: Date) {
        return moment(value).format('yyyy-MM-DD');
    }

}
