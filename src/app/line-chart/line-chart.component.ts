import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent {

  // 表示データ
  //@Input() resultData: string[];

  constructor() { }

  // グラフの表示サイズ
  view: any[] = [700, 400];
  
  // 設定
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = '稼働年月';
  showYAxisLabel = true;
  yAxisLabel = '人数';

  　// カラーテーマ
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA', '#FF0000', '#00FF00', '#0000FF']
  };

  // サンプルデータ
  resultData = [
    {
      "name": "test",
      "series": [
        {
          "name": "201701",
          "value": 89
        },
        {
          "name": "201702",
          "value": 103
        },
        {
          "name": "201703",
          "value": 150
        },
        {
          "name": "201704",
          "value": 120
        },
        {
          "name": "201705",
          "value": 98
        },
        {
          "name": "201706",
          "value": 77
        },
        {
          "name": "201707",
          "value": 89
        },
        {
          "name": "201708",
          "value": 103
        },
        {
          "name": "201709",
          "value": 150
        },
        {
          "name": "201710",
          "value": 120
        },
        {
          "name": "201711",
          "value": 98
        },
        {
          "name": "201712",
          "value": 77
        },
        {
          "name": "201801",
          "value": 89
        },
        {
          "name": "201802",
          "value": 103
        },
        {
          "name": "201803",
          "value": 150
        },
        {
          "name": "201804",
          "value": 120
        },
        {
          "name": "201805",
          "value": 98
        },
        {
          "name": "201806",
          "value": 77
        },
        {
          "name": "201807",
          "value": 89
        },
        {
          "name": "201808",
          "value": 103
        },
        {
          "name": "201809",
          "value": 150
        },
        {
          "name": "201810",
          "value": 120
        },
        {
          "name": "201811",
          "value": 98
        },
        {
          "name": "201812",
          "value": 77
        },
      ]
    },

  ];

}
