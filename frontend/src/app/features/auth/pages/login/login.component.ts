import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../../core/services/auth.service';

import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.css',
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  error='';
  loading=false;

  form=this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',Validators.required]
  });

  submit() {

    if (this.form.invalid) return;

    this.loading = true;

    this.auth.login(this.form.value as any).subscribe({
      next: () => {
        this.router.navigate(['/doctors']);
      },
      error: (err) => {
        this.error = err.error?.message || 'Login failed';
        this.loading = false;
      }
    });
  }
}
