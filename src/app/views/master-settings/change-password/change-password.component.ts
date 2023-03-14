import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cookie } from 'ng2-cookies';
import { CommonService } from '../../../_services/common.service';
import { AuthenticationService } from '../../../_services/authentication.service';
import { MustMatch } from '../../../_helpers/must-match.validator';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-change-password',
    templateUrl: 'change-password.component.html',
    styleUrls: ['change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
    @ViewChild('addChangePasswordModal') public addChangePasswordModal: ModalDirective;
    passwordForm: FormGroup;
    submitted = false;
    returnUrl: string;

    modalTitle = 'Add New Fiscal Year';
    btnSaveText = 'Save';

    currentUser: any = null;

    companyList: Array<any> = [];
    ChangePasswordList: Array<any> = [];

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
        this.passwordForm = this.formBuilder.group({
            old_password: [null, [Validators.required]],
            new_password: [null, [Validators.required]],
            confirm_password: [null, [Validators.required]]
        }, {
            validator: MustMatch('new_password', 'confirm_password')
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.getCompanyList();
        //this.getChangePasswordList()
    }

    get f() {
        return this.passwordForm.controls;
    }

    getCompanyList() {
        this._service.get('admin/company-list').subscribe(res => {
            this.companyList = res.data;
        }, err => { }
        );
    }

    // getChangePasswordList() {
    //     this._service.get('admin/change-password-list').subscribe(res => {
    //         this.ChangePasswordList = res.data;
    //     }, err => { }
    //     );
    // }

    editItem(item){
        this.modalTitle = 'Update Fiscal Year';
        this.btnSaveText = 'Update';

        this.passwordForm.controls['id'].setValue(item.id);
        this.passwordForm.controls['fiscal_year'].setValue(item.fiscal_year);
        this.passwordForm.controls['company_id'].setValue(item.company_id);
        this.passwordForm.controls['start_date'].setValue(item.start_date);
        this.passwordForm.controls['end_date'].setValue(item.end_date);
        this.passwordForm.controls['is_active'].setValue(item.is_active);
        this.addChangePasswordModal.show();
    }

    onFormSubmit(){
        this.submitted = true;
        if (this.passwordForm.invalid) {
            console.log(this.passwordForm)
            return;
        }

        this.passwordForm.value.id ? this.blockUI.start('Saving...') : this.blockUI.start('Updating...');

        this._service.post('auth/change-password', this.passwordForm.value).subscribe(
            data => {
                this.blockUI.stop();
                if (data.status) {
                    this.toastr.success(data.message, 'Success!', { timeOut: 2000 });
                    this.userLogout();
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
        this.addChangePasswordModal.hide();
        this.passwordForm.reset();
        this.submitted = false;
        this.passwordForm.controls['is_active'].setValue(true);
        this.modalTitle = 'Add New Fiscal Year';
        this.btnSaveText = 'Save';
    }

    userLogout() {
        this.authService.logout(window.location.hostname);
        Cookie.delete('.BBLEAVEMS.Cookie', '/', window.location.hostname);
        this.authService.currentUserDetails.next(null);
        this.router.navigate(['/login']);
    }

}
