import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MatiereAngularS } from './matiere-angular-s.model';
import { MatiereAngularSPopupService } from './matiere-angular-s-popup.service';
import { MatiereAngularSService } from './matiere-angular-s.service';
import { FormateurAngularS, FormateurAngularSService } from '../formateur-angular-s';

@Component({
    selector: 'jhi-matiere-angular-s-dialog',
    templateUrl: './matiere-angular-s-dialog.component.html'
})
export class MatiereAngularSDialogComponent implements OnInit {

    matiere: MatiereAngularS;
    isSaving: boolean;

    formateurs: FormateurAngularS[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private matiereService: MatiereAngularSService,
        private formateurService: FormateurAngularSService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.formateurService.query()
            .subscribe((res: HttpResponse<FormateurAngularS[]>) => { this.formateurs = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.matiere.id !== undefined) {
            this.subscribeToSaveResponse(
                this.matiereService.update(this.matiere));
        } else {
            this.subscribeToSaveResponse(
                this.matiereService.create(this.matiere));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<MatiereAngularS>>) {
        result.subscribe((res: HttpResponse<MatiereAngularS>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: MatiereAngularS) {
        this.eventManager.broadcast({ name: 'matiereListModification', content: 'OK'});
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
    selector: 'jhi-matiere-angular-s-popup',
    template: ''
})
export class MatiereAngularSPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private matierePopupService: MatiereAngularSPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.matierePopupService
                    .open(MatiereAngularSDialogComponent as Component, params['id']);
            } else {
                this.matierePopupService
                    .open(MatiereAngularSDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
