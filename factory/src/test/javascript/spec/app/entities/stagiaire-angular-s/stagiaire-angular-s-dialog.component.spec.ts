/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FactoryTestModule } from '../../../test.module';
import { StagiaireAngularSDialogComponent } from '../../../../../../main/webapp/app/entities/stagiaire-angular-s/stagiaire-angular-s-dialog.component';
import { StagiaireAngularSService } from '../../../../../../main/webapp/app/entities/stagiaire-angular-s/stagiaire-angular-s.service';
import { StagiaireAngularS } from '../../../../../../main/webapp/app/entities/stagiaire-angular-s/stagiaire-angular-s.model';
import { FormationAngularSService } from '../../../../../../main/webapp/app/entities/formation-angular-s';
import { OrdinateurAngularSService } from '../../../../../../main/webapp/app/entities/ordinateur-angular-s';

describe('Component Tests', () => {

    describe('StagiaireAngularS Management Dialog Component', () => {
        let comp: StagiaireAngularSDialogComponent;
        let fixture: ComponentFixture<StagiaireAngularSDialogComponent>;
        let service: StagiaireAngularSService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FactoryTestModule],
                declarations: [StagiaireAngularSDialogComponent],
                providers: [
                    FormationAngularSService,
                    OrdinateurAngularSService,
                    StagiaireAngularSService
                ]
            })
            .overrideTemplate(StagiaireAngularSDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StagiaireAngularSDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StagiaireAngularSService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StagiaireAngularS(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.stagiaire = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'stagiaireListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new StagiaireAngularS();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.stagiaire = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'stagiaireListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
