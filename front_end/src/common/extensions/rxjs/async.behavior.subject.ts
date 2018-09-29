import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export class AsyncBehaviorSubject<T> extends BehaviorSubject<T> {
    constructor(defaultValue: T) {
        super(defaultValue);
    }

    public next(value: T): void {
        setTimeout(() => super.next(value), 0);
    }
}
