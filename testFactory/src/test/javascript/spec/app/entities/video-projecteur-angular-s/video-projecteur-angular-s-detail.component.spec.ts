/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { TestJhypsterTestModule } from '../../../test.module';
import { VideoProjecteurAngularSDetailComponent } from '../../../../../../main/webapp/app/entities/video-projecteur-angular-s/video-projecteur-angular-s-detail.component';
import { VideoProjecteurAngularSService } from '../../../../../../main/webapp/app/entities/video-projecteur-angular-s/video-projecteur-angular-s.service';
import { VideoProjecteurAngularS } from '../../../../../../main/webapp/app/entities/video-projecteur-angular-s/video-projecteur-angular-s.model';

describe('Component Tests', () => {

    describe('VideoProjecteurAngularS Management Detail Component', () => {
        let comp: VideoProjecteurAngularSDetailComponent;
        let fixture: ComponentFixture<VideoProjecteurAngularSDetailComponent>;
        let service: VideoProjecteurAngularSService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [TestJhypsterTestModule],
                declarations: [VideoProjecteurAngularSDetailComponent],
                providers: [
                    VideoProjecteurAngularSService
                ]
            })
            .overrideTemplate(VideoProjecteurAngularSDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VideoProjecteurAngularSDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VideoProjecteurAngularSService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new VideoProjecteurAngularS(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.videoProjecteur).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
