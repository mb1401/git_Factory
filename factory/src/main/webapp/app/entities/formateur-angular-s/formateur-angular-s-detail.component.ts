import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { FormateurAngularS } from './formateur-angular-s.model';
import { FormateurAngularSService } from './formateur-angular-s.service';

@Component({
    selector: 'jhi-formateur-angular-s-detail',
    templateUrl: './formateur-angular-s-detail.component.html'
})
export class FormateurAngularSDetailComponent implements OnInit, OnDestroy {

    formateur: FormateurAngularS;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private formateurService: FormateurAngularSService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInFormateurs();
    }

    load(id) {
        this.formateurService.find(id)
            .subscribe((formateurResponse: HttpResponse<FormateurAngularS>) => {
                this.formateur = formateurResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInFormateurs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'formateurListModification',
            (response) => this.load(this.formateur.id)
        );
    }
}
