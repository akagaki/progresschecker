import React from "react"
import ReactDOM from 'react-dom';


class TaskAdd extends React.Component {
  constructor(){
    super()
    this.state = {
      taskAddModalOpen: false,
      nameData:'',
      informationData:'',
      deadlineData:'',
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
  onChangeDate=(e)=>{
    this.setState({ 
      deadlineData: e.target.value,
    });
  }
  //登録ボタン
  handleClickAdd=()=>{
    const isYes = confirm('この内容で登録しますか？');
    if(isYes === false){return}
    const data = {
      name:this.state.nameData,
      information:this.state.informationData,
      deadline:this.state.deadlineData
    };
    fetch("/api/taskAdd",{
      method: 'POST',
      body:JSON.stringify({
        user_id:this.props.loginUserId,
        project_id:this.props.projectId,
        name:data.name,
        information:data.information,
        progress:'0',
        deadline:data.deadline,
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
        nameData:'',
        informationData:'',
        deadlineData:'',
        taskAddModalOpen: false,
      });
    this.props.reload()
  }
  // NewTaskボタン
  taskCreate(){
    return(
      <div>
        <small className="btn btn-light bg-white  btn-sm shadow-sm" onClick={() => {this.handleClickOpen()}}>NewTask　<i className="fas fa-plus"></i></small>
      </div>
    )
  }
  //作成画面を開く
  handleClickOpen() {
    this.setState({
      taskAddModalOpen: true
    });
  }
// 作成画面を閉じる
  handleClickClose(){
    this.setState({
      taskAddModalOpen: false,
      nameData: '',
      informationData: '',
      deadlineData: '',
    });
  }

  render(){
    const addForm = (    
      <div className="m-4">
        <div className="border-bottom text-center pb-2 mb-3">
          新規タスク作成
          <span className="small">　for {this.props.projectName}</span>
        </div>
        <form className="text-left">
          <div className="form-group">
              TaskName:
              <input type="text" className="form-control" value={this.state.nameData} placeholder="タスクの名前を入力"   onChange={this.onChangeName}/>
          </div>
          <div className="form-group">
              TaskInformation:
              <textarea className="form-control" value={this.state.informationData} placeholder="タスクの詳細を入力"  onChange={this.onChangeInfo}/>
          </div>
          <div className="form-group">
              期日:
              <input type="date" className="form-control" value={this.state.dateData} onChange={this.onChangeDate}/>
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
    let taskAddModal;
    if(this.state.taskAddModalOpen === true){
      taskAddModal = (
        <div className='custom-modal'>
          <div className='custom-modal-container'>
            {addForm}
          </div>
        </div>
    )}
    return (<div>
              {this.taskCreate()}
              {taskAddModal}
            </div>
           );
  }
}
  


export default TaskAdd;