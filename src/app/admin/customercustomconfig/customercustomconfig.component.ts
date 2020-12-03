import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomercustomconfigService } from 'src/app/services/customercustomconfig.service';

@Component({
	selector: 'app-customercustomconfig',
	templateUrl: './customercustomconfig.component.html',
	styleUrls: [ './customercustomconfig.component.css' ]
})
export class CustomercustomconfigComponent implements OnInit {
	constructor(
		private customerCustomConfigService: CustomercustomconfigService,
		private route: ActivatedRoute,
		private router: Router,
		private cd: ChangeDetectorRef
	) {}

  customerCustomConfigData: any = [];
  customerConfigCols: any = [];
	ngOnInit(): void {
		this.customerCustomConfigService.getCustomerCustomAttributes().subscribe((res) => {
      let responseArray: any = [];
      responseArray = res;
      responseArray.sort((a,b) => (a.occDisplayOrder > b.occDisplayOrder) ? 1 : ((b.occDisplayOrder > a.occDisplayOrder) ? -1 : 0));
      this.customerCustomConfigData = responseArray;
      this.customerCustomConfigData.forEach(element => {
        if (element['status'] = true) {
          element['enable'] = 'Enabled';
        } else {
          element['enable'] = 'Disabled';
        }
      });
      this.customerConfigCols = [
        { field: 'occName', header: 'Attribute Name', link: true },
        { field: 'occFieldType', header: 'Type', link: false },
        { field: 'occDisplayOrder', header: 'Display Order', link: false },
        { field: 'enable', header: 'Status', link: false },
      ];
    });
  }
  selectionChanged(eventValue){
    console.log(eventValue);
    this.router.navigate([ '/admin/customer-attribute-config/' + eventValue.id ]);
  }
}
