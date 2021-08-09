import React from "react"
import ReactDOM from 'react-dom';


class ProjectDel extends React.Component {
  constructor(){
    super()
  }
  
  //削除ボタン
  handleClickDel=()=>{
    const isYes = confirm('プロジェクトを削除すると関連するタスクも削除されます\n一度削除したデータは元に戻すことはできません\n削除してよろしいですか？');
    if(isYes === false){return}
    console.log(this.props.projectId);
    fetch("http://0.0.0.0:8000/api/projectDel",{
      method: 'POST',
      body:JSON.stringify({
        id:this.props.projectId
      }),
      headers:{"Content-Type": "application/json"},
    }).then(response => {
        return response.text();
      }).then((text) => {
        alert(text);
      }).catch((e) => {
        console.log(e);
      });
      window.location.reload();
  }
  // projectDeleteボタン
  projectDelete(){
    return(
      <div>
        <small className="btn btn-light bg-white  btn-sm shadow-sm" onClick={() => {this.handleClickDel()}}>Delete　<i className="far fa-trash-alt text-right"></i></small>
      </div>
    )
  }
  
  render(){
    return (<div>
              {this.projectDelete()}
            </div>
           );
  }
}
  


export default ProjectDel;