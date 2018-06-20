import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { StagiaireAngularS } from './stagiaire-angular-s.model';
import { StagiaireAngularSService } from './stagiaire-angular-s.service';
import { Principal } from '../../shared';
import {FormationAngularS, FormationAngularSService} from '../formation-angular-s';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'jhi-stagiaire-angular-s-of-formation',
  templateUrl: './stagiaire-angular-s-of-formation.component.html',
  styles: []
})
export class StagiaireAngularSOfFormationComponent implements OnInit, OnDestroy {
    formation: FormationAngularS;
    stagiaires: StagiaireAngularS[];
    currentAccount: any;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private route: ActivatedRoute,
        private formationService: FormationAngularSService,
        private stagiaireService: StagiaireAngularSService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }
    loadFormation(id) {
        this.formationService.find(id)
            .subscribe((formationResponse: HttpResponse<FormationAngularS>) => {
                this.formation = formationResponse.body;
                this.loadStagiaires();
            });
    }

    loadStagiaires() {
        this.stagiaireService.findAllwithFormation(this.formation.id).subscribe(
            (res: HttpResponse<StagiaireAngularS[]>) => {
                this.stagiaires = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.loadFormation(params['id']);
        });
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInStagiaires();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: StagiaireAngularS) {
        return item.id;
    }
    registerChangeInStagiaires() {
        this.eventSubscriber = this.eventManager.subscribe('stagiaireListModification', (response) => this.loadFormation(this.formation.id));
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
