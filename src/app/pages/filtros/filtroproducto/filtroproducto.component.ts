import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { productoService } from 'src/app/servicio/producto.service';
import { Producto } from 'src/app/modelos/producto';

@Component({
  selector: 'app-filtroproducto',
  templateUrl: './filtroproducto.component.html',
  styleUrls: ['./filtroproducto.component.scss']
})
export class FiltroproductoComponent implements OnInit {

  @Output()
  resultado = new EventEmitter<Producto[]>();

  criterio: String;

  items: Producto[]

  constructor(private wsdl: productoService) { }

  ngOnInit() {
  }

  seleccionaruni() {
    this.resultado.emit(this.items);
  }

  async buscarProducto() {
    const crit = "(c.nombre like '%" + this.criterio + "%') AND c.activo=true";
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
