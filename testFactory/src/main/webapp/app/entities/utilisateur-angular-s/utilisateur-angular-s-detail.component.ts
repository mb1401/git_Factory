import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { UtilisateurAngularS } from './utilisateur-angular-s.model';
import { UtilisateurAngularSService } from './utilisateur-angular-s.service';

@Component({
    selector: 'jhi-utilisateur-angular-s-detail',
    templateUrl: './utilisateur-angular-s-detail.component.html'
})
export class UtilisateurAngularSDetailComponent implements OnInit, OnDestroy {

    utilisateur: UtilisateurAngularS;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private utilisateurService: UtilisateurAngularSService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInUtilisateurs();
    }

    load(id) {
        this.utilisateurService.find(id)
            .subscribe((utilisateurResponse: HttpResponse<UtilisateurAngularS>) => {
                this.utilisateur = utilisateurResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInUtilisateurs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'utilisateurListModification',
            (response) => this.load(this.utilisateur.id)
        );
    }
}
