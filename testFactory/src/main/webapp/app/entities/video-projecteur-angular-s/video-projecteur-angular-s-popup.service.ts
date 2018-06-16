import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { VideoProjecteurAngularS } from './video-projecteur-angular-s.model';
import { VideoProjecteurAngularSService } from './video-projecteur-angular-s.service';

@Injectable()
export class VideoProjecteurAngularSPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private videoProjecteurService: VideoProjecteurAngularSService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.videoProjecteurService.find(id)
                    .subscribe((videoProjecteurResponse: HttpResponse<VideoProjecteurAngularS>) => {
                        const videoProjecteur: VideoProjecteurAngularS = videoProjecteurResponse.body;
                        this.ngbModalRef = this.videoProjecteurModalRef(component, videoProjecteur);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.videoProjecteurModalRef(component, new VideoProjecteurAngularS());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    videoProjecteurModalRef(component: Component, videoProjecteur: VideoProjecteurAngularS): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.videoProjecteur = videoProjecteur;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
