/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TestJhypsterTestModule } from '../../../test.module';
import { StagiaireAngularSDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/stagiaire-angular-s/stagiaire-angular-s-delete-dialog.component';
import { StagiaireAngularSService } from '../../../../../../main/webapp/app/entities/stagiaire-angular-s/stagiaire-angular-s.service';

describe('Component Tests', () => {

    describe('StagiaireAngularS Management Delete Component', () => {
        let comp: StagiaireAngularSDeleteDialogComponent;
        let fixture: ComponentFixture<StagiaireAngularSDeleteDialogComponent>;
        let service: StagiaireAngularSService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestJhypsterTestModule],
                declarations: [StagiaireAngularSDeleteDialogComponent],
                providers: [
                    StagiaireAngularSService
                ]
            })
            .overrideTemplate(StagiaireAngularSDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StagiaireAngularSDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StagiaireAngularSService);
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
