/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FactoryTestModule } from '../../../test.module';
import { RessourceAngularSDialogComponent } from '../../../../../../main/webapp/app/entities/ressource-angular-s/ressource-angular-s-dialog.component';
import { RessourceAngularSService } from '../../../../../../main/webapp/app/entities/ressource-angular-s/ressource-angular-s.service';
import { RessourceAngularS } from '../../../../../../main/webapp/app/entities/ressource-angular-s/ressource-angular-s.model';

describe('Component Tests', () => {

    describe('RessourceAngularS Management Dialog Component', () => {
        let comp: RessourceAngularSDialogComponent;
        let fixture: ComponentFixture<RessourceAngularSDialogComponent>;
        let service: RessourceAngularSService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FactoryTestModule],
                declarations: [RessourceAngularSDialogComponent],
                providers: [
                    RessourceAngularSService
                ]
            })
            .overrideTemplate(RessourceAngularSDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RessourceAngularSDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RessourceAngularSService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RessourceAngularS(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.ressource = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ressourceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new RessourceAngularS();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.ressource = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'ressourceListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
