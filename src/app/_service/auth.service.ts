import { Injectable } from '@angular/core';
import {ApiCallInterface} from "../_interface/api-call.interface";
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  headers = new HttpHeaders({
    'Content-Type': 'application/json',
  });
  options = { headers: this.headers };

  postLoginUser(bodyNoJson: any, url: string): Observable<ApiCallInterface> {

    const body = JSON.stringify(bodyNoJson);

    return this.http.post<ApiCallInterface>(url+"/login_user/", body, this.options);

  }

  postLoginToken(token: string, url: string): Observable<ApiCallInterface> {
    let bodyNoJson: any = {
      "token":token,
    };
    const body = JSON.stringify(bodyNoJson);

    return this.http.post<ApiCallInterface>(url+"/login_token/", body, this.options);
  }

}
