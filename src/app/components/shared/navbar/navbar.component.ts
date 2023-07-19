import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { VotacionesService } from '../../../services/votaciones.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public conectado = false;  
  public mGoty = false;
  public mArte = false;
  public mBanda = false;
  public mCurso = false;
  public mEsport = false;
  public mMovil = false;
  public mMulti = false;
  public finalizado = false;
  constructor(public auth: AuthService, public goty: VotacionesService) {
    
   }
   
  ngOnInit(): void {}

  loginGoogle(){
    this.auth.loginRedes();
  }
  loginFacebook(){
    this.auth.loginFacebook();
  }
  loginTwitter(){
    this.auth.loginTwitter();
  }
  estaConectado(){
    
  }
  logOut(){
    this.auth.logOut();
  }
  menu(){
    this.conectado = this.auth.conectado;
  }
  ejemplo(){
    // this.goty.cargarUsuarios().subscribe();
    this.conectado = this.auth.conectado;    
    if (this.conectado){
      if (!this.auth.globalUser.goty){
        this.mGoty = true;
      }
      else if (!this.auth.globalUser.movil){
        this.mGoty = false;
        this.mMovil = true;
      }
      else if (!this.auth.globalUser.esport){
        this.mGoty = false;
        this.mMovil = false;
        this.mEsport = true;
      }
      else if (!this.auth.globalUser.arteVisual){
        this.mGoty = false;
        this.mMovil = false;
        this.mEsport = false;
        this.mArte = true;
      }
      else if (!this.auth.globalUser.bandaSonora){
        this.mGoty = false;
        this.mMovil = false;
        this.mEsport = false;
        this.mArte = false;
        this.mBanda = true;
      }
      else if (!this.auth.globalUser.multijugador){
        this.mGoty = false;
        this.mMovil = false;
        this.mEsport = false;
        this.mArte = false;
        this.mBanda = false;
        this.mMulti = true;
      }
      else if (!this.auth.globalUser.curso){
        this.mGoty = false;
        this.mMovil = false;
        this.mEsport = false;
        this.mArte = false;
        this.mBanda = false;
        this.mMulti = false;
        this.mCurso = true;
      }
      else{
        if (this.auth.globalUser.curso){
          this.finalizado = true;
          console.log(this.auth.fotoUsuario);
        }
      }
      this.goty.cargarGoty().subscribe();
      this.goty.cargarArte().subscribe();
      this.goty.cargarMovil().subscribe();
      this.goty.cargarBanda().subscribe();
      this.goty.cargarEsport().subscribe();
      this.goty.cargarMulti().subscribe();
      this.goty.cargarCurso().subscribe();
    }
  }
  votarGoty(id: string){
         this.goty.votarGoty(id).then(() => {
          this.mGoty = false;
          this.mMovil = true;
         });
         
        
     }
  votarArte(id){
    this.goty.votarArte(id).then(() => {
      this.mBanda = true;
      this.mArte = false;
    });
  }
  votarMovil(id){
    this.goty.votarMovil(id).then(() => {
      this.mMovil = false;
      this.mEsport = true;
    });
    
  }
  votarBanda(id){
    this.goty.votarBanda(id).then(() => {
      this.mBanda = false;
      this.mMulti = true; 
    });
  }
  votarCurso(id){
    this.goty.votarCurso(id).then(() => {
      this.mCurso = false;
      this.finalizado = true;
    });

  }
  votarEsport(id){
    this.goty.votarEsport(id).then(() => {
      this.mEsport = false;
      this.mArte = true;
    });
    }
  votarMulti(id){
    this.goty.votarMulti(id).then(() => {
      this.mMulti = false;
      this.mCurso = true;
    });
  }

  scroll(): void{
    const man = document.querySelector('#manifiesto');
    man.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }
  scrollInv(): void{
    const man = document.querySelector('#invitados');
    man.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
  }

}
