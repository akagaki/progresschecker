import React from "react"
import ReactDOM from 'react-dom';


class TaskDel extends React.Component {
  constructor(){
    super()
  }
  
  //削除ボタン
  handleClickDel=()=>{
    const isYes = confirm('一度削除したデータは元に戻すことはできません\n削除してよろしいですか？');
    if(isYes === false){return}
    console.log(this.props.taskId);
    fetch("http://0.0.0.0:8000/api/taskDel",{
      method: 'POST',
      body:JSON.stringify({
        id:this.props.taskId
      }),
      headers:{"Content-Type": "application/json"},
    }).then(response => {
        return response.text();
      }).then((text) => {
        alert(text);
      }).catch((e) => {
        console.log(e);
      });
      this.props.reload()
  }
  // TaskDeleteボタン
  taskDelete(){
    return(
      <div>
        <small className="btn btn-light bg-white  btn-sm shadow-sm" onClick={() => {this.handleClickDel()}}><i className="far fa-trash-alt text-right"></i></small>
      </div>
    )
  }
  
  render(){
    return (<div>
              {this.taskDelete()}
            </div>
           );
  }
}
  


export default TaskDel;