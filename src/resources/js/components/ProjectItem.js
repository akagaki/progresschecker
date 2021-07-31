import React from 'react';
import ReactDOM from 'react-dom';


class ProjectItem extends React.Component{
  constructor(){
      super()
      this.state = {
          loading:false,
          userProjects: [],
          userTeams: [],
          userIndex: [],
          projectModalOpen: false,
          projectInformation:[],
          createUserString:'',
          teamName:'',
      }
  }
// API取得
  componentDidMount(){
      this.setState({
          loading: true
      })
      // ログインユーザーのプロジェクト情報
      fetch("http://0.0.0.0:8000/api/userProjects")
          .then(response => response.json())
          .then(projects => {
              this.setState({
                  userProjects: projects,
                  loading: false
              })
          })
      // ログインユーザーのチーム情報
      fetch("http://0.0.0.0:8000/api/userTeams")
          .then(response => response.json())
          .then(teams => {
              this.setState({
                  userTeams: teams,
              })
          })
      // 登録ユーザー情報
      fetch("http://0.0.0.0:8000/api/userIndex")
          .then(response => response.json())
          .then(users => {
              this.setState({
                  userIndex: users,
              })
          })
      }
// 詳細表示
  handleClickOpen(id,team_id) {
    const data = this.state.userProjects.find(obj=> obj.id === id);
    this.setState({
      projectInformation:data,
      projectModalOpen: true
    });
    //作成者表示変更
    const createUser = this.state.userIndex.find(obj=> obj.id === data.user_id);
    this.setState({createUserString:createUser.name});
    // チーム情報表示変更
    const teamData = this.state.userTeams.find((obj)=>obj.id === team_id );
    this.setState({teamName:teamData.name});
  }
// 詳細を閉じる
  handleClickClose(){
    this.setState({
      projectModalOpen: false,
      projectInformation:[],
      createUserString:'',
      teamName:'',
    });

  }
  render() {
// 『データ』
// 一覧
    const projectName = this.state.loading ? "NowLoading..." : this.state.userProjects.map((obj,index) =>
      <div className="col text-left btn btn-light p-1 m-2" key={index} onClick={() => {this.handleClickOpen(obj.id,obj.team_id)}}>
        <div>{obj.name}</div>
      </div>
    )
// 詳細
    const projectShow = (    
      <div className="m-4">
        <div className="border-bottom text-center pb-2 mb-3">{this.state.projectInformation.name}
          <span className="small">　belong to {this.state.teamName}</span>
        </div> 
        <div>詳細　　：　{this.state.projectInformation.information}</div> 
        <div>作成日　：　{this.state.projectInformation.created_at}</div> 
        <div>作成者　：　{this.state.createUserString}</div>
      </div>
    )
// 『描写』
// 詳細
    let projectModal;
    if(this.state.projectModalOpen === true){
        projectModal = (
          <div className='modal'>
            <div className='modal-container'>
              {projectShow}
              <button className="btn btn-block btn-primary btn-info text-white" onClick={() => {this.handleClickClose()}}>
                Close
              </button>
            </div>
          </div>
        )
    }
// 一覧
    return (
      <div>
        <h2 className="border-bottom text-center pb-2 mb-3">Project</h2>
        <div className="px-2">
          {projectName}
        </div>
        <div>
          {projectModal}
        </div>
      </div>
    );
  }
}
export default ProjectItem;