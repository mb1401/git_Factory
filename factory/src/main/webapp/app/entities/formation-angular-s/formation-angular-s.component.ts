import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FormationAngularS } from './formation-angular-s.model';
import { FormationAngularSService } from './formation-angular-s.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-formation-angular-s',
    templateUrl: './formation-angular-s.component.html'
})
export class FormationAngularSComponent implements OnInit, OnDestroy {
formations: FormationAngularS[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private formationService: FormationAngularSService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.formationService.query().subscribe(
            (res: HttpResponse<FormationAngularS[]>) => {
                this.formations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFormations();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FormationAngularS) {
        return item.id;
    }
    registerChangeInFormations() {
        this.eventSubscriber = this.eventManager.subscribe('formationListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
