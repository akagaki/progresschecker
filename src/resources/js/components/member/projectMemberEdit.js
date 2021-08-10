import React from 'react';
import ReactDOM from 'react-dom';

class ProjectMemberEdit extends React.Component{
  constructor(){
      super()
      this.state={ 
        memberEditModalOpen: false,
        memberData:[],
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
  // セレクトボックス変更時
  onChangeData=(e)=>{
    this.setState({ 
      memberData: e.target.value,
    });
  }
  //メンバー登録ボタン
  handleClickAdd(){
    fetch("http://0.0.0.0:8000/api/projectMemberAdd",{
      method: 'POST',
      body:JSON.stringify({
        user_id:this.state.memberData,
        project_id:this.props.projectId,
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
        memberData:[],
      });
      this.componentDidMount();
      this.handleClickClose();
  }
  // MemberEditボタン
  projectMember(){
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
    });
  }
  
  render() {
    const searchForm = (  
      <div className="m-4">
        <div className="border-bottom text-center pb-2 mb-3">
          プロジェクトメンバー
          <span className="small">　for {this.props.projectName}</span>
        </div>        
        <div className="text-left">
          <div>メンバー登録</div>
          <select className="custom-select mb-2"onChange={this.onChangeData}>
            <option>選択してください</option>
            {this.state.memberIndex.map((obj,index) =>
            <option key={index} value={obj.id}>{obj.name}</option>
            )}
          </select>
        </div>
        <button className="btn btn-info text-white btn-sm shadow-sm m-1 float-left" onClick={() => {this. handleClickAdd()}}>
          登録
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
        {this.projectMember()}
        {memberEditModal}
      </div>
    );
  }
}
export default ProjectMemberEdit;