import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { RessourceAngularS } from './ressource-angular-s.model';
import { RessourceAngularSService } from './ressource-angular-s.service';
import { Principal } from '../../shared';
import {OrdinateurAngularS} from '../ordinateur-angular-s/ordinateur-angular-s.model';
import {OrdinateurAngularSService} from '../ordinateur-angular-s/ordinateur-angular-s.service';
import {VideoProjecteurAngularSService} from '../video-projecteur-angular-s/video-projecteur-angular-s.service';
import {VideoProjecteurAngularS} from '../video-projecteur-angular-s/video-projecteur-angular-s.model';
@Component({
    selector: 'jhi-ressource-angular-s',
    templateUrl: './ressource-angular-s.component.html'
})
export class RessourceAngularSComponent implements OnInit, OnDestroy {
    ordinateurs: OrdinateurAngularS[];
    videoProjecteurs: VideoProjecteurAngularS[];
    materiels: any[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private ordinateurService: OrdinateurAngularSService,
        private videoProjecteurService: VideoProjecteurAngularSService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.ordinateurService.query().subscribe(
            (res: HttpResponse<OrdinateurAngularS[]>) => {
                this.ordinateurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.videoProjecteurService.query().subscribe(
            (res: HttpResponse<VideoProjecteurAngularS[]>) => {
                this.videoProjecteurs = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInOrdinateurs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackIdOrdinateur(index: number, item: OrdinateurAngularS) {
        return item.id;
    }
    trackIdVideoProjecteur(index: number, item: VideoProjecteurAngularS) {
        return item.id;
    }
    registerChangeInOrdinateurs() {
        this.eventSubscriber = this.eventManager.subscribe('ordinateurListModification', (response) => this.loadAll());
        this.eventSubscriber = this.eventManager.subscribe('videoProjecteurListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
