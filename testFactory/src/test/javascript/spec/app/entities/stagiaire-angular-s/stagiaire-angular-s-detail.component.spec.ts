/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TestJhypsterTestModule } from '../../../test.module';
import { StagiaireAngularSDetailComponent } from '../../../../../../main/webapp/app/entities/stagiaire-angular-s/stagiaire-angular-s-detail.component';
import { StagiaireAngularSService } from '../../../../../../main/webapp/app/entities/stagiaire-angular-s/stagiaire-angular-s.service';
import { StagiaireAngularS } from '../../../../../../main/webapp/app/entities/stagiaire-angular-s/stagiaire-angular-s.model';

describe('Component Tests', () => {

    describe('StagiaireAngularS Management Detail Component', () => {
        let comp: StagiaireAngularSDetailComponent;
        let fixture: ComponentFixture<StagiaireAngularSDetailComponent>;
        let service: StagiaireAngularSService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestJhypsterTestModule],
                declarations: [StagiaireAngularSDetailComponent],
                providers: [
                    StagiaireAngularSService
                ]
            })
            .overrideTemplate(StagiaireAngularSDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StagiaireAngularSDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StagiaireAngularSService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new StagiaireAngularS(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.stagiaire).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
