import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { MatiereAngularS } from './matiere-angular-s.model';
import { MatiereAngularSService } from './matiere-angular-s.service';

@Component({
    selector: 'jhi-matiere-angular-s-detail',
    templateUrl: './matiere-angular-s-detail.component.html'
})
export class MatiereAngularSDetailComponent implements OnInit, OnDestroy {

    matiere: MatiereAngularS;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private matiereService: MatiereAngularSService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInMatieres();
    }

    load(id) {
        this.matiereService.find(id)
            .subscribe((matiereResponse: HttpResponse<MatiereAngularS>) => {
                this.matiere = matiereResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInMatieres() {
        this.eventSubscriber = this.eventManager.subscribe(
            'matiereListModification',
            (response) => this.load(this.matiere.id)
        );
    }
}
