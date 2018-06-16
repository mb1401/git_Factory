/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TestJhypsterTestModule } from '../../../test.module';
import { VideoProjecteurAngularSComponent } from '../../../../../../main/webapp/app/entities/video-projecteur-angular-s/video-projecteur-angular-s.component';
import { VideoProjecteurAngularSService } from '../../../../../../main/webapp/app/entities/video-projecteur-angular-s/video-projecteur-angular-s.service';
import { VideoProjecteurAngularS } from '../../../../../../main/webapp/app/entities/video-projecteur-angular-s/video-projecteur-angular-s.model';

describe('Component Tests', () => {

    describe('VideoProjecteurAngularS Management Component', () => {
        let comp: VideoProjecteurAngularSComponent;
        let fixture: ComponentFixture<VideoProjecteurAngularSComponent>;
        let service: VideoProjecteurAngularSService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestJhypsterTestModule],
                declarations: [VideoProjecteurAngularSComponent],
                providers: [
                    VideoProjecteurAngularSService
                ]
            })
            .overrideTemplate(VideoProjecteurAngularSComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VideoProjecteurAngularSComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VideoProjecteurAngularSService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new VideoProjecteurAngularS(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.videoProjecteurs[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
