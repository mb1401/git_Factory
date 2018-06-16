/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestJhypsterTestModule } from '../../../test.module';
import { MatiereAngularSComponent } from '../../../../../../main/webapp/app/entities/matiere-angular-s/matiere-angular-s.component';
import { MatiereAngularSService } from '../../../../../../main/webapp/app/entities/matiere-angular-s/matiere-angular-s.service';
import { MatiereAngularS } from '../../../../../../main/webapp/app/entities/matiere-angular-s/matiere-angular-s.model';

describe('Component Tests', () => {

    describe('MatiereAngularS Management Component', () => {
        let comp: MatiereAngularSComponent;
        let fixture: ComponentFixture<MatiereAngularSComponent>;
        let service: MatiereAngularSService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestJhypsterTestModule],
                declarations: [MatiereAngularSComponent],
                providers: [
                    MatiereAngularSService
                ]
            })
            .overrideTemplate(MatiereAngularSComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(MatiereAngularSComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(MatiereAngularSService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new MatiereAngularS(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.matieres[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
