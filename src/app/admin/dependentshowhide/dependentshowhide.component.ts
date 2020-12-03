import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DependentshowhideService } from 'src/app/services/dependentshowhide.service';

@Component({
	selector: 'app-dependentshowhide',
	templateUrl: './dependentshowhide.component.html',
	styleUrls: [ './dependentshowhide.component.css' ]
})
export class DependentshowhideComponent implements OnInit {
	constructor( private dependentshowhideService : DependentshowhideService,private route: ActivatedRoute,
		private router: Router) {}

	showhideGridData: any = [];
	showhideGridCols: any = [
		{ field: 'ddcModule', header: 'Type', link: false },
		{ field: 'ddcParentAttrb', header: 'Parent Attribute', link: false },
		{ field: 'ddcChildAttrb', header: 'Child Attribute', link: false },
		{ field: 'ddcParentValue', header: 'Parent Value', link: false },
	];
	ngOnInit(): void {
		this.dependentshowhideService.getDependentDisplayForOrg('CUSTOMER').subscribe((res) => {
			console.log(res);
			this.showhideGridData = res;
		});
	}

	selectionChanged(event) {}

	editClicked(event) {
		this.router.navigate(['/admin/customer-dependent-show-hide/'+event.id]);
	}
}
