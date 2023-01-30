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
    selector: 'app-main-budget-category',
    templateUrl: 'budget-category.component.html',
    styleUrls: ['budget-category.component.scss']
})
export class BudgetCategoryComponent implements OnInit {
    @ViewChild('addCategoryModal') public addCategoryModal: ModalDirective;
    categoryForm: FormGroup;
    submitted = false;
    returnUrl: string;

    modalTitle = 'Add New Category';
    btnSaveText = 'Save';

    currentUser: any = null;

    companyList: Array<any> = [];

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
        this.categoryForm = this.formBuilder.group({
            id: [null],
            name: [null, [Validators.required]],
            remarks: [null],
            is_active: [true],
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.getCompanyList();
    }

    get f() {
        return this.categoryForm.controls;
    }

    getCompanyList() {
        this._service.get('company-list').subscribe(res => {
            this.companyList = res.data;
        }, err => { }
        );
    }

    editItem(item){
        this.modalTitle = 'Update Category';
        this.btnSaveText = 'Update';

        this.categoryForm.controls['id'].setValue(item.id);
        this.categoryForm.controls['name'].setValue(item.name);
        this.categoryForm.controls['remarks'].setValue(item.remarks);
        this.categoryForm.controls['is_active'].setValue(item.is_active);
        this.addCategoryModal.show();
    }

    onFormSubmit(){
        this.submitted = true;
        if (this.categoryForm.invalid) {
            return;
        }

        this.categoryForm.value.id ? this.blockUI.start('Saving...') : this.blockUI.start('Updating...');

        this._service.post('add-update-category', this.categoryForm.value).subscribe(
            data => {
                this.blockUI.stop();
                if (data.success) {
                    this.toastr.success(data.message, 'Success!', { timeOut: 2000 });
                    this.modalHide();
                    this.getCompanyList();
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
        this.categoryForm.reset();
        this.submitted = false;
        this.categoryForm.controls['is_active'].setValue(true);
        this.modalTitle = 'Add New Category';
        this.btnSaveText = 'Save';
    }

}
