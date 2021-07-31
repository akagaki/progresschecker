import React from 'react';
import ReactDOM from 'react-dom';


class ProjectItem extends React.Component{
  constructor(){
      super()
      this.state = {
          loading:false,
          userProjects: [],
          userIndex: [],
          projectModalOpen: false,
          projectInformation:[],
          createUserString:'',
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
          .then(json => {
              this.setState({
                  userProjects: json,
                  loading: false
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
  handleClickOpen(id) {
    const data = this.state.userProjects.find(obj=> obj.id === id);
    this.setState({
      projectInformation:data,
      projectModalOpen: true
    });
    //作成者表示変更
    const createUser = this.state.userIndex.find(obj=> obj.id === data.user_id);
    this.setState({createUserString:createUser.name});
  }
// 詳細を閉じる
  handleClickClose(){
    this.setState({
      projectModalOpen: false,
      projectInformation:[],
      createUserString:'',
    });

  }
  render() {
// 『データ』
// 一覧
    const projectName = this.state.loading ? "NowLoading..." : this.state.userProjects.map((obj,index) =>
      <div className="col text-left btn btn-light p-1 m-2" key={index} onClick={() => {this.handleClickOpen(obj.id)}}>{obj.name}</div>
    )
// 詳細
    const projectShow = (    
      <div className="m-4">
        <div className="border-bottom text-center pb-2 mb-3">{this.state.projectInformation.name}</div> 
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