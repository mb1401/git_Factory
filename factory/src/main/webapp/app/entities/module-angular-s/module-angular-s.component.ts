import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ModuleAngularS } from './module-angular-s.model';
import { ModuleAngularSService } from './module-angular-s.service';
import { Principal } from '../../shared';
import {FormateurAngularS, FormateurAngularSService} from '../formateur-angular-s';

@Component({
    selector: 'jhi-module-angular-s',
    templateUrl: './module-angular-s.component.html'
})
export class ModuleAngularSComponent implements OnInit, OnDestroy {
modules: ModuleAngularS[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private moduleService: ModuleAngularSService,
        private formateurService: FormateurAngularSService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }
    //
    // loadFormateur (idModule): FormateurAngularS {
    //     this.formateurService.find(idModule).subscribe(
    //         (res: HttpResponse<FormateurAngularS>) => {
    //             return  res.body;
    //         },
    //         (res: HttpErrorResponse) => this.onError(res.message)
    //             return null;
    //     );
    // }

    loadAll() {
        this.moduleService.query().subscribe(
            (res: HttpResponse<ModuleAngularS[]>) => {
                this.modules = res.body;
                for (const m of this.modules) {
                    this.formateurService.find(m.formateurId).subscribe(
                        (resF: HttpResponse<FormateurAngularS>) => {
                            m.formateur =  resF.body;
                        },
                        (resF: HttpErrorResponse) => this.onError(resF.message)
                    );

                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
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
        this.eventSubscriber = this.eventManager.subscribe('moduleListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
