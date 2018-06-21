import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FormateurAngularS } from './formateur-angular-s.model';
import { FormateurAngularSService } from './formateur-angular-s.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-formateur-angular-s',
    templateUrl: './formateur-angular-s.component.html'
})
export class FormateurAngularSComponent implements OnInit, OnDestroy {
formateurs: FormateurAngularS[];
    currentAccount: any;
    eventSubscriber: Subscription;
    private filtre= '';

    constructor(
        private formateurService: FormateurAngularSService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }
    // filter
    public filtrer() {
        return this.formateurs.filter((c) =>
            c.nom.toLowerCase().indexOf(this.filtre.toLowerCase()) !== -1
        );
    }

    loadAll() {
        this.formateurService.query().subscribe(
            (res: HttpResponse<FormateurAngularS[]>) => {
                this.formateurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInFormateurs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: FormateurAngularS) {
        return item.id;
    }
    registerChangeInFormateurs() {
        this.eventSubscriber = this.eventManager.subscribe('formateurListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
