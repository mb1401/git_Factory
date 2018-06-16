/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestJhypsterTestModule } from '../../../test.module';
import { GestionnaireAngularSComponent } from '../../../../../../main/webapp/app/entities/gestionnaire-angular-s/gestionnaire-angular-s.component';
import { GestionnaireAngularSService } from '../../../../../../main/webapp/app/entities/gestionnaire-angular-s/gestionnaire-angular-s.service';
import { GestionnaireAngularS } from '../../../../../../main/webapp/app/entities/gestionnaire-angular-s/gestionnaire-angular-s.model';

describe('Component Tests', () => {

    describe('GestionnaireAngularS Management Component', () => {
        let comp: GestionnaireAngularSComponent;
        let fixture: ComponentFixture<GestionnaireAngularSComponent>;
        let service: GestionnaireAngularSService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestJhypsterTestModule],
                declarations: [GestionnaireAngularSComponent],
                providers: [
                    GestionnaireAngularSService
                ]
            })
            .overrideTemplate(GestionnaireAngularSComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(GestionnaireAngularSComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(GestionnaireAngularSService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new GestionnaireAngularS(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.gestionnaires[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
