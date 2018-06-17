/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { FactoryTestModule } from '../../../test.module';
import { UtilisateurAngularSComponent } from '../../../../../../main/webapp/app/entities/utilisateur-angular-s/utilisateur-angular-s.component';
import { UtilisateurAngularSService } from '../../../../../../main/webapp/app/entities/utilisateur-angular-s/utilisateur-angular-s.service';
import { UtilisateurAngularS } from '../../../../../../main/webapp/app/entities/utilisateur-angular-s/utilisateur-angular-s.model';

describe('Component Tests', () => {

    describe('UtilisateurAngularS Management Component', () => {
        let comp: UtilisateurAngularSComponent;
        let fixture: ComponentFixture<UtilisateurAngularSComponent>;
        let service: UtilisateurAngularSService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [FactoryTestModule],
                declarations: [UtilisateurAngularSComponent],
                providers: [
                    UtilisateurAngularSService
                ]
            })
            .overrideTemplate(UtilisateurAngularSComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UtilisateurAngularSComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UtilisateurAngularSService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new UtilisateurAngularS(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.utilisateurs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
