import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StagiaireAngularS } from './stagiaire-angular-s.model';
import { StagiaireAngularSPopupService } from './stagiaire-angular-s-popup.service';
import { StagiaireAngularSService } from './stagiaire-angular-s.service';
import { FormationAngularS, FormationAngularSService } from '../formation-angular-s';
import { OrdinateurAngularS, OrdinateurAngularSService } from '../ordinateur-angular-s';

@Component({
    selector: 'jhi-stagiaire-angular-s-dialog',
    templateUrl: './stagiaire-angular-s-dialog.component.html'
})
export class StagiaireAngularSDialogComponent implements OnInit {

    stagiaire: StagiaireAngularS;
    isSaving: boolean;

    formations: FormationAngularS[];

    ordinateurs: OrdinateurAngularS[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private stagiaireService: StagiaireAngularSService,
        private formationService: FormationAngularSService,
        private ordinateurService: OrdinateurAngularSService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.formationService.query()
            .subscribe((res: HttpResponse<FormationAngularS[]>) => { this.formations = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.ordinateurService.query()
            .subscribe((res: HttpResponse<OrdinateurAngularS[]>) => { this.ordinateurs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.stagiaire.id !== undefined) {
            this.subscribeToSaveResponse(
                this.stagiaireService.update(this.stagiaire));
        } else {
            this.subscribeToSaveResponse(
                this.stagiaireService.create(this.stagiaire));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<StagiaireAngularS>>) {
        result.subscribe((res: HttpResponse<StagiaireAngularS>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: StagiaireAngularS) {
        this.eventManager.broadcast({ name: 'stagiaireListModification', content: 'OK'});
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

    trackOrdinateurById(index: number, item: OrdinateurAngularS) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-stagiaire-angular-s-popup',
    template: ''
})
export class StagiaireAngularSPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stagiairePopupService: StagiaireAngularSPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.stagiairePopupService
                    .open(StagiaireAngularSDialogComponent as Component, params['id']);
            } else {
                this.stagiairePopupService
                    .open(StagiaireAngularSDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
