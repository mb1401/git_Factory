/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FactoryTestModule } from '../../../test.module';
import { FormationAngularSDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/formation-angular-s/formation-angular-s-delete-dialog.component';
import { FormationAngularSService } from '../../../../../../main/webapp/app/entities/formation-angular-s/formation-angular-s.service';

describe('Component Tests', () => {

    describe('FormationAngularS Management Delete Component', () => {
        let comp: FormationAngularSDeleteDialogComponent;
        let fixture: ComponentFixture<FormationAngularSDeleteDialogComponent>;
        let service: FormationAngularSService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FactoryTestModule],
                declarations: [FormationAngularSDeleteDialogComponent],
                providers: [
                    FormationAngularSService
                ]
            })
            .overrideTemplate(FormationAngularSDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FormationAngularSDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FormationAngularSService);
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
