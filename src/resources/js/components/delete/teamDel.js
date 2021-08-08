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
    // fetch("http://0.0.0.0:8000/api/projectAdd",{
    //   method: 'POST',
    //   body:JSON.stringify({
    //     user_id:this.props.loginUserId,
    //     team_id:this.props.teamId,
    //     name:data.name,
    //     information:data.information
    //   }),
    //   headers:{"Content-Type": "application/json"},
    // }).then(response => {
    //     return response.text();
    //   }).then((text) => {
    //     alert(text);
    //   }).catch((e) => {
    //     console.log(e);
    //     alert('入力が正しくありません。');
    //   });
    //  this.setState({ 
    //     nameData: '',
    //     informationData: '',
    //   });
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