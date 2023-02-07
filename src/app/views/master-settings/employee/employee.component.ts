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
    selector: 'app-employee',
    templateUrl: 'employee.component.html',
    styleUrls: ['employee.component.scss']
})
export class EmployeeComponent implements OnInit {
    @ViewChild('addEmployeeModal') public addEmployeeModal: ModalDirective;
    entryForm: FormGroup;
    uploadForm: FormGroup;
    submitted = false;
    returnUrl: string;

    modalTitle = 'Add New Employee';
    btnSaveText = 'Save';    

    urls = [];
    files = [];

    currentUser: any = null;

    bloodGroup = [
        {
            id: "A+",
            value: "A+"
        },{
            id: "A-",
            value: "A-"
        },{
            id: "B+",
            value: "B+"
        },{
            id: "B-",
            value: "B-"
        },{
            id: "O+",
            value: "O+"
        },{
            id: "O-",
            value: "O-"
        },{
            id: "AB+",
            value: "AB+"
        },{
            id: "AB-",
            value: "AB-"
        }
    ]

    maritalStatus = [
        {
            id: "Married",
            value: "Married"
        },
        {
            id: "Unmarried",
            value: "Unmarried"
        },
        {
            id: "Divorced",
            value: "Dnmarried"
        }
        
    ]

    gender = [
        {
            id: "Male",
            value: "Male"
        },
        {
            id: "Female",
            value: "Female"
        },
        {
            id: "Transgender",
            value: "Transgender"
        } 
    ]

    employeeList: Array<any> = [];
    companyList: Array<any> = [];
    branchList: Array<any> = [];
    designationList: Array<any> = [];
    departmentList: Array<any> = [];
    employmentList: Array<any> = [];
    divisionList: Array<any> = [];
    districtList: Array<any> = [];
    upazilaList: Array<any> = [];
    unionList: Array<any> = [];

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
            father_name: [null, [Validators.required]],
            mother_name: [null, [Validators.required]],
            employee_id: [null, [Validators.required]],
            email: [null, [Validators.required]],
            mobile: [null, [Validators.required]],
            nid: [null, [Validators.required]],
            company_id: [null, [Validators.required]],
            branch_id: [null, [Validators.required]],
            present_address: [null],
            permanent_address: [null],
            date_of_birth: [null],
            joining_date: [null],
            blood_group: [null],
            marital_status: [null],
            gender: [null],
            department_id: [null],
            designation_id: [null],
            employment_type_id: [null],
            division_id: [null],
            district_id: [null],
            city_id: [null],
            area_id: [null],
            is_stuckoff: [null],
            stuckoff_date: [null],
            office_contact_number: [null],
            finger_print_id: [null],
            personal_alt_contact_number: [null],
            personal_email: [null],
            passport_number: [null],
            spouse_name: [null],
            spouse_number: [null],
            fathers_contact_number: [null],
            mothers_contact_number: [null],
            referee_office: [null],
            referee_relative: [null],
            referee_contact_details: [null],
            key_skills: [null],
            highest_level_of_study: [null],
            e_tin: [null],
            applicable_tax_amount: [null],
            official_achievement: [null],
            remarks: [null],
            is_active: [true],
            image: [null]
        });

        this.uploadForm = this.formBuilder.group({
            image_file: ['']
        });

        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.getCompanyList();
        this.getEmployeeList();
        this.getDivisonList();
        this.getEmploymentList();
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

    getEmployeeList() {
        this._service.get('admin/employee-list').subscribe(res => {
            this.employeeList = res.data;
        }, err => { }
        );
    }

    getCompanyList() {
        this._service.get('admin/company-list').subscribe(res => {
            this.companyList = res.data;
        }, err => { }
        );
    }

    getDivisonList() {
        this._service.get('division-list').subscribe(res => {
            this.divisionList = res.data;
        }, err => { }
        );
    }

    getEmploymentList(){
        this._service.get('admin/employment-type-list').subscribe(res => {
            this.employmentList = res.data;
        }, err => { }
        );
    }

    onChangeDivision(division){
        this.districtList = [];
        this._service.get('district-list/' + division.id).subscribe(res => {
            this.districtList = res.data;
        }, err => { }
        );
    }

    onChangeDistrict(district){
        this.upazilaList = [];
        this._service.get('upazila-list/' + district.id).subscribe(res => {
            this.upazilaList = res.data;
        }, err => { }
        );
    }

    onChangeUpazila(upazila){
        this.unionList = [];
        this._service.get('area-list/' + upazila.id).subscribe(res => {
            this.unionList = res.data;
        }, err => { }
        );
    }

    onChangeCompany(company){
        this.branchList = [];
        this.onChangeBranchOrCompany();
        this._service.get('admin/branch-list-by-company-id/' + company.id).subscribe(res => {
            this.branchList = res.data;
        }, err => { }
        );
    }

    onChangeBranchOrCompany(){
        let comapny_id = this.entryForm.value.company_id;
        let branch_id = this.entryForm.value.branch_id;

        this.entryForm.controls['department_id'].setValue(null);
        this.entryForm.controls['designation_id'].setValue(null);

        this.designationList = [];
        this.departmentList = [];

        if(comapny_id && branch_id){
            this._service.get('admin/department-list-by-id/' + comapny_id + '/' + branch_id).subscribe(res => {
                this.departmentList = res.data;
            }, err => { }
            );

            this._service.get('admin/designation-list-by-id/' + comapny_id + '/' + branch_id).subscribe(res => {
                this.designationList = res.data;
            }, err => { }
            );
        }
    }

    editItem(item){
        this.modalTitle = 'Update Employee';
        this.btnSaveText = 'Update';

        this.entryForm.controls['id'].setValue(item.id);
        this.entryForm.controls['name'].setValue(item.name);
        this.entryForm.controls['father_name'].setValue(item.father_name);
        this.entryForm.controls['mother_name'].setValue(item.mother_name);
        this.entryForm.controls['fathers_contact_number'].setValue(item.fathers_contact_number);
        this.entryForm.controls['mothers_contact_number'].setValue(item.mothers_contact_number);
        this.entryForm.controls['employee_id'].setValue(item.employee_id);
        this.entryForm.controls['email'].setValue(item.email);
        this.entryForm.controls['email'].disable();
        this.entryForm.controls['mobile'].setValue(item.mobile);
        this.entryForm.controls['nid'].setValue(item.nid);
        this.entryForm.controls['present_address'].setValue(item.present_address);
        this.entryForm.controls['permanent_address'].setValue(item.permanent_address);
        this.entryForm.controls['date_of_birth'].setValue(item.date_of_birth);
        this.entryForm.controls['joining_date'].setValue(item.joining_date);
        this.entryForm.controls['blood_group'].setValue(item.blood_group);
        this.entryForm.controls['marital_status'].setValue(item.marital_status);
        this.entryForm.controls['gender'].setValue(item.gender);
        this.entryForm.controls['company_id'].setValue(item.company_id);
        this.onChangeCompany({id: item.company_id});

        this.entryForm.controls['branch_id'].setValue(item.branch_id);
        this.onChangeBranchOrCompany();

        this.entryForm.controls['department_id'].setValue(item.department_id);
        this.entryForm.controls['designation_id'].setValue(item.designation_id);
        this.entryForm.controls['employment_type_id'].setValue(item.employment_type_id);
        this.entryForm.controls['division_id'].setValue(item.division_id);
        this.onChangeDivision({id: item.division_id});

        this.entryForm.controls['district_id'].setValue(item.district_id);
        this.onChangeDistrict({id: item.district_id});

        this.entryForm.controls['city_id'].setValue(item.city_id);
        this.onChangeUpazila({id: item.city_id});

        this.entryForm.controls['area_id'].setValue(item.area_id);
        this.entryForm.controls['is_stuckoff'].setValue(item.is_stuckoff);
        this.entryForm.controls['stuckoff_date'].setValue(item.stuckoff_date);
        this.entryForm.controls['office_contact_number'].setValue(item.office_contact_number);
        this.entryForm.controls['office_contact_number'].setValue(item.office_contact_number);
        this.entryForm.controls['finger_print_id'].setValue(item.finger_print_id);
        this.entryForm.controls['personal_alt_contact_number'].setValue(item.personal_alt_contact_number);
        this.entryForm.controls['personal_email'].setValue(item.personal_email);
        this.entryForm.controls['passport_number'].setValue(item.passport_number);
        this.entryForm.controls['spouse_name'].setValue(item.spouse_name);
        this.entryForm.controls['spouse_number'].setValue(item.spouse_number);
        this.entryForm.controls['referee_office'].setValue(item.referee_office);
        this.entryForm.controls['referee_relative'].setValue(item.referee_relative);
        this.entryForm.controls['referee_contact_details'].setValue(item.referee_contact_details);
        this.entryForm.controls['key_skills'].setValue(item.key_skills);
        this.entryForm.controls['highest_level_of_study'].setValue(item.highest_level_of_study);
        this.entryForm.controls['e_tin'].setValue(item.e_tin);
        this.entryForm.controls['applicable_tax_amount'].setValue(item.applicable_tax_amount);
        this.entryForm.controls['official_achievement'].setValue(item.official_achievement);
        this.entryForm.controls['remarks'].setValue(item.remarks);
        //this.entryForm.controls['image'].setValue(item.image);
        this.entryForm.controls['is_active'].setValue(item.is_active);
        this.addEmployeeModal.show();
    }
    
    onFormSubmit(){
        this.submitted = true;
        if (this.entryForm.invalid) {
            return;
        }

        const formData = new FormData();
        if(this.uploadForm.get('image_file').value){
            formData.append('image', this.uploadForm.get('image_file').value);
        }

        this.entryForm.controls['email'].enable();

        formData.append('name', this.entryForm.value.name.trim());
        formData.append('father_name', this.entryForm.value.father_name ? this.entryForm.value.father_name.trim() : null);
        formData.append('mother_name', this.entryForm.value.mother_name ? this.entryForm.value.mother_name.trim() : null);
        formData.append('fathers_contact_number', this.entryForm.value.fathers_contact_number ? this.entryForm.value.fathers_contact_number.trim() : null);
        formData.append('mothers_contact_number', this.entryForm.value.mothers_contact_number ? this.entryForm.value.mothers_contact_number.trim() : null);
        formData.append('email', this.entryForm.value.email.trim());
        formData.append('employee_id', this.entryForm.value.employee_id);
        formData.append('mobile', this.entryForm.value.mobile ? this.entryForm.value.mobile.trim() : null);
        formData.append('nid', this.entryForm.value.nid ? this.entryForm.value.nid.trim() : null);
        formData.append('present_address', this.entryForm.value.present_address ? this.entryForm.value.present_address.trim() : null);
        formData.append('permanent_address', this.entryForm.value.permanent_address ? this.entryForm.value.permanent_address.trim() : null);
        formData.append('office_contact_number', this.entryForm.value.office_contact_number ? this.entryForm.value.office_contact_number.trim() : null);
        formData.append('finger_print_id', this.entryForm.value.finger_print_id ? this.entryForm.value.finger_print_id.trim() : null);
        formData.append('personal_alt_contact_number', this.entryForm.value.personal_alt_contact_number ? this.entryForm.value.personal_alt_contact_number.trim() : null);
        formData.append('personal_email', this.entryForm.value.personal_email ? this.entryForm.value.personal_email.trim() : null);
        formData.append('passport_number', this.entryForm.value.passport_number ? this.entryForm.value.passport_number.trim() : null);
        formData.append('spouse_name', this.entryForm.value.spouse_name ? this.entryForm.value.spouse_name.trim() : null);
        formData.append('spouse_number', this.entryForm.value.spouse_number ? this.entryForm.value.spouse_number.trim() : null);
        formData.append('referee_office', this.entryForm.value.referee_office ? this.entryForm.value.referee_office.trim() : null);
        formData.append('referee_relative', this.entryForm.value.referee_relative ? this.entryForm.value.referee_relative.trim() : null);
        formData.append('referee_contact_details', this.entryForm.value.referee_contact_details ? this.entryForm.value.referee_contact_details.trim() : null);
        formData.append('key_skills', this.entryForm.value.key_skills ? this.entryForm.value.key_skills.trim() : null);
        formData.append('highest_level_of_study', this.entryForm.value.highest_level_of_study ? this.entryForm.value.highest_level_of_study.trim() : null);
        formData.append('e_tin', this.entryForm.value.e_tin ? this.entryForm.value.e_tin.trim() : null);
        formData.append('applicable_tax_amount', this.entryForm.value.applicable_tax_amount ? this.entryForm.value.applicable_tax_amount.trim() : null);
        formData.append('official_achievement', this.entryForm.value.official_achievement ? this.entryForm.value.official_achievement.trim() : null);
        formData.append('remarks', this.entryForm.value.remarks ? this.entryForm.value.remarks.trim() : null);
        formData.append('date_of_birth', this.entryForm.value.date_of_birth);
        formData.append('joining_date', this.entryForm.value.joining_date);
        formData.append('blood_group', this.entryForm.value.blood_group);
        formData.append('marital_status', this.entryForm.value.marital_status);
        formData.append('gender', this.entryForm.value.gender);
        formData.append('company_id', this.entryForm.value.company_id);
        formData.append('branch_id', this.entryForm.value.branch_id);
        formData.append('department_id', this.entryForm.value.department_id);
        formData.append('designation_id', this.entryForm.value.designation_id);
        formData.append('employment_type_id', this.entryForm.value.employment_type_id);
        formData.append('division_id', this.entryForm.value.division_id);
        formData.append('district_id', this.entryForm.value.district_id);
        formData.append('city_id', this.entryForm.value.city_id);
        formData.append('area_id', this.entryForm.value.area_id);
        formData.append('is_stuckoff', this.entryForm.value.is_stuckoff);
        formData.append('stuckoff_date', this.entryForm.value.stuckoff_date);
        formData.append('is_active', this.entryForm.value.is_active);

        this.entryForm.value.id ? this.blockUI.start('Saving...') : this.blockUI.start('Updating...');
        if(this.entryForm.value.id){
            formData.append('id', this.entryForm.value.id);
            this._service.post('admin/update-employee', formData).subscribe(
                data => {
                    this.blockUI.stop();
                    if (data.status) {
                        this.toastr.success(data.message, 'Success!', { timeOut: 2000 });
                        this.modalHide();
                        this.getEmployeeList();
                    } else {
                        this.toastr.error(data.message, 'Error!', { timeOut: 2000 });
                    }
                },
                err => {
                    this.blockUI.stop();
                    this.toastr.error(err.message || err, 'Error!', { timeOut: 2000 });
                }
            );
        }else{
            this._service.post('admin/add-employee', formData).subscribe(
                data => {
                    this.blockUI.stop();
                    if (data.status) {
                        this.toastr.success(data.message, 'Success!', { timeOut: 2000 });
                        this.modalHide();
                        this.getEmployeeList();
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
    }

    modalHide() {
        this.addEmployeeModal.hide();
        this.entryForm.reset();
        this.submitted = false;
        this.entryForm.controls['is_active'].setValue(true);
        this.modalTitle = 'Add New Employee';
        this.btnSaveText = 'Save';
    }

}
