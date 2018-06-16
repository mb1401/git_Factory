/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TestJhypsterTestModule } from '../../../test.module';
import { FormationAngularSDialogComponent } from '../../../../../../main/webapp/app/entities/formation-angular-s/formation-angular-s-dialog.component';
import { FormationAngularSService } from '../../../../../../main/webapp/app/entities/formation-angular-s/formation-angular-s.service';
import { FormationAngularS } from '../../../../../../main/webapp/app/entities/formation-angular-s/formation-angular-s.model';
import { FormateurAngularSService } from '../../../../../../main/webapp/app/entities/formateur-angular-s';
import { GestionnaireAngularSService } from '../../../../../../main/webapp/app/entities/gestionnaire-angular-s';

describe('Component Tests', () => {

    describe('FormationAngularS Management Dialog Component', () => {
        let comp: FormationAngularSDialogComponent;
        let fixture: ComponentFixture<FormationAngularSDialogComponent>;
        let service: FormationAngularSService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestJhypsterTestModule],
                declarations: [FormationAngularSDialogComponent],
                providers: [
                    FormateurAngularSService,
                    GestionnaireAngularSService,
                    FormationAngularSService
                ]
            })
            .overrideTemplate(FormationAngularSDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FormationAngularSDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FormationAngularSService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FormationAngularS(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.formation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'formationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FormationAngularS();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.formation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'formationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
