import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ModuleAngularS} from '../module-angular-s';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {FormationAngularS} from './formation-angular-s.model';
import {FormationAngularSService} from './formation-angular-s.service';
import {activateRoute} from '../../account';
import {Subscription} from 'rxjs/Subscription';
import {JhiEventManager} from 'ng-jhipster';

@Component({
  selector: 'jhi-formation-angular-s-module-edit',
  templateUrl: './formation-angular-s-module-edit.component.html',
  styles: []
})
export class FormationAngularSModuleEditComponent implements OnInit {
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

    registerChangeInFormations() {
        this.eventSubscriber = this.eventManager.subscribe(
            'formationListModification',
            (response) => this.load(this.formation.id)
        );
    }

}
