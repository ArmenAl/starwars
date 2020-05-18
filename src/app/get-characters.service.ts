import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class GetCharactersService {

  constructor(private http: HttpClient) { }

  getSwapi() {

  }
}
