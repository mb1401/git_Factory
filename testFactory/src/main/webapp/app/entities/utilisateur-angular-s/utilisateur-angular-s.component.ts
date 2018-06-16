import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { UtilisateurAngularS } from './utilisateur-angular-s.model';
import { UtilisateurAngularSService } from './utilisateur-angular-s.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-utilisateur-angular-s',
    templateUrl: './utilisateur-angular-s.component.html'
})
export class UtilisateurAngularSComponent implements OnInit, OnDestroy {
utilisateurs: UtilisateurAngularS[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private utilisateurService: UtilisateurAngularSService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.utilisateurService.query().subscribe(
            (res: HttpResponse<UtilisateurAngularS[]>) => {
                this.utilisateurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInUtilisateurs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: UtilisateurAngularS) {
        return item.id;
    }
    registerChangeInUtilisateurs() {
        this.eventSubscriber = this.eventManager.subscribe('utilisateurListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
