import { Component, signal, ChangeDetectionStrategy } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactUs {
  public readonly formData = {
    firstName: '',
    lastName: '',
    email: '',
    subject: '',
    message: '',
  };

  public readonly isSubmitting = signal<boolean>(false);
  public readonly isSubmitted = signal<boolean>(false);

  public handleSubmit(event: Event): void {
    event.preventDefault();
    if (!this.formData.firstName || !this.formData.email || !this.formData.message) {
      return;
    }

    this.isSubmitting.set(true);

    setTimeout(() => {
      this.isSubmitting.set(false);
      this.isSubmitted.set(true);
    }, 700);
  }

  public resetForm(): void {
    this.formData.firstName = '';
    this.formData.lastName = '';
    this.formData.email = '';
    this.formData.subject = '';
    this.formData.message = '';
    this.isSubmitted.set(false);
  }
}
