/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestJhypsterTestModule } from '../../../test.module';
import { RessourceAngularSComponent } from '../../../../../../main/webapp/app/entities/ressource-angular-s/ressource-angular-s.component';
import { RessourceAngularSService } from '../../../../../../main/webapp/app/entities/ressource-angular-s/ressource-angular-s.service';
import { RessourceAngularS } from '../../../../../../main/webapp/app/entities/ressource-angular-s/ressource-angular-s.model';

describe('Component Tests', () => {

    describe('RessourceAngularS Management Component', () => {
        let comp: RessourceAngularSComponent;
        let fixture: ComponentFixture<RessourceAngularSComponent>;
        let service: RessourceAngularSService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestJhypsterTestModule],
                declarations: [RessourceAngularSComponent],
                providers: [
                    RessourceAngularSService
                ]
            })
            .overrideTemplate(RessourceAngularSComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(RessourceAngularSComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(RessourceAngularSService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new RessourceAngularS(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.ressources[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
