import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../shared/header/header.component';
import { FooterComponent } from '../../shared/footer/footer.component';
import { BottomNavComponent } from '../../shared/bottom-nav/bottom-nav.component';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-reportar',
  imports: [FormsModule, RouterLink, HeaderComponent, FooterComponent, BottomNavComponent],
  templateUrl: './reportar.component.html'
})
export class ReportarComponent {
  nombre = signal('');
  rut = signal('');
  detalles = signal('');
  canales = signal<string[]>([]);
  enviado = signal(false);

  enviando = signal(false);
  error = signal('');

  constructor(private router: Router, private api: ApiService) {}

  toggleCanal(canal: string) {
    const actual = this.canales();
    if (actual.includes(canal)) {
      this.canales.set(actual.filter(c => c !== canal));
    } else {
      this.canales.set([...actual, canal]);
    }
  }

  isSelected(canal: string) {
    return this.canales().includes(canal);
  }

  enviar() {
    if (!this.nombre().trim()) return;
    this.enviando.set(true);
    this.error.set('');

    this.api.submitReport({
      platformName: this.nombre(),
      rutAccount: this.rut(),
      details: this.detalles(),
      channels: this.canales()
    }).subscribe({
      next: () => {
        this.enviando.set(false);
        this.enviado.set(true);
        setTimeout(() => this.router.navigate(['/']), 3000);
      },
      error: (err) => {
        this.enviando.set(false);
        this.error.set('Error al enviar el reporte. Por favor intenta nuevamente.');
        console.error(err);
      }
    });
  }
}
