/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestJhypsterTestModule } from '../../../test.module';
import { ModuleAngularSComponent } from '../../../../../../main/webapp/app/entities/module-angular-s/module-angular-s.component';
import { ModuleAngularSService } from '../../../../../../main/webapp/app/entities/module-angular-s/module-angular-s.service';
import { ModuleAngularS } from '../../../../../../main/webapp/app/entities/module-angular-s/module-angular-s.model';

describe('Component Tests', () => {

    describe('ModuleAngularS Management Component', () => {
        let comp: ModuleAngularSComponent;
        let fixture: ComponentFixture<ModuleAngularSComponent>;
        let service: ModuleAngularSService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestJhypsterTestModule],
                declarations: [ModuleAngularSComponent],
                providers: [
                    ModuleAngularSService
                ]
            })
            .overrideTemplate(ModuleAngularSComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ModuleAngularSComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ModuleAngularSService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new ModuleAngularS(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.modules[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
