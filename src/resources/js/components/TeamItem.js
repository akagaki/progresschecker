import React from 'react';
import ReactDOM from 'react-dom';


class TeamItem extends React.Component{
  constructor(){
      super()
      this.state = {
          loading:false,
          userTeams: [],
          teamModalOpen: false,
          teamInformation:[]
      }
      
  }
// API取得
  componentDidMount(){
      this.setState({
          loading: true
      })
      fetch("http://0.0.0.0:8000/api/userTeams")
          .then(response => response.json())
          .then(json => {
              console.log(json.map(obj => obj.id));
              this.setState({
                  userTeams: json,
                  loading: false
              })
          })
      }
// 『イベント』
// 詳細表示
  handleClickOpen(id) {
    const data = this.state.userTeams.find(obj=> obj.id === id);
    console.log(data);
    this.setState({
      teamInformation:data,
      teamModalOpen: true
    });
  }
  // 詳細を閉じる
  handleClickClose(){
    this.setState({
      teamModalOpen: false,
      teamInformation:[]
    });
  }
  
  render() {
// 『データ』
// 一覧
    const teamName = this.state.loading ? "NowLoading..." : this.state.userTeams.map(obj=>
      <tr>
        <td onClick={() => {this.handleClickOpen(obj.id)}}>{obj.name}</td>
      </tr>
    )
// 詳細
    const teamShow = (
      <div>
        <tr><td>チーム名：{this.state.teamInformation.name}</td></tr>  
        <tr><td>詳細　　：{this.state.teamInformation.information}</td></tr>  
        <tr><td>作成日　：{this.state.teamInformation.created_at}</td></tr>  
        <tr><td>作成者　：{this.state.teamInformation.user_id}</td></tr> 
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
        </div >
          {teamModal}
      </div>
    );
  }
}
export default TeamItem;