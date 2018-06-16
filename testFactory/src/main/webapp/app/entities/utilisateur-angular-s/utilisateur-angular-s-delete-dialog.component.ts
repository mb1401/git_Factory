import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { UtilisateurAngularS } from './utilisateur-angular-s.model';
import { UtilisateurAngularSPopupService } from './utilisateur-angular-s-popup.service';
import { UtilisateurAngularSService } from './utilisateur-angular-s.service';

@Component({
    selector: 'jhi-utilisateur-angular-s-delete-dialog',
    templateUrl: './utilisateur-angular-s-delete-dialog.component.html'
})
export class UtilisateurAngularSDeleteDialogComponent {

    utilisateur: UtilisateurAngularS;

    constructor(
        private utilisateurService: UtilisateurAngularSService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.utilisateurService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'utilisateurListModification',
                content: 'Deleted an utilisateur'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-utilisateur-angular-s-delete-popup',
    template: ''
})
export class UtilisateurAngularSDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private utilisateurPopupService: UtilisateurAngularSPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.utilisateurPopupService
                .open(UtilisateurAngularSDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
