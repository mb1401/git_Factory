/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { FactoryTestModule } from '../../../test.module';
import { MatiereAngularSDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/matiere-angular-s/matiere-angular-s-delete-dialog.component';
import { MatiereAngularSService } from '../../../../../../main/webapp/app/entities/matiere-angular-s/matiere-angular-s.service';

describe('Component Tests', () => {

    describe('MatiereAngularS Management Delete Component', () => {
        let comp: MatiereAngularSDeleteDialogComponent;
        let fixture: ComponentFixture<MatiereAngularSDeleteDialogComponent>;
        let service: MatiereAngularSService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FactoryTestModule],
                declarations: [MatiereAngularSDeleteDialogComponent],
                providers: [
                    MatiereAngularSService
                ]
            })
            .overrideTemplate(MatiereAngularSDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MatiereAngularSDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MatiereAngularSService);
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
