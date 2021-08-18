import React from 'react';
import ReactDOM from 'react-dom';

class TeamMemberEdit extends React.Component{
  constructor(){
      super()
      this.state={ 
        userIndex: [],
        memberEditModalOpen: false,
        emailData:'',
        newMember:[],
        memberIndex: [],
      }
  }
  //メールフォーム
  onChangeEmail=(e)=>{
    this.setState({ 
      emailData: e.target.value,
    });
  }
  //ユーザー検索ボタン
  handleClickSearch=()=>{
    fetch("http://progresschecker-akagaki.herokuapp.com/api/userSearch",{
      method: 'POST',
      body:JSON.stringify({
        email:this.state.emailData
      }),
      headers:{"Content-Type": "application/json"},
    }).then(response => response.json()
      ).then(json => {
        this.setState({ newMember: json,});
        const isYes = confirm("「"+ this.state.newMember.name +"」さんを登録しますか？");
        if(isYes === false){return}else{
          this.teamMemberAdd(json.id);}
      }).catch((e) => {
        console.log(e);
        alert('入力が正しくありません。');
      });
  }
  // チームメンバー登録
  teamMemberAdd(user_id){
    console.log(this.state.newMember);
    fetch("http://progresschecker-akagaki.herokuapp.com/api/teamMemberAdd",{
      method: 'POST',
      body:JSON.stringify({
        user_id:user_id,
        team_id:this.props.teamId,
      }),
      headers:{"Content-Type": "application/json"},
    }).then(response => {
        return response.text();
      }).then((text) => {
        alert(text);
      }).catch((e) => {
        console.log(e);
        alert('入力が正しくありません。');
      });
     this.setState({
        emailData:'',
        newMember:[],
      });
      this.handleClickClose();
  }
  // MemberEditボタン
  teamMember(){
    return(
      <div>
        <small className="btn btn-light bg-white  btn-sm shadow-sm" onClick={() => {this.handleClickOpen()}}><i className="fas fa-user-plus"></i></small>
      </div>
    )
  }
  //編集画面を開く
  handleClickOpen() {
    this.setState({
      memberEditModalOpen: true
    });
  }
  // 編集画面を閉じる
  handleClickClose(){
    this.setState({
      memberEditModalOpen: false,
      emailData:'',
      newMember:[],
    });
  }
  
  render() {
    const searchForm = (  
      <div className="m-4">
        <div className="border-bottom text-center pb-2 mb-3">
          チームメンバー
          <span className="small">　for {this.props.teamName}</span>
        </div>
        <form className="text-left">
          <div className="form-group">
            <div>メンバー登録</div>
              <small>新規メンバーのメールアドレスを入力してください</small>
              <input type="email" className="form-control" value={this.state.emailData} placeholder="メールアドレスを入力"   onChange={this.onChangeEmail}/>
          </div>
        </form>
          <button className="btn btn-info text-white btn-sm shadow-sm m-1 float-left" onClick={() => {this. handleClickSearch()}}>
            検索
          </button>
          <button className="btn btn-light bg-white btn-sm shadow-sm m-1 " onClick={() => {this.handleClickClose()}}>
            Cancel
          </button>
      </div>
    )
    let memberEditModal;
    if(this.state.memberEditModalOpen === true){
      memberEditModal = (
        <div className='custom-modal'>
          <div className='custom-modal-container'>
            {searchForm}
          </div>
        </div>
    )}
    return (
      <div>
        {this.teamMember()}
        {memberEditModal}
      </div>
    );
  }
}
export default TeamMemberEdit;