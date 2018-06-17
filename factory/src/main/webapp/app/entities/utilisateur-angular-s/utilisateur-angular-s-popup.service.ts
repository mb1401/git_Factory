import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { UtilisateurAngularS } from './utilisateur-angular-s.model';
import { UtilisateurAngularSService } from './utilisateur-angular-s.service';

@Injectable()
export class UtilisateurAngularSPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private utilisateurService: UtilisateurAngularSService

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
                this.utilisateurService.find(id)
                    .subscribe((utilisateurResponse: HttpResponse<UtilisateurAngularS>) => {
                        const utilisateur: UtilisateurAngularS = utilisateurResponse.body;
                        this.ngbModalRef = this.utilisateurModalRef(component, utilisateur);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.utilisateurModalRef(component, new UtilisateurAngularS());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    utilisateurModalRef(component: Component, utilisateur: UtilisateurAngularS): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.utilisateur = utilisateur;
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
