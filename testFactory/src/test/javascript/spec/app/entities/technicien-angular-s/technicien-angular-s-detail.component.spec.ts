/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TestJhypsterTestModule } from '../../../test.module';
import { TechnicienAngularSDetailComponent } from '../../../../../../main/webapp/app/entities/technicien-angular-s/technicien-angular-s-detail.component';
import { TechnicienAngularSService } from '../../../../../../main/webapp/app/entities/technicien-angular-s/technicien-angular-s.service';
import { TechnicienAngularS } from '../../../../../../main/webapp/app/entities/technicien-angular-s/technicien-angular-s.model';

describe('Component Tests', () => {

    describe('TechnicienAngularS Management Detail Component', () => {
        let comp: TechnicienAngularSDetailComponent;
        let fixture: ComponentFixture<TechnicienAngularSDetailComponent>;
        let service: TechnicienAngularSService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestJhypsterTestModule],
                declarations: [TechnicienAngularSDetailComponent],
                providers: [
                    TechnicienAngularSService
                ]
            })
            .overrideTemplate(TechnicienAngularSDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(TechnicienAngularSDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(TechnicienAngularSService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new TechnicienAngularS(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.technicien).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
