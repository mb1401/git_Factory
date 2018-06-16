import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { ModuleAngularS } from './module-angular-s.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<ModuleAngularS>;

@Injectable()
export class ModuleAngularSService {

    private resourceUrl =  SERVER_API_URL + 'api/modules';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(module: ModuleAngularS): Observable<EntityResponseType> {
        const copy = this.convert(module);
        return this.http.post<ModuleAngularS>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(module: ModuleAngularS): Observable<EntityResponseType> {
        const copy = this.convert(module);
        return this.http.put<ModuleAngularS>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<ModuleAngularS>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<ModuleAngularS[]>> {
        const options = createRequestOption(req);
        return this.http.get<ModuleAngularS[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<ModuleAngularS[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: ModuleAngularS = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<ModuleAngularS[]>): HttpResponse<ModuleAngularS[]> {
        const jsonResponse: ModuleAngularS[] = res.body;
        const body: ModuleAngularS[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to ModuleAngularS.
     */
    private convertItemFromServer(module: ModuleAngularS): ModuleAngularS {
        const copy: ModuleAngularS = Object.assign({}, module);
        copy.dateDebut = this.dateUtils
            .convertDateTimeFromServer(module.dateDebut);
        copy.dateFin = this.dateUtils
            .convertDateTimeFromServer(module.dateFin);
        return copy;
    }

    /**
     * Convert a ModuleAngularS to a JSON which can be sent to the server.
     */
    private convert(module: ModuleAngularS): ModuleAngularS {
        const copy: ModuleAngularS = Object.assign({}, module);

        copy.dateDebut = this.dateUtils.toDate(module.dateDebut);

        copy.dateFin = this.dateUtils.toDate(module.dateFin);
        return copy;
    }
}
