import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent {

  // 表示データ
  @Input() resultData: string[];

  constructor() { }

  // グラフの表示サイズ
  view: any[] = [700, 400];
  
  // 設定
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = '時間外時間';
  showYAxisLabel = true;
  yAxisLabel = '人数';

  　// カラーテーマ
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#FF0000', '#00FF00', '#0000FF']
  };
}
