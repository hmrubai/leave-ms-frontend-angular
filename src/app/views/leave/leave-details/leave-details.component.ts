import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { environment } from '../../../../environments/environment';
import { CommonService } from '../../../_services/common.service';
import { AuthenticationService } from '../../../_services/authentication.service';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { Location } from '@angular/common';

@Component({
    selector: 'app-leave-details',
    templateUrl: 'leave-details.component.html',
    styleUrls: ['leave-details.component.scss']
})
export class LeaveDetailsComponent implements OnInit {
    @ViewChild('addCompanyModal') public addCompanyModal: ModalDirective;
    @ViewChild('viewExplanationModal') public viewExplanationModal: ModalDirective;
    entryForm: FormGroup;
    uploadForm: FormGroup;
    submitted = false;
    returnUrl: string;
    leave_application_id;

    modalTitle = 'Add New Category';
    btnSaveText = 'Save';    

    urls = [];
    files = [];

    profile_image = "assets/img/avatars/profile.png"

    currentUser: any = null;

    companyList: Array<any> = [];
    leaveDetails: Array<any> = [];
    explanationList: Array<any> = [];

    is_loaded = false;

    @BlockUI() blockUI: NgBlockUI;

    constructor(
        private _service: CommonService,
        public formBuilder: FormBuilder,
        private authService: AuthenticationService,
        private toastr: ToastrService,
        private route: ActivatedRoute,
        private router: Router,
        private location: Location
    ) {
        if (!this.authService.isAuthenticated()) {
            this.router.navigate(['/login']);
        }else{
            this.currentUser = this.authService.currentUserDetails.value;
        }

        this.leave_application_id = this.route.snapshot.paramMap.get("leave_application_id");
    }

    ngOnInit() {
        this.entryForm = this.formBuilder.group({
            id: [null],
            name: [null, [Validators.required]],
            address: [null, [Validators.required]],
            contact_no: [null, [Validators.required]],
            company_email: [null, [Validators.required]],
            hr_email: [null, [Validators.required]],
            leave_email: [null, [Validators.required]],
            company_logo: [null],
            employee_code_length: [null],
            company_prefix: [null],
            is_active: [true],
        });

        this.uploadForm = this.formBuilder.group({
            image_file: ['']
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.getLeaveDetails();
    }

    get f() {
        return this.entryForm.controls;
    }

    onSelectFile(event) {
        this.urls = [];
        this.files = [];

        if (event.target.files.length > 0) {
            this.files = event.target.files[0];
            if (event.target.files[0].size > 2000000){
                this.toastr.error('File size is more then 2MB', 'Failed to changed!', { timeOut: 3000 });
                return;
            }else{
                this.uploadForm.get('image_file').setValue(this.files);
            }
        }
    }

    getCompanyList() {
        this._service.get('admin/company-list').subscribe(res => {
            this.companyList = res.data;
        }, err => { }
        );
    }

    getLeaveDetails() {
        this.blockUI.start('Fetching...')
        this._service.get('leave/application-details-by-id/' + this.leave_application_id).subscribe(res => {
            this.leaveDetails = res.data;
            let employee_id = res.data.employee.id;

            if(!employee_id){
                this.toastr.error('What are you looking for? We are tracking your activities!', 'Attention!', { timeOut: 3000 });
                this.router.navigate(['/leave/apply-for-leave']);
            }

            if(employee_id != this.currentUser.id){
                this.toastr.error('You are not able to check others\' leave details', 'Attention!', { timeOut: 3000 });
                this.router.navigate(['/leave/apply-for-leave']);
            }

            if(res.data.employee.image){
                this.profile_image = environment.imageURL + res.data.employee.image;
            }
            this.is_loaded = true;
            this.blockUI.stop();
        }, err => { 
            this.blockUI.stop();
        }
        );
    }

    editItem(item){
        this.modalTitle = 'Update Company';
        this.btnSaveText = 'Update';

        this.entryForm.controls['id'].setValue(item.id);
        this.entryForm.controls['name'].setValue(item.name);
        this.entryForm.controls['address'].setValue(item.address);
        this.entryForm.controls['contact_no'].setValue(item.contact_no);
        this.entryForm.controls['company_email'].setValue(item.company_email);
        this.entryForm.controls['hr_email'].setValue(item.hr_email);
        this.entryForm.controls['leave_email'].setValue(item.leave_email);
        //this.entryForm.controls['company_logo'].setValue(item.company_logo);
        this.entryForm.controls['employee_code_length'].setValue(item.employee_code_length);
        this.entryForm.controls['company_prefix'].setValue(item.company_prefix);
        this.entryForm.controls['is_active'].setValue(item.is_active);
        this.addCompanyModal.show();
    }

    viewExplanation(cutting_explanation){
        this.explanationList = [];
        this.explanationList = cutting_explanation;
        this.modalTitle = 'Leave Cutting Explanation';
        this.btnSaveText = 'Save';
        this.viewExplanationModal.show();
    }

    explanationModalHide(){
        this.viewExplanationModal.hide();
    }

    onFormSubmit(){
        this.submitted = true;
        if (this.entryForm.invalid) {
            return;
        }

        const formData = new FormData();
        if(this.uploadForm.get('image_file').value){
            formData.append('file', this.uploadForm.get('image_file').value);
        }

        formData.append('name', this.entryForm.value.name.trim());
        formData.append('address', this.entryForm.value.address.trim());
        formData.append('contact_no', this.entryForm.value.contact_no.trim());
        formData.append('company_email', this.entryForm.value.company_email.trim());
        formData.append('hr_email', this.entryForm.value.hr_email.trim());
        formData.append('leave_email', this.entryForm.value.leave_email.trim());
        formData.append('employee_code_length', this.entryForm.value.employee_code_length);
        formData.append('company_prefix', this.entryForm.value.company_prefix ? this.entryForm.value.company_prefix.trim() : null);
        formData.append('is_active', this.entryForm.value.is_active);

        this.entryForm.value.id ? this.blockUI.start('Saving...') : this.blockUI.start('Updating...');
        if(this.entryForm.value.id){
            formData.append('id', this.entryForm.value.id);
        }

        this._service.post('admin/company-save-or-update', formData).subscribe(
            data => {
                this.blockUI.stop();
                if (data.status) {
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

    backTo() {
        this.location.back();
    }

    modalHide() {
        this.addCompanyModal.hide();
        this.entryForm.reset();
        this.submitted = false;
        this.entryForm.controls['is_active'].setValue(true);
        this.modalTitle = 'Add New Company';
        this.btnSaveText = 'Save';
    }

}
