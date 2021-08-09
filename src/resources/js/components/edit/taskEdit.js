import React from "react"
import ReactDOM from 'react-dom';


class TaskEdit extends React.Component {
  constructor(){
    super()
    this.state = {
      progressData:'',
    }
  }
  onChangeProgress=(e)=>{
    const progress = e.target.value;
    this.setState({ 
      progressData: progress,
    });
  }
  handleClickUpdate(){
    const isYes = confirm('進捗情報を更新しますか？');
    if(isYes === false){return}else{
      fetch("http://0.0.0.0:8000/api/progressUpdate",{
        method: 'POST',
        body:JSON.stringify({progress:this.state.progressData,id:this.props.taskId}),
        headers:{"Content-Type": "application/json"},
      }).then(response => {
          return response.text();
        }).then((text) => {
          alert(text);
        }).catch((e) => {
          console.error(e);
        });
        this.setState({ 
          progressData:'',
        });
        window.location.reload();
    }
  }
  
  progressEdit(){
    return(
      <div>
        <p className="border-top pt-2 my-2">進捗変更</p>
        <div className="row">
          <div className="col-10">
            <select className="custom-select" value={this.state.progressData} onChange={this.onChangeProgress}>
              <option >選択して下さい</option>
              <option value="0">未対応</option>
              <option value="1">対応中</option>
              <option value="2">対応済み</option>
              <option value="3">完了</option>
            </select>
          </div>
          <div className="col">
            <button className="text-right btn btn-info text-white btn-sm shadow-sm m-1" onClick={() => {this. handleClickUpdate()}}>
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