import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { ModuleAngularS } from './module-angular-s.model';
import { ModuleAngularSService } from './module-angular-s.service';

@Injectable()
export class ModuleAngularSPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private moduleService: ModuleAngularSService

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
                this.moduleService.find(id)
                    .subscribe((moduleResponse: HttpResponse<ModuleAngularS>) => {
                        const module: ModuleAngularS = moduleResponse.body;
                        if (module.dateDebut) {
                            module.dateDebut = {
                                year: module.dateDebut.getFullYear(),
                                month: module.dateDebut.getMonth() + 1,
                                day: module.dateDebut.getDate()
                            };
                        }
                        if (module.dateFin) {
                            module.dateFin = {
                                year: module.dateFin.getFullYear(),
                                month: module.dateFin.getMonth() + 1,
                                day: module.dateFin.getDate()
                            };
                        }
                        this.ngbModalRef = this.moduleModalRef(component, module);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.moduleModalRef(component, new ModuleAngularS());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    moduleModalRef(component: Component, module: ModuleAngularS): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.module = module;
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
