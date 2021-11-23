import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableroComponent } from './compartido/tablero/tablero.component';


import { PagesComponent } from './pages.component';
import { ProveedorComponent } from './listados/proveedores/proveedores.component';
import { ReparadosComponent } from './listados/reparados/reparados.component';
import { ProductosComponent } from './listados/productos/productos.component';
import { repuestosComponent } from './listados/repuestos/repuestos.component';
import { DiagnosticosComponent } from './listados/diagnosticos/diagnosticos.component';
import { OrdendetrabajoComponent } from './listados/ordendetrabajo/ordendetrabajo.component';
import { MovimientocajachicaComponent } from './listados/movimientocajachica/movimientocajachica.component';
import { CajachicaComponent } from './listados/cajachica/cajachica.component';
import { DivisionesComponent } from './listados/divisiones/divisiones.component';



const routes: Routes = [{
  path: "",
  component: PagesComponent,
  children: [
    { path: "tablero", component: TableroComponent },
    { path: "reparados", component: ReparadosComponent },
    { path: "proveedor", component: ProveedorComponent },
    { path: "productos", component: ProductosComponent },
    { path: "repuestos", component: repuestosComponent },
    { path: "diagnostico", component: DiagnosticosComponent },
    { path: "ordendetrabajo", component: OrdendetrabajoComponent },
    { path: "movimiento/:id", component: MovimientocajachicaComponent },
    { path: "cajachica", component: CajachicaComponent },
    { path: "division", component: DivisionesComponent },
  ]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
