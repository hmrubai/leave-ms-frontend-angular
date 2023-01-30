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

@Component({
    selector: 'app-main-budget-items',
    templateUrl: 'budget-items.component.html',
    styleUrls: ['budget-items.component.scss']
})
export class BudgetItemsComponent implements OnInit {
    @ViewChild('addCategoryModal') public addCategoryModal: ModalDirective;
    submitted = false;
    returnUrl: string;
    currentUser: any = null;

    entryForm: FormGroup;
    modalTitle = 'Add New Product';
    btnSaveText = 'Save';

    item_category = null;

    itemTypeList: Array<any> = [];
    itemUnitList: Array<any> = [];

    productList: Array<any> = [];

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
        this.entryForm = this.formBuilder.group({
            id: [null],
            name: [null, [Validators.required]],
            budget_type_id: [null, [Validators.required]],
            item_unit_id: [null, [Validators.required]],
            unit_price: [null, [Validators.required]],
            remarks: [null],
            is_active: [true],
        });

        //"name", "budget_type_id", "item_unit_id", "unit_price", "is_active", "remarks", "created_by"

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.getItemList();
        this.getItemTypeList();
        this.getItemUnitList();
    }

    get f() {
        return this.entryForm.controls;
    }

    getItemList() {
        let params = {
            category : this.item_category
        }
        this._service.get('budget-item-list', params).subscribe(res => {
            this.productList = res.data;
        }, err => { }
        );
    }

    getItemTypeList() {
        this._service.get('category-list').subscribe(res => {
            this.itemTypeList = res.data;
        }, err => { }
        );
    }

    getItemUnitList() {
        this._service.get('unit-list').subscribe(res => {
            this.itemUnitList = res.data;
        }, err => { }
        );
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

    onFormSubmit(){
        this.submitted = true;
        if (this.entryForm.invalid) {
            return;
        }

        this.entryForm.value.id ? this.blockUI.start('Saving...') : this.blockUI.start('Updating...');

        this._service.post('add-update-budget-item', this.entryForm.value).subscribe(
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
        this.modalTitle = 'Add New Product';
        this.btnSaveText = 'Save';
    }

}
