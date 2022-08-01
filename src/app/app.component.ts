import { Component } from '@angular/core';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  public appPages = [
    { title: 'Por hacer', url: '/folder/Por hacer', icon: 'mail' },
    { title: 'En progreso', url: '/folder/En progreso', icon: 'paper-plane' },
    { title: 'Finalizadas', url: '/folder/Finalizadas', icon: 'heart' },
  ];
  constructor() {}
}
