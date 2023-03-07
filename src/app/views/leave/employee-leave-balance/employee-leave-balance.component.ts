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
    selector: 'app-employee-leave-balance',
    templateUrl: 'employee-leave-balance.component.html',
    styleUrls: ['employee-leave-balance.component.scss']
})
export class EmployeeLeaveBalanceListComponent implements OnInit {
    @ViewChild('addEmployeeLeaveBalanceModal') public addEmployeeLeaveBalanceModal: ModalDirective;
    entryForm: FormGroup;
    submitted = false;
    returnUrl: string;

    modalTitle = 'Add New Leave Balance';
    btnSaveText = 'Save';
    employee_id = null;

    currentUser: any = null;

    employeeList: Array<any> = [];
    leaveBalanceList: Array<any> = [];
    

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
            total_days: [null, [Validators.required]],
            availed_days: [null, [Validators.required]],
            remaining_days: [null, [Validators.required]],
        });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.getEmployeeList();
    }

    get f() {
        return this.entryForm.controls;
    }

    onChangeEmployee(employee){
        if(employee){
            this.employee_id = employee.id;
        }else{
            this.employee_id = 0;
        }
        
        this.leaveBalanceList = [];
        if(this.employee_id){
            this._service.get('admin/leave-balance-list/' + this.employee_id).subscribe(res => {
                this.leaveBalanceList = res.data.balance_list;
            }, err => { }
            );
        }else{
            
        }
    }

    getEmployeeList(){
        this._service.get('admin/employee-list').subscribe(res => {
            this.employeeList = res.data;
        }, err => { }
        );
    }

    editItem(item){
        this.modalTitle = 'Update Leave Balance';
        this.btnSaveText = 'Update';

        this.entryForm.controls['id'].setValue(item.id);
        this.entryForm.controls['total_days'].setValue(item.total_days);
        this.entryForm.controls['availed_days'].setValue(item.availed_days);
        this.entryForm.controls['remaining_days'].setValue(item.remaining_days);
        this.addEmployeeLeaveBalanceModal.show();
    }

    onFormSubmit(){
        this.submitted = true;
        if (this.entryForm.invalid) {
            return;
        }

        let total_days = this.entryForm.value.total_days;
        let availed_days = this.entryForm.value.availed_days;
        let remaining_days = this.entryForm.value.remaining_days;
        if(total_days < (availed_days + remaining_days) || total_days > (availed_days + remaining_days)){
            this.toastr.warning("Please, enter correct value", 'Attention!', { timeOut: 2000 });
            return;
        }

        this.entryForm.value.id ? this.blockUI.start('Saving...') : this.blockUI.start('Updating...');

        //admin/leave-balance-update

        this._service.post('admin/leave-balance-update', this.entryForm.value).subscribe(
            data => {
                this.blockUI.stop();
                if (data.status) {
                    this.toastr.success(data.message, 'Success!', { timeOut: 2000 });
                    this.modalHide();
                    this.onChangeEmployee({id: this.employee_id});
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
        this.addEmployeeLeaveBalanceModal.hide();
        this.entryForm.reset();
        this.submitted = false;
        // this.entryForm.controls['is_active'].setValue(true);
        this.modalTitle = 'Add New Leave Balance';
        this.btnSaveText = 'Save';
    }

}
