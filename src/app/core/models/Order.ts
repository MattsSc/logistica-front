export class Order {
  public orden_id: string;
  public cliente: Cliente;
  public user_id: number;
  public peso_total: number;
  public fecha_recibido: string;
  public fecha_entregado: string;
  public estado: string;

}

export class Cliente {
  public nombre: string;
  public direccion: string;
  public email: string;
  public dni: number;
}
