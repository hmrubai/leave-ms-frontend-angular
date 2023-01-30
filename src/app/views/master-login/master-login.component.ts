import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import { CommonService } from '../../_services/common.service';
import { AuthenticationService } from '../../_services/authentication.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';

@Component({
    selector: 'app-login',
    templateUrl: 'master-login.component.html',
    styleUrls: ['master-login.component.scss']
})
export class MasterLoginComponent implements OnInit {
    LoginForm: FormGroup;
    submitted = false;
    returnUrl: string;

    currentUser: any = null;

    @BlockUI() blockUI: NgBlockUI;

    constructor(
        private _service: CommonService,
        public formBuilder: FormBuilder,
        private authService: AuthenticationService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router
    ) {}

    ngOnInit() {
        this.LoginForm = this.formBuilder.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required]],
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        if (this.authService.isAuthenticated()) {
            this.router.navigate([this.returnUrl ? this.returnUrl : '/dashboard']);
        }
    }

    get f() {
        return this.LoginForm.controls;
    }

    onLoginSubmit(){
        this.submitted = true;
        if (this.LoginForm.invalid) {
            return;
        }
        this.blockUI.start('Loading...');

        this.authService.login(this.LoginForm.value).subscribe(
            data => {

                this.blockUI.stop();
                if(data.status){
                    this.toastr.success('Logging Successfully', 'Success!', { timeOut: 2000 });
                    this.router.navigate([this.returnUrl ? this.returnUrl : '/dashboard']);
                }else{
                    this.toastr.error(data.message, 'Error!', { timeOut: 3000 });
                }
            },
            error => {
                this.blockUI.stop();
                if (error.status === 400) {
                    this.toastr.error('Unauthorized request found', 'Error!', { timeOut: 3000 });
                } else if (error.status === 401) {
                    this.toastr.error('Invalid Email Or Password', 'Error!', { timeOut: 3000 });
                }
            }
        );
    }
}
