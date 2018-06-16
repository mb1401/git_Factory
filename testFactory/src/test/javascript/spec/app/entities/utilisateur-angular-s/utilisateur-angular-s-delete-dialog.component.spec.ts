/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { TestJhypsterTestModule } from '../../../test.module';
import { UtilisateurAngularSDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/utilisateur-angular-s/utilisateur-angular-s-delete-dialog.component';
import { UtilisateurAngularSService } from '../../../../../../main/webapp/app/entities/utilisateur-angular-s/utilisateur-angular-s.service';

describe('Component Tests', () => {

    describe('UtilisateurAngularS Management Delete Component', () => {
        let comp: UtilisateurAngularSDeleteDialogComponent;
        let fixture: ComponentFixture<UtilisateurAngularSDeleteDialogComponent>;
        let service: UtilisateurAngularSService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestJhypsterTestModule],
                declarations: [UtilisateurAngularSDeleteDialogComponent],
                providers: [
                    UtilisateurAngularSService
                ]
            })
            .overrideTemplate(UtilisateurAngularSDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UtilisateurAngularSDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UtilisateurAngularSService);
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
