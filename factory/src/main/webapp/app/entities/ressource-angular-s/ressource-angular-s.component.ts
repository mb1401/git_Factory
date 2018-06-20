import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RessourceAngularS } from './ressource-angular-s.model';
import { RessourceAngularSService } from './ressource-angular-s.service';
import { Principal } from '../../shared';
@Component({
    selector: 'jhi-ressource-angular-s',
    templateUrl: './ressource-angular-s.component.html'
})
export class RessourceAngularSComponent implements OnInit, OnDestroy {
ressources: RessourceAngularS[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ressourceService: RessourceAngularSService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ressourceService.query().subscribe(
            (res: HttpResponse<RessourceAngularS[]>) => {
                this.ressources = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInRessources();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: RessourceAngularS) {
        return item.id;
    }
    registerChangeInRessources() {
        this.eventSubscriber = this.eventManager.subscribe('ressourceListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
