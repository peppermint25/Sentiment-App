import { CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const token = sessionStorage.getItem('token');
  if (token) {
    return true;
  }else{
    window.location.href = '/login';
    alert('You must be logged in to view this page');
    return false;
  }
};
