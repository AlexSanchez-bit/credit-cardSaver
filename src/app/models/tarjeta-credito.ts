export class TarjetaCredito {

  id?: string;
  titular: string;
  num_tarjeta: string;
  fechaExpiracion: string;
  cvv: number;
  fechaCreacion: Date;
  fechaActualizacion: Date;

  constructor(titular: string, num_tarjeta: string, fechaExpiracion: string, cvv: number) {
    this.titular = titular;
    this.num_tarjeta = num_tarjeta;
    this.fechaExpiracion = fechaExpiracion;
    this.cvv = cvv;
    this.fechaCreacion = new Date();
    this.fechaActualizacion = new Date();
  }

  object() {
    return {
      titular: this.titular,
      num_tarjeta: this.num_tarjeta,
      fechaExpiracion: this.fechaExpiracion,
      fechaCreacion: this.fechaCreacion,
      fechaActualizacion: this.fechaActualizacion,
      cvv: this.cvv
    }

  }

}
