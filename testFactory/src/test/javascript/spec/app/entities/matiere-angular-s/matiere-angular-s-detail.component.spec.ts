/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TestJhypsterTestModule } from '../../../test.module';
import { MatiereAngularSDetailComponent } from '../../../../../../main/webapp/app/entities/matiere-angular-s/matiere-angular-s-detail.component';
import { MatiereAngularSService } from '../../../../../../main/webapp/app/entities/matiere-angular-s/matiere-angular-s.service';
import { MatiereAngularS } from '../../../../../../main/webapp/app/entities/matiere-angular-s/matiere-angular-s.model';

describe('Component Tests', () => {

    describe('MatiereAngularS Management Detail Component', () => {
        let comp: MatiereAngularSDetailComponent;
        let fixture: ComponentFixture<MatiereAngularSDetailComponent>;
        let service: MatiereAngularSService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestJhypsterTestModule],
                declarations: [MatiereAngularSDetailComponent],
                providers: [
                    MatiereAngularSService
                ]
            })
            .overrideTemplate(MatiereAngularSDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MatiereAngularSDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MatiereAngularSService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new MatiereAngularS(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.matiere).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
