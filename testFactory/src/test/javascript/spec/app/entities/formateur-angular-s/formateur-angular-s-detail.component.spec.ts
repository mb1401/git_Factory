/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TestJhypsterTestModule } from '../../../test.module';
import { FormateurAngularSDetailComponent } from '../../../../../../main/webapp/app/entities/formateur-angular-s/formateur-angular-s-detail.component';
import { FormateurAngularSService } from '../../../../../../main/webapp/app/entities/formateur-angular-s/formateur-angular-s.service';
import { FormateurAngularS } from '../../../../../../main/webapp/app/entities/formateur-angular-s/formateur-angular-s.model';

describe('Component Tests', () => {

    describe('FormateurAngularS Management Detail Component', () => {
        let comp: FormateurAngularSDetailComponent;
        let fixture: ComponentFixture<FormateurAngularSDetailComponent>;
        let service: FormateurAngularSService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestJhypsterTestModule],
                declarations: [FormateurAngularSDetailComponent],
                providers: [
                    FormateurAngularSService
                ]
            })
            .overrideTemplate(FormateurAngularSDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FormateurAngularSDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FormateurAngularSService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new FormateurAngularS(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.formateur).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
