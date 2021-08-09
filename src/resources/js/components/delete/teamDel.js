import React from "react"
import ReactDOM from 'react-dom';


class TeamDel extends React.Component {
  constructor(){
    super()
  }
  
  //削除ボタン
  handleClickDel=()=>{
    const isYes = confirm('チームを削除すると関連するプロジェクトやタスクも削除されます\n削除してよろしいですか？');
    if(isYes === false){return}
    console.log(this.props.teamId);
    fetch("http://0.0.0.0:8000/api/teamDel",{
      method: 'POST',
      body:JSON.stringify({
        id:this.props.teamId
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
  // TeamDeleteボタン
  teamDelete(){
    return(
      <div>
        <small className="btn btn-light bg-white  btn-sm shadow-sm" onClick={() => {this.handleClickDel()}}>Delete　<i className="far fa-trash-alt text-right"></i></small>
      </div>
    )
  }
  
  render(){
    return (<div>
              {this.teamDelete()}
            </div>
           );
  }
}
  


export default TeamDel;