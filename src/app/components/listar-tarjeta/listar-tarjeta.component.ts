import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TarjetaCredito } from 'src/app/models/tarjeta-credito';
import { TarjetaService } from 'src/app/services/tarjeta.service';

@Component({
  selector: 'app-listar-tarjeta',
  templateUrl: './listar-tarjeta.component.html',
  styleUrls: ['./listar-tarjeta.component.css']
})
export class ListarTarjetaComponent {

  tarjetas: { tarjeta: TarjetaCredito, id: string }[];
  loading = true;

  constructor(private _tarjetas: TarjetaService, private toaster: ToastrService) {
    this.tarjetas = [];
    _tarjetas.getTarjetas().subscribe(data => {
      this.loading = false;

      const newArr: { tarjeta: TarjetaCredito, id: string }[] = []
      data.forEach((element: any) => {
        const temp: TarjetaCredito = element.data();
        temp.id = element.id;
        newArr.push({ tarjeta: temp, id: element.id })
      });

      this.tarjetas = newArr.sort((t1, t2) => {
        return t1.tarjeta.fechaCreacion < t2.tarjeta.fechaCreacion ? 1 : -1;
      });
    }, _err => {
      this.toaster.error('por favor revisa tu conexion a internet', 'error de conexion')
    })
  }


  eliminarTarjeta(id: string) {
    this._tarjetas.removeTarjeta(id)
      .then(dat => {
        this.toaster.success('Eliminado con exito', 'Eliminado')
      },
        err => {
          this.toaster.error('por favor revisa tu conexion a internet', 'error de conexion')
        });
  }

  editarTarjeta(tarjeta: TarjetaCredito) {
    this._tarjetas.addTarjetaEdit(tarjeta);
  }
}
