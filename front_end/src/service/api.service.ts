import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/timeout';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';
import { ConfigService } from '../service/config.service';
import { ApiErrorHandler } from '../service/api.error.handle';
import { bindFunctionsToThis, isNullOrUndefined } from '../common/extensions';

@Injectable()
export class ApiService {
    private headers = new HttpHeaders();

    constructor(protected http: HttpClient,
                protected apiErrorHandler: ApiErrorHandler) {
        //bindFunctionsToThis(this);

        //let authToken = localStorage.getItem(localStorageKeys.authToken);

       
    }

    public get(url, paramsObj?, options = new ApiRequestOptions()): Observable<any> {
        let params = ApiService.getParamsFromObject(paramsObj);
        return this.http.get(`${ConfigService.config.apiAddress}${url}`, {params, headers: this.headers})
        .timeout(options.timeout)
            .map(response => ApiService.parseResponse(response, options))
            .share()
            .catch(this.handleError);
    }

    public put(url, body?, options = new ApiRequestOptions()): Observable<any> {
        return this.http.put(`${ConfigService.config.apiAddress}${url}`, body, {headers: this.headers})
            .timeout(options.timeout)
            .map(response => ApiService.parseResponse(response, options))
            .share()
            .catch(this.handleError);
    }

    public post(url, body?, options = new ApiRequestOptions()): Observable<any> {
        return this.http.post(`${ConfigService.config.apiAddress}${url}`, body, {headers: this.headers})
            .timeout(options.timeout)
            .map(response => ApiService.parseResponse(response, options))
            .share()
            .catch(this.handleError);
    }

    public delete(url, paramsObj?, options = new ApiRequestOptions()): Observable<any> {
        let params = ApiService.getParamsFromObject(paramsObj);

        return this.http.delete(`${ConfigService.config.apiAddress}${url}`, {params, headers: this.headers})
            .timeout(options.timeout)
            .share()
            .catch(this.handleError);
    }

    

   

    private handleError(error) {
        this.apiErrorHandler.handle(error);
        return Observable.throw(error);
    }

    private static parseResponse(response, options: ApiRequestOptions): any {
        if (!response) {
            return response;
        }

        return options.isJson && response.hasOwnProperty('_body')
            ? response['_body'] ? response.json() : null
            : response;
    }

    private static getParamsFromObject(paramsObj: any) {
        let urlSearchParams = new HttpParams();

        if (paramsObj) {
            for (let key in paramsObj) {
                if (paramsObj.hasOwnProperty(key)) {
                    let paramValue = paramsObj[key];

                    if (paramValue instanceof Date) {
                        paramsObj[key] = paramsObj[key].toISOString();
                    }

                    if (isNullOrUndefined(paramValue)) {
                        delete paramsObj[key];
                    } else {
                        urlSearchParams = urlSearchParams.set(key, paramsObj[key]);
                    }
                }
            }
        }

        return urlSearchParams;
    }
}

export class ApiRequestOptions {
    public isJson? = true;
    public timeout = 60 * 1000;
}