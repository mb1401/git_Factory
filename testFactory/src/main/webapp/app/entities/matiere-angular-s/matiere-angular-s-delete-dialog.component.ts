import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MatiereAngularS } from './matiere-angular-s.model';
import { MatiereAngularSPopupService } from './matiere-angular-s-popup.service';
import { MatiereAngularSService } from './matiere-angular-s.service';

@Component({
    selector: 'jhi-matiere-angular-s-delete-dialog',
    templateUrl: './matiere-angular-s-delete-dialog.component.html'
})
export class MatiereAngularSDeleteDialogComponent {

    matiere: MatiereAngularS;

    constructor(
        private matiereService: MatiereAngularSService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.matiereService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'matiereListModification',
                content: 'Deleted an matiere'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-matiere-angular-s-delete-popup',
    template: ''
})
export class MatiereAngularSDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private matierePopupService: MatiereAngularSPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.matierePopupService
                .open(MatiereAngularSDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
