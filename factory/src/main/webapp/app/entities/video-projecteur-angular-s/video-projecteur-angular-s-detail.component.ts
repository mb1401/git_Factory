import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { VideoProjecteurAngularS } from './video-projecteur-angular-s.model';
import { VideoProjecteurAngularSService } from './video-projecteur-angular-s.service';

@Component({
    selector: 'jhi-video-projecteur-angular-s-detail',
    templateUrl: './video-projecteur-angular-s-detail.component.html'
})
export class VideoProjecteurAngularSDetailComponent implements OnInit, OnDestroy {

    videoProjecteur: VideoProjecteurAngularS;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private videoProjecteurService: VideoProjecteurAngularSService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInVideoProjecteurs();
    }

    load(id) {
        this.videoProjecteurService.find(id)
            .subscribe((videoProjecteurResponse: HttpResponse<VideoProjecteurAngularS>) => {
                this.videoProjecteur = videoProjecteurResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInVideoProjecteurs() {
        this.eventSubscriber = this.eventManager.subscribe(
            'videoProjecteurListModification',
            (response) => this.load(this.videoProjecteur.id)
        );
    }
}
