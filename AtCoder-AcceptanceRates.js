const readlineSync = require('readline-sync');
var contest = readlineSync.question("コンテスト名を入力してください(例. abc001, arc001, agc001)\n");
var user = readlineSync.question("ユーザー名を入力してください\n")
var submissions = 'https://atcoder.jp/contests/' + contest + '/submissions?f.User=' + user;
const axios = require('axios');
var i, p, url = new Array, l = 0;

var counter = function(str,seq){
    return str.split(seq).length - 1;
}

const main = async () => {
axios.get(submissions).then(async (sub) => {
  i = sub.data.lenght;
  p = sub.data.lastIndexOf('data-id="', i);
  while(sub.data.lastIndexOf('data-id="', i) != -1) {
    var n = sub.data.slice(p+9, sub.data.indexOf('">', p));
    url.push('https://atcoder.jp/contests/' + contest + '/submissions/' + n);
    i = p-1;
    p = sub.data.lastIndexOf('data-id="', i);  
  }
　console.log("\n");
  //url.splice(0, l);
  while(true){
    for(var k = 0; k < url.length; k++) {
      const res = await axios.get(url[k])
        var AC = counter(res.data, 'title="Accepted"');
        var WA = counter(res.data, 'title="Wrong Answer"');
        var RE = counter(res.data, 'title="Runtime Error"');
        var TLE = counter(res.data, 'title="Time Limit Exceeded"');
        var MLE = counter(res.data, 'title="Memory Limit Exceeded"');
        var CE = counter(res.data, 'title="Compilation Error"');
        var IE = counter(res.data, 'title="Internal Error"');
        var OLE = counter(res.data, 'title="Output Limit Exceeded"');
        var result = [res.data.indexOf('title="Accepted"'),res.data.indexOf('title="Wrong Answer"'),res.data.indexOf('title="Runtime Error"'),res.data.indexOf('title="Time Limit Exceeded"'),res.data.indexOf('title="Memory Limit Exceeded"'),res.data.indexOf('title="Compilation Error"'),res.data.indexOf('title="Internal Error"'),res.data.indexOf('title="Output Limit Exceeded"')];
        for(var j = 0; j < result.length; j++) {
          if(result[j] == -1) {
            result.splice(j,1);
            j--;
          }
        }  
        var t = res.data.indexOf("<time class='fixtime fixtime-second'>");
        console.log("提出日時 : " + res.data.slice(t+37, res.data.indexOf("+", t)));
        var q = res.data.indexOf("<a href=" + '"' + "/contests/" + contest + "/tasks/" + contest + "_")	
        console.log("問題 : " + res.data.slice(q+42, res.data.indexOf("</a>", q)));
        var status = Math.min.apply(null, result), submit = res.data.slice(status, status+29);  
        if(submit.indexOf('title="Accepted"') != -1) {console.log("結果 : AC"); AC--;}
        if(submit.indexOf('title="Wrong Answer"') != -1) {console.log("結果 : WA"); WA--;}
        if(submit.indexOf('title="Runtime Error"') != -1) {console.log("結果 : RE"); RE--;}
        if(submit.indexOf('title="Time Limit Exceeded"') != -1) {console.log("結果 : TLE"); TLE--;}
        if(submit.indexOf('title="Memory Limit Exceeded"') != -1) {console.log("結果 : MLE"); MLE--;}
        if(submit.indexOf('title="Compilation Error"') != -1) {console.log("結果 : CE"); CE--;}
        if(submit.indexOf('title="Internal Error"') != -1) {console.log("結果 : IE"); IE--;}
        if(submit.indexOf('title="Output Limit Exceeded"') != -1) {console.log("結果 : OLE"); OLE--;}
        var sum = AC + WA + RE + TLE + MLE + CE + IE + OLE;
        console.log("正解問題数 : " + AC + "/" + sum);
        console.log("正解率 : " +　Math.round(AC / sum * 100 * 10) / 10 + "%\n"); 
        //l += url.length;
        //url.length = 0;
       } 
      exit;
     }
  }).catch(error => {

  });
}

main()