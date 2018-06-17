/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FactoryTestModule } from '../../../test.module';
import { FormateurAngularSDialogComponent } from '../../../../../../main/webapp/app/entities/formateur-angular-s/formateur-angular-s-dialog.component';
import { FormateurAngularSService } from '../../../../../../main/webapp/app/entities/formateur-angular-s/formateur-angular-s.service';
import { FormateurAngularS } from '../../../../../../main/webapp/app/entities/formateur-angular-s/formateur-angular-s.model';
import { MatiereAngularSService } from '../../../../../../main/webapp/app/entities/matiere-angular-s';

describe('Component Tests', () => {

    describe('FormateurAngularS Management Dialog Component', () => {
        let comp: FormateurAngularSDialogComponent;
        let fixture: ComponentFixture<FormateurAngularSDialogComponent>;
        let service: FormateurAngularSService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FactoryTestModule],
                declarations: [FormateurAngularSDialogComponent],
                providers: [
                    MatiereAngularSService,
                    FormateurAngularSService
                ]
            })
            .overrideTemplate(FormateurAngularSDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FormateurAngularSDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FormateurAngularSService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FormateurAngularS(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.formateur = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'formateurListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new FormateurAngularS();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.formateur = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'formateurListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
