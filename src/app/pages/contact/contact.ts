import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, HttpClientModule],
  templateUrl: './contact.html',
  styleUrls: ['./contact.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Contact {
  formContact = new FormGroup({
    access_key: new FormControl('94ae59fc-f413-427d-a18e-ab117c2559ae'),
    subject: new FormControl('PoliEcommerce'),
    from_name: new FormControl('Nuevo mensaje desde PoliEcommerce'),
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    user_subject: new FormControl('', [Validators.required]),
    message: new FormControl('', [Validators.required])
  });

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit(): void {
    if (this.formContact.valid) {
      // Enviamos los datos a Web3Forms mediante POST
      this.http.post('https://api.web3forms.com/submit', this.formContact.value)
        .subscribe({
          next: (response) => {
            this.router.navigate(['/contact-success']);
            this.formContact.reset({
              access_key: '94ae59fc-f413-427d-a18e-ab117c2559ae',
              subject: 'PoliEcommerce',
              from_name: 'Nuevo mensaje desde PoliEcommerce'
            });
          },
          error: (error) => {
            console.error('Error al enviar:', error);
            alert('Hubo un error al enviar el mensaje.');
          }
        });
    } else {
      alert('Por favor, completa todos los campos requeridos correctamente.');
    }
  }
}
