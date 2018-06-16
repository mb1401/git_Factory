import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StagiaireAngularS } from './stagiaire-angular-s.model';
import { StagiaireAngularSService } from './stagiaire-angular-s.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-stagiaire-angular-s',
    templateUrl: './stagiaire-angular-s.component.html'
})
export class StagiaireAngularSComponent implements OnInit, OnDestroy {
stagiaires: StagiaireAngularS[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private stagiaireService: StagiaireAngularSService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.stagiaireService.query().subscribe(
            (res: HttpResponse<StagiaireAngularS[]>) => {
                this.stagiaires = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInStagiaires();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: StagiaireAngularS) {
        return item.id;
    }
    registerChangeInStagiaires() {
        this.eventSubscriber = this.eventManager.subscribe('stagiaireListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
