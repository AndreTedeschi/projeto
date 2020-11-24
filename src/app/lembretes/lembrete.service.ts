import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Lembrete } from './lembrete.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LembreteService {

  private lembretes: Lembrete[] = [];
  private listaLembretesAtualizada = new Subject<Lembrete[]>();

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {

  }

  adicionarLembrete(datafin: string, descricao: string, criado: string): void {
    const lembrete: Lembrete = {
      id: null,
      datafin: datafin,
      criado: criado,
      descricao: descricao,
    };
    this.httpClient.post<{ mensagem: string, id: string }>(
      'http://localhost:3000/api/lembretes',
      lembrete
    ).subscribe((dados) => {
      console.log(dados.mensagem)
      lembrete.id = dados.id;
      this.lembretes.push(lembrete);
      this.listaLembretesAtualizada.next([...this.lembretes]);
      this.router.navigate(['/lista']);
    })
  }

  atualizarLembrete(id: string, datafin: string, descricao: string, criado: string) {
    const lembrete: Lembrete = { id, datafin, descricao, criado };
    this.httpClient.put(`http://localhost:3000/api/lembretes/${id}`, lembrete)
      .subscribe((res => {
        const copia = [...this.lembretes];
        const indice = copia.findIndex(lem => lem.id === lembrete.id);
        copia[indice] = lembrete;
        this.lembretes = copia;
        this.listaLembretesAtualizada.next([...this.lembretes]);
        this.router.navigate(['/lista']);
      }));
  }

  removerLembrete (id: string): void{
    this.httpClient.delete(`http://localhost:3000/api/lembretes/${id}`)
    .subscribe(() => {
      console.log ("Remoção feita com sucesso")
      this.lembretes = this.lembretes.filter((lem) =>{
        return lem.id !== id
      })
      this.listaLembretesAtualizada.next([...this.lembretes]);
      this.router.navigate(['/lista']);
    });
  }

  getLembrete(idLembrete: string) {
    return this.httpClient.get<{
      _id: string, datafin: string, descricao: string, criado: string
    }>(`http://localhost:3000/api/lembretes/${idLembrete}`);
  }

  getLembretes(): void {
    this.httpClient.get<{mensagem : string, lembretes: any}>(
      'http://localhost:3000/api/lembretes'
    )
    .pipe(map((dados) => {
      return dados.lembretes.map(lem => {
        return {
          id: lem._id,
          datafin: lem.datafin,
          criado: lem.criado,
          descricao: lem.descricao,
        }
      })
    }))
    .subscribe((lembretes) => {
      this.lembretes = lembretes
      this.listaLembretesAtualizada.next([...this.lembretes])
    })
  }

  getListaDeLembretesAtualizadaObservable() {
    return this.listaLembretesAtualizada.asObservable();
  }



}
