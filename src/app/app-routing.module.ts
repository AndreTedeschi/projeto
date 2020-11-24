import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaLembreteComponent } from './lembretes/lista-lembrete/lista-lembrete.component';
import { InserirLembreteComponent } from './lembretes/inserir-lembrete/inserir-lembrete.component';
import { InserirUsuarioComponent } from './usuarios/inserir-usuario/inserir-usuario.component';
import { CadastroComponent } from './usuarios/cadastro/cadastro.component';

const routes: Routes = [
  {path: '', component: InserirUsuarioComponent},
  {path: 'lista', component: ListaLembreteComponent},
  {path: 'login', component: InserirUsuarioComponent},
  {path: 'editar/:idUsuario', component: InserirUsuarioComponent},
  { path: 'criar', component: InserirLembreteComponent},
  { path: 'editar/:idLembrete', component: InserirLembreteComponent},
  { path: 'cadastro', component: CadastroComponent},

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
