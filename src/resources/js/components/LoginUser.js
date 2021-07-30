import React from 'react';
import ReactDOM from 'react-dom';


class LoginUser extends React.Component{
  constructor(){
      super()
      this.state = {
        loading:false,
        loginUser: [],
      }
  }
// API取得
  componentDidMount(){
    this.setState({
        loading: true
    })
  fetch("http://0.0.0.0:8000/api/loginUser")
      .then(response => response.json())
      .then(json => {
          console.log(json);
          this.setState({
              loginUser: json,
              loading: false
          })
      })
  }

  render() {
// 『データ』
// 一覧
    const userShow = this.state.loading ? "NowLoading..." : (
      <div>
        <tr><td>ID　：{this.state.loginUser.id}</td></tr>  
        <tr><td>名前：{this.state.loginUser.name}</td></tr>  
        <tr><td>mail：{this.state.loginUser.email}</td></tr>  
      </div>
    )
        

// 『描写』
// 一覧
    return (
      <div>
        <h2>User</h2>
        <div>
          {userShow}
        </div >
      </div>
    );
  }
}
export default LoginUser;