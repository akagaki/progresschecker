import React from "react"
import ReactDOM from 'react-dom';


class ProjectAdd extends React.Component {
  constructor(){
    super()
    this.state = {
      projectAddModalOpen: false,
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
    // fetch("http://progresschecker-akagaki.herokuapp.com/api/projectAdd",{
    fetch("http://0.0.0.0:8000/api/projectAdd",{
      method: 'POST',
      body:JSON.stringify({
        user_id:this.props.loginUserId,
        team_id:this.props.teamId,
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
        projectAddModalOpen: false,
      });
      this.props.reload()
  }
  // NewProjectボタン
  projectCreate(){
    return(
      <div>
        <small className="btn btn-light bg-white  btn-sm shadow-sm" onClick={() => {this.handleClickOpen()}}>NewProject　<i className="fas fa-plus"></i></small>
      </div>
    )
  }
  //作成画面を開く
  handleClickOpen() {
    this.setState({
      projectAddModalOpen: true
    });
  }
// 作成画面を閉じる
  handleClickClose(){
    this.setState({
      projectAddModalOpen: false,
      nameData: '',
      informationData: '',
    });
  }

  render(){
    const addForm = (    
      <div className="m-4">
        <div className="border-bottom text-center pb-2 mb-3">
          新規プロジェクト作成
          <span className="small">　for {this.props.teamName}</span>
        </div>
        <form className="text-left">
          <div className="form-group">
              ProjectName:
              <input type="text" className="form-control" value={this.state.nameData} placeholder="プロジェクトの名前を入力"   onChange={this.onChangeName}/>
          </div>
          <div className="form-group">
              ProjectInformation:
              <textarea className="form-control" value={this.state.informationData} placeholder="プロジェクトの詳細を入力"  onChange={this.onChangeInfo}/>
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
    let projectAddModal;
    if(this.state.projectAddModalOpen === true){
      projectAddModal = (
        <div className='custom-modal'>
          <div className='custom-modal-container'>
            {addForm}
          </div>
        </div>
    )}
    return (<div>
              {this.projectCreate()}
              {projectAddModal}
            </div>
           );
  }
}
  


export default ProjectAdd;