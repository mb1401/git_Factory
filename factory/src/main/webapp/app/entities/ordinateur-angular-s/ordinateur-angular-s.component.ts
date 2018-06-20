import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { OrdinateurAngularS } from './ordinateur-angular-s.model';
import { OrdinateurAngularSService } from './ordinateur-angular-s.service';
import { Principal } from '../../shared/index';

@Component({
    selector: 'jhi-ordinateur-angular-s',
    templateUrl: './ordinateur-angular-s.component.html'
})
export class OrdinateurAngularSComponent implements OnInit, OnDestroy {
ordinateurs: OrdinateurAngularS[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ordinateurService: OrdinateurAngularSService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ordinateurService.query().subscribe(
            (res: HttpResponse<OrdinateurAngularS[]>) => {
                this.ordinateurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOrdinateurs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: OrdinateurAngularS) {
        return item.id;
    }
    registerChangeInOrdinateurs() {
        this.eventSubscriber = this.eventManager.subscribe('ordinateurListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
