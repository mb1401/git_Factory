import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { OrdinateurAngularS } from './ordinateur-angular-s.model';
import { OrdinateurAngularSService } from './ordinateur-angular-s.service';

@Injectable()
export class OrdinateurAngularSPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private ordinateurService: OrdinateurAngularSService

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
                this.ordinateurService.find(id)
                    .subscribe((ordinateurResponse: HttpResponse<OrdinateurAngularS>) => {
                        const ordinateur: OrdinateurAngularS = ordinateurResponse.body;
                        if (ordinateur.dateAchat) {
                            ordinateur.dateAchat = {
                                year: ordinateur.dateAchat.getFullYear(),
                                month: ordinateur.dateAchat.getMonth() + 1,
                                day: ordinateur.dateAchat.getDate()
                            };
                        }
                        this.ngbModalRef = this.ordinateurModalRef(component, ordinateur);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.ordinateurModalRef(component, new OrdinateurAngularS());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    ordinateurModalRef(component: Component, ordinateur: OrdinateurAngularS): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.ordinateur = ordinateur;
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
