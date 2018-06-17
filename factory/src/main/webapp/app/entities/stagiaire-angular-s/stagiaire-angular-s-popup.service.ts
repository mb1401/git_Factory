import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { StagiaireAngularS } from './stagiaire-angular-s.model';
import { StagiaireAngularSService } from './stagiaire-angular-s.service';

@Injectable()
export class StagiaireAngularSPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private stagiaireService: StagiaireAngularSService

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
                this.stagiaireService.find(id)
                    .subscribe((stagiaireResponse: HttpResponse<StagiaireAngularS>) => {
                        const stagiaire: StagiaireAngularS = stagiaireResponse.body;
                        this.ngbModalRef = this.stagiaireModalRef(component, stagiaire);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.stagiaireModalRef(component, new StagiaireAngularS());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    stagiaireModalRef(component: Component, stagiaire: StagiaireAngularS): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.stagiaire = stagiaire;
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
