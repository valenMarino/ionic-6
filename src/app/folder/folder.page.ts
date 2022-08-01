import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { TaskService } from '../services/task.service';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage implements OnInit {
  public folder: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    public alertController: AlertController,
    public toastController: ToastController,
    public taskService: TaskService
  ) {}

  ngOnInit() {
    this.folder = this.activatedRoute.snapshot.paramMap.get('id');
  }

  async addTask() {
    let alert = await this.alertController.create({
      header: 'Crear tarea nueva',
      inputs: [
        {
          type: 'text',
          name: 'tittle',
          placeholder: 'Escriba el nombre de la tarea',
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
        },
        {
          text: 'Agregar',
          handler: (data: any) => {
            let isValid = this.validateTask(data);
            if (isValid) {
              let created = this.taskService.addTask(data.tittle);
              if (created === 0) {
                this.presentToast('Tarea creada correctamente', 'success');
              }
            }
          },
        },
      ],
    });
    await alert.present();
  }

  validateTask(input: any): boolean {
    if (input && input.tittle) {
      return true;
    } else {
      this.presentToast('Debe ingresar un nombre válido', 'primary');
      return false;
    }
  }

  async presentToast(msg: string, color: string) {
    let toast = await this.toastController.create({
      message: msg,
      duration: 3000,
      color: color,
    });

    toast.present();
  }
  edit(task) {}
  delete(task) {
    this.taskService.taskList.map((e, i) => {
      if (e.tittle == task) {
        this.taskService.taskList.splice(i);
      }
    });
  }
}
