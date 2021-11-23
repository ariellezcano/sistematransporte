import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { TipoReparacion } from 'src/app/modelos/tiporeparacion';
import { tipoReparacionService } from 'src/app/servicio/tipoReparacion.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reparados',
  templateUrl: './reparados.component.html',
  styleUrls: ['./reparados.component.scss']
})
export class ReparadosComponent implements OnInit {

  @ViewChild("collapse", { static: false }) collapse: ElementRef;
  @ViewChild("close", { static: false }) close: ElementRef;
  /*
  declaracion de variables del tipo de la entidad (tabla) a trabajar globales para el formulario
  */
  public items: TipoReparacion[]
  public item: TipoReparacion;

  /* 
  wsdl es el servicio que se va a comunicar entre la api y la vista.
  */
  constructor(private wsdl: tipoReparacionService) {

    this.item = new TipoReparacion();
    this.items = []
  }

  encontrados(event: TipoReparacion[]) {
    this.items = event;
    this.collapse.nativeElement.click();
  }

  /* 
  funcion de seleccionado de marcas (entidad) para editar-
  */
  seleccionado(TipoReparacion: TipoReparacion) {
    this.item = TipoReparacion;

  }

  eliminar() {
    this.item.activo = !this.item.activo;
    this.wsdl.doUpdate(this.item, this.item.id).then((data: any) => {
      if (data.status === 200) {
        Swal.fire(
          'Eliminado!',
          'Se a eliminado correctamente el archivo.',
          'success'
        )
      } else {
        Swal.fire(
          'error',
          'a ocurrido un error:) ' + data.msg,
          'error'
        )
      }
    })
  }

  accion(event: Boolean) {
    this.close.nativeElement.click();
    if (event) {
      Swal.fire(

        {
          position: 'top',
          icon: 'success',
          title: 'Se actualizo correctamente el fichero.',
          showConfirmButton: false,
          timer: 1500
        }


      )
    }
  }

  preEliminar(item: TipoReparacion) {
    this.item = item;
    Swal.fire({
      title: 'Usted está seguro de eliminar?',
      text: 'Desea eliminar el archivo!' + item.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminalo!',
      cancelButtonText: 'No, esperar'
    }).then((result) => {
      if (result.value) {

        this.eliminar();
        // For more information about handling dismissals please visit
        // https://sweetalert2.github.io/#handling-dismissals
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelado',
          'Se Cancelo la operacion :)',
          'error'
        )
      }
    })


  }

  /*
  funcion para crear nueva marca
  */
  nuevo() {
    this.item = new TipoReparacion();
  }

  /**
   * ngOnInit se ejecuta cuando se termina de dibujar la vista
   * y solicita los primeros 100 datos de la tabla de BD
   */


  ngOnInit() {
    this.wsdl.getList(1, 100).then((data: any) => {
      this.items = data.data

    })
  }

}
