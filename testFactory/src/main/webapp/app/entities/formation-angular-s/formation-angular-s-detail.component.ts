import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { FormationAngularS } from './formation-angular-s.model';
import { FormationAngularSService } from './formation-angular-s.service';

@Component({
    selector: 'jhi-formation-angular-s-detail',
    templateUrl: './formation-angular-s-detail.component.html'
})
export class FormationAngularSDetailComponent implements OnInit, OnDestroy {

    formation: FormationAngularS;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private formationService: FormationAngularSService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFormations();
    }

    load(id) {
        this.formationService.find(id)
            .subscribe((formationResponse: HttpResponse<FormationAngularS>) => {
                this.formation = formationResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFormations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'formationListModification',
            (response) => this.load(this.formation.id)
        );
    }
}
