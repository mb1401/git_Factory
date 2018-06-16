/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TestJhypsterTestModule } from '../../../test.module';
import { TechnicienAngularSDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/technicien-angular-s/technicien-angular-s-delete-dialog.component';
import { TechnicienAngularSService } from '../../../../../../main/webapp/app/entities/technicien-angular-s/technicien-angular-s.service';

describe('Component Tests', () => {

    describe('TechnicienAngularS Management Delete Component', () => {
        let comp: TechnicienAngularSDeleteDialogComponent;
        let fixture: ComponentFixture<TechnicienAngularSDeleteDialogComponent>;
        let service: TechnicienAngularSService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestJhypsterTestModule],
                declarations: [TechnicienAngularSDeleteDialogComponent],
                providers: [
                    TechnicienAngularSService
                ]
            })
            .overrideTemplate(TechnicienAngularSDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TechnicienAngularSDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TechnicienAngularSService);
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
