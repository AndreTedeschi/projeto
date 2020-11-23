import { Component, OnInit, OnDestroy } from '@angular/core';
import { Lembrete } from '../lembrete.model';
import { LembreteService } from '../lembrete.service';
import { Subscription, Observable } from 'rxjs';
@Component({
  selector: 'app-lista-lembrete',
  templateUrl: './lista-lembrete.component.html',
  styleUrls: ['./lista-lembrete.component.css'],
})
export class ListaLembreteComponent implements OnInit, OnDestroy {


  lembretes: Lembrete[] = [];
  private lembretesSubscription: Subscription;
  public estaCarregando: boolean = false;
  constructor(public lembreteService: LembreteService) {

  }

  ngOnInit(): void {
    this.estaCarregando = true;
    this.lembreteService.getLembretes();
    this.lembretesSubscription = this.lembreteService
      .getListaDeLembretesAtualizadaObservable()
      .subscribe((lembretes: Lembrete[]) => {
        this.estaCarregando = false;
        this.lembretes = lembretes;
      });
  }

  onDelete (id: string){
    this.lembreteService.removerLembrete(id);
  }

  ngOnDestroy(): void {
    this.lembretesSubscription
  }
}
