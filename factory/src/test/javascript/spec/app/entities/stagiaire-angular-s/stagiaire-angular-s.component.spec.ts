/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FactoryTestModule } from '../../../test.module';
import { StagiaireAngularSComponent } from '../../../../../../main/webapp/app/entities/stagiaire-angular-s/stagiaire-angular-s.component';
import { StagiaireAngularSService } from '../../../../../../main/webapp/app/entities/stagiaire-angular-s/stagiaire-angular-s.service';
import { StagiaireAngularS } from '../../../../../../main/webapp/app/entities/stagiaire-angular-s/stagiaire-angular-s.model';

describe('Component Tests', () => {

    describe('StagiaireAngularS Management Component', () => {
        let comp: StagiaireAngularSComponent;
        let fixture: ComponentFixture<StagiaireAngularSComponent>;
        let service: StagiaireAngularSService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FactoryTestModule],
                declarations: [StagiaireAngularSComponent],
                providers: [
                    StagiaireAngularSService
                ]
            })
            .overrideTemplate(StagiaireAngularSComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(StagiaireAngularSComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(StagiaireAngularSService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new StagiaireAngularS(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.stagiaires[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
