/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FactoryTestModule } from '../../../test.module';
import { UtilisateurAngularSDetailComponent } from '../../../../../../main/webapp/app/entities/utilisateur-angular-s/utilisateur-angular-s-detail.component';
import { UtilisateurAngularSService } from '../../../../../../main/webapp/app/entities/utilisateur-angular-s/utilisateur-angular-s.service';
import { UtilisateurAngularS } from '../../../../../../main/webapp/app/entities/utilisateur-angular-s/utilisateur-angular-s.model';

describe('Component Tests', () => {

    describe('UtilisateurAngularS Management Detail Component', () => {
        let comp: UtilisateurAngularSDetailComponent;
        let fixture: ComponentFixture<UtilisateurAngularSDetailComponent>;
        let service: UtilisateurAngularSService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FactoryTestModule],
                declarations: [UtilisateurAngularSDetailComponent],
                providers: [
                    UtilisateurAngularSService
                ]
            })
            .overrideTemplate(UtilisateurAngularSDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UtilisateurAngularSDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UtilisateurAngularSService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UtilisateurAngularS(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.utilisateur).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
