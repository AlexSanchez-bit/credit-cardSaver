import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/tarjeta-credito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-agregar-tarjeta',
  templateUrl: './agregar-tarjeta.component.html',
  styleUrls: ['./agregar-tarjeta.component.css']
})
export class AgregarTarjetaComponent {
  form: FormGroup;
  loading: boolean = false;
  title = 'Crear Tarjeta';
  id: string | undefined;

  constructor(private formbuilder: FormBuilder,
    private _tarjetaService: TarjetaService,
    private toastr: ToastrService) {
    //creando el handler del formulario
    this.form = formbuilder.group({
      titular: ['', Validators.required],
      numerotarjeta: ['', [Validators.required, Validators.minLength(16), Validators.maxLength(16)]],
      fechaExpiracion: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });

    //suscribiendo al evento de editar tarjetas de credito
    this._tarjetaService.getTarjetaEdit().subscribe(data => {
      this.modoEdicion(data);
    })

  }


  crearTarjeta(): void {
    const tarjeta = new TarjetaCredito(this.form.value.titular,
      this.form.value.numerotarjeta, this.form.value.fechaExpiracion, this.form.value.cvv);
    this.loading = true;

    if (!this.id) {
      this._tarjetaService.storeTarjeta(tarjeta).
        then(this.commonResponse, this.commonError);
    } else {
      this._tarjetaService.editTarjeta(this.id!, tarjeta).
        then(data => {
          this.id = undefined;
          this.title = 'crear tarjeta';
          this.commonResponse();
        }, this.commonError);
    }
  }

  commonResponse() {
    this.toastr.success('tarjeta registrada con exito', 'tarjeta registrada');
    this.form.reset();
    this.loading = false;
  }

  commonError() {
    this.toastr.success('ha ocurrido un error', 'Error');
    this.loading = true;
  }

  modoEdicion(tarjeta: TarjetaCredito) {
    this.title = "Editar Tarjeta";
    this.id = tarjeta.id
    this.form.setValue({
      titular: tarjeta.titular,
      numerotarjeta: tarjeta.num_tarjeta,
      fechaExpiracion: tarjeta.fechaExpiracion,
      cvv: tarjeta.cvv
    }
    );
  }


}
