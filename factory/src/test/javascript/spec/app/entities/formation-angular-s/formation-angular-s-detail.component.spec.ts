/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { FactoryTestModule } from '../../../test.module';
import { FormationAngularSDetailComponent } from '../../../../../../main/webapp/app/entities/formation-angular-s/formation-angular-s-detail.component';
import { FormationAngularSService } from '../../../../../../main/webapp/app/entities/formation-angular-s/formation-angular-s.service';
import { FormationAngularS } from '../../../../../../main/webapp/app/entities/formation-angular-s/formation-angular-s.model';

describe('Component Tests', () => {

    describe('FormationAngularS Management Detail Component', () => {
        let comp: FormationAngularSDetailComponent;
        let fixture: ComponentFixture<FormationAngularSDetailComponent>;
        let service: FormationAngularSService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FactoryTestModule],
                declarations: [FormationAngularSDetailComponent],
                providers: [
                    FormationAngularSService
                ]
            })
            .overrideTemplate(FormationAngularSDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(FormationAngularSDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(FormationAngularSService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new FormationAngularS(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.formation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
