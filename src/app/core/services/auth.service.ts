import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from "rxjs/operators";
import { User } from "../models/user.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:3000/users";

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {}

  getUserData(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  login(email: string, password: string): Observable<boolean> {
    if (!email || !password) {
      return of(false);
    }

    const params = new HttpParams()
      .set("email", email)
      .set("password", password);

    return this.http.get<User[]>(this.apiUrl, { params }).pipe(
      map((users) => {
        if (users && users.length > 0) {
          const user = users[0];
          const authToken = btoa(`${email}:${password}`);
          localStorage.setItem("authToken", authToken);
          localStorage.setItem("currentUser", JSON.stringify(user));
          return true;
        }
        return false;
      }),
      catchError(() => of(false)),
    );
  }

  logout() {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    this.router.navigate(["/login"]);
  }

  isAuthenticated(): boolean {
    const authToken = localStorage.getItem("authToken");
    // validation
    if (authToken) {
      const [email, password] = atob(authToken).split(":");
      if (email && password) {
        return true;
      }
    }
    return false;
  }

  register(userData: User): Observable<User> {
    return this.http.post<User>(this.apiUrl, userData).pipe(
      map((user) => {
        if (user && user.email) {
          const authToken = btoa(`${user.email}:${userData.password}`);
          localStorage.setItem("authToken", authToken);
          localStorage.setItem("currentUser", JSON.stringify(user));
          return user; 
        }
        throw new Error("Registration failed");
      }),
      catchError((error) => {
        console.error("Registration failed:", error);
        throw error;
      }),
    );
  }

  isAdmin(): boolean {
    const currUser = localStorage.getItem("currentUser");
    if (currUser) {
      const user = JSON.parse(currUser);
      return user.role === "Admin";
    }
    return false;
  }
  updateUser(userData: User): Observable<any> {
    return this.http.put(`${this.apiUrl}/${userData.id}`, userData);
  }
  deleteUser(userId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${userId}`);
  }
}
