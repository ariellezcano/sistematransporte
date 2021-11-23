import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { diagnosticoService } from 'src/app/servicio/diagnostico.service';
import { NgForm } from '@angular/forms';
import { Diagnostico } from 'src/app/modelos/diagnostico';

@Component({
  selector: 'app-abmdiagnostico',
  templateUrl: './abmdiagnostico.component.html',
  styleUrls: ['./abmdiagnostico.component.scss']
})
export class AbmdiagnosticoComponent implements OnInit {

  @ViewChild("f", { static: false }) form: NgForm;

  @Output()
  finalizado = new EventEmitter<Boolean>();

  /* declaracion de la variable tipo marca */
  @Input()
  item: Diagnostico;
  Diagnostico: string[]


  /*   wsdl es el servicio que se va a comunicar entre la api y la vista.
*/
  constructor(private wsdl: diagnosticoService) {
    this.Diagnostico = [];
    this.listarDiagnostico();
  }
  listarDiagnostico() {
    this.wsdl.getList(1, 100).then((data: any) => {
      this.Diagnostico = data.data

    })
  }
  compareFnPer(c1: Diagnostico, c2: Diagnostico): boolean {
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

}
