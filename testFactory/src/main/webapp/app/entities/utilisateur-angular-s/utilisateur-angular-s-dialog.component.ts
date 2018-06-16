import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UtilisateurAngularS } from './utilisateur-angular-s.model';
import { UtilisateurAngularSPopupService } from './utilisateur-angular-s-popup.service';
import { UtilisateurAngularSService } from './utilisateur-angular-s.service';

@Component({
    selector: 'jhi-utilisateur-angular-s-dialog',
    templateUrl: './utilisateur-angular-s-dialog.component.html'
})
export class UtilisateurAngularSDialogComponent implements OnInit {

    utilisateur: UtilisateurAngularS;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private utilisateurService: UtilisateurAngularSService,
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
        if (this.utilisateur.id !== undefined) {
            this.subscribeToSaveResponse(
                this.utilisateurService.update(this.utilisateur));
        } else {
            this.subscribeToSaveResponse(
                this.utilisateurService.create(this.utilisateur));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<UtilisateurAngularS>>) {
        result.subscribe((res: HttpResponse<UtilisateurAngularS>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: UtilisateurAngularS) {
        this.eventManager.broadcast({ name: 'utilisateurListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-utilisateur-angular-s-popup',
    template: ''
})
export class UtilisateurAngularSPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private utilisateurPopupService: UtilisateurAngularSPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.utilisateurPopupService
                    .open(UtilisateurAngularSDialogComponent as Component, params['id']);
            } else {
                this.utilisateurPopupService
                    .open(UtilisateurAngularSDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
