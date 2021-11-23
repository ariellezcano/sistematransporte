import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { tipoReparacionService } from 'src/app/servicio/tipoReparacion.service';
import { TipoReparacion } from 'src/app/modelos/tiporeparacion';

@Component({
  selector: 'app-filtrotiporeparaciones',
  templateUrl: './filtrotiporeparaciones.component.html',
  styleUrls: ['./filtrotiporeparaciones.component.scss']
})
export class FiltrotiporeparacionesComponent implements OnInit {

  @Output()
  resultado = new EventEmitter<TipoReparacion[]>();

  criterio: String;

  items: TipoReparacion[]

  constructor(private wsdl: tipoReparacionService) { }

  ngOnInit() {
  }

  seleccionaruni() {
    this.resultado.emit(this.items);
  }

  async buscarTipoReparacion() {
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
