import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { GestionnaireAngularS } from './gestionnaire-angular-s.model';
import { GestionnaireAngularSService } from './gestionnaire-angular-s.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-gestionnaire-angular-s',
    templateUrl: './gestionnaire-angular-s.component.html'
})
export class GestionnaireAngularSComponent implements OnInit, OnDestroy {
gestionnaires: GestionnaireAngularS[];
    currentAccount: any;
    eventSubscriber: Subscription;
    private filtre= '';

    constructor(
        private gestionnaireService: GestionnaireAngularSService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }
    public filtrer() {
        return this.gestionnaires.filter((c) =>
            c.nom.toLowerCase().indexOf(this.filtre.toLowerCase()) !== -1
        );
    }

    loadAll() {
        this.gestionnaireService.query().subscribe(
            (res: HttpResponse<GestionnaireAngularS[]>) => {
                this.gestionnaires = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInGestionnaires();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: GestionnaireAngularS) {
        return item.id;
    }
    registerChangeInGestionnaires() {
        this.eventSubscriber = this.eventManager.subscribe('gestionnaireListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
