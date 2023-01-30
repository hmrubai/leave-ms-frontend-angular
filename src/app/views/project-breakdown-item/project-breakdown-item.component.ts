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
    selector: 'app-main-project-breakdown-item',
    templateUrl: 'project-breakdown-item.component.html',
    styleUrls: ['project-breakdown-item.component.scss']
})
export class ProjectBreakdownItemComponent implements OnInit {
    @ViewChild('addCategoryModal') public addCategoryModal: ModalDirective;
    submitted = false;
    returnUrl: string;
    currentUser: any = null;

    entryForm: FormGroup;
    modalTitle = 'Add New Item';
    btnSaveText = 'Save';

    project_id;
    breakdown_id;
    budget_type_id;
    item_category = null;

    total_amount = 0;

    project_details;
    is_loaded = false;

    itemList: Array<any> = [];
    itemUnitList: Array<any> = [];

    breakdownItemList: Array<any> = [];

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
            item_id: [null, [Validators.required]],
            unit_price: [0, [Validators.required]],
            quantity: [0, [Validators.required]],
            is_active: [true],
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.project_id = this.route.snapshot.paramMap.get("project_id");
        this.breakdown_id = this.route.snapshot.paramMap.get("category_id");
        this.entryForm.controls['project_id'].setValue(this.project_id);

        this.getProjectCategoryDetails();
    }

    get f() {
        return this.entryForm.controls;
    }

    backToLocation() {
        this.routeLocation.back();
    }

    setUnitPrice(item){
        console.log(item)
        this.entryForm.controls['unit_price'].setValue(item.unit_price);
    }

    getTotalValue($event){
        this.total_amount = this.entryForm.value.unit_price * this.entryForm.value.quantity;
    }

    getBreakdownItemList() {
        this._service.get('project-breakdown-item-list-by-id/' + this.project_id + '/' + this.budget_type_id).subscribe(res => {
            this.breakdownItemList = res.data;
        }, err => { }
        );
    }

    getProjectCategoryDetails() {
        this._service.get('breakdown-details-by-id/' + this.breakdown_id).subscribe(res => {
            this.project_details = res.data;
            this.budget_type_id = this.project_details.budget_type_id;
            this.entryForm.controls['budget_type_id'].setValue(this.budget_type_id);
            this.is_loaded = true;
            this.getItemList();
            this.getBreakdownItemList();
        }, err => { }
        );
    }

    getItemList() {
        this._service.get('budget-item-list-by-category-id/' + this.budget_type_id).subscribe(res => {
            this.itemList = res.data;
        }, err => { }
        );
    }

    editItem(item){
        this.modalTitle = 'Update Item';
        this.btnSaveText = 'Update';
        
        this.entryForm.controls['id'].setValue(item.id);
        this.entryForm.controls['project_id'].setValue(item.project_id);
        this.entryForm.controls['budget_type_id'].setValue(item.budget_type_id);
        this.entryForm.controls['item_id'].setValue(item.item_id);
        this.entryForm.controls['unit_price'].setValue(item.unit_price);
        this.entryForm.controls['quantity'].setValue(item.quantity);
        this.entryForm.controls['is_active'].setValue(item.is_active);
        this.getTotalValue(null);
        this.addCategoryModal.show();
    }

    onFormSubmit(){
        this.submitted = true;
        if (this.entryForm.invalid) {
            return;
        }

        this.entryForm.value.id ? this.blockUI.start('Saving...') : this.blockUI.start('Updating...');

        this._service.post('add-update-breakdown-items', this.entryForm.value).subscribe(
            data => {
                this.blockUI.stop();
                if (data.success) {
                    this.toastr.success(data.message, 'Success!', { timeOut: 2000 });
                    this.modalHide();
                    this.getBreakdownItemList();
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
        this.entryForm.controls['budget_type_id'].setValue(this.budget_type_id);
        this.modalTitle = 'Add New Item';
        this.btnSaveText = 'Save';
    }

}
