import React from "react"
import ReactDOM from 'react-dom';


class TeamAdd extends React.Component {
  constructor(){
    super()
    this.state = {
      teamAddModalOpen: false,
      nameData:'',
      informationData:'',
    }
  }
  //フォーム入力
  onChangeName=(e)=>{
    this.setState({ 
      nameData: e.target.value,
    });
  }
  onChangeInfo=(e)=>{
    this.setState({ 
      informationData: e.target.value,
    });
  }
  //登録ボタン
  handleClickAdd=()=>{
    const isYes = confirm('この内容で登録しますか？');
    if(isYes === false){return}
    const data = {name:this.state.nameData,information:this.state.informationData};
    console.log(data.name);
    console.log(data.information);
    console.log(this.props.loginUserId);
    fetch("http://0.0.0.0:8000/api/teamAdd",{
      method: 'POST',
      body:JSON.stringify({
        user_id:this.props.loginUserId,
        name:data.name,
        information:data.information
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
        nameData: '',
        informationData: '',
      });
    window.location.reload();
  }
  // NewTeamボタン
  teamCreate(){
    return(
      <div className="d-flex flex-row-reverse">
        <small className="btn btn-light bg-white  btn-sm shadow-sm m-1" onClick={() => {this.handleClickOpen()}}>NewTeam</small>
      </div>
    )
  }
  //作成画面を開く
  handleClickOpen() {
    this.setState({
      teamAddModalOpen: true
    });
  }
// 作成画面を閉じる
  handleClickClose(){
    this.setState({
      teamAddModalOpen: false,
      nameData: '',
      informationData: '',
    });
  }

  render(){
    const addForm = (    
      <div className="m-4">
        <div className="border-bottom text-center pb-2 mb-3">
          新規チーム作成
        </div>
        <form>
          <div className="form-group">
              TeamName:
              <input type="text" className="form-control" value={this.state.nameData} placeholder="チームの名前を入力"   onChange={this.onChangeName}/>
          </div>
          <div className="form-group">
              TeamInformation:
              <textarea className="form-control" value={this.state.informationData} placeholder="チームの詳細を入力"  onChange={this.onChangeInfo}/>
          </div>
        </form>
          <button className="btn btn-info text-white btn-sm shadow-sm m-1 float-left" onClick={() => {this. handleClickAdd()}}>
            登録
          </button>
          <button className="btn btn-light bg-white btn-sm shadow-sm m-1 " onClick={() => {this.handleClickClose()}}>
            Cancel
          </button>
      </div>
    )
    let teamAddModal;
    if(this.state.teamAddModalOpen === true){
      teamAddModal = (
        <div className='modal'>
          <div className='modal-container'>
            {addForm}
            <button className="btn btn-block btn-primary btn-info text-white" onClick={() => {this.handleClickClose()}}>
              Close
            </button>
          </div>
        </div>
    )}
    return (<div>
              {this.teamCreate()}
              {teamAddModal}
            </div>
           );
  }
}
  


export default TeamAdd;