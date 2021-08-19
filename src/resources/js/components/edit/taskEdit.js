import React from "react"
import ReactDOM from 'react-dom';


class TaskEdit extends React.Component {
  constructor(){
    super()
    this.state = {
      progressData:'',
      deadlineData:'',
      memberData:[],
      memberIndex: [],
    }
  }
  componentDidMount(){
    const load = async () =>{
      // プロジェクトメンバー情報を取得
      // fetch("http://progresschecker-akagaki.herokuapp.com/api/projectMemberData",{
      fetch("http://0.0.0.0:8000/api/projectMemberData",{
      method: 'POST',
      body:JSON.stringify({
        id:this.props.projectId
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
    this.setState({ 
      progressData: this.props.progress,
      deadlineData: this.props.deadline,
    });
  }
  // 進捗変更
  onChangeProgress=(e)=>{
    this.setState({ 
      progressData: e.target.value,
    });
  }
  // 期日変更
  onChangeDate=(e)=>{
    this.setState({ 
      deadlineData: e.target.value,
    });
  }
  // 担当変更
  onChangeData=(e)=>{
    this.setState({ 
      memberData: e.target.value,
    });
  }
  // 進捗変更ボタン
  handleClickProgressEdit(){
    const isYes = confirm('進捗を変更しますか？');
    if(isYes === false){return}else{
      // fetch("http://progresschecker-akagaki.herokuapp.com/api/progressUpdate",{
      fetch("http://0.0.0.0:8000/api/progressUpdate",{
        method: 'POST',
        body:JSON.stringify({
          id:this.props.taskId,
          progress:this.state.progressData,
        }),
        headers:{"Content-Type": "application/json"},
      }).then(response => {
          return response.text();
        }).then((text) => {
          alert(text);
        }).catch((e) => {
          console.error(e);
        });
      this.props.reload()
      this.props.modalClose()
    }
  }
  // 期日変更ボタン
  handleClickDeadlineEdit(){
    const isYes = confirm('期日を変更しますか？');
    if(isYes === false){return}else{
      // fetch("http://progresschecker-akagaki.herokuapp.com/api/deadlineUpdate",{
      fetch("http://0.0.0.0:8000/api/deadlineUpdate",{
        method: 'POST',
        body:JSON.stringify({
          id:this.props.taskId,
          deadline:this.state.deadlineData,
        }),
        headers:{"Content-Type": "application/json"},
      }).then(response => {
          return response.text();
        }).then((text) => {
          alert(text);
        }).catch((e) => {
          console.error(e);
        });
        this.props.reload()
        this.props.modalClose()
    }
  }
  //担当変更ボタン
  handleClickAdd(){
    const isYes = confirm('担当者を変更しますか？');
    if(isYes === false){return}else{
      this.props.reload()
      // fetch("http://progresschecker-akagaki.herokuapp.com/api/taskMemberAdd",{
      fetch("http://0.0.0.0:8000/api/taskMemberAdd",{
        method: 'POST',
        body:JSON.stringify({
          user_id:this.state.memberData,
          task_id:this.props.taskId,
        }),
        headers:{"Content-Type": "application/json"},
      }).then(response => {
          return response.text();
        }).then((text) => {
          alert(text);
        }).catch((e) => {
          console.log(e);
        });
      this.setState({
          memberData:[],
        });
      this.props.reload()
      this.props.modalClose()
      }
    }
  // 描写
  progressEdit(){
    return(
      <div className="border-top pt-2 my-2">
        <div className="row m-1">
          <div className="col">
          進捗変更
            <select className="custom-select" value={this.state.progressData} 
            onChange={this.onChangeProgress}>
              <option value="0">未対応</option>
              <option value="1">対応中</option>
              <option value="2">対応済み</option>
              <option value="3">完了</option>
            </select>
          </div>
          <div className="col align-self-end">
            <button className="text-right btn btn-info text-white btn-sm shadow-sm m-1" 
            onClick={() => {this. handleClickProgressEdit()}}>
                更新
            </button>
          </div>
        </div>
        <div className="row m-1">
          <div className="col">
          期日変更
            <input type="date" className="form-control" value={this.state.deadlineData} 
            onChange={this.onChangeDate}/>
          </div>
          <div className="col align-self-end">
            <button className="text-right btn btn-info text-white btn-sm shadow-sm m-1" 
            onClick={() => {this. handleClickDeadlineEdit()}}>
                更新
            </button>
          </div>
        </div>
        <div className="row m-1">
          <div className="col">
          担当変更
            <select className="custom-select"onChange={this.onChangeData}>
              <option>選択してください</option>
              {this.state.memberIndex.map((obj,index) =>
              <option key={index} value={obj.id}>{obj.name}</option>
              )}
            </select>
          </div>
          <div className="col align-self-end">
            <button className="btn btn-info text-white btn-sm shadow-sm m-1 float-left" 
            onClick={() => {this. handleClickAdd()}}>
                更新
            </button>
          </div>
        </div>
      </div>
    )
  } 
  render(){
    return (
      <div>
        {this.progressEdit()}
      </div>
    );
  }
}

export default TaskEdit;