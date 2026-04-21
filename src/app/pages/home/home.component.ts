import { Component, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { BottomNavComponent } from '../../shared/bottom-nav/bottom-nav.component';
import { ApiService, AlertDto, StatsDto } from '../../services/api.service';

@Component({
  selector: 'app-home',
  imports: [FormsModule, RouterLink, HeaderComponent, FooterComponent, BottomNavComponent],
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  query = signal('');
  loading = signal(false);
  alertasApi = signal<AlertDto[]>([]);
  statsApi = signal<StatsDto | null>(null);

  alertas = [
    { nombre: 'Inversiones Global-X', descripcion: 'Detectado como esquema Ponzi a través de grupos de WhatsApp. Prometen 20% mensual.', icono: 'warning', tiempo: 'Hace 2 horas' },
    { nombre: 'CryptoChile Pro', descripcion: 'Plataforma de trading sin respaldo legal. Bloqueo de retiros reportado por 50+ usuarios.', icono: 'block', tiempo: 'Hace 14 horas' },
    { nombre: 'Ahorro Directo CL', descripcion: 'Uso indebido de logo de BancoEstado y CMF. Suplantación de identidad institucional.', icono: 'dangerous', tiempo: 'Ayer' }
  ];

  stats = [
    { valor: '15k+', label: 'Sitios Analizados' },
    { valor: '840', label: 'Fraudes Evitados' },
    { valor: '100%', label: 'Datos Oficiales' },
    { valor: '24/7', label: 'Monitoreo Activo' }
  ];

  pasos = [
    { numero: '1', icono: 'search', titulo: 'Ingresa el link o RUT', descripcion: 'Copia el link de la plataforma sospechosa o el RUT de la persona que te contactó.' },
    { numero: '2', icono: 'analytics', titulo: 'Análisis instantáneo', descripcion: 'Nuestro sistema consulta la base de datos CMF y analiza patrones de fraude en tiempo real.' },
    { numero: '3', icono: 'verified_user', titulo: 'Resultado claro', descripcion: 'Recibes un veredicto con semáforo de riesgo y recomendaciones para proteger tu dinero.' }
  ];

  constructor(private router: Router, private api: ApiService) {}

  ngOnInit() {
    this.api.getRecentAlerts().subscribe({
      next: (data) => this.alertasApi.set(data),
      error: () => {} // usa datos estáticos si el backend no está disponible
    });
    this.api.getStats().subscribe({
      next: (data) => this.statsApi.set(data),
      error: () => {}
    });
  }

  get displayAlertas(): { nombre: string; descripcion: string; icono: string; tiempo: string }[] {
    const api = this.alertasApi();
    if (api.length > 0) {
      return api.slice(0, 3).map(a => ({
        nombre: a.name,
        descripcion: a.description,
        icono: a.icon,
        tiempo: a.tiempoRelativo
      }));
    }
    return this.alertas;
  }

  get displayStats() {
    const api = this.statsApi();
    if (api) {
      return [
        { valor: api.sitiosAnalizados.toLocaleString('es-CL') + '+', label: 'Sitios Analizados' },
        { valor: String(api.fraudesEvitados), label: 'Fraudes Evitados' },
        { valor: api.datosOficiales, label: 'Datos Oficiales' },
        { valor: api.monitoreo, label: 'Monitoreo Activo' }
      ];
    }
    return this.stats;
  }

  analizar() {
    if (this.query().trim()) {
      this.router.navigate(['/resultado'], { queryParams: { q: this.query() } });
    }
  }
}
