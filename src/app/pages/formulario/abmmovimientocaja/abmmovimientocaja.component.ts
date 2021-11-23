import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { movimientoCajaService } from 'src/app/servicio/movimientoCajaChica.service';
import { MovimientoCajaChica } from 'src/app/modelos/movimientocajachica';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/modelos/usuario';
import { CajaChica } from 'src/app/modelos/cajachica';
import { CajaChicaService } from 'src/app/servicio/cajachica.service';

@Component({
  selector: 'app-abmmovimientocaja',
  templateUrl: './abmmovimientocaja.component.html',
  styleUrls: ['./abmmovimientocaja.component.scss']
})
export class AbmmovimientocajaComponent implements OnInit {

  @ViewChild("f", { static: false }) form: NgForm;

  @Output()
  finalizado = new EventEmitter<Boolean>();

  /* declaracion de las variables */
  @Input()
  item: MovimientoCajaChica;
  items: MovimientoCajaChica[];


  caja: CajaChica;
  lstcajaChica: string[]

  CajaChica: string[]


  /*   wsdl es el servicio que se va a comunicar entre la api y la vista.
*/
  constructor(private wsdl: movimientoCajaService, private wsdlcaja: CajaChicaService) {

    this.caja = new CajaChica;


    this.CajaChica = [];
    this.lstcajaChica = [];
  }
  // listarCajaChica() {
  //   this.wsdlcaja.getList(1, 1).then((data: any) => {
  //     this.lstcajaChica = data.data
  //     console.log(data)
  //   })
  // }
  @Input()
  set select(item: MovimientoCajaChica) {
    console.log("abm", item)
    if (item.id === undefined) {
      this.item = new MovimientoCajaChica();
      this.item.caja = item.caja;


    } else {
      this.item = new MovimientoCajaChica();
      this.item = item;

    }
    this.listarCajaChica()
  }

  listarCajaChica() {
    let criteria = "c.id = " + this.item.caja.id + " and c.activo=true";
    this.wsdlcaja.doCriteria(criteria, true, null, "", 1, 1).then((data: any) => {

      this.caja = data.data;

      this.item.caja = this.caja;

    })
  }

  listarMovimientoCajaChica() {
    let criteria = "c.caja.id = " + this.caja.id + " and c.activo=true";
    this.wsdl.doCriteria(criteria, false, null, "", 1, 1000).then((data: any) => {
      this.items = data.data

    })
  }

  compareFnPer(c1: MovimientoCajaChica, c2: MovimientoCajaChica): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  /**
     * ngOnInit se ejecuta cuando se termina de dibujar la vista
     * y solicita los primeros 100 datos de la tabla de BD
     */
  ngOnInit() {

  }
  accion(f: NgForm) {

    if (f.invalid) {
      this.form.ngSubmit;
      return
    }
    this.item.caja = this.caja
    if (this.item.id > 0) {
      this.editar();

    } else {
      this.nuevo();

    }
  }

  /*
  funcion para crear nueva marca
  */
  nuevo() {
    this.item.activo = true;
    this.wsdl.doInsert(this.item).then((data: any) => {
      if (data.status === 200) {
        this.finalizado.emit(true)
      } else {
        // alert("Hubo un error en la creación")
      }
    })
  }

  /*
    funcion para crear editar marca
    */

  editar() {
    this.wsdl.doUpdate(this.item, this.item.id).then((data: any) => {
      if (data.status === 200) {
        this.finalizado.emit(true)
      } else {
        // alert("Hubo un error en la creación")
      }
    })
  }

  /*
    funcion para eliminar marca
    */

  eliminar() {
    this.item.activo = false;

    this.wsdl.doUpdate(this.item, this.item.id).then((data: any) => {
      if (data.status === 200) {
        alert(data.msg)
      } else {
        alert("Hubo un error en la creación")
      }
    })
  }

  personasencontradas(item: Usuario) {
    if (item.id !== undefined) {
      this.item.usuario = item;
      //this.item.usuario = item;

    }

  }
}
