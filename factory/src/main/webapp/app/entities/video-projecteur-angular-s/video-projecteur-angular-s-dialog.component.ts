import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VideoProjecteurAngularS } from './video-projecteur-angular-s.model';
import { VideoProjecteurAngularSPopupService } from './video-projecteur-angular-s-popup.service';
import { VideoProjecteurAngularSService } from './video-projecteur-angular-s.service';

@Component({
    selector: 'jhi-video-projecteur-angular-s-dialog',
    templateUrl: './video-projecteur-angular-s-dialog.component.html'
})
export class VideoProjecteurAngularSDialogComponent implements OnInit {

    videoProjecteur: VideoProjecteurAngularS;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private videoProjecteurService: VideoProjecteurAngularSService,
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
        if (this.videoProjecteur.id !== undefined) {
            this.subscribeToSaveResponse(
                this.videoProjecteurService.update(this.videoProjecteur));
        } else {
            this.subscribeToSaveResponse(
                this.videoProjecteurService.create(this.videoProjecteur));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<VideoProjecteurAngularS>>) {
        result.subscribe((res: HttpResponse<VideoProjecteurAngularS>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VideoProjecteurAngularS) {
        this.eventManager.broadcast({ name: 'videoProjecteurListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-video-projecteur-angular-s-popup',
    template: ''
})
export class VideoProjecteurAngularSPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private videoProjecteurPopupService: VideoProjecteurAngularSPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.videoProjecteurPopupService
                    .open(VideoProjecteurAngularSDialogComponent as Component, params['id']);
            } else {
                this.videoProjecteurPopupService
                    .open(VideoProjecteurAngularSDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
