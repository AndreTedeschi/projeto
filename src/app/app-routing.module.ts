import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaLembreteComponent } from './lembretes/lista-lembrete/lista-lembrete.component';
import { InserirLembreteComponent } from './lembretes/inserir-lembrete/inserir-lembrete.component';

const routes: Routes = [
  {path: '', component: ListaLembreteComponent},
  { path: 'criar', component: InserirLembreteComponent },
  { path: 'editar/:idLembrete', component: InserirLembreteComponent }
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
