import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
// import { ErrorHandlerModalComponent } from '../components/error.modal/error.handler.modal.component';
// import { ErrorResponse } from '../components/error.modal/error.response';
// import { getRouteUrl, routeConfigs } from '../constants/route.config';
// import { ModalService } from './modal.service';

@Injectable()
export class ApiErrorHandler {

    constructor(private router: Router) {
    }

    public handle(error) {
        if (error.status === 500) {
            // this.showApplicationError(error);
        } else if (error.status === 401) {
            // this.router.navigateByUrl(getRouteUrl(routeConfigs.auth.login));
        }
    }

    // private showApplicationError(error: ErrorResponse) {
    //     this.modalService.show({
    //         component: ErrorHandlerModalComponent,
    //         providers: [{
    //             provide: ErrorResponse,
    //             useValue: error
    //         }]
    //     });
    // }
}
