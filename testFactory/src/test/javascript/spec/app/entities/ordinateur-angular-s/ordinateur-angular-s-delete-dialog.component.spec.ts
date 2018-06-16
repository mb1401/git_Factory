/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TestJhypsterTestModule } from '../../../test.module';
import { OrdinateurAngularSDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/ordinateur-angular-s/ordinateur-angular-s-delete-dialog.component';
import { OrdinateurAngularSService } from '../../../../../../main/webapp/app/entities/ordinateur-angular-s/ordinateur-angular-s.service';

describe('Component Tests', () => {

    describe('OrdinateurAngularS Management Delete Component', () => {
        let comp: OrdinateurAngularSDeleteDialogComponent;
        let fixture: ComponentFixture<OrdinateurAngularSDeleteDialogComponent>;
        let service: OrdinateurAngularSService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestJhypsterTestModule],
                declarations: [OrdinateurAngularSDeleteDialogComponent],
                providers: [
                    OrdinateurAngularSService
                ]
            })
            .overrideTemplate(OrdinateurAngularSDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrdinateurAngularSDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrdinateurAngularSService);
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
