import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { TechnicienAngularS } from './technicien-angular-s.model';
import { TechnicienAngularSService } from './technicien-angular-s.service';

@Component({
    selector: 'jhi-technicien-angular-s-detail',
    templateUrl: './technicien-angular-s-detail.component.html'
})
export class TechnicienAngularSDetailComponent implements OnInit, OnDestroy {

    technicien: TechnicienAngularS;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private technicienService: TechnicienAngularSService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInTechniciens();
    }

    load(id) {
        this.technicienService.find(id)
            .subscribe((technicienResponse: HttpResponse<TechnicienAngularS>) => {
                this.technicien = technicienResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInTechniciens() {
        this.eventSubscriber = this.eventManager.subscribe(
            'technicienListModification',
            (response) => this.load(this.technicien.id)
        );
    }
}
