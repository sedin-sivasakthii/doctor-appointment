import { CanActivateFn } from '@angular/router';
import {inject} from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router'

export const guestGuard: CanActivateFn = (route, state) => {
  const auth=inject(AuthService);
  const router=inject(Router);

  if(auth.isLoggedIn()){
    router.navigate(['/doctors']);
  }

  return true;
};
