/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TestJhypsterTestModule } from '../../../test.module';
import { MatiereAngularSDialogComponent } from '../../../../../../main/webapp/app/entities/matiere-angular-s/matiere-angular-s-dialog.component';
import { MatiereAngularSService } from '../../../../../../main/webapp/app/entities/matiere-angular-s/matiere-angular-s.service';
import { MatiereAngularS } from '../../../../../../main/webapp/app/entities/matiere-angular-s/matiere-angular-s.model';
import { FormateurAngularSService } from '../../../../../../main/webapp/app/entities/formateur-angular-s';

describe('Component Tests', () => {

    describe('MatiereAngularS Management Dialog Component', () => {
        let comp: MatiereAngularSDialogComponent;
        let fixture: ComponentFixture<MatiereAngularSDialogComponent>;
        let service: MatiereAngularSService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestJhypsterTestModule],
                declarations: [MatiereAngularSDialogComponent],
                providers: [
                    FormateurAngularSService,
                    MatiereAngularSService
                ]
            })
            .overrideTemplate(MatiereAngularSDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MatiereAngularSDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MatiereAngularSService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MatiereAngularS(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.matiere = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'matiereListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new MatiereAngularS();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.matiere = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'matiereListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
