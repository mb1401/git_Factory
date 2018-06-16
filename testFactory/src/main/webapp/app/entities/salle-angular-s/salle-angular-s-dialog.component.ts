import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SalleAngularS } from './salle-angular-s.model';
import { SalleAngularSPopupService } from './salle-angular-s-popup.service';
import { SalleAngularSService } from './salle-angular-s.service';

@Component({
    selector: 'jhi-salle-angular-s-dialog',
    templateUrl: './salle-angular-s-dialog.component.html'
})
export class SalleAngularSDialogComponent implements OnInit {

    salle: SalleAngularS;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private salleService: SalleAngularSService,
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
        if (this.salle.id !== undefined) {
            this.subscribeToSaveResponse(
                this.salleService.update(this.salle));
        } else {
            this.subscribeToSaveResponse(
                this.salleService.create(this.salle));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<SalleAngularS>>) {
        result.subscribe((res: HttpResponse<SalleAngularS>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: SalleAngularS) {
        this.eventManager.broadcast({ name: 'salleListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-salle-angular-s-popup',
    template: ''
})
export class SalleAngularSPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sallePopupService: SalleAngularSPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.sallePopupService
                    .open(SalleAngularSDialogComponent as Component, params['id']);
            } else {
                this.sallePopupService
                    .open(SalleAngularSDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
