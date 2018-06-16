import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TechnicienAngularS } from './technicien-angular-s.model';
import { TechnicienAngularSPopupService } from './technicien-angular-s-popup.service';
import { TechnicienAngularSService } from './technicien-angular-s.service';

@Component({
    selector: 'jhi-technicien-angular-s-delete-dialog',
    templateUrl: './technicien-angular-s-delete-dialog.component.html'
})
export class TechnicienAngularSDeleteDialogComponent {

    technicien: TechnicienAngularS;

    constructor(
        private technicienService: TechnicienAngularSService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.technicienService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'technicienListModification',
                content: 'Deleted an technicien'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-technicien-angular-s-delete-popup',
    template: ''
})
export class TechnicienAngularSDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private technicienPopupService: TechnicienAngularSPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.technicienPopupService
                .open(TechnicienAngularSDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
