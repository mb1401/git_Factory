/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TestJhypsterTestModule } from '../../../test.module';
import { FormateurAngularSDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/formateur-angular-s/formateur-angular-s-delete-dialog.component';
import { FormateurAngularSService } from '../../../../../../main/webapp/app/entities/formateur-angular-s/formateur-angular-s.service';

describe('Component Tests', () => {

    describe('FormateurAngularS Management Delete Component', () => {
        let comp: FormateurAngularSDeleteDialogComponent;
        let fixture: ComponentFixture<FormateurAngularSDeleteDialogComponent>;
        let service: FormateurAngularSService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestJhypsterTestModule],
                declarations: [FormateurAngularSDeleteDialogComponent],
                providers: [
                    FormateurAngularSService
                ]
            })
            .overrideTemplate(FormateurAngularSDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FormateurAngularSDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FormateurAngularSService);
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
