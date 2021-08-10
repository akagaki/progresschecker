import React from "react"
import ReactDOM from 'react-dom';
import TeamItem from './TeamItem';
import ProjectItem from './ProjectItem';
import LoginUser from './LoginUser';
import Board from "./board";

class Index extends React.Component {
  constructor(){
      super()
      this.state = {
        loginUser: [],
        userIndex: [],
        userTeams: [],
        userProjects: [],
        userTasks: [],
        waitTask:[],//未対応
        waipTask:[],//対応中
        doneTask:[],//対応済
        conpletedTask:[],//完了
      }
  }
  // API取得
  componentDidMount(){
    this.setState({loading: true})
    const load= async () =>{
      // ユーザー一覧
      const userData = await fetch("http://0.0.0.0:8000/api/userIndex")
      const users = await userData.json();
      // ログインユーザー情報
      const userdata = await fetch("http://0.0.0.0:8000/api/loginUser");
      const user = await userdata.json();
      // ユーザーチーム一覧
      const teamData = await fetch("http://0.0.0.0:8000/api/userTeams")
      const teams = await teamData.json();
      // ユーザープロジェクト一覧
      const projectData = await fetch("http://0.0.0.0:8000/api/userProjects")
      const projects = await projectData.json();
      // ユーザータスク一覧
      const taskdata = await fetch("http://0.0.0.0:8000/api/userTasks");
      const tasks = await taskdata.json();
      const waitList = tasks.filter(obj=>{return obj.progress === 0});
      const waipList = tasks.filter(obj=>{return obj.progress === 1});
      const doneList = tasks.filter(obj=>{return obj.progress === 2});
      const conpletedList = tasks.filter(obj=>{return obj.progress === 3});
            this.setState({
              loginUser: user,
              userIndex: users,
              userTeams: teams,
              userProjects: projects,
              userTasks: tasks,
              waitTask:waitList,
              waipTask:waipList,
              doneTask:doneList,
              conpletedTask:conpletedList,
              loading: false,
            });
    }
    load();
  }
  reload(){
    this.componentDidMount();
  }
  render() {
    return (
      <div>
        <div onClick={() => {this. componentDidMount()}}>
          MyPage
        </div>
        <div className='container rounded bg-light p-3 mb-4 shadow'>
            <div className='row border-bottom'>
              <div  className='col justify-content-around' >
                <LoginUser
                  loginUserName={this.state.loginUser.name}
                  loginUserEmail={this.state.loginUser.email}
                  loginUserId={this.state.loginUser.id}
                />
              </div>
              <div  className='col justify-content-around' >
                <TeamItem
                  loading={this.state.loading}
                  loginUserId={this.state.loginUser.id}
                  userTeams={this.state.userTeams}
                  userIndex={this.state.userIndex}
                />
              </div>
              <div  className='col justify-content-around' >
                <ProjectItem
                  loading={this.state.loading}
                  loginUserId={this.state.loginUser.id}
                  userTeams={this.state.userTeams}
                  userProjects={this.state.userProjects}
                  userIndex={this.state.userIndex}
                />
              </div>
            </div>
        </div>
        <div>
          <Board
            loading={this.state.loading}
            userTeams={this.state.userTeams}
            userProjects={this.state.userProjects}
            userIndex={this.state.userIndex}
            userTasks={this.state.userTasks}
            waitTask={this.state.waitTask}
            waipTask={this.state.waipTask}
            doneTask={this.state.doneTask}
            conpletedTask={this.state.conpletedTask}
          />
        </div>
      </div>
    );
  }
}

export default Index;