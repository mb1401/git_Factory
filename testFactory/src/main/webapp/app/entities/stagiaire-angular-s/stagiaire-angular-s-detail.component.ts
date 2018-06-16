import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { StagiaireAngularS } from './stagiaire-angular-s.model';
import { StagiaireAngularSService } from './stagiaire-angular-s.service';

@Component({
    selector: 'jhi-stagiaire-angular-s-detail',
    templateUrl: './stagiaire-angular-s-detail.component.html'
})
export class StagiaireAngularSDetailComponent implements OnInit, OnDestroy {

    stagiaire: StagiaireAngularS;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private stagiaireService: StagiaireAngularSService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInStagiaires();
    }

    load(id) {
        this.stagiaireService.find(id)
            .subscribe((stagiaireResponse: HttpResponse<StagiaireAngularS>) => {
                this.stagiaire = stagiaireResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInStagiaires() {
        this.eventSubscriber = this.eventManager.subscribe(
            'stagiaireListModification',
            (response) => this.load(this.stagiaire.id)
        );
    }
}
