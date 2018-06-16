/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TestJhypsterTestModule } from '../../../test.module';
import { ModuleAngularSDetailComponent } from '../../../../../../main/webapp/app/entities/module-angular-s/module-angular-s-detail.component';
import { ModuleAngularSService } from '../../../../../../main/webapp/app/entities/module-angular-s/module-angular-s.service';
import { ModuleAngularS } from '../../../../../../main/webapp/app/entities/module-angular-s/module-angular-s.model';

describe('Component Tests', () => {

    describe('ModuleAngularS Management Detail Component', () => {
        let comp: ModuleAngularSDetailComponent;
        let fixture: ComponentFixture<ModuleAngularSDetailComponent>;
        let service: ModuleAngularSService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestJhypsterTestModule],
                declarations: [ModuleAngularSDetailComponent],
                providers: [
                    ModuleAngularSService
                ]
            })
            .overrideTemplate(ModuleAngularSDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(ModuleAngularSDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(ModuleAngularSService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new ModuleAngularS(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.module).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
