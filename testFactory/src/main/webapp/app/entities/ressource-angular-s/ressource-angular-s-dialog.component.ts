import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RessourceAngularS } from './ressource-angular-s.model';
import { RessourceAngularSPopupService } from './ressource-angular-s-popup.service';
import { RessourceAngularSService } from './ressource-angular-s.service';

@Component({
    selector: 'jhi-ressource-angular-s-dialog',
    templateUrl: './ressource-angular-s-dialog.component.html'
})
export class RessourceAngularSDialogComponent implements OnInit {

    ressource: RessourceAngularS;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private ressourceService: RessourceAngularSService,
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
        if (this.ressource.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ressourceService.update(this.ressource));
        } else {
            this.subscribeToSaveResponse(
                this.ressourceService.create(this.ressource));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<RessourceAngularS>>) {
        result.subscribe((res: HttpResponse<RessourceAngularS>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: RessourceAngularS) {
        this.eventManager.broadcast({ name: 'ressourceListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-ressource-angular-s-popup',
    template: ''
})
export class RessourceAngularSPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ressourcePopupService: RessourceAngularSPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ressourcePopupService
                    .open(RessourceAngularSDialogComponent as Component, params['id']);
            } else {
                this.ressourcePopupService
                    .open(RessourceAngularSDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
