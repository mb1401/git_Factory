import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { GestionnaireAngularS } from './gestionnaire-angular-s.model';
import { GestionnaireAngularSPopupService } from './gestionnaire-angular-s-popup.service';
import { GestionnaireAngularSService } from './gestionnaire-angular-s.service';

@Component({
    selector: 'jhi-gestionnaire-angular-s-delete-dialog',
    templateUrl: './gestionnaire-angular-s-delete-dialog.component.html'
})
export class GestionnaireAngularSDeleteDialogComponent {

    gestionnaire: GestionnaireAngularS;

    constructor(
        private gestionnaireService: GestionnaireAngularSService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.gestionnaireService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'gestionnaireListModification',
                content: 'Deleted an gestionnaire'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-gestionnaire-angular-s-delete-popup',
    template: ''
})
export class GestionnaireAngularSDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private gestionnairePopupService: GestionnaireAngularSPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.gestionnairePopupService
                .open(GestionnaireAngularSDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
