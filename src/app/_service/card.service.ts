import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {ApiCallInterface} from "../_interface/api-call.interface";

@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private http: HttpClient) {}

  getMyCards(url: string, option: {headers: HttpHeaders}): Observable<ApiCallInterface> {
    return this.http.get<ApiCallInterface>(url+"/cards", option);
  }

}
