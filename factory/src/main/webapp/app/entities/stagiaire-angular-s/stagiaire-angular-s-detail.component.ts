import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import { StagiaireAngularS } from './stagiaire-angular-s.model';
import { StagiaireAngularSService } from './stagiaire-angular-s.service';
import {FormationAngularS, FormationAngularSService} from "../formation-angular-s";
import {FormateurAngularS} from "../formateur-angular-s";
import {MatiereAngularS} from "../matiere-angular-s";
import {OrdinateurAngularS, OrdinateurAngularSService} from "../ordinateur-angular-s";

@Component({
    selector: 'jhi-stagiaire-angular-s-detail',
    templateUrl: './stagiaire-angular-s-detail.component.html'
})
export class StagiaireAngularSDetailComponent implements OnInit, OnDestroy {

    stagiaire: StagiaireAngularS;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private stagiaireService: StagiaireAngularSService,
        private jhiAlertService: JhiAlertService,
        private route: ActivatedRoute,
        private ordinateurService: OrdinateurAngularSService,
        private formationService: FormationAngularSService
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStagiaires();
    }

    load(id) {
        this.stagiaireService.find(id)
            .subscribe((stagiaireResponse: HttpResponse<StagiaireAngularS>) => {
                this.stagiaire = stagiaireResponse.body;
                this.loadAll();
            });
    }

    loadAll() {
        {
            this.formationService.find(this.stagiaire.formationId).subscribe(
                (resF: HttpResponse<FormationAngularS>) => {
                    this.stagiaire.formation = resF.body;
                },
                (resF: HttpErrorResponse) => this.onError(resF.message)
            );
            this.ordinateurService.find(this.stagiaire.ordinateurId).subscribe(
                (resV: HttpResponse<OrdinateurAngularS>) => {
                    this.stagiaire.ordinateur = resV.body;
                },
                (resV: HttpErrorResponse) => this.onError(resV.message)
            );
        }

    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    registerChangeInStagiaires() {
        this.eventSubscriber = this.eventManager.subscribe(
            'stagiaireListModification',
            (response) => this.load(this.stagiaire.id)
        );
    }
}
