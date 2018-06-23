import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StagiaireAngularS } from './stagiaire-angular-s.model';
import { StagiaireAngularSService } from './stagiaire-angular-s.service';
import { Principal } from '../../shared';
import {FormationAngularS, FormationAngularSService} from '../formation-angular-s';
import {FormateurAngularS} from '../formateur-angular-s';
import {MatiereAngularS} from '../matiere-angular-s';
import {OrdinateurAngularS, OrdinateurAngularSService} from '../ordinateur-angular-s';

@Component({
    selector: 'jhi-stagiaire-angular-s',
    templateUrl: './stagiaire-angular-s.component.html'
})
export class StagiaireAngularSComponent implements OnInit, OnDestroy {
    stagiaires: StagiaireAngularS[];
    currentAccount: any;
    eventSubscriber: Subscription;
    private filtre: any;
    nom: any;
    sliderValue = 20;

    constructor(
        private stagiaireService: StagiaireAngularSService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private formationService: FormationAngularSService,
        private ordinateurService: OrdinateurAngularSService,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.stagiaireService.query().subscribe(
            (res: HttpResponse<StagiaireAngularS[]>) => {
                this.stagiaires = res.body;
                for (const s of this.stagiaires) {
                    this.ordinateurService.find(s.ordinateurId).subscribe(
                        (resM: HttpResponse<OrdinateurAngularS>) => {
                            s.ordinateur =  resM.body;
                        },
                        (resM: HttpErrorResponse) => this.onError(resM.message)
                    );

                    this.formationService.find(s.formationId).subscribe(
                        (resF: HttpResponse<FormationAngularS>) => {
                            s.formation =  resF.body;
                        },
                        (resF: HttpErrorResponse) => this.onError(resF.message)
                    );
                }
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
