import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { GestionnaireAngularS } from './gestionnaire-angular-s.model';
import { GestionnaireAngularSService } from './gestionnaire-angular-s.service';

@Component({
    selector: 'jhi-gestionnaire-angular-s-detail',
    templateUrl: './gestionnaire-angular-s-detail.component.html'
})
export class GestionnaireAngularSDetailComponent implements OnInit, OnDestroy {

    gestionnaire: GestionnaireAngularS;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private gestionnaireService: GestionnaireAngularSService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInGestionnaires();
    }

    load(id) {
        this.gestionnaireService.find(id)
            .subscribe((gestionnaireResponse: HttpResponse<GestionnaireAngularS>) => {
                this.gestionnaire = gestionnaireResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInGestionnaires() {
        this.eventSubscriber = this.eventManager.subscribe(
            'gestionnaireListModification',
            (response) => this.load(this.gestionnaire.id)
        );
    }
}
