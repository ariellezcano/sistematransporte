import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { proveedorService } from 'src/app/servicio/proveedor.service';
import { Proveedor } from 'src/app/modelos/proveedor';

@Component({
  selector: 'app-filtroproveedor',
  templateUrl: './filtroproveedor.component.html',
  styleUrls: ['./filtroproveedor.component.scss']
})
export class FiltroproveedorComponent implements OnInit {

  @Output()
  resultado = new EventEmitter<Proveedor[]>();

  criterio: String;

  items: Proveedor[]

  constructor(private wsdl: proveedorService) { }

  ngOnInit() {
  }

  seleccionaruni() {
    this.resultado.emit(this.items);
  }

  async buscarProveedor() {
    const crit = "(c.nombre like '%" + this.criterio + "%' or c.cuit like '%" + this.criterio + "%') AND c.activo=true";
    let data = await this.wsdl.doCriteria(crit, false, null, " ORDER BY c.nombre ASC", 1, 100).then();

    const result = JSON.parse(JSON.stringify(data));
    // alert(JSON.stringify(data))
    if (result.status === 200) {
      this.items = result.data;


    } else if (result.status === 666) {
      // logout app o refresh token
      this.items = [];

    } else {
      //  this.persona = new Persona();
      this.items = [];
    }
    this.resultado.emit(this.items);
  }
}
