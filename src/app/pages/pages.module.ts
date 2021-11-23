import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { TableroComponent } from './compartido/tablero/tablero.component';
import { NavComponent } from './compartido/nav/nav.component';
import { FiltrounidadComponent } from './filtros/filtrounidad/filtrounidad.component';
import { PagesComponent } from './pages.component';
import { PagesRoutingModule } from './pages-routing.module';
import { FooterComponent } from './compartido/footer/footer.component';
import { FiltrovehiculoComponent } from './filtros/filtrovehiculo/filtrovehiculo.component';
import { ReparadosComponent } from './listados/reparados/reparados.component';
import { ProductosComponent } from './listados/productos/productos.component';
import { AbmproductoComponent } from './formulario/abmproducto/abmproducto.component';
import { repuestosComponent } from './listados/repuestos/repuestos.component';
import { AbmrepuestosComponent } from './formulario/abmrepuestos/abmrepuestos.component';
import { AbmReparadosComponent } from './formulario/abmreparados/abmreparados.component';
import { ProveedorComponent } from './listados/proveedores/proveedores.component';
import { AbmproveedorComponent } from './formulario/abmproveedor/abmproveedor.component';
import { FiltroRepuestosComponent } from './filtros/filtro-repuestos/filtro-repuestos.component';
import { DiagnosticosComponent } from './listados/diagnosticos/diagnosticos.component';
import { AbmdiagnosticoComponent } from './formulario/abmdiagnostico/abmdiagnostico.component';
import { OrdendetrabajoComponent } from './listados/ordendetrabajo/ordendetrabajo.component';
import { AbmordendeTrabajoComponent } from './formulario/abmordende-trabajo/abmordende-trabajo.component';
import { MovimientocajachicaComponent } from './listados/movimientocajachica/movimientocajachica.component';
import { AbmmovimientocajaComponent } from './formulario/abmmovimientocaja/abmmovimientocaja.component';
import { PersonalComponent } from './filtros/filtropersonal/personal.component';
import { CajachicaComponent } from './listados/cajachica/cajachica.component';
import { AbmcajachicaComponent } from './formulario/abmcajachica/abmcajachica.component';
import { DivisionesComponent } from './listados/divisiones/divisiones.component';
import { AbmdivisionComponent } from './formulario/abmdivision/abmdivision.component';
import { FiltroproveedorComponent } from './filtros/filtroproveedor/filtroproveedor.component';
import { FiltrotiporeparacionesComponent } from './filtros/filtrotiporeparaciones/filtrotiporeparaciones.component';
import { FiltroproductoComponent } from './filtros/filtroproducto/filtroproducto.component';
import { FiltrodiagnosticoComponent } from './filtros/filtrodiagnostico/filtrodiagnostico.component';


@NgModule({
  declarations: [
    PagesComponent,
    ReparadosComponent,
    repuestosComponent,
    ProductosComponent,
    ProveedorComponent,
    AbmReparadosComponent,
    AbmproductoComponent,
    AbmrepuestosComponent,

    FiltrounidadComponent,
    TableroComponent,
    NavComponent,
    FooterComponent,
    FiltrovehiculoComponent,
    ProductosComponent,
    AbmproductoComponent,
    AbmrepuestosComponent,
    AbmproveedorComponent,
    FiltroRepuestosComponent,
    DiagnosticosComponent,
    AbmdiagnosticoComponent,
    OrdendetrabajoComponent,
    AbmordendeTrabajoComponent,
    MovimientocajachicaComponent,
    AbmmovimientocajaComponent,
    PersonalComponent,
    CajachicaComponent,
    AbmcajachicaComponent,
    DivisionesComponent,
    AbmdivisionComponent,
    FiltroproveedorComponent,
    FiltrotiporeparacionesComponent,
    FiltroproductoComponent,
    FiltrodiagnosticoComponent,
  ],

  exports: [
    TableroComponent,
    NavComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    PagesRoutingModule,
    FormsModule,
    HttpClientModule,
  ],

  providers: [],
  bootstrap: [PagesComponent],
  // schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],

})
export class PagesModule { }
