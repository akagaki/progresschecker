import React from 'react';
import ReactDOM from 'react-dom';

class TeamMember extends React.Component{
  constructor(){
      super()
      this.state={ 
        userIndex: [],
        memberEditModalOpen: false,
        emailData:'',
      }
  }
// API取得
  // componentDidMount(){
  //   const load = async () =>{
  //     // ログインユーザー情報
  //     const userdata = await fetch("http://0.0.0.0:8000/api/userIndex");
  //     const users = await userdata.json();
      
  //     this.setState({ 
  //       userIndex: users,
  //     });
  //   }
  //   load();
  // }
  //フォーム入力
  onChangeEmail=(e)=>{
    this.setState({ 
      emailData: e.target.value,
    });
  }
  //検索ボタン
  handleClickSearch=()=>{
    
    console.log(this.state.emailData);
    // fetch("http://0.0.0.0:8000/api/projectAdd",{
    //   method: 'POST',
    //   body:JSON.stringify({
    //     user_id:this.props.loginUserId,
    //     team_id:this.props.teamId,
    //     name:data.name,
    //     information:data.information
    //   }),
    //   headers:{"Content-Type": "application/json"},
    // }).then(response => {
    //     return response.text();
    //   }).then((text) => {
    //     alert(text);
    //   }).catch((e) => {
    //     console.log(e);
    //     alert('入力が正しくありません。');
    //   });
    //  this.setState({ 
    //     nameData: '',
    //     informationData: '',
    //   });
  }
  // MemberEditボタン
  teamMember(){
    return(
      <div>
        <small className="btn btn-light bg-white  btn-sm shadow-sm" onClick={() => {this.handleClickOpen()}}>MemberEdit　<i className="fas fa-plus"></i></small>
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
        <div className='modal'>
          <div className='modal-container'>
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
export default TeamMember;