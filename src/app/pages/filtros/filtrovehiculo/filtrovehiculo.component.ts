// import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
// import { Unidad } from 'src/app/modelos/unidad';
// import { VehiculosService } from 'src/app/servicio/vehiculo.service';
// import { Vehiculo } from 'src/app/modelos/vehiculo';

// @Component({
//   selector: 'app-filtrovehiculo',
//   templateUrl: './filtrovehiculo.component.html',
//   styleUrls: ['./filtrovehiculo.component.scss']
// })
// export class FiltrovehiculoComponent implements OnInit {


//   @Output()
//   resultado = new EventEmitter<Vehiculo[]>();

//   criterio: String;

//   items: Vehiculo[]

//   constructor(private wsdl: VehiculosService) { }

//   ngOnInit() {
//   }

//   seleccionarVehiculo() {
//     this.resultado.emit(this.items);
//   }

//   async buscar() {
//     const crit = "(c.identificacionPol like '%" + this.criterio + "%' or c.dominio like '%" + this.criterio + "%') AND c.activo=true";
//     let data = await this.wsdl.doCriteria(crit, false, null, " ORDER BY c.identificacionPol ASC", 1, 100).then();

//     const result = JSON.parse(JSON.stringify(data));
//     // alert(JSON.stringify(data))
//     if (result.status === 200) {
//       this.items = result.data;


//     } else if (result.status === 666) {
//       // logout app o refresh token
//       this.items = [];

//     } else {
//       //  this.persona = new Persona();
//       this.items = [];
//     }
//     this.resultado.emit(this.items);
//   }
// }


/*filtro vehiculo de patrimonio*/

import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Unidad } from 'src/app/modelos/unidad';
import { VehiculosService } from 'src/app/servicio/vehiculo.service';
import { Vehiculo } from 'src/app/modelos/vehiculo';

@Component({
  selector: 'app-filtrovehiculo',
  templateUrl: './filtrovehiculo.component.html',
  styleUrls: ['./filtrovehiculo.component.scss']
})
export class FiltrovehiculoComponent implements OnInit {


  @Output()
  resultado = new EventEmitter<Vehiculo[]>();

  criterio: String;

  items: Vehiculo[]

  constructor(private wsdl: VehiculosService) { }

  ngOnInit() {
  }

  seleccionarVehiculo() {
    this.resultado.emit(this.items);
  }

  async buscar() {
    const crit = "(c.identificacionPol like '%" + this.criterio + "%' or c.dominio like '%" + this.criterio + "%') AND c.activo=true";
    let data = await this.wsdl.doCriteria(crit, false, null, " ORDER BY c.identificacionPol ASC", 1, 100).then();

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