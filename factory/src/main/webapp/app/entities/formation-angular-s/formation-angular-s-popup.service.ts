import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { FormationAngularS } from './formation-angular-s.model';
import { FormationAngularSService } from './formation-angular-s.service';

@Injectable()
export class FormationAngularSPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private formationService: FormationAngularSService

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
                this.formationService.find(id)
                    .subscribe((formationResponse: HttpResponse<FormationAngularS>) => {
                        const formation: FormationAngularS = formationResponse.body;
                        if (formation.dateDebut) {
                            formation.dateDebut = {
                                year: formation.dateDebut.getFullYear(),
                                month: formation.dateDebut.getMonth() + 1,
                                day: formation.dateDebut.getDate()
                            };
                        }
                        if (formation.dateFin) {
                            formation.dateFin = {
                                year: formation.dateFin.getFullYear(),
                                month: formation.dateFin.getMonth() + 1,
                                day: formation.dateFin.getDate()
                            };
                        }
                        this.ngbModalRef = this.formationModalRef(component, formation);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.formationModalRef(component, new FormationAngularS());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    formationModalRef(component: Component, formation: FormationAngularS): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.formation = formation;
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
