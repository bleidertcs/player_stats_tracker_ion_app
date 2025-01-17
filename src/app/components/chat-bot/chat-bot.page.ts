import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { alertModal } from 'src/app/shared/alert/alert.component';
import { Constant } from 'src/app/shared/constant/constant.component';
import { loadingSpinner } from 'src/app/shared/loading/loading.component';

@Component({
  selector: 'app-chat-bot',
  templateUrl: './chat-bot.page.html',
  styleUrls: ['./chat-bot.page.scss'],
})
export class ChatBotPage implements OnInit {
  form: FormGroup;

  constructor(
    private authService: AuthService,
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public fb: FormBuilder,
    private ref: ChangeDetectorRef,
    public alertController: AlertController,
  ) {
    this.form = this.fb.group({
      prompt: new FormControl('')
    })
  }

  ngOnInit() {
  }

  messages: { text: string; isSender: boolean }[] = [];
  newMessage: string = '';

  async assistant() {
    // if (this.newMessage.trim() !== '') {
    //   this.messages.push({ text: this.newMessage, isSender: true });
    //   this.newMessage = '';
    //   setTimeout(() => {
    //     this.messages.push({
    //       text: 'Respuesta del destinatario...',
    //       isSender: false,
    //     });
    //   }, 1000);
    // }
    console.log(this.form.controls['prompt'].value);
    if (this.form.controls['prompt'].value.trim() !== '') {
      this.messages.push({ text: this.form.controls['prompt'].value, isSender: true });
      // this.form.controls['prompt'].setValue('');

      await loadingSpinner(this.loadingCtrl)

      let data = {
        prompt: this.form.controls['prompt'].value.trim()
      }

      this.authService.call(data, 'assistant', 'POST', true).subscribe({
        next: (response) => {
          console.log(response)
          if (response.status === Constant.SUCCESS) {
            setTimeout(() => {
              this.messages.push({
                text: response.data.content,
                isSender: false,
              });
            }, 1000);

            this.loadingCtrl.dismiss()
          } else {
            console.log(response)
            this.loadingCtrl.dismiss()

            alertModal({
              title: response.status,
              text: response.data,
              button: [
                {
                  cssClass: 'alert-button-cancel',
                  text: 'Cerrar',
                }
              ],
              alertController: this.alertController
            })
          }
        },
        error: (error) => {
          console.log(error)
          this.loadingCtrl.dismiss()

          alertModal({
            title: 'Error',
            text: 'Falla en el servidor',
            button: [
              {
                cssClass: 'alert-button-cancel',
                text: 'Cerrar',
              }
            ],
            alertController: this.alertController
          })
        }
      })
    }
  }
}
