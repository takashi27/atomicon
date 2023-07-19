import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import firebase from 'firebase/app';
import Swal from 'sweetalert2';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public conectado: boolean;
  public progreso: number;
  public admin = false;
  public nombreUsuario = '';
  public fotoUsuario = '';
  public globalUser;
  private userCollection: AngularFirestoreCollection<any>;

  constructor(public auth: AngularFireAuth, private afs: AngularFirestore) {
    this.auth.authState.subscribe( user => {
      if (!user){
        this.conectado = false;
        console.log('No conectado');
        return;
      }
      this.conectado = true;
      this.nombreUsuario = user.displayName;
      this.fotoUsuario = user.photoURL;
      
      // if(user.email === 'manguerasytapetes@hotmail.com'){
      //   this.admin = true;
      // }
      console.log('Conectado');
      this.crearBaseUsuario(user);
    });
    
   }
   login(usuario: string, contra: string){
    return this.auth.signInWithEmailAndPassword(usuario, contra);
  }
   logOut(){
    return this.auth.signOut().then(() => {
      window.location.reload();
    });

  }
  loginRedes(){
    return this.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())
     .then(resp => {window.location.reload(); }).catch(err => {console.log(err);});
  }
  loginFacebook(){    
    return this.auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())
     .then(resp => {window.location.reload(); }).catch(err => {console.log(err);});
  }
  loginTwitter(){
    return this.auth.signInWithPopup(new firebase.auth.TwitterAuthProvider())
     .then(resp => {window.location.reload(); }).catch(err => {console.log(err);});
  }
  // tslint:disable-next-line: typedef
  crearBaseUsuario(user: any){
    this.userCollection = this.afs.collection<any>('users');
    const usuario = this.afs.collection<any>('users').doc(user.uid);
    let susUsuario = usuario.valueChanges().pipe(map((resp: any) => {
      if (resp) {
      this.globalUser = resp;
      susUsuario.unsubscribe();
      }else{
        Swal.fire({
          allowOutsideClick: false,
          icon: 'info',
          text: 'Un momento...'
        });
        Swal.showLoading();
        const userData = {
          uid: user.uid,
          name: user.displayName,
          email: user.email,
          phone: user.phoneNumber,
          photo: user.photoURL,
          goty: false,
          arteVisual: false,
          movil: false,
          bandaSonora: false,
          curso: false,
          esport: false,
          multijugador: false

        };
        this.userCollection.doc(user.uid).set(userData).then( () => {
          Swal.close();
          location.reload();
        });
        
         }
         })).subscribe();
    }
    votarGoty(){
      return this.userCollection.doc(this.globalUser.uid).update({goty: true});
    }
    votarArte(){
      return this.userCollection.doc(this.globalUser.uid).update({arteVisual: true});
    }
    votarMovil(){
      return this.userCollection.doc(this.globalUser.uid).update({movil: true});
    }
    votarBanda(){
      return this.userCollection.doc(this.globalUser.uid).update({bandaSonora: true});
    }
    votarCurso(){
      return this.userCollection.doc(this.globalUser.uid).update({curso: true});
    }
    votarEsport(){
      return this.userCollection.doc(this.globalUser.uid).update({esport: true});
    }
    votarMulti(){
      return this.userCollection.doc(this.globalUser.uid).update({multijugador: true});
    }
}
