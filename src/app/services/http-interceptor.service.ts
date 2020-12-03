import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, finalize, tap, timeout } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { SharedService } from './shared-service.service';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  private pendingRequestCount = 0;
  constructor(private sharedService: SharedService, private router: Router,
    private route: ActivatedRoute) { }
  /**
   * intercept all XHR request
   * @param request
   * @param next
   * @returns {Observable<A>}
   */

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    request = request.clone({
      setHeaders: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
    
    if (sessionStorage.getItem('jwtToken')) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + sessionStorage.getItem('jwtToken'),
          'Content-Security-Policy': 'upgrade-insecure-requests',
        }
      });
    }
    if (this.shouldTrackRequest(request)) {
      this.sharedService.changeGlobalSpinnerState(true);
      this.pendingRequestCount++;
    }

    return next.handle(request)./*pipe(timeout(10000)).*/pipe(tap((event: HttpEvent<any>) => {
      console.log(event);
      if (event instanceof HttpResponse) {
        this.handlePendingRequestCompletion(request);
      }
    }, (err: any) => {
      console.log(err);
      this.handlePendingRequestCompletion(request);
    })).pipe(catchError((errorObj, caught) => {
      if (errorObj && errorObj.name === 'TimeoutError') {
      }
      this.handleAuthError(errorObj);
      return throwError(errorObj.error.message || 'Server Error');
    }) as any);

  }

  private shouldTrackRequest(request: HttpRequest<any>) {
    return !(request.url.toLowerCase().indexOf('filters-on-change') > 0 || request.url.toLowerCase().indexOf('/user/filters') > 0);
  }

  private handlePendingRequestCompletion(request: HttpRequest<any>) {
    if (this.shouldTrackRequest(request)) {
      this.pendingRequestCount--;
      console.log('Pending requests: ' + this.pendingRequestCount);
      if (this.pendingRequestCount === 0) {
        this.sharedService.changeGlobalSpinnerState(false);
      }
    }
  }

  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    // handle your auth error or rethrow
    if (err.status === 401) {
      // navigate /delete cookies or whatever
      localStorage.clear();
      sessionStorage.clear();
      // this.redirectTo();
      this.router.navigate(['login']);
    }
    throw err;
  }
  private redirectTo() {
    const urlThis = window.location.href;
    const isLocalHost = urlThis.startsWith('http://localhost:');
    if (!isLocalHost) {
      window.location.replace('../login.html');
    }
    // window.location.replace("../login.html");
  }
}

