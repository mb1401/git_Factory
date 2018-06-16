import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TechnicienAngularS } from './technicien-angular-s.model';
import { TechnicienAngularSPopupService } from './technicien-angular-s-popup.service';
import { TechnicienAngularSService } from './technicien-angular-s.service';

@Component({
    selector: 'jhi-technicien-angular-s-dialog',
    templateUrl: './technicien-angular-s-dialog.component.html'
})
export class TechnicienAngularSDialogComponent implements OnInit {

    technicien: TechnicienAngularS;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private technicienService: TechnicienAngularSService,
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
        if (this.technicien.id !== undefined) {
            this.subscribeToSaveResponse(
                this.technicienService.update(this.technicien));
        } else {
            this.subscribeToSaveResponse(
                this.technicienService.create(this.technicien));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<TechnicienAngularS>>) {
        result.subscribe((res: HttpResponse<TechnicienAngularS>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: TechnicienAngularS) {
        this.eventManager.broadcast({ name: 'technicienListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-technicien-angular-s-popup',
    template: ''
})
export class TechnicienAngularSPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private technicienPopupService: TechnicienAngularSPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.technicienPopupService
                    .open(TechnicienAngularSDialogComponent as Component, params['id']);
            } else {
                this.technicienPopupService
                    .open(TechnicienAngularSDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
