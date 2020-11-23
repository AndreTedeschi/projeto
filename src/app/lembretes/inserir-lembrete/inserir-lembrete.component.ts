import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { LembreteService } from '../lembrete.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Lembrete } from '../lembrete.model';
@Component({
  selector: 'app-inserir-lembrete',
  templateUrl: './inserir-lembrete.component.html',
  styleUrls: ['./inserir-lembrete.component.css'],
})
export class InserirLembreteComponent implements OnInit{

  private modo: string = "criar";
  private idLembrete: string;
  public lembrete: Lembrete;
  public estaCarregando: boolean = false;
  public form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      datafin: new FormControl(null, {validators: [Validators.required]}),
      criado: new FormControl(null, {validators: [Validators.required]}),
      descricao: new FormControl (null, {validators: [Validators.required, Validators.minLength(3)]}),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idLembrete")) {
        this.modo = "editar";
        this.idLembrete = paramMap.get("idLembrete");
        this.estaCarregando = true;
        this.lembreteService.getLembrete(this.idLembrete).subscribe(dadosLem => {
          this.estaCarregando = false;
          this.lembrete = {
            id: dadosLem._id,
            datafin: dadosLem.datafin,
            criado: dadosLem.criado,
            descricao: dadosLem.descricao
          };

          this.form.setValue({
            datafin: this.lembrete.datafin,
            criado: this.lembrete.criado,
            descricao: this.lembrete.descricao,
          })

          console.log(this.form);
        });
      }
      else {
        this.modo = "criar";
        this.idLembrete = null;
      }
    });
  }
  constructor (
    public lembreteService: LembreteService,
    public route: ActivatedRoute
  ){ }

  onSalvarLembrete() {
    if (this.form.invalid) {
      return;
    }
    this.estaCarregando = true;
    if (this.modo === "criar") {
      this.lembreteService.adicionarLembrete(
        this.form.value.datafin,
        this.form.value.criado,
        this.form.value.descricao
      );
    }
    else {
      this.lembreteService.atualizarLembrete(
        this.idLembrete,
        this.form.value.datafin,
        this.form.value.criado,
        this.form.value.descricao
      )
    }
    this.form.reset();
  }
}
