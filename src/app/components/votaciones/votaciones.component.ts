import { Component, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-votaciones',
  templateUrl: './votaciones.component.html',
  styleUrls: ['./votaciones.component.css']
})
export class VotacionesComponent implements OnDestroy {

  results: any[] = [
    {
      'name': 'Zelda',
      'value': 20
    },
    {
      'name': 'The Last Of Us',
      'value': 30
    },
    {
      'name': 'Ghost of Sushima',
      'value': 70
    }
  ];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = true;
  showLegend = true;
  showXAxisLabel = true;
  yAxisLabel = 'Votos';
  showYAxisLabel = true;
  xAxisLabel = 'Juegos';

  colorScheme = 'nightLights';

  intervalo;
  constructor() {
    const newResults = [...this.results];
    this.intervalo = setInterval( () => {
      // tslint:disable-next-line: forin
      for (const i in newResults){
        newResults[i].value = Math.round(Math.random() * 500);
        console.log('Hola');
      }
      this.results = [...newResults];
    }, 2000);
  }

  onSelect(data): void {
    console.log('Item clicked', JSON.parse(JSON.stringify(data)));
  }

  onActivate(data): void {
    console.log('Activate', JSON.parse(JSON.stringify(data)));
  }

  onDeactivate(data): void {
    console.log('Deactivate', JSON.parse(JSON.stringify(data)));
  }
  ngOnDestroy(){
    clearInterval(this.intervalo);
  }



}
