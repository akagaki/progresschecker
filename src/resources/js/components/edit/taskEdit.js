import React from "react"
import ReactDOM from 'react-dom';


class TaskEdit extends React.Component {
  constructor(){
    super()
    this.state = {
      progressData:'',
      deadlineData:'',
    }
  }
  componentDidMount(){
    this.setState({ 
      progressData: this.props.progress,
      deadlineData: this.props.deadline,
    });
  }
  onChangeProgress=(e)=>{
    this.setState({ 
      progressData: e.target.value,
    });
  }
  onChangeDate=(e)=>{
    this.setState({ 
      deadlineData: e.target.value,
    });
  }
  handleClickProgressEdit(){
    const isYes = confirm('進捗を変更しますか？');
    if(isYes === false){return}else{
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
        window.location.reload();
    }
  }
  handleClickDeadlineEdit(){
    const isYes = confirm('期日を変更しますか？');
    if(isYes === false){return}else{
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
        window.location.reload();
    }
  }
  
  progressEdit(){
    return(
      <div className="border-top pt-2 my-2">
        <div className="row m-1">
          <div className="col-10">
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
          <div className="col-10">
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