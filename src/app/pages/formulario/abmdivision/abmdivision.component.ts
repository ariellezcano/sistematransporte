import { Component, OnInit, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Division } from 'src/app/modelos/division';
import { DivisionService } from 'src/app/servicio/division.service';
import { Unidad } from 'src/app/modelos/unidad';
import { UnidadService } from 'src/app/servicio/unidad';
import { Persona } from 'src/app/modelos/persona';
import { PersonaService } from 'src/app/servicio/persona.service';

@Component({
  selector: 'app-abmdivision',
  templateUrl: './abmdivision.component.html',
  styleUrls: ['./abmdivision.component.scss']
})
export class AbmdivisionComponent implements OnInit {

  @ViewChild("f", { static: false }) form: NgForm;

  @Output()
  finalizado = new EventEmitter<Boolean>();

  /* declaracion de la variable tipo marca */
  @Input()
  // items: Vehiculo;
  item: Division;
  items: Division[];
  // Division: string[]
  Unidades: Unidad[]
  Persona: string[]



  /*   wsdl es el servicio que se va a comunicar entre la api y la vista.
*/
  constructor(private wsdl: DivisionService, private wsdlU: UnidadService, private wsdlper: PersonaService) {
    this.items = [];
    this.listarDivision();

    this.Unidades = [];
    this.listarUnidad();


  }
  listarDivision() {
    this.wsdl.getList(1, 100).then((data: any) => {
      this.items = data.data

    })
  }
  compareFnPer(c1: Division, c2: Division): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  // lista todas las unidades creadas. 
  listarUnidad() {
    this.wsdlU.getList(1, 100).then((data: any) => {
      this.items = data.data

    })
  }
  compareFnUni(c1: Unidad, c2: Unidad): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }
  // listar personas creadas.

  // listarPersonas() {
  //   this.wsdlper.getList(1, 100).then((data: any) => {
  //     this.Division = data.data

  //   })
  // }
  // compareFnper(c1: Persona, c2: Persona): boolean {
  //   return c1 && c2 ? c1.id === c2.id : c1 === c2;
  // }


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

  personasencontradas(item: Persona) {
    if (item.id !== undefined) {
      this.item.personaReferente = item;
      // this.item.empleado = item;
    }

  }
  unidadesEncontradas(item: Unidad[]) {

    this.Unidades = item;
    // console.log(item, "padre recibe listado")


  }


}