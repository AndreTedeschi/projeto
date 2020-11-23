import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaLembreteComponent } from './lembretes/lista-lembrete/lista-lembrete.component';
import { InserirLembreteComponent } from './lembretes/inserir-lembrete/inserir-lembrete.component';
import { InserirUsuarioComponent } from './usuarios/inserir-usuario/inserir-usuario.component';
import { ListaUsuarioComponent } from './usuarios/lista-usuario/lista-usuario.component';

const routes: Routes = [
  {path: '', component: ListaUsuarioComponent},
  {path: 'login', component: InserirUsuarioComponent},
  {path: 'editar/:idUsuario', component: InserirUsuarioComponent},
  {path: '', component: ListaLembreteComponent},
  { path: 'criar', component: InserirLembreteComponent},
  { path: 'editar/:idLembrete', component: InserirLembreteComponent}
]

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule{

}
