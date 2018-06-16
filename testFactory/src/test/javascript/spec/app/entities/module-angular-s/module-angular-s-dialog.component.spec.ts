/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TestJhypsterTestModule } from '../../../test.module';
import { ModuleAngularSDialogComponent } from '../../../../../../main/webapp/app/entities/module-angular-s/module-angular-s-dialog.component';
import { ModuleAngularSService } from '../../../../../../main/webapp/app/entities/module-angular-s/module-angular-s.service';
import { ModuleAngularS } from '../../../../../../main/webapp/app/entities/module-angular-s/module-angular-s.model';
import { FormationAngularSService } from '../../../../../../main/webapp/app/entities/formation-angular-s';
import { FormateurAngularSService } from '../../../../../../main/webapp/app/entities/formateur-angular-s';
import { MatiereAngularSService } from '../../../../../../main/webapp/app/entities/matiere-angular-s';
import { SalleAngularSService } from '../../../../../../main/webapp/app/entities/salle-angular-s';
import { VideoProjecteurAngularSService } from '../../../../../../main/webapp/app/entities/video-projecteur-angular-s';

describe('Component Tests', () => {

    describe('ModuleAngularS Management Dialog Component', () => {
        let comp: ModuleAngularSDialogComponent;
        let fixture: ComponentFixture<ModuleAngularSDialogComponent>;
        let service: ModuleAngularSService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestJhypsterTestModule],
                declarations: [ModuleAngularSDialogComponent],
                providers: [
                    FormationAngularSService,
                    FormateurAngularSService,
                    MatiereAngularSService,
                    SalleAngularSService,
                    VideoProjecteurAngularSService,
                    ModuleAngularSService
                ]
            })
            .overrideTemplate(ModuleAngularSDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ModuleAngularSDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ModuleAngularSService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ModuleAngularS(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.module = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'moduleListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new ModuleAngularS();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.module = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'moduleListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
