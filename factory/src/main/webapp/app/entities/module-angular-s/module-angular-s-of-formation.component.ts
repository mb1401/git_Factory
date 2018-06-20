import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {ModuleAngularS} from './module-angular-s.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {Principal} from '../../shared';
import {ModuleAngularSService} from './module-angular-s.service';
import {ActivatedRoute} from '@angular/router';
import {FormationAngularSService} from '../formation-angular-s';
import {FormationAngularS} from '../formation-angular-s/formation-angular-s.model';

@Component({
  selector: 'jhi-module-angular-s-of-formation',
  templateUrl: './module-angular-s-of-formation.component.html',
  styles: []
})
export class ModuleAngularSOfFormationComponent implements OnInit, OnDestroy {
    formation: FormationAngularS;
    modules: ModuleAngularS[];
    currentAccount: any;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private route: ActivatedRoute,
        private formationService: FormationAngularSService,
        private moduleService: ModuleAngularSService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }
    // loadFormation(){
    //     this.formationService.find().subscribe(
    //         (res: HttpResponse<ModuleAngularS[]>) => {
    //             this.modules = res.body;
    //         },
    //         (res: HttpErrorResponse) => this.onError(res.message)
    //     );
    // }

    loadFormation(id) {
        this.formationService.find(id)
            .subscribe((formationResponse: HttpResponse<FormationAngularS>) => {
                this.formation = formationResponse.body;
                this.loadModules();
            });
    }

    loadModules() {
        this.moduleService.findAllWithFormation(this.formation.id).subscribe(
            (res: HttpResponse<ModuleAngularS[]>) => {
                this.formation.modules = res.body;
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
        this.registerChangeInModules();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: ModuleAngularS) {
        return item.id;
    }
    registerChangeInModules() {
        this.eventSubscriber = this.eventManager.subscribe('moduleListModification', (response) => this.loadFormation(this.formation.id));
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }

    previousState() {
        window.history.back();
    }
}
