import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import Swal from 'sweetalert2';
import { Repuestos } from 'src/app/modelos/repuesto';
import { repuestoService } from 'src/app/servicio/repuesto.service';

@Component({
  selector: 'app-repuestos',
  templateUrl: './repuestos.component.html',
  styleUrls: ['./repuestos.component.scss']
})
export class repuestosComponent implements OnInit {

  @ViewChild("collapse", { static: false }) collapse: ElementRef;
  @ViewChild("close", { static: false }) close: ElementRef;


  public items: Repuestos[]
  public item: Repuestos;


  constructor(private wsdl: repuestoService) {


    this.items = []
  }

  encontrados(event: Repuestos[]) {
    this.items = event;
    this.collapse.nativeElement.click();
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

  preEliminar(item: Repuestos) {
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


  seleccionado(repuestos: Repuestos) {
    this.item = repuestos;
  }
  nuevo() {
    this.item = new Repuestos();
  }


  ngOnInit() {
    this.wsdl.getList(1, 100).then((data: any) => {
      this.items = data.data
    })
  }
}
