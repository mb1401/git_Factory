import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FormateurAngularS } from './formateur-angular-s.model';
import { FormateurAngularSPopupService } from './formateur-angular-s-popup.service';
import { FormateurAngularSService } from './formateur-angular-s.service';

@Component({
    selector: 'jhi-formateur-angular-s-delete-dialog',
    templateUrl: './formateur-angular-s-delete-dialog.component.html'
})
export class FormateurAngularSDeleteDialogComponent {

    formateur: FormateurAngularS;

    constructor(
        private formateurService: FormateurAngularSService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.formateurService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'formateurListModification',
                content: 'Deleted an formateur'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-formateur-angular-s-delete-popup',
    template: ''
})
export class FormateurAngularSDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private formateurPopupService: FormateurAngularSPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.formateurPopupService
                .open(FormateurAngularSDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
