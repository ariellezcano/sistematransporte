import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { Repuestos } from 'src/app/modelos/repuesto';
import { repuestoService } from 'src/app/servicio/repuesto.service';
import { NgForm } from '@angular/forms';
import { proveedorService } from 'src/app/servicio/proveedor.service';
import { productoService } from 'src/app/servicio/producto.service';
import { Proveedor } from 'src/app/modelos/proveedor';
import { Producto } from 'src/app/modelos/producto';

@Component({
  selector: 'app-abmrepuestos',
  templateUrl: './abmrepuestos.component.html',
  styleUrls: ['./abmrepuestos.component.scss']
})
export class AbmrepuestosComponent implements OnInit {

  @ViewChild("form", { static: false }) form: NgForm;

  @Output()
  finalizado = new EventEmitter<Boolean>();

  /* declaracion de la variable tipo marca */
  @Input()
  item: Repuestos;
  proveedor: string[]
  producto: string[]

  /*   wsdl es el servicio que se va a comunicar entre la api y la vista.
*/
  constructor(private wsdl: repuestoService, private wsdlP: proveedorService, private wsdlPr: productoService) {
    this.proveedor = [];
    this.listarproveedor();

    this.producto = [];
    this.listarproducto();
  }

  listarproveedor() {
    this.wsdlP.getList(1, 100).then((data: any) => {
      console.log(data)
      this.proveedor = data.data

    })
  }
  compareFnProv(c1: Proveedor, c2: Proveedor): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

  listarproducto() {
    this.wsdlPr.getList(1, 100).then((data: any) => {
      this.producto = data.data
    })
  }
  compareFnPro(c1: Producto, c2: Producto): boolean {
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
