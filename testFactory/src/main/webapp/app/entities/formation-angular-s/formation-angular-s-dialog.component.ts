import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FormationAngularS } from './formation-angular-s.model';
import { FormationAngularSPopupService } from './formation-angular-s-popup.service';
import { FormationAngularSService } from './formation-angular-s.service';
import { FormateurAngularS, FormateurAngularSService } from '../formateur-angular-s';
import { GestionnaireAngularS, GestionnaireAngularSService } from '../gestionnaire-angular-s';

@Component({
    selector: 'jhi-formation-angular-s-dialog',
    templateUrl: './formation-angular-s-dialog.component.html'
})
export class FormationAngularSDialogComponent implements OnInit {

    formation: FormationAngularS;
    isSaving: boolean;

    formateurs: FormateurAngularS[];

    gestionnaires: GestionnaireAngularS[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private formationService: FormationAngularSService,
        private formateurService: FormateurAngularSService,
        private gestionnaireService: GestionnaireAngularSService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.formateurService.query()
            .subscribe((res: HttpResponse<FormateurAngularS[]>) => { this.formateurs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.gestionnaireService.query()
            .subscribe((res: HttpResponse<GestionnaireAngularS[]>) => { this.gestionnaires = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.formation.id !== undefined) {
            this.subscribeToSaveResponse(
                this.formationService.update(this.formation));
        } else {
            this.subscribeToSaveResponse(
                this.formationService.create(this.formation));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FormationAngularS>>) {
        result.subscribe((res: HttpResponse<FormationAngularS>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FormationAngularS) {
        this.eventManager.broadcast({ name: 'formationListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackFormateurById(index: number, item: FormateurAngularS) {
        return item.id;
    }

    trackGestionnaireById(index: number, item: GestionnaireAngularS) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-formation-angular-s-popup',
    template: ''
})
export class FormationAngularSPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private formationPopupService: FormationAngularSPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.formationPopupService
                    .open(FormationAngularSDialogComponent as Component, params['id']);
            } else {
                this.formationPopupService
                    .open(FormationAngularSDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
