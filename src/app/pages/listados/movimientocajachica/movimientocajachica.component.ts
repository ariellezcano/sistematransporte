import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MovimientoCajaChica } from 'src/app/modelos/movimientocajachica';
import { movimientoCajaService } from 'src/app/servicio/movimientoCajaChica.service';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';
import { CajaChica } from 'src/app/modelos/cajachica';

@Component({
  selector: 'app-movimientocajachica',
  templateUrl: './movimientocajachica.component.html',
  styleUrls: ['./movimientocajachica.component.scss']
})
export class MovimientocajachicaComponent implements OnInit {
  id;
  @ViewChild("close", { static: false }) close: ElementRef;
  public items: MovimientoCajaChica[]
  public item: MovimientoCajaChica;
  public caja: CajaChica;

  /* 
  wsdl es el servicio que se va a comunicar entre la api y la vista.
  */
  constructor(private wsdl: movimientoCajaService, private router: ActivatedRoute) {

    this.router.paramMap.subscribe((p: any) => {
      this.id = p.params.id;
      this.listarmovimientocaja();
    })

    this.item = new MovimientoCajaChica();
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

  preEliminar(item: MovimientoCajaChica) {
    this.item = item;
    Swal.fire({
      title: 'Usted está seguro de eliminar?',
      text: 'Desea eliminar el archivo!' + item,
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
  seleccionado(MovimientoCajaChica: MovimientoCajaChica) {
    this.item = MovimientoCajaChica;

  }

  /*
  funcion para crear nueva marca
  */
  nuevo() {
    this.item = new MovimientoCajaChica();
    this.item.caja.id = this.id

  }



  //  lista de movimiento de la caja chica y solicita los primeros 100 datos de la tabla de BD
  listarmovimientocaja() {

    let criteria = "c.caja.id = " + this.id + " and c.activo=true";
    this.wsdl.doCriteria(criteria, false, null, "", 1, 1000).then((data: any) => {
      console.log("movimiento", data)
      this.items = data.data

    })

  }

  /**
   * ngOnInit se ejecuta cuando se termina de dibujar la vista
   */

  ngOnInit() {
    this.item = new MovimientoCajaChica();
    this.item.caja.id = this.id

  }
}
