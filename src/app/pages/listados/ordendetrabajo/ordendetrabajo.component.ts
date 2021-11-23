import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { OrdenDeTrabajo } from 'src/app/modelos/ordendetrabajo';
import Swal from 'sweetalert2';
import { ordenTrabajoService } from 'src/app/servicio/ordendetrabajo.service';

@Component({
  selector: 'app-ordendetrabajo',
  templateUrl: './ordendetrabajo.component.html',
  styleUrls: ['./ordendetrabajo.component.scss']
})
export class OrdendetrabajoComponent implements OnInit {

  @ViewChild("close", { static: false }) close: ElementRef;
  public items: OrdenDeTrabajo[]
  public item: OrdenDeTrabajo;

  /* 
  wsdl es el servicio que se va a comunicar entre la api y la vista.
  */
  constructor(private wsdl: ordenTrabajoService) {

    this.item = new OrdenDeTrabajo();
    this.items = []
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

  preEliminar(item: OrdenDeTrabajo) {
    this.item = item;
    Swal.fire({
      title: 'Usted está seguro de eliminar?',
      text: 'Desea eliminar el archivo!' + item.vehiculo.identificacionPol,
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
          'Se cancelo la operacion :)',
          'error'
        )
      }
    })


  }

  /* 
  funcion de seleccionado de marcas (entidad) para editar-
  */
  seleccionado(ordendetrabajo: OrdenDeTrabajo) {
    this.item = ordendetrabajo;

  }

  /*
  funcion para crear nueva marca
  */
  nuevo() {
    this.item = new OrdenDeTrabajo();
  }

  /**
   * ngOnInit se ejecuta cuando se termina de dibujar la vista
   * y solicita los primeros 100 datos de la tabla de BD
   */


  ngOnInit() {
    this.wsdl.getList(1, 100).then((data: any) => {
      console.log(data)
      this.items = data.data

    })
  }

}
