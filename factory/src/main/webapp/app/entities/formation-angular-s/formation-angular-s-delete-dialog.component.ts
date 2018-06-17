import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FormationAngularS } from './formation-angular-s.model';
import { FormationAngularSPopupService } from './formation-angular-s-popup.service';
import { FormationAngularSService } from './formation-angular-s.service';

@Component({
    selector: 'jhi-formation-angular-s-delete-dialog',
    templateUrl: './formation-angular-s-delete-dialog.component.html'
})
export class FormationAngularSDeleteDialogComponent {

    formation: FormationAngularS;

    constructor(
        private formationService: FormationAngularSService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.formationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'formationListModification',
                content: 'Deleted an formation'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-formation-angular-s-delete-popup',
    template: ''
})
export class FormationAngularSDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private formationPopupService: FormationAngularSPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.formationPopupService
                .open(FormationAngularSDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
