import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { MatiereAngularS } from './matiere-angular-s.model';
import { MatiereAngularSService } from './matiere-angular-s.service';

@Injectable()
export class MatiereAngularSPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private matiereService: MatiereAngularSService

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
                this.matiereService.find(id)
                    .subscribe((matiereResponse: HttpResponse<MatiereAngularS>) => {
                        const matiere: MatiereAngularS = matiereResponse.body;
                        this.ngbModalRef = this.matiereModalRef(component, matiere);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.matiereModalRef(component, new MatiereAngularS());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    matiereModalRef(component: Component, matiere: MatiereAngularS): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.matiere = matiere;
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
