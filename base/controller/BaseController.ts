/// <reference types = "cypress"/>
import {HttpMethod, IResponse} from "../model/IResponse";
import Response = Cypress.Response;
import {AUTHORIZATION, CONTENT_TYPE, CONTENT_TYPE_APPLICATION_JSON, SLASH} from "../constant/constant";

export class BaseController {
    private method: string = (<string>HttpMethod.GET);
    private baseUrl: string = '';
    private readonly version: string;
    private readonly entity: string;
    private path: string;
    private url: string;
    private token: string = null;
    private body: {} = null; // Json Object
    private headers: {} = {}; // Json Object
    private queries: {} = null; // Json Object

    constructor(version: string, entity: string) {
        this.version = version;
        this.entity = entity;
    }

    resetAll() {
        this.headers = {};
        this.queries = null;
        this.body = null;
    }

    setMethod(method: HttpMethod) {
        this.resetAll();
        this.method = (<string>method);
        return this;
    }

    setBaseUrl(baseUrl: string) {
        this.baseUrl = baseUrl;
        return this;
    }

    setPath(path: string) {
        this.path = path;
        return this;
    }

    setBody(body: any) {
        this.body = body;
        return this;
    }

    setQuery(query: any) {
        this.queries = query;
        return this;
    }

    private buildQueryParams() {
        let q = '';
        let and = '';
        if (this.queries) {
            q = '?';
            Object.keys(this.queries).forEach((key) => {
                q = q + and + key + '=' + this.queries[key];
                and = '&';
            })
        }
        this.queries = q;
    }

    private getToken() {
        this.token = Cypress.env('token');
    }

    private buildHeaders() {
        if (this.token) {
            this.headers[AUTHORIZATION] = this.token
        }
        this.headers[CONTENT_TYPE] = CONTENT_TYPE_APPLICATION_JSON;
    }

    private buildUrl() {
        this.url = this.baseUrl + SLASH;
        if (this.version) {
            this.url += this.version + SLASH;
        }
        this.url += this.entity + SLASH + this.path + this.queries;
    }

    build() {
        this.getToken();
        this.buildQueryParams();
        this.buildUrl();
        this.buildHeaders();
        return this;
    }

    async request(): Promise<IResponse> {
        return new Cypress.Promise((resolve, reject) => {
            cy.request(
                {
                    method: this.method,
                    url: this.url,
                    body: this.body,
                    headers: this.headers
                }
            ).then((response: Response<IResponse>) => {
                expect(response.status).to.equal(200);
                resolve(response.body);
            });
        })
    }
}