import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, JsonpClientBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
	providedIn: 'root'
})
export class InternationalizationService {
	constructor(private httpClient: HttpClient) { }

	public getLables() {
		let url = environment.apiBase + 'v1.0/internationalization';
		return this.httpClient.get(url).pipe(catchError(this.errorHandler));
	}

	public englishLabels = {
		'org.list': {
			'org.list.grid.column6': 'Contact Name',
			'org.list.grid.column7': 'Contact Email',
			'org.list.grid.column4': 'Country',
			'org.list.main.heading': 'Org',
			'org.list.grid.column5': 'Phone No',
			'org.list.grid.column2': 'Email',
			'org.list.grid.column3': 'City',
			'org.list.grid.column1': 'Name',
			'org.list.main.button2': 'Search',
			'org.list.main.button1': 'Add'
		},
		'org.details': {
			'org.details.main.heading.add': 'Add Org',
			'org.details.main.heading.update': 'Update Org',
			'org.details.main.form.name': 'Name',
			'org.details.main.form.language': 'Language',
			'org.details.main.form.businessAddress': 'Business Address',
			'org.details.main.form.commonAddress': 'Common Address',
			'org.details.main.form.country': 'Country',
			'org.details.main.form.state': 'State',
			'org.details.main.form.city': 'City',
			'org.details.main.form.zipCode': 'Zip Code',
			'org.details.main.form.phone': 'Phone',
			'org.details.main.form.alternatePhone': 'Alternate Phone',
			'org.details.main.form.email': 'Email',
			'org.details.main.form.timezone': 'Timezone',
			'org.details.main.form.buildVersion': 'Build Version',
			'org.details.main.form.mode': 'Mode',
			'org.details.main.form.2FA': '2FA',
			'org.details.main.form.2FA.sms': 'SMS',
			'org.details.main.form.2FA.email': 'Email',
			'org.details.spoc.heading': 'Spoc Details',
			'org.details.spoc.contactName': 'Contact Name',
			'org.details.spoc.contactPhone': 'Contact Phone',
			'org.details.spoc.contactEmail': 'Contact Email',
			'org.details.components.heading': 'Map Components',
			'org.details.main.button.activate': 'Activate',
			'org.details.main.button.deactivate': 'De Activate',
			'org.details.main.button.save': 'Save',
			'org.details.main.button.update': 'Update'
		},
		'user.list': {
			'user.list.main.heading': 'User',
			'user.list.grid.column7': 'Contact Name',
			'user.list.grid.column6': 'Action',
			'user.list.grid.column5': 'Created',
			'user.list.grid.column4': 'Login ID',
			'user.list.grid.column3': 'Role',
			'user.list.grid.column2': 'Name',
			'user.list.grid.column1': 'Sl.No',
			'user.list.main.button2': 'Bulk Upload',
			'user.list.main.button1': 'Add User'
		},
		'user.details': {
			'user.details.main.heading.add': 'Add User',
			'user.details.main.heading.update': 'Update User',
			'user.details.main.button.save': 'Save',
			'user.details.main.button.update': 'Update',
			'user.details.main.button2': 'Bulk Upload',
			'user.details.main.column1': 'Name',
			'user.details.main.column2': 'Language',
			'user.details.main.column3': 'Login ID',
			'user.details.main.column4': 'Email',
			'user.details.main.column5': 'Password',
			'user.details.main.column6': 'Confirm Password',
			'user.details.main.column7': 'Phone',
			'user.details.main.column8': 'Cell No',
			'user.details.main.column9': 'IMEI No',
			'user.details.main.column10': 'Time Zone',
			'user.details.main.column11': 'Address',
			'user.details.main.column12': 'City',
			'user.details.main.column13': 'State',
			'user.details.main.column14': 'Country',
			'user.details.main.column15': 'Employee No',
			'user.details.main.column16': 'Zip Code',
			'user.details.main.column17': 'Alternate Phone',
			'user.details.main.column18': 'Profile URL',
			'user.details.main.column19': 'Joining Date',
			'user.details.main.column20': 'Confirm.Date',
			'user.details.main.column21': 'Resig.Date',
			'user.details.main.column22': '2FA',
			'user.details.main.column23': 'SMS',
			'user.details.main.column24': 'EMAIL',
			'user.details.main.button.addrole': 'Add Role',
			'user.details.main.addrole.column1': 'Sl.No',
			'user.details.main.addrole.column2': 'Role Type',
			'user.details.main.addrole.column3': 'Manager',
			'user.details.main.addrole.column4': 'Default',
			'user.details.main.addrole.model.heading': 'Add Role',
			'user.details.main.addrole.model.column1': 'Role Type',
			'user.details.main.addrole.model.column2': 'Manager',
			'user.details.main.addrole.model.column3': 'Default'
		},
			'org.details.main.button.update': 'Update',
			'org.details.main.err.name.required': 'Organization Name is required',
			'org.details.main.err.language.required': 'Language is required',
			'org.details.main.err.businessAddress.required': 'Business Address is required',
			'org.details.main.err.businessAddress.maxLength': 'Business Address must be less then 1000 characters',
			'org.details.main.err.commonAddress.maxLength': 'Common Address must be less then 1000 characters',
			'org.details.main.err.country.required': 'Country is required',
			'org.details.main.err.city.required': 'City is required',
			'org.details.main.err.phone.required': 'Phone is required',
			'org.details.main.err.email.required': 'Email is required',
			'org.details.main.err.email.error': 'Email must be a valid email address',
			'org.details.main.err.timezone.required': 'Timezone is required',
			'org.details.main.err.mode.required': 'Mode is required',
			'org.details.main.err.2FA.required': '2 Factor Authentication should be selected',
			'org.details.spoc.err.contactName.required': 'Contact Name is required',
			'org.details.spoc.err.contactPhone.required': 'Contact Phone is required',
			'org.details.spoc.err.contactEmail.required': 'Contact Email is required',
			'org.details.spoc.err.contactEmail.error': 'Contact Email is requiredEmail must be a valid email address'
		,
		'skill.list':{
			'skill.list.main.heading':'Skill',
			'skill.list.main.button1':'Add Skill',
			'skill.list.grid.column1':'SL No',
			'skill.list.grid.column2':'Name',
			'skill.list.grid.column3':'Description',
			'skill.list.grid.delete' : 'Are you sure to delete' 
		},
        'skill.details':{
			'skill.details.main.heading.add':'Add Skill',
			'skill.details.main.heading.update':'Update SKill',
			'skill.details.main.form.name':'Name',
			'skill.details.main.form.description':'Description',
			'skill.details.main.form.parent':'Parent Skill',
			'skill.details.main.button.save':'Save',
			'skill.details.main.button.update':'Update',
			'skill.details.main.form.choose':'Choose',
			'skill.details.main.err.name.required':'Name is required',
			'skill.details.main.err.name.maxLength':'Name should not exceed 100 characters',
			'skill.details.main.err.description.required': 'Description is required',
			'skill.details.main.err.description.maxLength': 'Description should not exceed 1000 characters'
		},
		'role.list':{
			'role.list.main.heading':'Role',
			'role.list.main.button1':'Add Role',
			'role.list.grid.column1':'SL No',
			'role.list.grid.column2':'Name',
			'role.list.grid.column3':'Description',
			'role.list.grid.delete' : 'Are you sure to delete' 
		},
		'role.details':{
			'role.details.main.heading.add':'Add Role',
			'role.details.main.heading.update':'Update Role',
			'role.details.main.form.name':'Name',
			'role.details.main.form.description':'Description',
			'role.details.main.form.parent':'Role Type',
			'role.details.main.button.save':'Save',
			'role.details.main.button.update':'Update',
			'role.details.main.form.choose':'Choose',
			'role.details.main.err.name.required':'Name is required',
			'role.details.main.err.name.maxLength':'Name should not exceed 100 characters',
			'role.details.main.err.description.required': 'Description is required',
			'role.details.main.err.description.maxLength': 'Description should not exceed 1000 characters',
			'role.details.permissions.heading':'Permissions',
			'role.details.permissions.column1':'Permission',
			'role.details.permissions.column2':'Description'
		},
		"location.list": {
			"location.list.grid.column1": "Sl.No",
			"location.list.grid.column2": "Name",
			"location.list.main.button1": "Add",
			"location.list.grid.column3": "Type",
			"location.list.grid.column4": "Parent Location",
			"location.list.main.heading": "Org Location"
		},
		"location.details": {
			"location.details.main.form.country": "Country",
			"location.details.main.form.zipCode": "Zip Code",
			"location.details.main.form.type": "Type",
			"location.details.main.form.email": "Email",
			"location.details.main.button.save": "Save",
			"location.details.main.heading.add": "Add Org Location",
			"location.details.main.form.communicationAddress": "Communication Address",
			"location.details.main.form.phone": "Phone",
			"location.details.main.form.name": "Name",
			"location.details.main.err.name.required": "Name is required",
			"location.details.main.form.businessAddress": "Business Address",
			"location.details.spoc.heading": "SPOC Details",
			"location.details.main.form.city": "City",
			"location.details.main.form.parentLocation": "Parent Location",
			"location.details.spoc.contactEmail": "Contact Email",
			"location.details.main.err.type.required": "Type is required",
			"location.details.spoc.contactName": "Contact Name",
			"location.details.main.button.update": "Update",
			"location.details.spoc.contactPhone": "Contact Phone",
			"location.details.main.heading.update": "Update Org Location",
			"location.details.main.form.state": "State",
			"location.details.main.form.alternatePhone": "Alternate Phone",
			"location.details.spoc.err.contactEmail.error": "Email must be a valid email address"
		},
		"sub.location.list": {
			"sub.location.list.grid.column1": "Sub-Location",
			"sub.location.list.grid.column2": "Description",
			"sub.location.list.main.button1": "Add Sub Location"
		},
		"sub.location.details": {
			"sub.location.details.spoc.contactPhone": "Contact Phone",
			"sub.location.details.main.err.name.required": "Name is required",
			"sub.location.details.main.form.phone": "Phone",
			"sub.location.details.spoc.heading": "SPOC Details",
			"sub.location.details.main.form.name": "Name",
			"sub.location.details.main.form.communicationAddress": "Communication Address",
			"sub.location.details.spoc.err.contactEmail.error": "Email must be a valid email address",
			"sub.location.details.main.button.update": "Update",
			"sub.location.details.main.form.description": "Description",
			"sub.location.details.main.form.businessAddress": "Business Address",
			"sub.location.details.main.form.zipCode": "Zip Code",
			"sub.location.details.main.err.type.required": "Type is required",
			"sub.location.details.main.form.type": "Type",
			"sub.location.details.main.form.alternatePhone": "Alternate Phone",
			"sub.location.details.main.heading.add": "Add Sub Location",
			"sub.location.details.main.form.state": "State",
			"sub.location.details.main.form.email": "Email",
			"sub.location.details.main.heading.update": "Update Sub Location",
			"sub.location.details.spoc.contactName": "Contact Name",
			"sub.location.details.main.form.city": "City",
			"sub.location.details.spoc.contactEmail": "Contact Email",
			"sub.location.details.main.button.save": "Save",
			"sub.location.details.main.form.country": "Country"
		},
		'bp.list': {
			'bp.list.main.heading': 'Business Process',
			'bp.list.grid.column1': 'Sl.No',
			'bp.list.grid.column2': 'Bp Name',
			'bp.list.grid.column3': 'Description',
			'bp.list.grid.column4': 'Status',
			'bp.list.grid.column5': 'Action',
			'bp.list.grid.column6': 'City',
			'bp.list.grid.column7': 'Name',
			'bp.list.main.button1': 'Add',
			'bp.list.main.button2': 'Add'
		},
		'bp.details': {
			'bp.details.main.heading.add': 'Add Business Process',
			'bp.details.main.heading.update': 'Update Business Process',
			'bp.details.main.button.save': 'Save',
			'bp.details.main.button.update': 'Update',
			'bp.details.main.column1': 'Name',
			'bp.details.main.column2': 'Status',
			'bp.details.main.column3': 'Description',
			'bp.details.main.column4': 'Part',
			'bp.details.main.column5': 'Part Label',
			'bp.details.main.column6': 'Display Order',
			'bp.details.main.column7': 'Auto Schedule',
			'bp.details.main.column8': 'Location Mandatory',
			'bp.details.main.column9': 'Duration',
			'bp.details.main.column10': 'Image URL',
			'bp.details.main.column11': 'Attachments',
			'bp.details.main.column12': 'Max Attachments',
			'bp.details.main.column13': 'Auto Close',
			'bp.details.main.column14': 'Auto Close Days',
			'bp.details.main.column15': 'Auto Archive',
			'bp.details.main.column16': 'Auto Archive Day',
			'bp.details.main.column17': 'Alternate Phone',
			'bp.details.main.column18': 'Profile URL',
			'bp.details.main.column19': 'Joining Date',
			'bp.details.main.column20': 'Confirm.Date',
			'bp.details.main.button.config.attribute': 'Config Attributes',
			'bp.details.main.button.config..part.attribute': 'Config Part Attributes',
			'bp.details.main.button.task': 'Add Task',
		}
	};

	errorHandler(errorObj: HttpErrorResponse) {
		//return Observable.throwError(error.message || "Server Error");
		if (errorObj.status) {
			alert(errorObj.error.errorMessage);
		} else {
			alert('Server Error');
		}
		return throwError(errorObj.error.message || 'Server Error');
	}
}
