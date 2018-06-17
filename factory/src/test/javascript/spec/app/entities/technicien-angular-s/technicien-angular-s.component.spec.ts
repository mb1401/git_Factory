/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FactoryTestModule } from '../../../test.module';
import { TechnicienAngularSComponent } from '../../../../../../main/webapp/app/entities/technicien-angular-s/technicien-angular-s.component';
import { TechnicienAngularSService } from '../../../../../../main/webapp/app/entities/technicien-angular-s/technicien-angular-s.service';
import { TechnicienAngularS } from '../../../../../../main/webapp/app/entities/technicien-angular-s/technicien-angular-s.model';

describe('Component Tests', () => {

    describe('TechnicienAngularS Management Component', () => {
        let comp: TechnicienAngularSComponent;
        let fixture: ComponentFixture<TechnicienAngularSComponent>;
        let service: TechnicienAngularSService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FactoryTestModule],
                declarations: [TechnicienAngularSComponent],
                providers: [
                    TechnicienAngularSService
                ]
            })
            .overrideTemplate(TechnicienAngularSComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TechnicienAngularSComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TechnicienAngularSService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new TechnicienAngularS(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.techniciens[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
