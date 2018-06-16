import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { GestionnaireAngularS } from './gestionnaire-angular-s.model';
import { GestionnaireAngularSService } from './gestionnaire-angular-s.service';

@Injectable()
export class GestionnaireAngularSPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private gestionnaireService: GestionnaireAngularSService

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
                this.gestionnaireService.find(id)
                    .subscribe((gestionnaireResponse: HttpResponse<GestionnaireAngularS>) => {
                        const gestionnaire: GestionnaireAngularS = gestionnaireResponse.body;
                        this.ngbModalRef = this.gestionnaireModalRef(component, gestionnaire);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.gestionnaireModalRef(component, new GestionnaireAngularS());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    gestionnaireModalRef(component: Component, gestionnaire: GestionnaireAngularS): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.gestionnaire = gestionnaire;
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
