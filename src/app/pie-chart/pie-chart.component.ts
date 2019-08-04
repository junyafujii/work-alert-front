import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent {

  // 表示データ
  @Input() resultData: string[];

  constructor() {}
  
  // グラフの表示サイズ
  view: any[] = [700, 400];
  
  // 設定
  showLegend = true;
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  　// カラーテーマ
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#FF0000', '#00FF00', '#0000FF']
  };

  // // サンプルデータ
  // sampleData = [
  //   {name: 'Germany', value: '100'},
  //   {name: 'France', value: '200'},
  //   {name: 'Japan', value: '300'}
  // ];

}
