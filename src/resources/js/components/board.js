import React from "react"
import ReactDOM from 'react-dom';
import TaskEdit from "./edit/taskEdit";
import TaskDel from "./delete/taskDel";


class Board extends React.Component {
  constructor(){
      super()
      this.state = {
          loading:false,
          userTasks: [],
          userTeams: [],
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
      this.setState({loading: true})
      const load = async () =>{
        // ユーザータスク一覧
        const taskdata = await fetch("http://0.0.0.0:8000/api/userTasks");
        const tasks = await taskdata.json();
        const waitList = tasks.filter(obj=>{return obj.progress === 0});
        const waipList = tasks.filter(obj=>{return obj.progress === 1});
        const doneList = tasks.filter(obj=>{return obj.progress === 2});
        const conpletedList = tasks.filter(obj=>{return obj.progress === 3});
        // ユーザーチーム一覧
        const teamData = await fetch("http://0.0.0.0:8000/api/userTeams")
        const teams = await teamData.json();
        // ユーザープロジェクト一覧
        const projectdata = await fetch("http://0.0.0.0:8000/api/userProjects");
        const projects = await projectdata.json();
        // ユーザー一覧
        const userdata = await fetch("http://0.0.0.0:8000/api/userIndex");
        const users = await userdata.json();
          this.setState({
            userTasks: tasks,
            waitTask:waitList,
            waipTask:waipList,
            doneTask:doneList,
            conpletedTask:conpletedList,
            userTeams: teams,
            userProjects: projects,
            userIndex: users,
            loading: false,
          });
      }
      load();
  }
  getBelongsName(project_id){
    const projectData = this.state.userProjects.find((obj)=>obj.id === project_id);
    const projectName = projectData.name;
    const teamData = this.state.userTeams.find((obj)=>obj.id === projectData.team_id);
    const teamName = teamData.name;
    const belongsName ={projectName:projectName,teamName:teamName};
    return belongsName;
  }
  // タスク詳細表示
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
    // 未対応
    const waitCard = this.state.loading ? "NowLoading..." : this.state.waitTask.map((obj,index)=>
    <div className="border text-left btn btn-light btn-block p-2 shadow" key={index} onClick={() => {this.handleClickOpen(obj.id,obj.project_id)}}>
      <div className="border-bottom">{obj.name}</div>
      <div className="border-bottom">期日：{obj.deadline}</div>
      <div>
        <div><small>Team：{this.getBelongsName(obj.project_id).teamName}</small></div>
        <div><small>Project：{this.getBelongsName(obj.project_id).projectName}</small></div>
      </div>
    </div>)
    // 対応中
    const waipCard = this.state.loading ? "NowLoading..." : this.state.waipTask.map((obj,index)=>
    <div className="border text-left btn btn-light btn-block p-2 shadow" key={index} onClick={() => {this.handleClickOpen(obj.id,obj.project_id)}}>
      <div className="border-bottom">{obj.name}</div>
      <div className="border-bottom">期日：{obj.deadline}</div>
      <div>
        <div><small>Team：{this.getBelongsName(obj.project_id).teamName}</small></div>
        <div><small>Project：{this.getBelongsName(obj.project_id).projectName}</small></div>
      </div>
    </div>)
    // 対応済
    const doneCard = this.state.loading ? "NowLoading..." : this.state.doneTask.map((obj,index)=>
    <div className="border text-left btn btn-light btn-block p-2 shadow" key={index} onClick={() => {this.handleClickOpen(obj.id,obj.project_id)}}>
      <div className="border-bottom">{obj.name}</div>
      <div className="border-bottom">期日：{obj.deadline}</div>
      <div>
        <div><small>Team：{this.getBelongsName(obj.project_id).teamName}</small></div>
        <div><small>Project：{this.getBelongsName(obj.project_id).projectName}</small></div>
      </div>
    </div>)
    // 完了
    const conpletedCard = this.state.loading ? "NowLoading..." : this.state.conpletedTask.map((obj,index)=>
    <div className="border text-left btn btn-light btn-block p-2 shadow" key={index} onClick={() => {this.handleClickOpen(obj.id,obj.project_id)}}>
      <div className="border-bottom">{obj.name}</div>
      <div className="border-bottom">期日：{obj.deadline}</div>
      <div>
        <div><small>Team：{this.getBelongsName(obj.project_id).teamName}</small></div>
        <div><small>Project：{this.getBelongsName(obj.project_id).projectName}</small></div>
      </div>
    </div>)

// 詳細
    const taskShow = (    
      <div className="m-4">
        <div className="border-bottom text-center pb-2 mb-3">
            <a  href={"/task/show?id="+this.state.taskInformation.id}>{this.state.taskInformation.name}</a>
            <span className="small">　belong to {this.state.projectName}</span>
            {/* 削除ボタン */}
            <div className="text-right">
              <TaskDel
                taskId={this.state.taskInformation.id}
              />
            </div>
        </div>
        {/* 詳細情報 */}
        <div>詳細　　：　{this.state.taskInformation.information}</div>  
        <div>進捗　　：　{this.state.progressString}</div>
        <div>期日　　：　{this.state.taskInformation.deadline}</div>  
        <div>更新日　：　{this.state.taskInformation.updated_at}</div>  
        <div>更新者　：　{this.state.updateUserString}</div>
        {/* 編集項目 */}
          <TaskEdit
            taskId={this.state.taskInformation.id}
            projectId={this.state.taskInformation.project_id}
            progress={this.state.taskInformation.progress}
            deadline={this.state.taskInformation.deadline}
          />
      </div>
    )
// 『描写』
// 詳細
    let taskModal;
    if(this.state.taskModalOpen === true){
      taskModal = (
        <div className='custom-modal'>
          <div className='custom-modal-container'>
            {taskShow}
            <button className="btn btn-block btn-primary btn-info text-white" onClick={() => {this.handleClickClose()}}>
              Close
            </button>
          </div>
        </div>
    )
  }
    return (
      <div className='container rounded bg-light p-3 mb-4 shadow'>
        <h2 className="border-bottom text-center pb-2 mb-2">TaskBoard</h2>
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