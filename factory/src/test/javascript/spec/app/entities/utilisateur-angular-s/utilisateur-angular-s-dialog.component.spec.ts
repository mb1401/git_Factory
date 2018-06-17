/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FactoryTestModule } from '../../../test.module';
import { UtilisateurAngularSDialogComponent } from '../../../../../../main/webapp/app/entities/utilisateur-angular-s/utilisateur-angular-s-dialog.component';
import { UtilisateurAngularSService } from '../../../../../../main/webapp/app/entities/utilisateur-angular-s/utilisateur-angular-s.service';
import { UtilisateurAngularS } from '../../../../../../main/webapp/app/entities/utilisateur-angular-s/utilisateur-angular-s.model';

describe('Component Tests', () => {

    describe('UtilisateurAngularS Management Dialog Component', () => {
        let comp: UtilisateurAngularSDialogComponent;
        let fixture: ComponentFixture<UtilisateurAngularSDialogComponent>;
        let service: UtilisateurAngularSService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FactoryTestModule],
                declarations: [UtilisateurAngularSDialogComponent],
                providers: [
                    UtilisateurAngularSService
                ]
            })
            .overrideTemplate(UtilisateurAngularSDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UtilisateurAngularSDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UtilisateurAngularSService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UtilisateurAngularS(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.utilisateur = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'utilisateurListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UtilisateurAngularS();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.utilisateur = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'utilisateurListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
