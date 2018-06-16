/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TestJhypsterTestModule } from '../../../test.module';
import { GestionnaireAngularSDetailComponent } from '../../../../../../main/webapp/app/entities/gestionnaire-angular-s/gestionnaire-angular-s-detail.component';
import { GestionnaireAngularSService } from '../../../../../../main/webapp/app/entities/gestionnaire-angular-s/gestionnaire-angular-s.service';
import { GestionnaireAngularS } from '../../../../../../main/webapp/app/entities/gestionnaire-angular-s/gestionnaire-angular-s.model';

describe('Component Tests', () => {

    describe('GestionnaireAngularS Management Detail Component', () => {
        let comp: GestionnaireAngularSDetailComponent;
        let fixture: ComponentFixture<GestionnaireAngularSDetailComponent>;
        let service: GestionnaireAngularSService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestJhypsterTestModule],
                declarations: [GestionnaireAngularSDetailComponent],
                providers: [
                    GestionnaireAngularSService
                ]
            })
            .overrideTemplate(GestionnaireAngularSDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GestionnaireAngularSDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GestionnaireAngularSService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new GestionnaireAngularS(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.gestionnaire).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
