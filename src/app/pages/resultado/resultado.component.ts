import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { BottomNavComponent } from '../../shared/bottom-nav/bottom-nav.component';
import { ApiService, AnalysisResponse } from '../../services/api.service';

@Component({
  selector: 'app-resultado',
  imports: [RouterLink, HeaderComponent, FooterComponent, BottomNavComponent],
  templateUrl: './resultado.component.html'
})
export class ResultadoComponent implements OnInit {
  query = signal('');
  loading = signal(false);
  analysisResult = signal<AnalysisResponse | null>(null);
  apiError = signal(false);

  factores = [
    { ok: false, titulo: '¿Está regulado por la CMF Chile?', descripcion: 'No se encontraron registros de esta entidad en la base de datos de la Comisión para el Mercado Financiero.', badge: 'Crítico', detalle: 'Solo opere con entidades autorizadas.' },
    { ok: false, titulo: 'Antigüedad del dominio web', descripcion: 'El dominio fue registrado hace menos de 3 meses. Las estafas suelen usar sitios web de vida corta.', badge: 'Alerta', detalle: null },
    { ok: false, titulo: 'Reportes de la comunidad', descripcion: 'Actividad reciente detectada por usuarios chilenos.', badge: 'Crítico', detalle: null, denuncias: 12 }
  ];

  testimonios = [
    '"Me prometieron rentabilidad diaria y no pude retirar mi dinero."',
    '"Usan fotos de personalidades chilenas para atraer gente por redes sociales."'
  ];

  alertasRecientes = [
    { nombre: 'Inversiones Global-X', descripcion: 'Esquema Ponzi vía WhatsApp. Promete 20% mensual.', tiempo: 'Hace 2 horas' },
    { nombre: 'CryptoChile Pro', descripcion: 'Trading sin respaldo legal. Bloqueo de retiros masivo.', tiempo: 'Hace 14 horas' },
    { nombre: 'Ahorro Directo CL', descripcion: 'Suplantación de BancoEstado y CMF.', tiempo: 'Ayer' },
    { nombre: 'FX Capital Chile', descripcion: 'Sin registro en SVS ni CMF. Opera desde el extranjero.', tiempo: 'Hace 3 días' },
    { nombre: 'Yield Masters CL', descripcion: 'Captación masiva en redes sociales con influencers falsos.', tiempo: 'Hace 4 días' },
    { nombre: 'InvertirYa.cl', descripcion: 'Dominio registrado hace 45 días. Copia diseño de banco legítimo.', tiempo: 'Hace 5 días' }
  ];

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(p => {
      const q = p['q'];
      if (q) {
        this.query.set(q);
        this.loading.set(true);
        this.api.analyze(q).subscribe({
          next: (data) => {
            this.analysisResult.set(data);
            this.loading.set(false);
          },
          error: () => {
            this.apiError.set(true);
            this.loading.set(false);
          }
        });
      }
    });
  }

  get result() { return this.analysisResult(); }
  get isCritical() {
    const r = this.analysisResult();
    return r ? r.riskLevel === 'CRITICAL' : true;
  }
  get displayFactores() {
    const r = this.analysisResult();
    return r?.factors ?? this.factores;
  }
  get displayTestimonios() {
    const r = this.analysisResult();
    return r?.testimonials?.length ? r.testimonials : this.testimonios;
  }
  get displayReportes() {
    const r = this.analysisResult();
    return r?.communityReports ?? 12;
  }
}
