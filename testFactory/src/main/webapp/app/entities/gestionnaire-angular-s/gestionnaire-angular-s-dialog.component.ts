import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GestionnaireAngularS } from './gestionnaire-angular-s.model';
import { GestionnaireAngularSPopupService } from './gestionnaire-angular-s-popup.service';
import { GestionnaireAngularSService } from './gestionnaire-angular-s.service';

@Component({
    selector: 'jhi-gestionnaire-angular-s-dialog',
    templateUrl: './gestionnaire-angular-s-dialog.component.html'
})
export class GestionnaireAngularSDialogComponent implements OnInit {

    gestionnaire: GestionnaireAngularS;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private gestionnaireService: GestionnaireAngularSService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.gestionnaire.id !== undefined) {
            this.subscribeToSaveResponse(
                this.gestionnaireService.update(this.gestionnaire));
        } else {
            this.subscribeToSaveResponse(
                this.gestionnaireService.create(this.gestionnaire));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<GestionnaireAngularS>>) {
        result.subscribe((res: HttpResponse<GestionnaireAngularS>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: GestionnaireAngularS) {
        this.eventManager.broadcast({ name: 'gestionnaireListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-gestionnaire-angular-s-popup',
    template: ''
})
export class GestionnaireAngularSPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gestionnairePopupService: GestionnaireAngularSPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.gestionnairePopupService
                    .open(GestionnaireAngularSDialogComponent as Component, params['id']);
            } else {
                this.gestionnairePopupService
                    .open(GestionnaireAngularSDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
