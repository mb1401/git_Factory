import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VideoProjecteurAngularS } from './video-projecteur-angular-s.model';
import { VideoProjecteurAngularSPopupService } from './video-projecteur-angular-s-popup.service';
import { VideoProjecteurAngularSService } from './video-projecteur-angular-s.service';

@Component({
    selector: 'jhi-video-projecteur-angular-s-delete-dialog',
    templateUrl: './video-projecteur-angular-s-delete-dialog.component.html'
})
export class VideoProjecteurAngularSDeleteDialogComponent {

    videoProjecteur: VideoProjecteurAngularS;

    constructor(
        private videoProjecteurService: VideoProjecteurAngularSService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.videoProjecteurService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'videoProjecteurListModification',
                content: 'Deleted an videoProjecteur'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-video-projecteur-angular-s-delete-popup',
    template: ''
})
export class VideoProjecteurAngularSDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private videoProjecteurPopupService: VideoProjecteurAngularSPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.videoProjecteurPopupService
                .open(VideoProjecteurAngularSDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
