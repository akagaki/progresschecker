import React from 'react';
import ReactDOM from 'react-dom';


class TeamItem extends React.Component{
  constructor(){
      super()
      this.state = {
          loading:false,
          userTeams: [],
          userIndex: [],
          teamModalOpen: false,
          teamInformation:[],
          createUserString:'',
      }  
  }
// API取得
  componentDidMount(){
      this.setState({
          loading: true
      })
      // ログインユーザーのチーム情報
      fetch("http://0.0.0.0:8000/api/userTeams")
          .then(response => response.json())
          .then(json => {
              console.log(json.map(obj => obj.id));
              this.setState({
                  userTeams: json,
                  loading: false
              })
          })
      // 登録ユーザー情報
      fetch("http://0.0.0.0:8000/api/userIndex")
          .then(response => response.json())
          .then(users => {
              console.log(users);
              this.setState({
                  userIndex: users,
              })
          })
      }
// 詳細表示
  handleClickOpen(id) {
    const data = this.state.userTeams.find(obj=> obj.id === id);
    console.log(data);
    this.setState({
      teamInformation:data,
      teamModalOpen: true
    });
    //作成者表示変更
    const createUser = this.state.userIndex.find(obj=> obj.id === data.user_id);
    this.setState({createUserString:createUser.name});
  }
  // 詳細を閉じる
  handleClickClose(){
    this.setState({
      teamModalOpen: false,
      teamInformation:[],
      createUserString:'',
    });
  }
  
  render() {
// 『データ』
// 一覧
    const teamName = this.state.loading ? "NowLoading..." : this.state.userTeams.map((obj,index)=>
        <div key={index} onClick={() => {this.handleClickOpen(obj.id)}}>{obj.name}</div>
    )
// 詳細
    const teamShow = (
      <div>
        <div>チーム名：{this.state.teamInformation.name}</div>  
        <div>詳細　　：{this.state.teamInformation.information}</div>  
        <div>作成日　：{this.state.teamInformation.created_at}</div>  
        <div>作成者　：{this.state.createUserString}</div> 
      </div>
    )
// 『描写』
// 詳細
    let teamModal;
    if(this.state.teamModalOpen === true){
        teamModal = (
          <div className='modal'>
            <div className='modal-container'>
              {teamShow}
              <button onClick={() => {this.handleClickClose()}}>
                Close
              </button>
            </div>
          </div>
        )
    }
// 一覧
    return (
      <div>
        <h2>Team</h2>
        <div>
          {teamName}
        </div>
        <div>
          {teamModal}
        </div>
      </div>
    );
  }
}
export default TeamItem;