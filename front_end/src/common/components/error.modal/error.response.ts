export class ErrorResponse {
    constructor(public message: string, public status = 0) {
    }
}

export class CommonErrorResponse {
    constructor(public message: string) {
    }
}