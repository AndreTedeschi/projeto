import { Component, OnInit} from '@angular/core';
import { FormGroup, FormControl, NgForm, Validators } from '@angular/forms';
import { UsuarioService } from '../usuario.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Usuario } from '../usuario.model';
@Component({
  selector: 'app-inserir-usuario',
  templateUrl: './inserir-usuario.component.html',
  styleUrls: ['./inserir-usuario.component.css'],
})
export class InserirUsuarioComponent implements OnInit{

  private modo: string = "criar";
  private idUsuario: string;
  public usuario: Usuario;
  public estaCarregando: boolean = false;
  public form: FormGroup;

  ngOnInit() {
    this.form = new FormGroup({
      login: new FormControl(null, {validators: [Validators.required]}),
      senha: new FormControl(null, {validators: [Validators.required]}),
    });

    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("idUsuario")) {
        this.modo = "editar";
        this.idUsuario = paramMap.get("idUsuario");
        this.estaCarregando = true;
        this.usuarioService.getUsuario(this.idUsuario).subscribe(dadosUsu => {
          this.estaCarregando = false;
          this.usuario = {
            id: dadosUsu._id,
            login: dadosUsu.login,
            senha: dadosUsu.senha,
          };

          this.form.setValue({
            login: this.usuario.login,
            senha: this.usuario.senha,
          })

          console.log(this.form);
        });
      }
      else {
        this.modo = "criar";
        this.idUsuario = null;
      }
    });
  }
  constructor (
    public usuarioService: UsuarioService,
    public route: ActivatedRoute
  ){ }

  onSalvarUsuario() {
    if (this.form.invalid) {
      return;
    }
    this.estaCarregando = true;
    if (this.modo === "criar") {
      this.usuarioService.adicionarUsuario(
        this.form.value.login,
        this.form.value.senha,
      );
    }
    else {
      this.usuarioService.atualizarUsuario(
        this.idUsuario,
        this.form.value.login,
        this.form.value.senha,
      )
    }
    this.form.reset();
  }
}
