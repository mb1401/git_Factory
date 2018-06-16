/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TestJhypsterTestModule } from '../../../test.module';
import { GestionnaireAngularSDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/gestionnaire-angular-s/gestionnaire-angular-s-delete-dialog.component';
import { GestionnaireAngularSService } from '../../../../../../main/webapp/app/entities/gestionnaire-angular-s/gestionnaire-angular-s.service';

describe('Component Tests', () => {

    describe('GestionnaireAngularS Management Delete Component', () => {
        let comp: GestionnaireAngularSDeleteDialogComponent;
        let fixture: ComponentFixture<GestionnaireAngularSDeleteDialogComponent>;
        let service: GestionnaireAngularSService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestJhypsterTestModule],
                declarations: [GestionnaireAngularSDeleteDialogComponent],
                providers: [
                    GestionnaireAngularSService
                ]
            })
            .overrideTemplate(GestionnaireAngularSDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GestionnaireAngularSDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GestionnaireAngularSService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
