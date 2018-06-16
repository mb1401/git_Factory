/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestJhypsterTestModule } from '../../../test.module';
import { SalleAngularSComponent } from '../../../../../../main/webapp/app/entities/salle-angular-s/salle-angular-s.component';
import { SalleAngularSService } from '../../../../../../main/webapp/app/entities/salle-angular-s/salle-angular-s.service';
import { SalleAngularS } from '../../../../../../main/webapp/app/entities/salle-angular-s/salle-angular-s.model';

describe('Component Tests', () => {

    describe('SalleAngularS Management Component', () => {
        let comp: SalleAngularSComponent;
        let fixture: ComponentFixture<SalleAngularSComponent>;
        let service: SalleAngularSService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestJhypsterTestModule],
                declarations: [SalleAngularSComponent],
                providers: [
                    SalleAngularSService
                ]
            })
            .overrideTemplate(SalleAngularSComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SalleAngularSComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalleAngularSService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new SalleAngularS(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.salles[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
