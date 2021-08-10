import React from 'react';
import ReactDOM from 'react-dom';
import TeamAdd from './add/teamAdd';


class LoginUser extends React.Component{
  constructor(){
      super()
      this.state = {
        loginUser: [],
      }
  }
// API取得
  componentDidMount(){
    // デジタル時計
    const clock = () => {
      // 現在の日時・時刻の情報を取得
      const d = new Date();
      // 年を取得
      let year = d.getFullYear();
      // 月を取得
      let month = d.getMonth() + 1;
      // 日を取得
      let date = d.getDate();
      // 曜日を取得
      let dayNum = d.getDay();
      const weekday = ["(日)", "(月)", "(火)", "(水)", "(木)", "(金)", "(土)"];
      let day = weekday[dayNum];
      // 時を取得
      let hour = d.getHours();
      // 分を取得
      let min = d.getMinutes();
      // 秒を取得
      let sec = d.getSeconds();
      // 1桁の場合は0を足して2桁に
      month = month < 10 ? "0" + month : month;
      date = date < 10 ? "0" + date : date;
      hour = hour < 10 ? "0" + hour : hour;
      min = min < 10 ? "0" + min : min;
      sec = sec < 10 ? "0" + sec : sec;
      // 日付・時刻の文字列を作成
      let today = `${year}年${month}月${date}日 ${day}`;
      let time = `${hour}:${min}:${sec}`;
      // 文字列を出力
      document.querySelector(".clock-date").innerText = today;
      document.querySelector(".clock-time").innerText = time;
    };
    setInterval(clock, 1000);
  }

  render() {
// 『データ』
    // メイン
    const userShow = (
      <div>
          {/* 時計 */}
          <div className="text-light bg-dark rounded font-weight-bold p-2 mt-2  text-center">
            <p className="clock-date mb-1"></p>
            <h2 className="clock-time mb-0"></h2>
          </div>
          {/* ユーザー情報 */}
          <div  className="pt-4 pb-2">
            <small>
              <div className="border-bottom">NAME：{this.props.loginUserName}</div>  
              <div className="border-bottom">MAIL：{this.props.loginUserEmail}</div>
            </small>
            {/* 新規チーム作成 */}
            <TeamAdd 
              loginUserId={this.props.loginUserId}
              reload={this.props.reload}
            />
            

          </div>
      </div>
    )
// 『描写』
// 一覧
    return (
        <div>
          {userShow}
        </div >

    );
  }
}
export default LoginUser;