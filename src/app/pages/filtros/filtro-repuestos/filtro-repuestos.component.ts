import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Repuestos } from 'src/app/modelos/repuesto';
import { repuestoService } from 'src/app/servicio/repuesto.service';

@Component({
  selector: 'app-filtro-repuestos',
  templateUrl: './filtro-repuestos.component.html',
  styleUrls: ['./filtro-repuestos.component.scss']
})
export class FiltroRepuestosComponent implements OnInit {

  @Output()
  resultado = new EventEmitter<Repuestos[]>();

  criterio: String;

  items: Repuestos[]

  constructor(private wsdl: repuestoService) { }

  ngOnInit() {
  }

  seleccionarmodel() {
    this.resultado.emit(this.items);
  }

  async buscarRepuestos() {
    const crit = "(c.nombre like '%" + this.criterio + "%' or c.Repuestos.nombre like '%" + this.criterio + "%') AND c.activo=true";
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
