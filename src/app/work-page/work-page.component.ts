import { CookieService } from 'ngx-cookie-service';
import { Component,OnInit,OnDestroy } from '@angular/core';
import { FormGroup,FormBuilder,Validators } from '@angular/forms'
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { NgxSpinnerService } from 'ngx-spinner';
import { UploadEvent, UploadFile, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';

var url = 'http://localhost:8888/';
// var url = 'http://192.168.1.241:8888/';
//var url = 'http://localhost:4200/app';

@Component({
  selector: 'app-work-page',
  templateUrl: './work-page.component.html',
  styleUrls: ['./work-page.component.css']
})
export class WorkPageComponent implements OnInit,OnDestroy {

  /*↓フォームコントロール用*/
  //フォームグループ
  paramForm : FormGroup;

  //集計対象
  aggregateTarget=[['0','総残業'],['1','普通残業'],['2','深夜残業'],['3','法定内残業']];

  //集計期間
  aggregateTerm=[['0','直近1ヶ月合計'],['1','直近3ヶ月合計'],['2','直近3ヶ月平均']];

  //時間
  aggregateTime="60";
  /*↑フォームコントロール用*/

  //アップロードファイル
  public files: UploadFile[] = [];

  //画面表示用
  lastUpdateTime : any;
  selectColumnNm : any;
  
  //グラフ用データ
  barChartData: any;
  pieChartData: any;

  //リスト用データ
  listData: any;

  classActive = "btn btn-info active";
  classNonActive = "btn btn-info";

  constructor(
    private cookieService: CookieService,
    private http: HttpClient,
    private spinner: NgxSpinnerService,
    private fb: FormBuilder
  ) {
    this.paramForm=this.fb.group({
      sqltarget:[this.aggregateTarget[0][0],Validators.required],
      sqlterm:[this.aggregateTerm[0][0],Validators.required],
      sqltime:this.aggregateTime.toString()
    });
  }

  /*
    コンポーネント開始時の処理
  */
  ngOnInit(){
    this.http.post(url + "sessionCheck", JSON.stringify({"UserId": this.cookieService.get('UserID')}))
    .subscribe(data => {
      //セッションがあれば通常処理
      //this.updateChart()
      //this.changeParam()
    },err => {
      //ファイルチェックのエラー
      if(err.status === 440) {
        alert(err.error);
      }
    });
  }

  /*
    コンポーネント破棄前の処理
  */
  ngOnDestroy() {
    this.cookieService.deleteAll();
  }

  /*
    ファイル選択時処理
  */
  public dropped(event: UploadEvent) {
    this.files = event.files;
    for (const droppedFile of event.files) {
 
      // Is it a file?
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry as FileSystemFileEntry;
        fileEntry.file((file: File) => {

          // Here you can access the real file
          //console.log(droppedFile.relativePath, file);

          // You could upload it like this:
          const formData = new FormData()
          formData.append('upload', file, droppedFile.relativePath)

          //ローディングアイコン表示
          this.spinner.show();

          this.http.post(url + "impcsv", formData)
          .subscribe(data => {
            
            //完了MSG
            alert("取り込みが完了しました。");
            
            //ローディングアイコン非表示
            this.spinner.hide();

          },err => {
            //ファイルチェックのエラー
            if(err.status === 400) {
              alert(err.error);
            }

            //ローディングアイコン非表示
            this.spinner.hide();
          });
        });
      } else {
        // It was a directory (empty directories are added, otherwise only files)
        // const fileEntry = droppedFile.fileEntry as FileSystemDirectoryEntry;
        // console.log(droppedFile.relativePath, fileEntry);
        alert("ファイルを指定してください。");
        this.spinner.hide();
      }
    }
  }

  /* 
    グラフのリフレッシュ
  */
  updateChart(){
    this.http.post(url + "sessionCheck", JSON.stringify({"UserId": this.cookieService.get('UserID')}))
    .subscribe(data => {
    this.updateBarChart()
    this.updatePieChart()
    this.lastUpdateTime = new Date().toLocaleString();
  },err => {
    //ファイルチェックのエラー
    if(err.status === 440) {
      alert(err.error);
    }
  });
  }

  /*
    棒グラフの更新
  */
  updateBarChart(){
    //ローディングアイコン表示
    this.spinner.show();

    //データ取得
    this.http.get(url + "getBarChartData").subscribe(
      response => {
      let res = response;
      this.barChartData = res;

      //ローディングアイコン非表示
      this.spinner.hide();

    },err => {
      alert("予期せぬエラーが発生しました。");
    });
  }

  /*
    円グラフの更新
  */
  updatePieChart(){
    //ローディングアイコン表示
    this.spinner.show();

    //データ取得
    this.http.get(url + "getPieChartData").subscribe(
      response => {
      let res = response;
      this.pieChartData = res;

      //ローディングアイコン非表示
      this.spinner.hide();

    },err => {
      alert("予期せぬエラーが発生しました。");
      this.spinner.hide();
    });
  }

  /*
    リストの検索条件でボタン押したときの有効/無効切り替え
  */
  getClass(selectValue: string, targetCtrl: string){

    if(this.paramForm.get(targetCtrl).value[0] === selectValue){
        return "btn btn-info active"
    }else{
        return "btn btn-outline-info"
    }
  }

  /*
    リスト取得
  */
  changeParam(){
      //ローディングアイコン表示
      this.spinner.show();

      setTimeout(() => {
          //
          this.http.post(url + "getListData",JSON.stringify(this.paramForm.value)).subscribe(
            response => {
            let res = response;
            this.listData = res;

            //ローディングアイコン非表示
            this.spinner.hide();

          },err => {
            this.spinner.hide();
          });
      }, 1000);
  }

  /*
    テキストボックス変更時の入力チェック
  */
  changeText(){
    if (isNaN(this.paramForm.get('sqltime').value)){
      alert("半角の数値を入力してください");
    }else{
      this.changeParam()
    }
  }

  listDownload(){
    // utf8
    const bom = '\uFEFF';
    
    const blob = new Blob([bom, this.arrToCSV()], { type: 'text/csv' });
    const anchor: any = document.createElement('a');

    // // IE
    // if (window.navigator.msSaveBlob) {
    //   window.navigator.msSaveBlob(blob, name);

    //   // chrome, firefox, etc.
    // } else if (window.URL && anchor.download !== undefined) {
      anchor.download = "download.csv";
      anchor.href = window.URL.createObjectURL(blob);
      document.body.appendChild(anchor);
      anchor.click();
      anchor.parentNode.removeChild(anchor);
      
    // } else {
    //   window.location.href =
    //     'data:attachment/csv;charset=utf-8,' + encodeURIComponent(bom + data);
    // }
  }

    /**
     * csv形式に変換
     *
     * 各フィールドの囲い -> ダブルクォーテーション
     * 各フィールドの区切り -> カンマ
     * 改行コード -> LF
     */
    arrToCSV(): string {
      var csvData: string = '従業員ID,従業員名,残業時間\r\n';

      // for (var i = 0; i < length(this.listData); i++) {
      for(let ld of this.listData) {
        csvData += ld.id + ',' + ld.name + ',' + ld.overtime + '\r\n';
      }

      return csvData;
    }

}
