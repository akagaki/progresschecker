import React from 'react';
import ReactDOM from 'react-dom';

class ProjectMemberIndex extends React.Component{
  constructor(){
      super()
  }
  // メンバー一覧取得
    getProjectMember(){
      console.log(this.props.teamId);
    fetch("http://0.0.0.0:8000/api/projectMemberIndex",{
      method: 'POST',
      body:JSON.stringify({
        id:this.props.projectId
      }),
      headers:{"Content-Type": "application/json"},
    }).then(response => response.json()
      ).then(text => {
        alert('プロジェクトメンバー\n'+text);
      }).catch((e) => {
        console.log(e);
        alert('情報を取得できませんでした');
      });
  }
  // MemberIndexボタン
  memberIndex(){
    return(
      <div>
        <small className="btn btn-light bg-white  btn-sm shadow-sm" onClick={() => {this.getProjectMember()}}><i className="fas fa-users"></i></small>
      </div>
    )
  }

  render() {
    return (<div>
              {this.memberIndex()}
            </div>
            );
  }
}
export default ProjectMemberIndex;