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
    selector: 'app-main-payment-history',
    templateUrl: 'payment-history.component.html',
    styleUrls: ['payment-history.component.scss']
})
export class PaymentHistoryComponent implements OnInit {
    @ViewChild('addCategoryModal') public addCategoryModal: ModalDirective;
    @ViewChild('detailsModal') public detailsModal: ModalDirective;
    submitted = false;
    returnUrl: string;
    currentUser: any = null;

    entryForm: FormGroup;
    modalTitle = 'Receive New Payment';
    btnSaveText = 'Save';

    item_category = null;
    filter_project = null;
    filter_category = null;

    paymentMethod = [{ id: "Cash", name: 'Cash' }, { id: "Bank", name: 'Bank' }, { id: "Card", name: 'Card' }, { id: "Cheque", name: 'Cheque' }, { id: "Mobile Banking", name: 'Mobile Banking' }, { id: "Others", name: 'Others' }]

    projectList: Array<any> = [];
    vendorList: Array<any> = [];
    projectCategoryList: Array<any> = [];
    filterProjectCategoryList: Array<any> = [];

    transactionList: Array<any> = [];

    transactionDetails;
    is_details_loaded = false;

    @BlockUI() blockUI: NgBlockUI;

    constructor(
        private _service: CommonService,
        public formBuilder: FormBuilder,
        private authService: AuthenticationService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private routeLocation: Location,
    ) {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/login']);
        }
    }

    ngOnInit() {

        this.entryForm = this.formBuilder.group({
            id: [null],
            project_id: [null, [Validators.required]],
            breakdown_id: [null, [Validators.required]],
            vendor_id: [null],
            receive_amount: [0, [Validators.required]],
            disbursed_amount: [0],
            purpose: [null, [Validators.required]],
            payment_type: ["Cash", [Validators.required]],
            payment_details: [null],
            is_active: [true],
        });

        //"project_id", "budget_type_id", "project_breakdown_id", "vendor_id", "receive_amount", "disbursed_amount", "purpose", "payment_type", "payment_details", "attachment", "is_active", "created_by"

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        //this.getTransactionList();
        this.getProjectList();
        this.getVendorList();
    }

    get f() {
        return this.entryForm.controls;
    }

    getTransactionList() {
        let params = {
            project_id : this.filter_project,
            category_id : this.filter_category
        }
        this._service.get('project-statement-list', params).subscribe(res => {
            this.transactionList = res.data;
        }, err => { }
        );
    }

    getTransactionFilterList(){
        this.filter_category = null;
        if(this.filter_project){
            this.getTransactionList();
            this.onFilterChangeProject(this.filter_project)
        }
    }

    onFilterChangeProject(project){
        this.filterProjectCategoryList = [];
        if(project){
            this._service.get('breakdown-list-by-id/' + project).subscribe(res => {
                this.filterProjectCategoryList = res.data;
            }, err => { }
            );
        }
    }

    backToLocation() {
        this.routeLocation.back();
    }
    
    getVendorList() {
        this._service.get('vendor-list').subscribe(res => {
            this.vendorList = res.data;
        }, err => { }
        );
    }

    getProjectList() {
        this._service.get('project-list').subscribe(res => {
            this.projectList = res.data;
        }, err => { }
        );
    }

    onChangeProject(project){
        this.projectCategoryList = [];
        this.entryForm.controls['breakdown_id'].setValue(null);
        if(project){
            this._service.get('breakdown-list-by-id/' + project.id).subscribe(res => {
                this.projectCategoryList = res.data;
            }, err => { }
            );
        }
    }

    editItem(item){
        this.modalTitle = 'Update Product';
        this.btnSaveText = 'Update';
        
        this.entryForm.controls['id'].setValue(item.id);
        this.entryForm.controls['name'].setValue(item.name);
        this.entryForm.controls['budget_type_id'].setValue(item.budget_type_id);
        this.entryForm.controls['item_unit_id'].setValue(item.item_unit_id);
        this.entryForm.controls['unit_price'].setValue(item.unit_price);
        this.entryForm.controls['remarks'].setValue(item.remarks);
        this.entryForm.controls['is_active'].setValue(item.is_active);
        this.addCategoryModal.show();
    }

    seeDetails(item){
        console.log(item)
        this.transactionDetails = item;
        this.is_details_loaded = true;
        this.detailsModal.show();
    }

    onFormSubmit(){
        this.submitted = true;
        if (this.entryForm.invalid) {
            return;
        }

        this.entryForm.value.id ? this.blockUI.start('Saving...') : this.blockUI.start('Updating...');

        this._service.post('add-transaction-information', this.entryForm.value).subscribe(
            data => {
                this.blockUI.stop();
                if (data.success) {
                    this.toastr.success(data.message, 'Success!', { timeOut: 2000 });
                    this.modalHide();
                    this.getTransactionList();
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
        this.modalTitle = 'Add New Product';
        this.btnSaveText = 'Save';
    }

}
