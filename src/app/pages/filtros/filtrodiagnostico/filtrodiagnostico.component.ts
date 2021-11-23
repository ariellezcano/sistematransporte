import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { diagnosticoService } from 'src/app/servicio/diagnostico.service';
import { Diagnostico } from 'src/app/modelos/diagnostico';

@Component({
  selector: 'app-filtrodiagnostico',
  templateUrl: './filtrodiagnostico.component.html',
  styleUrls: ['./filtrodiagnostico.component.scss']
})
export class FiltrodiagnosticoComponent implements OnInit {

  @Output()
  resultado = new EventEmitter<Diagnostico[]>();

  criterio: String;

  items: Diagnostico[]

  constructor(private wsdl: diagnosticoService) { }

  ngOnInit() {
  }


  seleccionaruni() {
    this.resultado.emit(this.items);
  }

  async buscarDiagnostico() {
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
