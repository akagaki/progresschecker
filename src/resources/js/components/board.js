import React from "react"
import ReactDOM from 'react-dom';


class Board extends React.Component {
  constructor(){
      super()
      this.state = {
          loading:false,
          userTasks: [],
          userIndex: [],
          taskModalOpen: false,
          taskInformation:[],
          progressString:'',
          updateUserString:'',
          waitTask:[],//未対応
          waipTask:[],//対応中
          doneTask:[],//対応済
          conpletedTask:[],//完了
      }
  }
// API取得
  componentDidMount(){
      this.setState({
          loading: true
      })
      // ログインユーザーのタスク情報
      fetch("http://0.0.0.0:8000/api/userTasks")
          .then(response => response.json())
          .then(json => {
            const waitList = json.filter(obj=>{return obj.progress === 0});
            const waipList = json.filter(obj=>{return obj.progress === 1});
            const doneList = json.filter(obj=>{return obj.progress === 2});
            const conpletedList = json.filter(obj=>{return obj.progress === 3});
              this.setState({
                  userTasks: json,
                  loading: false,
                  waitTask:waitList,
                  waipTask:waipList,
                  doneTask:doneList,
                  conpletedTask:conpletedList,
              })
          })
      // 登録ユーザー情報
      fetch("http://0.0.0.0:8000/api/userIndex")
          .then(response => response.json())
          .then(users => {
              this.setState({
                  userIndex: users,
              })
          })
      }
// 詳細表示
  handleClickOpen(id) {
    const data = this.state.userTasks.find(obj=> obj.id === id);
    // 対象データ取得
    this.setState({          
      taskInformation:data,
      taskModalOpen: true
    });
    // 進捗表示変更
    switch(data.progress){
      case 0:
        this.setState({progressString:"未対応"});
        break;
      case 1:
        this.setState({progressString:"対応中"});
        break;
      case 2:
        this.setState({progressString:"対応済"});
        break;
      case 3:
        this.setState({progressString:"完了"});
        break;
      }
    // 更新者表示変更
    const updateUser = this.state.userIndex.find(obj=> obj.id === data.user_id);
    this.setState({updateUserString:updateUser.name});
  }
// 詳細を閉じる
  handleClickClose(){
    this.setState({
      taskModalOpen: false,
      taskInformation:[],
      progressString:'',
      updateUserString:'',
    });
  }
  getWaitTask(){
    const waitList = this.state.userTasks.filter(obj=>{return obj.progress === 0});
    this.setState({waitTask:waitList});
  }
  render() {
// 『データ』
// カード一覧
    const waitCard = this.state.loading ? "NowLoading..." : this.state.waitTask.map((obj,index)=>
    <div className="btn btn-light p-1 m-2" key={index} onClick={() => {this.handleClickOpen(obj.id)}}>{obj.name}({obj.deadline})</div>)
    const waipCard = this.state.loading ? "NowLoading..." : this.state.waipTask.map((obj,index)=>
    <div className="btn btn-light p-1 m-2" key={index} onClick={() => {this.handleClickOpen(obj.id)}}>{obj.name}({obj.deadline})</div>)
    const doneCard = this.state.loading ? "NowLoading..." : this.state.doneTask.map((obj,index)=>
    <div className="btn btn-light p-1 m-2" key={index} onClick={() => {this.handleClickOpen(obj.id)}}>{obj.name}({obj.deadline})</div>)
    const conpletedCard = this.state.loading ? "NowLoading..." : this.state.conpletedTask.map((obj,index)=>
    <div className="btn btn-light p-1 m-2" key={index} onClick={() => {this.handleClickOpen(obj.id)}}>{obj.name}({obj.deadline})</div>)

// 詳細
    const taskShow = (    
      <div className="m-4">
        <div className="border-bottom text-center pb-2 mb-3">{this.state.taskInformation.name}</div>  
        <div>詳細　　：　{this.state.taskInformation.information}</div>  
        <div>進捗　　：　{this.state.progressString}</div>  
        <div>期日　　：　{this.state.taskInformation.deadline}</div>  
        <div>更新日　：　{this.state.taskInformation.updated_at}</div>  
        <div>更新者　：　{this.state.updateUserString}</div> 
      </div>
    )
// 『描写』
// 詳細
    let taskModal;
    if(this.state.taskModalOpen === true){
      taskModal = (
        <div className='modal'>
          <div className='modal-container'>
            {taskShow}
            <button className="btn btn-block btn-primary btn-info text-white" onClick={() => {this.handleClickClose()}}>
              Close
            </button>
          </div>
        </div>
    )
  }
    return (
      <div className='container rounded bg-light p-4 mb-4 shadow'>
          <div className='row border-bottom pb-4'>
            <div className='col justify-content-around bg-light shadow m-2 p-3'>
              <h5><span className='badge badge-danger btn-block py-1'>未対応</span></h5>
                {waitCard}
            </div>
            <div className='col justify-content-around bg-light shadow m-2 p-3'>
                <h5><span className='badge badge-warning btn-block py-1'>対応中</span></h5>
                {waipCard}
            </div>
            <div className='col justify-content-around bg-light shadow m-2 p-3'>
              <h5><span className='badge badge-success btn-block py-1'>対応済</span></h5>
                {doneCard}
            </div>
            <div className='col justify-content-around bg-light shadow m-2 p-3'>
              <h5><span className='badge badge-primary btn-block py-1'>完了</span></h5>
                {conpletedCard}
            </div>
            {taskModal}
          </div>
      </div>
    );
  }
}

export default Board;