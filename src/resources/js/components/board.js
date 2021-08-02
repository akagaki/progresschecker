import React from "react"
import ReactDOM from 'react-dom';


class Board extends React.Component {
  constructor(){
      super()
      this.state = {
          loading:false,
          userTasks: [],
          userProjects:[],
          userIndex: [],
          taskModalOpen: false,
          taskInformation:[],
          progressString:'',
          updateUserString:'',
          projectName:'',
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
          .then(tasks => {
            const waitList = tasks.filter(obj=>{return obj.progress === 0});
            const waipList = tasks.filter(obj=>{return obj.progress === 1});
            const doneList = tasks.filter(obj=>{return obj.progress === 2});
            const conpletedList = tasks.filter(obj=>{return obj.progress === 3});
              this.setState({
                  userTasks: tasks,
                  loading: false,
                  userProjects:[],
                  waitTask:waitList,
                  waipTask:waipList,
                  doneTask:doneList,
                  conpletedTask:conpletedList,
              })
          })
      // ログインユーザーのプロジェクト情報
      fetch("http://0.0.0.0:8000/api/userProjects")
          .then(response => response.json())
          .then(projects => {
              this.setState({
                  userProjects: projects,
                  loading: false
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
  handleClickOpen(id,project_id) {
    const data = this.state.userTasks.find(obj=> obj.id === id);
    // 更新者表示変更
    const updateUser = this.state.userIndex.find(obj=> obj.id === data.user_id);
    // プロジェクト情報表示変更
    const projectData = this.state.userProjects.find((obj)=>obj.id === project_id);
    // 対象データ取得
    this.setState({          
      taskInformation:data,
      updateUserString:updateUser.name,
      projectName:projectData.name,
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
  }
// 詳細を閉じる
  handleClickClose(){
    this.setState({
      taskModalOpen: false,
      taskInformation:[],
      progressString:'',
      updateUserString:'',
      projectName:'',
    });
  }

  render() {
// 『データ』
// カード一覧
    const waitCard = this.state.loading ? "NowLoading..." : this.state.waitTask.map((obj,index)=>
    <div className="border text-left btn btn-light btn-block p-2 shadow" key={index} onClick={() => {this.handleClickOpen(obj.id,obj.project_id)}}><div>{obj.name}</div><div>({obj.deadline})</div></div>)
    const waipCard = this.state.loading ? "NowLoading..." : this.state.waipTask.map((obj,index)=>
    <div className="border text-left btn btn-light btn-block p-2 shadow" key={index} onClick={() => {this.handleClickOpen(obj.id,obj.project_id)}}><div>{obj.name}</div><div>({obj.deadline})</div></div>)
    const doneCard = this.state.loading ? "NowLoading..." : this.state.doneTask.map((obj,index)=>
    <div className="border text-left btn btn-light btn-block p-2 shadow" key={index} onClick={() => {this.handleClickOpen(obj.id,obj.project_id)}}><div>{obj.name}</div><div>({obj.deadline})</div></div>)
    const conpletedCard = this.state.loading ? "NowLoading..." : this.state.conpletedTask.map((obj,index)=>
    <div className="border text-left btn btn-light btn-block p-2 shadow" key={index} onClick={() => {this.handleClickOpen(obj.id,obj.project_id)}}><div>{obj.name}</div><div>({obj.deadline})</div></div>)

// 詳細
    const taskShow = (    
      <div className="m-4">
        <div className="border-bottom text-center pb-2 mb-3">{this.state.taskInformation.name}
          <span className="small">　belong to {this.state.projectName}</span>
        </div>  
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