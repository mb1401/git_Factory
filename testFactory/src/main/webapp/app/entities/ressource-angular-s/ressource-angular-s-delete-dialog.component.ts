import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { RessourceAngularS } from './ressource-angular-s.model';
import { RessourceAngularSPopupService } from './ressource-angular-s-popup.service';
import { RessourceAngularSService } from './ressource-angular-s.service';

@Component({
    selector: 'jhi-ressource-angular-s-delete-dialog',
    templateUrl: './ressource-angular-s-delete-dialog.component.html'
})
export class RessourceAngularSDeleteDialogComponent {

    ressource: RessourceAngularS;

    constructor(
        private ressourceService: RessourceAngularSService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.ressourceService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'ressourceListModification',
                content: 'Deleted an ressource'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-ressource-angular-s-delete-popup',
    template: ''
})
export class RessourceAngularSDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private ressourcePopupService: RessourceAngularSPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.ressourcePopupService
                .open(RessourceAngularSDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
