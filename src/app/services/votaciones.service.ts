import { Injectable } from '@angular/core';
import { AngularFirestore} from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import * as firebase from 'firebase/app';
import { AuthService } from './auth.service';
const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Injectable({
  providedIn: 'root'
})
export class VotacionesService {
  public arteVisual: any[];
  public movil: any[];
  public bandaSonora: any[];
  public curso: any[];
  public esport: any[];
  public goty: any[];
  public multijugador: any[];
  public usuarios: any[];
  public increase = firebase.default.firestore.FieldValue.increment(1);

  constructor(private afs: AngularFirestore, private auth: AuthService) {}
   cargarGoty(){
     return this.afs.collection('GOTY').valueChanges().pipe(map( resp => {
      this.goty = [];
      for (const game of resp){
        this.goty.unshift(game);
      }
      return this.goty;
     }));
   }
   cargarArte(){
    return this.afs.collection('ARTE VISUAL').valueChanges().pipe(map( resp => {
      this.arteVisual = [];
      for (const game of resp){
        this.arteVisual.unshift(game);
      }
      return this.arteVisual;
     }));
   }
   cargarMovil(){
    return this.afs.collection('MOVIL').valueChanges().pipe(map( resp => {
      this.movil = [];
      for (const game of resp){
        this.movil.unshift(game);
      }
      // console.log(this.movil);
      return this.movil;
     }));
   }
   cargarBanda(){
    return this.afs.collection('BANDA SONORA').valueChanges().pipe(map( resp => {
      this.bandaSonora = [];
      for (const game of resp){
        this.bandaSonora.unshift(game);
      }
      return this.bandaSonora;
     }));
   }
   cargarEsport(){
    return this.afs.collection('ESPORT').valueChanges().pipe(map( resp => {
      this.esport = [];
      for (const game of resp){
        this.esport.unshift(game);
      }
      return this.esport;
     }));
   }
   cargarCurso(){
    return this.afs.collection('CURSO').valueChanges().pipe(map( resp => {
      this.curso = [];
      for (const game of resp){
        this.curso.unshift(game);
      }
      return this.curso;
     }));
   }
  //  cargarUsuarios(){
  //   return this.afs.collection('users').valueChanges().pipe(map( resp => {
  //     this.usuarios = [];
  //     for (const game of resp){
  //       this.usuarios.unshift(game);
  //     }
  //     this.exportAsExcelFile(this.usuarios, 'Usuarios ');      
  //    }));

  //  }
   private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {type: EXCEL_TYPE});
    FileSaver.saveAs(data, fileName + '_export_' + new  Date().getTime() + EXCEL_EXTENSION);
 }
 public exportAsExcelFile(json: any[], excelFileName: string): void {
  const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
  const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  this.saveAsExcelFile(excelBuffer, excelFileName);
}
   cargarMulti(){
    return this.afs.collection('MULTIJUGADOR').valueChanges().pipe(map( resp => {
      this.multijugador = [];
      for (const game of resp){
        this.multijugador.unshift(game);
      }
      return this.multijugador;
     }));
   }
  votarGoty(id: string){
   return this.auth.votarGoty().then( () => {
      return this.afs.collection('GOTY').doc(id).update({votos: this.increase});
    });
     }
  votarArte(id){
    return this.auth.votarArte().then(() => {
      return this.afs.collection('ARTE VISUAL').doc(id).update({votos: this.increase});
    });
  }
  votarMovil(id){
    return this.auth.votarMovil().then(() => {
      return this.afs.collection('MOVIL').doc(id).update({votos: this.increase});
    });
  }
  votarBanda(id){
    return this.auth.votarBanda().then(() => {
      return this.afs.collection('BANDA SONORA').doc(id).update({votos: this.increase});
    });
  }
  votarCurso(id){
    return this.auth.votarCurso().then(() => {
      return this.afs.collection('CURSO').doc(id).update({votos: this.increase});
    });
  }
  votarEsport(id){
    return this.auth.votarEsport().then(() => {
      return this.afs.collection('ESPORT').doc(id).update({votos: this.increase});
    });
  }
  votarMulti(id){
    return this.auth.votarMulti().then(() => {
      return this.afs.collection('MULTIJUGADOR').doc(id).update({votos: this.increase});
    });
  }  
}
