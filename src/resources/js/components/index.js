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
      }
  }
  // API取得
  componentDidMount(){
    const load= async () =>{
      // ログインユーザー情報
      const userdata = await fetch("http://0.0.0.0:8000/api/loginUser");
      const user = await userdata.json();
            this.setState({
              loginUser: user,
            });
    }
    load();
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
                />
              </div>
              <div  className='col justify-content-around' >
                <TeamItem
                  loginUserId={this.state.loginUser.id}
                />
              </div>
              <div  className='col justify-content-around' >
                <ProjectItem
                  loginUserId={this.state.loginUser.id}
                />
              </div>
            </div>
        </div>
        <div>
          <Board />
        </div>
      </div>
    );
  }
}

export default Index;