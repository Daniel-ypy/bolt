import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { BaseComponent } from '../base.component';
import { ErrorResponse } from './error.response';

@Component({
    templateUrl: './error.handler.modal.component.html',
    styleUrls: ['./error.handler.modal.component.scss']
})
export class ErrorHandlerModalComponent extends BaseComponent {
    constructor(private modalRef: MatDialogRef<ErrorHandlerModalComponent>,
                public errorResponse: ErrorResponse) {
        super();
    }

    public close(): void {
        this.modalRef.close();
    }
}
