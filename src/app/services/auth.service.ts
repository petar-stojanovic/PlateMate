import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

import {AngularFireAuth} from "@angular/fire/compat/auth";
import {map, Observable, of, switchMap} from "rxjs";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Router} from "@angular/router";
import {User} from "../shared/interfaces/user";
import {Firestore} from "@angular/fire/firestore";
import {Auth} from "@angular/fire/auth";


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User | null>;


  constructor(private _http: HttpClient,
              private afAuth: AngularFireAuth,
              private angularFirestore: AngularFirestore,
              private auth: Auth,
              private firestore: Firestore,
              private router: Router) {

    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.angularFirestore.doc<User>(`users/${user.uid}`)
            .valueChanges()
            .pipe(
              map(userData => userData || null)
            );
        } else {
          return of(null);
        }
      })
    );

  }

  async register(firstName: string, lastName: string, username: string, email: string, password: string) {
    const displayName = `${firstName} ${lastName}`;
    const userCredential = await this.afAuth.createUserWithEmailAndPassword(email, password);

    return this.updateUserData(userCredential.user as User, {displayName});
  }

  async login(email: string, password: string) {
    return await this.afAuth.signInWithEmailAndPassword(email, password);
  }


  private updateUserData(user: User | null, additionalData: any = {}) {
    if (user) {
      const userRef: AngularFirestoreDocument<User> = this.angularFirestore.doc(`users/${user.uid}`);

      const data = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        isAnonymous: user.isAnonymous,
        emailVerified: user.emailVerified,
        phoneNumber: user.phoneNumber,
        refreshToken: user.refreshToken,
        ...additionalData
      };
      return userRef.set(data, {merge: true});
    } else {
      return Promise.reject("User is null");
    }
  }

  async signOut() {
    await this.afAuth.signOut().finally(() => {
      this.router.navigate(['/auth/login']);
    });
  }


}
