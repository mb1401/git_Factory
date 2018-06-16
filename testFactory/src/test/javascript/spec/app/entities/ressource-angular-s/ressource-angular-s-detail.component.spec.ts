/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TestJhypsterTestModule } from '../../../test.module';
import { RessourceAngularSDetailComponent } from '../../../../../../main/webapp/app/entities/ressource-angular-s/ressource-angular-s-detail.component';
import { RessourceAngularSService } from '../../../../../../main/webapp/app/entities/ressource-angular-s/ressource-angular-s.service';
import { RessourceAngularS } from '../../../../../../main/webapp/app/entities/ressource-angular-s/ressource-angular-s.model';

describe('Component Tests', () => {

    describe('RessourceAngularS Management Detail Component', () => {
        let comp: RessourceAngularSDetailComponent;
        let fixture: ComponentFixture<RessourceAngularSDetailComponent>;
        let service: RessourceAngularSService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestJhypsterTestModule],
                declarations: [RessourceAngularSDetailComponent],
                providers: [
                    RessourceAngularSService
                ]
            })
            .overrideTemplate(RessourceAngularSDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RessourceAngularSDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RessourceAngularSService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new RessourceAngularS(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.ressource).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
