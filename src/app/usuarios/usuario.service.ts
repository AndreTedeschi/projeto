import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { Usuario } from './usuario.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  private usuarios: Usuario[] = [];
  private listaUsuariosAtualizada = new Subject<Usuario[]>();

  constructor(
    private httpClient: HttpClient,
    private router: Router
  ) {

  }

  login(login: string, senha: string): void {
    const usuario: Usuario = {
      id: null,
      login: login,
      senha: senha
    }
    this.httpClient.post<{ mensagem: string, id: string }>(
      'http://localhost:3000/api/usuarios/login',
      usuario
    ).subscribe((dados) => {
      console.log(dados.mensagem)
      usuario.id = dados.id;
      this.router.navigate(['/criar']);
    })
  }


  adicionarUsuario(login: string, senha: string): void {
    const usuario: Usuario = {
      id: null,
      login: login,
      senha: senha,
    };
    this.httpClient.post<{ mensagem: string, id: string }>(
      'http://localhost:3000/api/usuarios',
      usuario
    ).subscribe((dados) => {
      console.log(dados.mensagem)
      usuario.id = dados.id;
      this.usuarios.push(usuario);
      this.listaUsuariosAtualizada.next([...this.usuarios]);
      this.router.navigate(['/']);
    })
  }

  getUsuario(idUsuario: string) {
    return this.httpClient.get<{
      _id: string, login: string, senha: string
    }>(`http://localhost:3000/api/usuarios/${idUsuario}`);
  }

  getUsuarios(): void {
    this.httpClient.get<{mensagem : string, usuarios: any}>(
      'http://localhost:3000/api/usuarios'
    )
    .pipe(map((dados) => {
      return dados.usuarios.map(usu => {
        return {
          id: usu._id,
          login: usu.login,
          senha: usu.senha
        }
      })
    }))
    .subscribe((usuarios) => {
      this.usuarios = usuarios
      this.listaUsuariosAtualizada.next([...this.usuarios])
    })
  }

  getListaDeUsuariosAtualizadaObservable() {
    return this.listaUsuariosAtualizada.asObservable();
  }



}
