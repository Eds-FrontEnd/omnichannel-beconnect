import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';  // Para fazer requisições HTTP
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OmnichannelService {

  private apiUrl = 'http://localhost:3000';  // URL do servidor Node.js

  constructor(private http: HttpClient) { }

  // Método para obter o conteúdo baseado no nome (como 'redes-sociais', 'loja-virtual', etc.)
  getContent(contentType: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${contentType}`);
  }
}
