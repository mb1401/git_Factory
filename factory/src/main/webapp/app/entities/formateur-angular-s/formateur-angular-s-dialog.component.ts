import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FormateurAngularS } from './formateur-angular-s.model';
import { FormateurAngularSPopupService } from './formateur-angular-s-popup.service';
import { FormateurAngularSService } from './formateur-angular-s.service';
import { MatiereAngularS, MatiereAngularSService } from '../matiere-angular-s';

@Component({
    selector: 'jhi-formateur-angular-s-dialog',
    templateUrl: './formateur-angular-s-dialog.component.html'
})
export class FormateurAngularSDialogComponent implements OnInit {

    formateur: FormateurAngularS;
    isSaving: boolean;

    matieres: MatiereAngularS[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private formateurService: FormateurAngularSService,
        private matiereService: MatiereAngularSService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.matiereService.query()
            .subscribe((res: HttpResponse<MatiereAngularS[]>) => { this.matieres = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.formateur.id !== undefined) {
            this.subscribeToSaveResponse(
                this.formateurService.update(this.formateur));
        } else {
            this.subscribeToSaveResponse(
                this.formateurService.create(this.formateur));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<FormateurAngularS>>) {
        result.subscribe((res: HttpResponse<FormateurAngularS>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: FormateurAngularS) {
        this.eventManager.broadcast({ name: 'formateurListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackMatiereById(index: number, item: MatiereAngularS) {
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
    selector: 'jhi-formateur-angular-s-popup',
    template: ''
})
export class FormateurAngularSPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private formateurPopupService: FormateurAngularSPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.formateurPopupService
                    .open(FormateurAngularSDialogComponent as Component, params['id']);
            } else {
                this.formateurPopupService
                    .open(FormateurAngularSDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
