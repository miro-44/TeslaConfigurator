import { Directive, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

@Directive({})
export class AutoUnsubAdapter implements OnDestroy {
    protected subs: Subscription = new Subscription();

    ngOnDestroy(): void {
        this.subs.unsubscribe();
    }
}
