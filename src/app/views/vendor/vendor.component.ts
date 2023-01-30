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
    selector: 'app-main-vendor',
    templateUrl: 'vendor.component.html',
    styleUrls: ['vendor.component.scss']
})
export class VendorListComponent implements OnInit {
    @ViewChild('addCategoryModal') public addCategoryModal: ModalDirective;
    submitted = false;
    returnUrl: string;
    currentUser: any = null;

    entryForm: FormGroup;
    modalTitle = 'Add New Vendor';
    btnSaveText = 'Save';

    item_category = null;

    itemTypeList: Array<any> = [];
    itemUnitList: Array<any> = [];

    vendorList: Array<any> = [];

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
            email: [null],
            contact_no: [null, [Validators.required]],
            contact_preson: [null],
            address: [null],
            is_active: [true],
        }); 

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.getVendorList();
    }

    get f() {
        return this.entryForm.controls;
    }

    getVendorList() {
        this._service.get('vendor-list').subscribe(res => {
            this.vendorList = res.data;
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
        this.modalTitle = 'Update Vendor';
        this.btnSaveText = 'Update';
        
        this.entryForm.controls['id'].setValue(item.id);
        this.entryForm.controls['name'].setValue(item.name);
        this.entryForm.controls['email'].setValue(item.email);
        this.entryForm.controls['contact_no'].setValue(item.contact_no);
        this.entryForm.controls['contact_preson'].setValue(item.contact_preson);
        this.entryForm.controls['address'].setValue(item.address);
        this.entryForm.controls['is_active'].setValue(item.is_active);
        this.addCategoryModal.show();
    }

    onFormSubmit(){
        this.submitted = true;
        if (this.entryForm.invalid) {
            return;
        }
        //"name", "email", "contact_no", "contact_preson", "address", "is_active",

        this.entryForm.value.id ? this.blockUI.start('Saving...') : this.blockUI.start('Updating...');

        this._service.post('add-update-vendor', this.entryForm.value).subscribe(
            data => {
                this.blockUI.stop();
                if (data.success) {
                    this.toastr.success(data.message, 'Success!', { timeOut: 2000 });
                    this.modalHide();
                    this.getVendorList();
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
        this.modalTitle = 'Add New Vendor';
        this.btnSaveText = 'Save';
    }

}
