/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FactoryTestModule } from '../../../test.module';
import { SalleAngularSDetailComponent } from '../../../../../../main/webapp/app/entities/salle-angular-s/salle-angular-s-detail.component';
import { SalleAngularSService } from '../../../../../../main/webapp/app/entities/salle-angular-s/salle-angular-s.service';
import { SalleAngularS } from '../../../../../../main/webapp/app/entities/salle-angular-s/salle-angular-s.model';

describe('Component Tests', () => {

    describe('SalleAngularS Management Detail Component', () => {
        let comp: SalleAngularSDetailComponent;
        let fixture: ComponentFixture<SalleAngularSDetailComponent>;
        let service: SalleAngularSService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FactoryTestModule],
                declarations: [SalleAngularSDetailComponent],
                providers: [
                    SalleAngularSService
                ]
            })
            .overrideTemplate(SalleAngularSDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(SalleAngularSDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(SalleAngularSService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new SalleAngularS(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.salle).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
