import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';

import { CommonService } from '../../../_services/common.service';
import { AuthenticationService } from '../../../_services/authentication.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {ModalDirective} from 'ngx-bootstrap/modal';

@Component({
    selector: 'app-work-day-setup',
    templateUrl: 'work-day-setup.component.html',
    styleUrls: ['work-day-setup.component.scss']
})
export class WorkDaySetupComponent implements OnInit {
    @ViewChild('addWorkDaySetupModal') public addWorkDaySetupModal: ModalDirective;
    entryForm: FormGroup;
    submitted = false;
    returnUrl: string;

    modalTitle = 'Add New Employment Type';
    btnSaveText = 'Save';

    currentUser: any = null;

    companyList: Array<any> = [];
    workDayList: Array<any> = [];
    

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
            type: [null, [Validators.required]],
            is_active: [true],
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.getWorkDayList();
    }

    get f() {
        return this.entryForm.controls;
    }

    getWorkDayList() {
        this._service.get('admin/day-status-list').subscribe(res => {
            this.workDayList = res.data;
        }, err => { }
        );
    }

    editItem(item){
        this.modalTitle = 'Update Employment Type';
        this.btnSaveText = 'Update';

        this.entryForm.controls['id'].setValue(item.id);
        this.entryForm.controls['type'].setValue(item.type);
        this.entryForm.controls['is_active'].setValue(item.is_active);
        this.addWorkDaySetupModal.show();
    }

    onFormSubmit(){
        this.submitted = true;
        if (this.entryForm.invalid) {
            return;
        }

        this.entryForm.value.id ? this.blockUI.start('Saving...') : this.blockUI.start('Updating...');

        this._service.post('admin/employment-type-save-or-update', this.entryForm.value).subscribe(
            data => {
                this.blockUI.stop();
                if (data.status) {
                    this.toastr.success(data.message, 'Success!', { timeOut: 2000 });
                    this.modalHide();
                    this.getWorkDayList();
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
        this.addWorkDaySetupModal.hide();
        this.entryForm.reset();
        this.submitted = false;
        this.entryForm.controls['is_active'].setValue(true);
        this.modalTitle = 'Add New Employment Type';
        this.btnSaveText = 'Save';
    }

}
