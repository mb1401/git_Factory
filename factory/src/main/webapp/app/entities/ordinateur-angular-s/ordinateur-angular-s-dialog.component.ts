import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrdinateurAngularS } from './ordinateur-angular-s.model';
import { OrdinateurAngularSPopupService } from './ordinateur-angular-s-popup.service';
import { OrdinateurAngularSService } from './ordinateur-angular-s.service';

@Component({
    selector: 'jhi-ordinateur-angular-s-dialog',
    templateUrl: './ordinateur-angular-s-dialog.component.html'
})
export class OrdinateurAngularSDialogComponent implements OnInit {

    ordinateur: OrdinateurAngularS;
    isSaving: boolean;
    dateAchatDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private ordinateurService: OrdinateurAngularSService,
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
        if (this.ordinateur.id !== undefined) {
            this.subscribeToSaveResponse(
                this.ordinateurService.update(this.ordinateur));
        } else {
            this.subscribeToSaveResponse(
                this.ordinateurService.create(this.ordinateur));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<OrdinateurAngularS>>) {
        result.subscribe((res: HttpResponse<OrdinateurAngularS>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: OrdinateurAngularS) {
        this.eventManager.broadcast({ name: 'ordinateurListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-ordinateur-angular-s-popup',
    template: ''
})
export class OrdinateurAngularSPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ordinateurPopupService: OrdinateurAngularSPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.ordinateurPopupService
                    .open(OrdinateurAngularSDialogComponent as Component, params['id']);
            } else {
                this.ordinateurPopupService
                    .open(OrdinateurAngularSDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
