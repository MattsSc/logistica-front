export class Order {
  public orden_id: string;
  public cliente: Cliente;
  public origen: Origen;
  public peso_total: number;
  public fecha_recibido: string;
  public fecha_entregado: string;
  public estado: string;

  constructor() {
    this.cliente = new Cliente();
    this.origen = new Origen();
  }
}

export class Origen {
  public id: string;
  public nombre: string;
  public direccion: string;
  public email: string;
  public dni: number;
}

export class Cliente {
  public nombre: string;
  public apellido: string;
  public direccion: string;
  public email: string;
  public dni: number;
}
