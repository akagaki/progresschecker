import React from 'react';
import ReactDOM from 'react-dom';

class TeamMemberIndex extends React.Component{
  constructor(){
      super()
      this.state={ 
        memberIndexModalOpen: false,
        memberIndex: [],
      }
  }
  componentDidMount(){
    const load = async () =>{
      // チームメンバー情報を取得
      fetch("http://0.0.0.0:8000/api/teamMemberData",{
      method: 'POST',
      body:JSON.stringify({
        id:this.props.teamId
      }),
      headers:{"Content-Type": "application/json"},
      }).then(response => response.json()
      ).then(json => {
        this.setState({
          memberIndex:json
        })
      }).catch((e) => {
        console.log(e);
        alert('情報を取得できませんでした');
      });
    }
    load();
  }
  //メンバー削除ボタン
  handleClickDel(userId,userName){
    const isYes = confirm("「"+ userName +"」さんをチームメンバーから削除してよろしいですか？");
    if(isYes === false){return}else{
    fetch("http://0.0.0.0:8000/api/teamMemberDel",{
      method: 'POST',
      body:JSON.stringify({
        user_id:userId,
        team_id:this.props.teamId,
      }),
      headers:{"Content-Type": "application/json"},
    }).then(response => {
        return response.text();
      }).then((text) => {
        alert(text);
      }).catch((e) => {
        console.log(e);
        alert('削除に失敗しました');
      });
      this.setState({
        memberIndex:[]
      })
      this.componentDidMount();
      this.handleClickClose();
    }
  }
  // MemberIndexボタン
  memberIndex(){
    return(
      <div>
        <small className="btn btn-light bg-white  btn-sm shadow-sm" onClick={() => {this.handleClickOpen()}}><i className="fas fa-users"></i></small>
      </div>
    )
  }
    //編集画面を開く
    handleClickOpen() {
      this.setState({
        memberIndexModalOpen: true
      });
    }
    // 編集画面を閉じる
    handleClickClose(){
      this.setState({
        memberIndexModalOpen: false,
      });
    }

  render() {
    const membersShow = (
      <div className="m-4">
        <div className="border-bottom text-center pb-2 mb-3">
          チームメンバー
          <span className="small">　for {this.props.teamName}</span>
        </div>        
        <div className="text-left m2">
        {this.state.memberIndex.map((obj,index) =>
            <div key={index}>
              {obj.name}
              <small className="btn btn-sm" onClick={() => {this.handleClickDel(obj.id,obj.name)}}><i className="far fa-trash-alt"></i></small>
            </div>
          )}
        </div>
      </div>
    )
    let memberIndexModal;
    if(this.state.memberIndexModalOpen === true){
      memberIndexModal = (
          <div className='custom-modal'>
            <div className='custom-modal-container'>
              {membersShow}
              <button className="btn btn-block btn-primary btn-info text-white" onClick={() => {this.handleClickClose()}}>
                Close
              </button>
            </div>
          </div>
        )
    }
    return (<div>
              {this.memberIndex()}
              {memberIndexModal}
            </div>
            );
  }
}
export default TeamMemberIndex;