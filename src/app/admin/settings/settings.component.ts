import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-settings',
	templateUrl: './settings.component.html',
	styleUrls: [ './settings.component.css' ]
})
export class SettingsComponent implements OnInit {
	constructor(private route: ActivatedRoute, private router: Router) {}

	ngOnInit(): void {}

	redirect(route) {
    console.log(route);
    this.router.navigate(['/admin/'+ route ]);
  }
}
