import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { CajaChicaService } from 'src/app/servicio/cajachica.service';
import { NgForm } from '@angular/forms';
import { CajaChica } from 'src/app/modelos/cajachica';
import { Division } from 'src/app/modelos/division';
import { DivisionService } from 'src/app/servicio/division.service';

@Component({
  selector: 'app-abmcajachica',
  templateUrl: './abmcajachica.component.html',
  styleUrls: ['./abmcajachica.component.scss']
})
export class AbmcajachicaComponent implements OnInit {

  @ViewChild("f", { static: false }) form: NgForm;

  @Output()
  finalizado = new EventEmitter<Boolean>();

  /* declaracion de la variable tipo marca */
  @Input()
  // monto: CajaChica;
  // saldo: CajaChica;


  item: CajaChica;
  CajaChica: string[]
  lstDivision: string[]


  /*   wsdl es el servicio que se va a comunicar entre la api y la vista.
*/
  constructor(private wsdl: CajaChicaService, private wsdld: DivisionService) {
    this.CajaChica = [];
    this.listarCajaChica();

    this.lstDivision = [];
    this.listarDivisiones();
  }
  listarCajaChica() {
    this.wsdl.getList(1, 100).then((data: any) => {
      this.CajaChica = data.data

    })
  }
  // compareFnPer(c1: CajaChica, c2: CajaChica): boolean {
  //   return c1 && c2 ? c1.id === c2.id : c1 === c2;
  // }

  //lista desplegable de divisiones creadas

  listarDivisiones() {
    this.wsdld.getList(1, 100).then((data: any) => {
      this.lstDivision = data.data

    })
  }
  compareFnDiv(c1: Division, c2: Division): boolean {
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
      console.log(this.item)
      this.form.ngSubmit;
      return
    }
    if (this.item.id > 0) {
      this.editar();

    } else {
      this.nuevo();

    }
  }
  //creacion de saldo para caja chica

  // montosaldo(monto, saldo) {
  //   if (saldo > 0) {
  //   }
  //   return (this.item.monto - this.item.saldo);
  // }


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
}
