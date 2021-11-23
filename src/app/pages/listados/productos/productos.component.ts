import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Producto } from 'src/app/modelos/producto';
import { productoService } from 'src/app/servicio/producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss']
})
export class ProductosComponent implements OnInit {

  @ViewChild("collapse", { static: false }) collapse: ElementRef;
  @ViewChild("close", { static: false }) close: ElementRef;

  public items: Producto[]
  public item: Producto;

  /* 
  wsdl es el servicio que se va a comunicar entre la api y la vista.
  */
  constructor(private wsdl: productoService) {

    this.item = new Producto();
    this.items = []
  }

  encontrados(event: Producto[]) {
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

  preEliminar(item: Producto) {
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
          'Se cancelo la operacion :)',
          'error'
        )
      }
    })


  }

  /* 
  funcion de seleccionado de marcas (entidad) para editar-
  */
  seleccionado(producto: Producto) {
    this.item = producto;

  }

  /*
  funcion para crear nueva marca
  */
  nuevo() {
    this.item = new Producto();
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
