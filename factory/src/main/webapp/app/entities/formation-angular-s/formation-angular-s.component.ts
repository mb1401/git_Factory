import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FormationAngularS } from './formation-angular-s.model';
import { FormationAngularSService } from './formation-angular-s.service';
import { Principal } from '../../shared';
import {ModuleAngularS, ModuleAngularSService} from '../module-angular-s';
import {StagiaireAngularS, StagiaireAngularSService} from '../stagiaire-angular-s';
import {FormateurAngularS, FormateurAngularSService} from "../formateur-angular-s";
import {GestionnaireAngularS, GestionnaireAngularSService} from "../gestionnaire-angular-s";

@Component({
    selector: 'jhi-formation-angular-s',
    templateUrl: './formation-angular-s.component.html'
})
export class FormationAngularSComponent implements OnInit, OnDestroy {
    formations: FormationAngularS[];
    currentAccount: any;
    eventSubscriber: Subscription;
    private filtre: any;
    nom: any;
    sliderValue = 20;

    constructor(
        private formationService: FormationAngularSService,
        private formateurService: FormateurAngularSService,
        private moduleService: ModuleAngularSService,
        private stagiaireService: StagiaireAngularSService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private gestionnaireService: GestionnaireAngularSService,
        private principal: Principal
    ) {
    }

    loadModules() {
        for (const f of this.formations) {
            // this.moduleService.query().subscribe(
            this.moduleService.findAllWithFormation(f.id).subscribe(
                (resModules: HttpResponse<ModuleAngularS[]>) => {
                    f.modules = resModules.body;
                },
                (resModules: HttpErrorResponse) => this.onError(resModules.message)
            );
        }
    }

    loadStagiaire() {
    for (const f of this.formations) {
        this.stagiaireService.findAllwithFormation(f.id).subscribe(
            (res: HttpResponse<StagiaireAngularS[]>) => {
                f.stagiaires = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
            );
        }
    }

    loadFormateur () {
        for (const f of this.formations) {
            this.formateurService.find(f.formateurId).subscribe(
                (resF: HttpResponse<FormateurAngularS>) => {
                    f.formateur =  resF.body;
                },
                (resF: HttpErrorResponse) => this.onError(resF.message)
            );
        }
    }

    loadGestionnaire() {
        for (const f of this.formations) {
            this.gestionnaireService.find(f.gestionnaireId).subscribe(
                (resF: HttpResponse<GestionnaireAngularS>) => {
                    f.gestionnaire =  resF.body;
                },
                (resF: HttpErrorResponse) => this.onError(resF.message)
            );
        }
    }

    loadAll() {
        this.formationService.query().subscribe(
            (res: HttpResponse<FormationAngularS[]>) => {
                this.formations = res.body;
                this.loadModules();
                this.loadStagiaire();
                this.loadFormateur();
                this.loadGestionnaire();
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
