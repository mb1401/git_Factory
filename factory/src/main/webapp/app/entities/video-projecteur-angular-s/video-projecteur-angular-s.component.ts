import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { VideoProjecteurAngularS } from './video-projecteur-angular-s.model';
import { VideoProjecteurAngularSService } from './video-projecteur-angular-s.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-video-projecteur-angular-s',
    templateUrl: './video-projecteur-angular-s.component.html'
})
export class VideoProjecteurAngularSComponent implements OnInit, OnDestroy {
videoProjecteurs: VideoProjecteurAngularS[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private videoProjecteurService: VideoProjecteurAngularSService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
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
        this.registerChangeInVideoProjecteurs();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: VideoProjecteurAngularS) {
        return item.id;
    }
    registerChangeInVideoProjecteurs() {
        this.eventSubscriber = this.eventManager.subscribe('videoProjecteurListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
