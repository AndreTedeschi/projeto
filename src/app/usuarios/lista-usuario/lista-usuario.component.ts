import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from '../usuario.model';
import { UsuarioService } from '../usuario.service';
import { Subscription, Observable } from 'rxjs';
@Component({
  selector: 'app-lista-usuario',
  templateUrl: './lista-usuario.component.html',
  styleUrls: ['./lista-usuario.component.css'],
})
export class ListaUsuarioComponent implements OnInit, OnDestroy {


  usuarios: Usuario[] = [];
  private usuariosSubscription: Subscription;
  public estaCarregando: boolean = false;
  constructor(public usuarioService: UsuarioService) {

  }

  ngOnInit(): void {
    this.estaCarregando = true;
    this.usuarioService.getUsuarios();
    this.usuariosSubscription = this.usuarioService
      .getListaDeUsuariosAtualizadaObservable()
      .subscribe((usuarios: Usuario[]) => {
        this.estaCarregando = false;
        this.usuarios = usuarios;
      });
  }

  onDelete (id: string){
    this.usuarioService.removerUsuario(id);
  }

  ngOnDestroy(): void {
    this.usuariosSubscription
  }
}
