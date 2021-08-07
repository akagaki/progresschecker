import React from "react"
import ReactDOM from 'react-dom';


class TeamAdd extends React.Component {
  constructor(){
    super()
    this.state = {
      teamAddModalOpen: false,
    }
  }
  
  // onChangeProgress=(e)=>{
  //   const progress = e.target.value;
  //   const id = e.target.id; 
  //   this.setState({ 
  //     progressData: e.target.value,
  //   });
  //   fetch("http://0.0.0.0:8000/api/teamAdd",{
  //     method: 'POST',
  //     body:JSON.stringify({progress:progress,id:id}),
  //     headers:{"Content-Type": "application/json"},
  //   }).then(response => {
  //       return response.text();
  //     }).then((text) => {
  //       alert(text);
  //     }).catch((e) => {
  //       console.error(e);
  //     });
  // }

  teamCreate(){
    return(
      <div className="d-flex flex-row-reverse">
        <small className="btn btn-light bg-white  btn-sm shadow-sm m-1" onClick={() => {this.handleClickOpen()}}>NewTeam</small>
      </div>
    )
  }
  handleClickOpen() {
    this.setState({
      teamAddModalOpen: true
    });
  }
// 作成画面を閉じる
  handleClickClose(){
    this.setState({
      teamAddModalOpen: false,
    });
  }

  render(){
    let teamAddModal;
    if(this.state.teamAddModalOpen === true){
      teamAddModal = (
        <div className='modal'>
          <div className='modal-container'>
            フォーム部分
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