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
        incompTask: [],
      }
      this.reload=this.reload.bind(this);
  }
  // API取得
  componentDidMount(){
    this.setState({loading: true})
    const load= async () =>{
      // ユーザー一覧
      // const usersData = await fetch("http://progresschecker-akagaki.herokuapp.com/api/userIndex");
      const usersData = await fetch("http://0.0.0.0:8000/api/userIndex");
      console.log(usersData);
      const users = await usersData.json();
      console.log(users);
      // ログインユーザー情報
      // const userdata = await fetch("http://progresschecker-akagaki.herokuapp.com/api/loginUser");
      const userdata = await fetch("http://0.0.0.0:8000/api/loginUser");
      console.log(userdata);
      const user = await userdata.json();
      console.log(user);
      // ユーザーチーム一覧
      // const teamData = await fetch("http://progresschecker-akagaki.herokuapp.com/api/userTeams");
      const teamData = await fetch("http://0.0.0.0:8000/api/userTeams");
      const teams = await teamData.json();
      // ユーザープロジェクト一覧
      // const projectData = await fetch("http://progresschecker-akagaki.herokuapp.com/api/userProjects");
      const projectData = await fetch("http://0.0.0.0:8000/api/userProjects");
      const projects = await projectData.json();
      // ユーザータスク一覧
      // const taskdata = await fetch("http://progresschecker-akagaki.herokuapp.com/api/userTasks");
      const taskdata = await fetch("http://0.0.0.0:8000/api/userTasks");
      const tasks = await taskdata.json();
      const waitList = tasks.filter(obj=>{return obj.progress === 0});
      const waipList = tasks.filter(obj=>{return obj.progress === 1});
      const doneList = tasks.filter(obj=>{return obj.progress === 2});
      const conpletedList = tasks.filter(obj=>{return obj.progress === 3});
      // 未完了タスク情報
      // const incompData = await fetch("http://progresschecker-akagaki.herokuapp.com/api/incompTasks");
      const incompData = await fetch("http://0.0.0.0:8000/api/incompTasks");
      const incomp = await incompData.json();
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
              incompTask: incomp,
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
        <div className='container rounded bg-light p-3 mb-4 shadow'>
            <div className='row border-bottom'>
              <div  className='col justify-content-around' >
                <LoginUser
                  loginUserName={this.state.loginUser.name}
                  loginUserEmail={this.state.loginUser.email}
                  loginUserId={this.state.loginUser.id}
                  reload={this.reload}
                />
              </div>
              <div  className='col justify-content-around' >
                <TeamItem
                  loading={this.state.loading}
                  loginUserId={this.state.loginUser.id}
                  userTeams={this.state.userTeams}
                  userIndex={this.state.userIndex}
                  reload={this.reload}
                />
              </div>
              <div  className='col justify-content-around' >
                <ProjectItem
                  loading={this.state.loading}
                  loginUserId={this.state.loginUser.id}
                  userTeams={this.state.userTeams}
                  userProjects={this.state.userProjects}
                  userIndex={this.state.userIndex}
                  reload={this.reload}
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
            incompTask={this.state.incompTask}
            reload={this.reload}
          />
        </div>
      </div>
    );
  }
}

export default Index;