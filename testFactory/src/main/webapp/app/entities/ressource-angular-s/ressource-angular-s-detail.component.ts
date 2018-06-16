import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { RessourceAngularS } from './ressource-angular-s.model';
import { RessourceAngularSService } from './ressource-angular-s.service';

@Component({
    selector: 'jhi-ressource-angular-s-detail',
    templateUrl: './ressource-angular-s-detail.component.html'
})
export class RessourceAngularSDetailComponent implements OnInit, OnDestroy {

    ressource: RessourceAngularS;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private ressourceService: RessourceAngularSService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInRessources();
    }

    load(id) {
        this.ressourceService.find(id)
            .subscribe((ressourceResponse: HttpResponse<RessourceAngularS>) => {
                this.ressource = ressourceResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInRessources() {
        this.eventSubscriber = this.eventManager.subscribe(
            'ressourceListModification',
            (response) => this.load(this.ressource.id)
        );
    }
}
