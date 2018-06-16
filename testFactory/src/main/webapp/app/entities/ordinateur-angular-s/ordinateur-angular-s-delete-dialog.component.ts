import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { OrdinateurAngularS } from './ordinateur-angular-s.model';
import { OrdinateurAngularSPopupService } from './ordinateur-angular-s-popup.service';
import { OrdinateurAngularSService } from './ordinateur-angular-s.service';

@Component({
    selector: 'jhi-ordinateur-angular-s-delete-dialog',
    templateUrl: './ordinateur-angular-s-delete-dialog.component.html'
})
export class OrdinateurAngularSDeleteDialogComponent {

    ordinateur: OrdinateurAngularS;

    constructor(
        private ordinateurService: OrdinateurAngularSService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ordinateurService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ordinateurListModification',
                content: 'Deleted an ordinateur'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ordinateur-angular-s-delete-popup',
    template: ''
})
export class OrdinateurAngularSDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ordinateurPopupService: OrdinateurAngularSPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ordinateurPopupService
                .open(OrdinateurAngularSDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
