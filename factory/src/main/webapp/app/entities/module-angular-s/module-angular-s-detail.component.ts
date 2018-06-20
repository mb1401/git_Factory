import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';

import { ModuleAngularS } from './module-angular-s.model';
import { ModuleAngularSService } from './module-angular-s.service';
import {MatiereAngularS, MatiereAngularSService} from '../matiere-angular-s';
import {FormateurAngularS, FormateurAngularSService} from '../formateur-angular-s';
import {FormationAngularS, FormationAngularSService} from '../formation-angular-s';
import {VideoProjecteurAngularSService} from '../video-projecteur-angular-s';
import {SalleAngularSService} from '../salle-angular-s';

@Component({
    selector: 'jhi-module-angular-s-detail',
    templateUrl: './module-angular-s-detail.component.html'
})
export class ModuleAngularSDetailComponent implements OnInit, OnDestroy {

    private  module: ModuleAngularS;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private jhiAlertService: JhiAlertService,
        private moduleService: ModuleAngularSService,
        private route: ActivatedRoute,
        private formationService: FormationAngularSService,
        private videoProjecteurService: VideoProjecteurAngularSService,
        private salleService: SalleAngularSService,
        private formateurService: FormateurAngularSService,
        private matiereService: MatiereAngularSService
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInModules();
    }

    load(id) {
        this.moduleService.find(id)
            .subscribe((moduleResponse: HttpResponse<ModuleAngularS>) => {
                this.module = moduleResponse.body;
                this.loadAll();
            });
    }
    loadAll() {
        {
            this.formateurService.find(this.module.formateurId).subscribe(
                (resF: HttpResponse<FormateurAngularS>) => {
                    this.module.formateur = resF.body;
                },
                (resF: HttpErrorResponse) => this.onError(resF.message)
            );

            this.matiereService.find(this.module.matiereId).subscribe(
                (resM: HttpResponse<MatiereAngularS>) => {
                    this.module.matiere = resM.body;
                },
                (resM: HttpErrorResponse) => this.onError(resM.message)
            );

            this.salleService.find(this.module.salleId).subscribe(
                (resS: HttpResponse<MatiereAngularS>) => {
                    this.module.salle = resS.body;
                },
                (resS: HttpErrorResponse) => this.onError(resS.message)
            );

            this.formationService.find(this.module.formationId).subscribe(
                (resF: HttpResponse<FormationAngularS>) => {
                    this.module.formation = resF.body;
                },
                (resF: HttpErrorResponse) => this.onError(resF.message)
            );
            this.videoProjecteurService.find(this.module.videoProjecteurId).subscribe(
                (resV: HttpResponse<MatiereAngularS>) => {
                    this.module.videoProjecteur = resV.body;
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

    registerChangeInModules() {
        this.eventSubscriber = this.eventManager.subscribe(
            'moduleListModification',
            (response) => this.load(this.module.id)
        );
    }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
