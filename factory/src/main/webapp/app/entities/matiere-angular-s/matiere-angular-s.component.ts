import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MatiereAngularS } from './matiere-angular-s.model';
import { MatiereAngularSService } from './matiere-angular-s.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-matiere-angular-s',
    templateUrl: './matiere-angular-s.component.html'
})
export class MatiereAngularSComponent implements OnInit, OnDestroy {
matieres: MatiereAngularS[];
    currentAccount: any;
    eventSubscriber: Subscription;
    private filtre: any;
    nom: any;
    sliderValue = 20;

    constructor(
        private matiereService: MatiereAngularSService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.matiereService.query().subscribe(
            (res: HttpResponse<MatiereAngularS[]>) => {
                this.matieres = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInMatieres();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: MatiereAngularS) {
        return item.id;
    }
    registerChangeInMatieres() {
        this.eventSubscriber = this.eventManager.subscribe('matiereListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
