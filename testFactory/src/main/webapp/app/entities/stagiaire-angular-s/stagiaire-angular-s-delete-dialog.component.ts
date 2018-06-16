import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { StagiaireAngularS } from './stagiaire-angular-s.model';
import { StagiaireAngularSPopupService } from './stagiaire-angular-s-popup.service';
import { StagiaireAngularSService } from './stagiaire-angular-s.service';

@Component({
    selector: 'jhi-stagiaire-angular-s-delete-dialog',
    templateUrl: './stagiaire-angular-s-delete-dialog.component.html'
})
export class StagiaireAngularSDeleteDialogComponent {

    stagiaire: StagiaireAngularS;

    constructor(
        private stagiaireService: StagiaireAngularSService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.stagiaireService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'stagiaireListModification',
                content: 'Deleted an stagiaire'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-stagiaire-angular-s-delete-popup',
    template: ''
})
export class StagiaireAngularSDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private stagiairePopupService: StagiaireAngularSPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.stagiairePopupService
                .open(StagiaireAngularSDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
