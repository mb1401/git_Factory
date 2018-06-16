import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { OrdinateurAngularS } from './ordinateur-angular-s.model';
import { OrdinateurAngularSService } from './ordinateur-angular-s.service';

@Component({
    selector: 'jhi-ordinateur-angular-s-detail',
    templateUrl: './ordinateur-angular-s-detail.component.html'
})
export class OrdinateurAngularSDetailComponent implements OnInit, OnDestroy {

    ordinateur: OrdinateurAngularS;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ordinateurService: OrdinateurAngularSService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInOrdinateurs();
    }

    load(id) {
        this.ordinateurService.find(id)
            .subscribe((ordinateurResponse: HttpResponse<OrdinateurAngularS>) => {
                this.ordinateur = ordinateurResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInOrdinateurs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ordinateurListModification',
            (response) => this.load(this.ordinateur.id)
        );
    }
}
