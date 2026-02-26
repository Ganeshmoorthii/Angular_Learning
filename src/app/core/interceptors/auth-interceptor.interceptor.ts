import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { throwError } from 'rxjs';

export const authInterceptorInterceptor: HttpInterceptorFn = (req, next) => {
  const publicEndpoints = ['/users/login', '/users/register', '/users'];
  if (publicEndpoints.some((endpoint) => req.url.includes(endpoint))) {
    return next(req);
  }
  const token = localStorage.getItem('authToken');

  if (!token) {
    return throwError(
      () =>
        new HttpErrorResponse({
          status: 401,
          statusText: 'Unauthorized',
          error: 'Invalid token',
        }),
    );
  }
  if (req.url.startsWith('http://localhost:3000')) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Basic ${token}`,
      },
    });
    return next(authReq);
  }
  return next(req);
};
