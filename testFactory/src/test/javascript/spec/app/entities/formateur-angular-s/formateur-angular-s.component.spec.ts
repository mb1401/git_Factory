/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestJhypsterTestModule } from '../../../test.module';
import { FormateurAngularSComponent } from '../../../../../../main/webapp/app/entities/formateur-angular-s/formateur-angular-s.component';
import { FormateurAngularSService } from '../../../../../../main/webapp/app/entities/formateur-angular-s/formateur-angular-s.service';
import { FormateurAngularS } from '../../../../../../main/webapp/app/entities/formateur-angular-s/formateur-angular-s.model';

describe('Component Tests', () => {

    describe('FormateurAngularS Management Component', () => {
        let comp: FormateurAngularSComponent;
        let fixture: ComponentFixture<FormateurAngularSComponent>;
        let service: FormateurAngularSService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestJhypsterTestModule],
                declarations: [FormateurAngularSComponent],
                providers: [
                    FormateurAngularSService
                ]
            })
            .overrideTemplate(FormateurAngularSComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FormateurAngularSComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FormateurAngularSService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new FormateurAngularS(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.formateurs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
