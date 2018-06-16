import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TechnicienAngularS } from './technicien-angular-s.model';
import { TechnicienAngularSService } from './technicien-angular-s.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-technicien-angular-s',
    templateUrl: './technicien-angular-s.component.html'
})
export class TechnicienAngularSComponent implements OnInit, OnDestroy {
techniciens: TechnicienAngularS[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private technicienService: TechnicienAngularSService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.technicienService.query().subscribe(
            (res: HttpResponse<TechnicienAngularS[]>) => {
                this.techniciens = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInTechniciens();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: TechnicienAngularS) {
        return item.id;
    }
    registerChangeInTechniciens() {
        this.eventSubscriber = this.eventManager.subscribe('technicienListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
