import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';
import { SalleAngularS } from './salle-angular-s.model';
import { SalleAngularSService } from './salle-angular-s.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-salle-angular-s',
    templateUrl: './salle-angular-s.component.html',
})
export class SalleAngularSComponent implements OnInit, OnDestroy {
salles: SalleAngularS[];
    currentAccount: any;
    eventSubscriber: Subscription;
    private filtre: any;
    nom: any;
    sliderValue = 20;

    constructor(
        private salleService: SalleAngularSService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }
    loadAll() {
        this.salleService.query().subscribe(
            (res: HttpResponse<SalleAngularS[]>) => {
                this.salles = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInSalles();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: SalleAngularS) {
        return item.id;
    }
    registerChangeInSalles() {
        this.eventSubscriber = this.eventManager.subscribe('salleListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
