import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TipoReparacion } from 'src/app/modelos/tiporeparacion';
import { tipoReparacionService } from 'src/app/servicio/tipoReparacion.service';

@Component({
  selector: 'app-abmreparados',
  templateUrl: './abmreparados.component.html',
  styleUrls: ['./abmreparados.component.scss']
})
export class AbmReparadosComponent implements OnInit {



  @ViewChild("form", { static: false }) form: NgForm;

  @Output()
  finalizado = new EventEmitter<Boolean>();

  /* declaracion de la variable tipo marca */
  @Input()
  item: TipoReparacion;


  /*   wsdl es el servicio que se va a comunicar entre la api y la vista.
*/
  constructor(private wsdl: tipoReparacionService) { }

  /**
     * ngOnInit se ejecuta cuando se termina de dibujar la vista
     * y solicita los primeros 100 datos de la tabla de BD
     */
  ngOnInit() {

  }

  accion(f: NgForm) {

    if (f.invalid) {
      // this.form.ngSubmit;
      return
    }
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
        alert("Hubo un error en la creación")
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
        alert("Hubo un error en la creación")
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
