import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
//import { CommonErrorResponse } from '../error.response';

@Component({
    templateUrl: './common.error.handler.modal.component.html',
    styleUrls: ['./common.error.handler.modal.component.scss']
})
export class CommonErrorHandlerModalComponent {
    constructor(private modalRef: MatDialogRef<CommonErrorHandlerModalComponent>) {
        //super();
    }

    public close(): void {
        this.modalRef.close();
    }
}
