/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FactoryTestModule } from '../../../test.module';
import { RessourceAngularSDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/ressource-angular-s/ressource-angular-s-delete-dialog.component';
import { RessourceAngularSService } from '../../../../../../main/webapp/app/entities/ressource-angular-s/ressource-angular-s.service';

describe('Component Tests', () => {

    describe('RessourceAngularS Management Delete Component', () => {
        let comp: RessourceAngularSDeleteDialogComponent;
        let fixture: ComponentFixture<RessourceAngularSDeleteDialogComponent>;
        let service: RessourceAngularSService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FactoryTestModule],
                declarations: [RessourceAngularSDeleteDialogComponent],
                providers: [
                    RessourceAngularSService
                ]
            })
            .overrideTemplate(RessourceAngularSDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RessourceAngularSDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RessourceAngularSService);
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
