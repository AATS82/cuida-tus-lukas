import { Component, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { BottomNavComponent } from '../../shared/bottom-nav/bottom-nav.component';
import { ApiService, AnalysisResponse, AlertDto } from '../../services/api.service';

@Component({
  selector: 'app-resultado',
  imports: [RouterLink, HeaderComponent, FooterComponent, BottomNavComponent],
  templateUrl: './resultado.component.html'
})
export class ResultadoComponent implements OnInit {
  query          = signal('');
  loading        = signal(false);
  analysisResult = signal<AnalysisResponse | null>(null);
  apiError       = signal(false);
  alertasApi     = signal<AlertDto[]>([]);

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    this.api.getRecentAlerts().subscribe({
      next: (data) => this.alertasApi.set(data),
      error: () => {}
    });

    this.route.queryParams.subscribe(params => {
      const q = params['q'];
      if (!q) return;

      this.query.set(q);
      this.analysisResult.set(null);  // Limpia resultado anterior
      this.apiError.set(false);
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
    });
  }

  get result()            { return this.analysisResult(); }
  get displayFactores()   { return this.analysisResult()?.factors ?? []; }
  get displayTestimonios(){ return this.analysisResult()?.testimonials ?? []; }
  get displayReportes()   { return this.analysisResult()?.communityReports ?? 0; }
}
