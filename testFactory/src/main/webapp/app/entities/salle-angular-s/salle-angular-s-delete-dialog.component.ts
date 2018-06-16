import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SalleAngularS } from './salle-angular-s.model';
import { SalleAngularSPopupService } from './salle-angular-s-popup.service';
import { SalleAngularSService } from './salle-angular-s.service';

@Component({
    selector: 'jhi-salle-angular-s-delete-dialog',
    templateUrl: './salle-angular-s-delete-dialog.component.html'
})
export class SalleAngularSDeleteDialogComponent {

    salle: SalleAngularS;

    constructor(
        private salleService: SalleAngularSService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.salleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'salleListModification',
                content: 'Deleted an salle'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-salle-angular-s-delete-popup',
    template: ''
})
export class SalleAngularSDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private sallePopupService: SalleAngularSPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.sallePopupService
                .open(SalleAngularSDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
