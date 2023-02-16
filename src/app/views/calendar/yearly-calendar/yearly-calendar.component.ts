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
    selector: 'app-yearly-calendar',
    templateUrl: 'yearly-calendar.component.html',
    styleUrls: ['yearly-calendar.component.scss']
})
export class YearlyCalendarComponent implements OnInit {
    @ViewChild('addYearlyCalendarModal') public addYearlyCalendarModal: ModalDirective;
    @ViewChild('addGenerateCalendarModal') public addGenerateCalendarModal: ModalDirective;
    entryForm: FormGroup;
    generateCalendarForm: FormGroup;
    submitted = false;
    returnUrl: string;

    modalTitle = 'Add New Year';
    btnSaveText = 'Save';

    currentUser: any = null;

    calendarList: Array<any> = [];
    dayTypeList: Array<any> = [];
    

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
            date: [null, [Validators.required]],
            day_type_id: [null, [Validators.required]],
            day_note: [null, [Validators.required]],
        });

        this.generateCalendarForm = this.formBuilder.group({
            id: [null],
            academic_year: [2022, [Validators.required, Validators.max(2099), Validators.min(2020)]]
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.getDayTypeList();
        this.getcalendarList();
    }

    get f() {
        return this.entryForm.controls;
    }

    get gcf() {
        return this.generateCalendarForm.controls;
    }

    getDayTypeList() {
        this._service.get('admin/day-type-list').subscribe(res => {
            this.dayTypeList = res.data;
        }, err => { }
        );
    }

    getcalendarList(){
        this.blockUI.start('Loading Data...')
        this._service.get('admin/calender').subscribe(res => {
            this.calendarList = res.data;
            this.blockUI.stop();
        }, err => { 
            this.blockUI.stop();
        }
        );
    }

    editItem(item){
        this.modalTitle = 'Update Date Status';
        this.btnSaveText = 'Update';

        this.entryForm.controls['id'].setValue(item.id);
        this.entryForm.controls['date'].setValue(item.date);
        this.entryForm.controls['date'].disable();
        this.entryForm.controls['day_type_id'].setValue(item.day_type_id);
        this.entryForm.controls['day_note'].setValue(item.day_note);
        this.addYearlyCalendarModal.show();
    }

    onFormSubmit(){
        this.submitted = true;
        if (this.entryForm.invalid) {
            return;
        }

        this.entryForm.value.id ? this.blockUI.start('Saving...') : this.blockUI.start('Updating...');
        this.entryForm.controls['date'].enable();

        let param = {
            id: this.entryForm.value.id,
            day_type_id: this.entryForm.value.day_type_id,
            day_note: this.entryForm.value.day_note,
        }

        this._service.post('admin/update-calender', param).subscribe(
            data => {
                this.blockUI.stop();
                if (data.status) {
                    this.toastr.success(data.message, 'Success!', { timeOut: 2000 });
                    this.modalHide();
                    this.getcalendarList();
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

    onSubmitCalendar(){
        this.submitted = true;
        if (this.generateCalendarForm.invalid) {
            return;
        }

        this._service.post('admin/generate-calender', this.generateCalendarForm.value).subscribe(
            data => {
                this.blockUI.stop();
                if (data.status) {
                    this.toastr.success(data.message, 'Success!', { timeOut: 2000 });
                    this.modalHide();
                    this.getcalendarList();
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
        this.addYearlyCalendarModal.hide();
        this.entryForm.reset();
        this.generateCalendarForm.reset();
        this.addGenerateCalendarModal.hide();
        this.submitted = false;
        this.modalTitle = 'Add New Year';
        this.btnSaveText = 'Save';
    }

}
