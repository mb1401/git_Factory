/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestJhypsterTestModule } from '../../../test.module';
import { FormationAngularSComponent } from '../../../../../../main/webapp/app/entities/formation-angular-s/formation-angular-s.component';
import { FormationAngularSService } from '../../../../../../main/webapp/app/entities/formation-angular-s/formation-angular-s.service';
import { FormationAngularS } from '../../../../../../main/webapp/app/entities/formation-angular-s/formation-angular-s.model';

describe('Component Tests', () => {

    describe('FormationAngularS Management Component', () => {
        let comp: FormationAngularSComponent;
        let fixture: ComponentFixture<FormationAngularSComponent>;
        let service: FormationAngularSService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestJhypsterTestModule],
                declarations: [FormationAngularSComponent],
                providers: [
                    FormationAngularSService
                ]
            })
            .overrideTemplate(FormationAngularSComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FormationAngularSComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FormationAngularSService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new FormationAngularS(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.formations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
