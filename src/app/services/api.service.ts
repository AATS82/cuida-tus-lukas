import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AnalysisFactor {
  title: string;
  description: string;
  badge: 'CRITICAL' | 'ALERT' | 'OK' | 'UNKNOWN';
  safe: boolean;
  detail?: string;
}

export interface AnalysisResponse {
  query: string;
  queryType: 'URL' | 'RUT' | 'NOMBRE';
  riskLevel: 'SAFE' | 'CAUTION' | 'CRITICAL' | 'UNKNOWN';
  riskScore: number;
  cmfAuthorized: boolean;
  cmfEntityName?: string;
  cmfEntityType?: string;
  domainAgeDays?: number;
  domainRegistrationDate?: string;
  communityReports: number;
  knownScam: boolean;
  testimonials: string[];
  contentKeywordsDetected: string[];
  factors: AnalysisFactor[];
  summary: string;
}

export interface AlertDto {
  id: number;
  name: string;
  description: string;
  riskLevel: string;
  icon: string;
  url?: string;
  createdAt: string;
  tiempoRelativo: string;
}

export interface StatsDto {
  sitiosAnalizados: number;
  fraudesEvitados: number;
  alertasActivas: number;
  reportesCiudadanos: number;
  datosOficiales: string;
  monitoreo: string;
}

export interface ReportRequest {
  platformName: string;
  rutAccount?: string;
  details?: string;
  channels?: string[];
}

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private readonly BASE = 'http://localhost:8080/api';

  /** Analiza una URL, RUT o nombre de plataforma */
  analyze(query: string): Observable<AnalysisResponse> {
    return this.http.get<AnalysisResponse>(`${this.BASE}/analysis/analyze`, {
      params: new HttpParams().set('q', query)
    });
  }

  /** Últimas alertas para la home */
  getRecentAlerts(): Observable<AlertDto[]> {
    return this.http.get<AlertDto[]>(`${this.BASE}/alerts/recent`);
  }

  /** Historial completo */
  getAllAlerts(): Observable<AlertDto[]> {
    return this.http.get<AlertDto[]>(`${this.BASE}/alerts`);
  }

  /** Estadísticas generales */
  getStats(): Observable<StatsDto> {
    return this.http.get<StatsDto>(`${this.BASE}/stats`);
  }

  /** Enviar reporte ciudadano */
  submitReport(report: ReportRequest): Observable<{ success: boolean; message: string; id: number }> {
    return this.http.post<{ success: boolean; message: string; id: number }>(
      `${this.BASE}/reports`, report
    );
  }
}
