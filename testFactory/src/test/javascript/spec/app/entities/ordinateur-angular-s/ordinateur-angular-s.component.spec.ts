/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestJhypsterTestModule } from '../../../test.module';
import { OrdinateurAngularSComponent } from '../../../../../../main/webapp/app/entities/ordinateur-angular-s/ordinateur-angular-s.component';
import { OrdinateurAngularSService } from '../../../../../../main/webapp/app/entities/ordinateur-angular-s/ordinateur-angular-s.service';
import { OrdinateurAngularS } from '../../../../../../main/webapp/app/entities/ordinateur-angular-s/ordinateur-angular-s.model';

describe('Component Tests', () => {

    describe('OrdinateurAngularS Management Component', () => {
        let comp: OrdinateurAngularSComponent;
        let fixture: ComponentFixture<OrdinateurAngularSComponent>;
        let service: OrdinateurAngularSService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestJhypsterTestModule],
                declarations: [OrdinateurAngularSComponent],
                providers: [
                    OrdinateurAngularSService
                ]
            })
            .overrideTemplate(OrdinateurAngularSComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(OrdinateurAngularSComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(OrdinateurAngularSService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new OrdinateurAngularS(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ordinateurs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
