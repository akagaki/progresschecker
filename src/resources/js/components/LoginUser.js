import React from 'react';
import ReactDOM from 'react-dom';
import TeamAdd from './add/teamAdd';


class LoginUser extends React.Component{
  constructor(){
      super()
      this.state = {
        loading:false,
        loginUser: [],
        incompTask: [],
        modalOpen: false,
      }
  }
// API取得
  componentDidMount(){
    this.setState({loading: true})
    const load= async () =>{
      const userdata = await fetch("http://0.0.0.0:8000/api/loginUser");
      const user = await userdata.json();
      const incompData = await fetch("http://0.0.0.0:8000/api/incompTasks");
      const incomp = await incompData.json();
            this.setState({
              loginUser: user,
              incompTask: incomp,
              loading: false
            });
            setInterval(clock, 1000);
    }
    load();
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
  }
  // 未完了タスククリック
  handleClickOpen(){
    this.setState({modalOpen: true});
  }
  // 未完了タスク画面を閉じる
  handleClickClose(){
    this.setState({modalOpen: false,});
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
              <div className="border-bottom">NAME：{this.state.loginUser.name}</div>  
              <div className="border-bottom">MAIL：{this.state.loginUser.email}</div>
            </small>
            {/* 新規チーム作成 */}
            <TeamAdd loginUserId={this.state.loginUser.id}/>
          </div>
          {/* 未完了タスク情報 */}
          <div>         
            <div>Your uncompleted tasks...</div>
          </div>
      </div>
    )
    // 未完了タスク数
    let taskCount ;
    if (this.state.incompTask === null) {
      taskCount = (
          <div className="text-center p-1 m-1">
            <div className="display-3">
              {this.state.loading ? "" :0}
            </div>
          </div>
    )} else {
      taskCount = (
          <div className="btn btn-light btn-block p-1 m-1"onClick={() => {this.handleClickOpen()}}>
            <div className="display-3">
              {this.state.loading ? "" : Object.keys(this.state.incompTask).length}
            </div>
          </div>
      )
    }
    // モーダル情報取得
    let incompModal;
    if(this.state.modalOpen === true){
      incompModal = (
          <div className='modal'>
            <div className='modal-container'>
              <div className="border-bottom text-center pb-2 mb-3">未完了タスク一覧</div>
              <div>
                    {this.state.incompTask.map((obj,index)=>
                      <div className="m-3" key={index} >
                        <a href={"/task/show?id="+obj.id}>{obj.name}</a>　({obj.deadline})
                      </div>)}
              </div>
              <button className="mt-3 btn btn-block btn-primary btn-info text-white" onClick={() => {this.handleClickClose()}}>
                Close
              </button>
            </div>
          </div>    
      )
    }
// 『描写』
// 一覧
    return (
        <div>
          {userShow}
          {taskCount}
          {incompModal}
        </div >

    );
  }
}
export default LoginUser;