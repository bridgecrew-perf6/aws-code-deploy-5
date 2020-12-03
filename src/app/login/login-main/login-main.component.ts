import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { SharedService } from '../../services/shared-service.service';
import { InternationalizationService } from '../../services/internationalization.service';

@Component({
	selector: 'app-login-main',
	templateUrl: './login-main.component.html',
	styleUrls: [ './login-main.component.css' ]
})
export class LoginMainComponent implements OnInit {
	constructor(
		private loginService: LoginService,
		private internationalizationService: InternationalizationService,
		private router: Router,
		private route: ActivatedRoute,
		private SharedService: SharedService
	) {}

	loginObj: any = {
		email: '',
		password: ''
	};

	loadIndicatorVisible: boolean = false;

	ngOnInit(): void {
		this.loginObj = {
			username: '',
			password: ''
		};
	}

	errorMsg: String = '';
	authenticate() {
		this.loadIndicatorVisible = true;
		let obs = this.loginService.login(this.loginObj);
		return obs
			.toPromise()
			.then((data: any) => {
				this.loadIndicatorVisible = false;
				console.log('Token ********** ', data.token);
				sessionStorage.setItem('jwtToken', data.token);

				this.loginService.getDefaultUser().subscribe((res) => {
					var user = JSON.stringify(res);
					this.SharedService.setUser(user);
					let userObj = JSON.parse(user);
					sessionStorage.setItem('userDetails', user);
					if (userObj['usrLangPref'] !== 'English') {
						this.internationalizationService.getLables().subscribe((res) => {
							var interObj = JSON.stringify(res);
							sessionStorage.setItem('internationalization', interObj);
							this.router.navigate([ 'admin' ]);
						});
					}
					else
					{
						this.router.navigate([ 'admin' ]);
					}
				});
			})
			.catch((error: any) => {
				this.loadIndicatorVisible = false;
				this.errorMsg = 'Login Failed';
				if (error == 'Unauthorized') {
					this.errorMsg = 'Login Failed. You have entered an invalid username or password';
				}
			});
	}
}
