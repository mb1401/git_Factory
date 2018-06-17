import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ModuleAngularS } from './module-angular-s.model';
import { ModuleAngularSPopupService } from './module-angular-s-popup.service';
import { ModuleAngularSService } from './module-angular-s.service';
import { FormationAngularS, FormationAngularSService } from '../formation-angular-s';
import { FormateurAngularS, FormateurAngularSService } from '../formateur-angular-s';
import { MatiereAngularS, MatiereAngularSService } from '../matiere-angular-s';
import { SalleAngularS, SalleAngularSService } from '../salle-angular-s';
import { VideoProjecteurAngularS, VideoProjecteurAngularSService } from '../video-projecteur-angular-s';

@Component({
    selector: 'jhi-module-angular-s-dialog',
    templateUrl: './module-angular-s-dialog.component.html'
})
export class ModuleAngularSDialogComponent implements OnInit {

    module: ModuleAngularS;
    isSaving: boolean;

    formations: FormationAngularS[];

    formateurs: FormateurAngularS[];

    matieres: MatiereAngularS[];

    salles: SalleAngularS[];

    videoprojecteurs: VideoProjecteurAngularS[];
    dateDebutDp: any;
    dateFinDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private moduleService: ModuleAngularSService,
        private formationService: FormationAngularSService,
        private formateurService: FormateurAngularSService,
        private matiereService: MatiereAngularSService,
        private salleService: SalleAngularSService,
        private videoProjecteurService: VideoProjecteurAngularSService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.formationService.query()
            .subscribe((res: HttpResponse<FormationAngularS[]>) => { this.formations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.formateurService.query()
            .subscribe((res: HttpResponse<FormateurAngularS[]>) => { this.formateurs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.matiereService.query()
            .subscribe((res: HttpResponse<MatiereAngularS[]>) => { this.matieres = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.salleService.query()
            .subscribe((res: HttpResponse<SalleAngularS[]>) => { this.salles = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.videoProjecteurService.query()
            .subscribe((res: HttpResponse<VideoProjecteurAngularS[]>) => { this.videoprojecteurs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.module.id !== undefined) {
            this.subscribeToSaveResponse(
                this.moduleService.update(this.module));
        } else {
            this.subscribeToSaveResponse(
                this.moduleService.create(this.module));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ModuleAngularS>>) {
        result.subscribe((res: HttpResponse<ModuleAngularS>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: ModuleAngularS) {
        this.eventManager.broadcast({ name: 'moduleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackFormationById(index: number, item: FormationAngularS) {
        return item.id;
    }

    trackFormateurById(index: number, item: FormateurAngularS) {
        return item.id;
    }

    trackMatiereById(index: number, item: MatiereAngularS) {
        return item.id;
    }

    trackSalleById(index: number, item: SalleAngularS) {
        return item.id;
    }

    trackVideoProjecteurById(index: number, item: VideoProjecteurAngularS) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-module-angular-s-popup',
    template: ''
})
export class ModuleAngularSPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private modulePopupService: ModuleAngularSPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.modulePopupService
                    .open(ModuleAngularSDialogComponent as Component, params['id']);
            } else {
                this.modulePopupService
                    .open(ModuleAngularSDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
