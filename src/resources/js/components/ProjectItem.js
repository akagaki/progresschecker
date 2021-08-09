import React from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate'; 
import TaskAdd from './add/taskAdd'; 
import ProjectDel from './delete/projectDel';
import ProjectMemberIndex from './member/projectMemberIndex';


class ProjectItem extends React.Component{
  constructor(){
      super()
      this.state = {
          loading:false,
          loginUser: [],
          userProjects: [],
          userTeams: [],
          userIndex: [],
          projectModalOpen: false,
          projectInformation:[],
          createUserString:'',
          teamName:'',
          start: 0,
      }
  }
// API取得
  componentDidMount(){
      this.setState({loading: true})
      const load = async () =>{
        // ログインユーザー情報
      const userdata = await fetch("http://0.0.0.0:8000/api/loginUser");
      const user = await userdata.json();
        // ユーザープロジェクト一覧
        const projectData = await fetch("http://0.0.0.0:8000/api/userProjects")
        const projects = await projectData.json();
        // ユーザーチーム一覧
        const teamData = await fetch("http://0.0.0.0:8000/api/userTeams")
        const teams = await teamData.json();
        // ユーザー一覧
        const userData = await fetch("http://0.0.0.0:8000/api/userIndex")
        const users = await userData.json();
            this.setState({
                loginUser: user,
                userProjects: projects,
                userTeams: teams,
                userIndex: users,
                loading: false
            });
        }
        load();
  }
  getBelongsName(team_id){
    const teamData = this.state.userTeams.find((obj)=>obj.id === team_id);
    const teamName = teamData.name;
    return teamName;
  }
// ページネーション時のメソッド
  pageChange = (data) => {
    let pageNumber = data['selected'] * 3; //選択されたページ番号
    this.setState({
      start: pageNumber
    });
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
// タイトル(リロード)
    const title = <div className="border-bottom btn btn-block" onClick={() => {this.componentDidMount()}}><h4>Project</h4></div>
// 一覧
    const projectName = this.state.loading ? "NowLoading..." : this.state.userProjects.slice(this.state.start, this.state.start + 3).map((obj,index) =>
      <div key={index}>
        <div className="col text-left btn btn-light p-1 m-1" onClick={() => {this.handleClickOpen(obj.id,obj.team_id)}}>
          <div className="border-bottom">{obj.name}</div>
          <div><small>Team：{this.getBelongsName(obj.team_id)}</small></div>
        </div>
        
      </div>
    )
// 詳細
    const projectShow = (    
      <div className="m-4">
        <div className="border-bottom pb-2 mb-3 text-center">
          <a href={"/project/show?id="+this.state.projectInformation.id}>{this.state.projectInformation.name}</a>
          <span className="small">　belong to {this.state.teamName}</span>
          {/* 削除ボタン */}
          <div className="text-right mr-3">
            <ProjectDel
                projectId={this.state.projectInformation.id}
            />
          </div>
        </div>
        <div className="container">
          <div className="row">
          {/* 詳細情報 */}
            <div className="col-auto">
              <div>詳細　　：　{this.state.projectInformation.information}</div> 
              <div>作成日　：　{this.state.projectInformation.created_at}</div> 
              <div>作成者　：　{this.state.createUserString}</div>
             </div>
            <div className="col text-right">
            {/* 新規タスク作成 */}
              <TaskAdd 
                loginUserId={this.state.loginUser.id} 
                projectId={this.state.projectInformation.id}
                projectName={this.state.projectInformation.name}
              />
              {/* チームメンバー表示ボタン */}
              <ProjectMemberIndex
                projectId={this.state.projectInformation.id}
              />
              
            </div>
          </div>
        </div>
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
          {title}
        <div className="px-1 my-2">
          {projectName}
        </div>
        <ReactPaginate 
          pageCount={Math.ceil(this.state.userProjects.length / 3)}
          marginPagesDisplayed={1}
          pageRangeDisplayed={0}
          onPageChange={this.pageChange}
          containerClassName='pagination pagination-sm'
          pageClassName='page-item'
          pageLinkClassName='page-link'
          activeClassName='active'
          previousLabel='<'
          nextLabel='>'
          previousClassName='page-item'
          nextClassName='page-item'
          previousLinkClassName='page-link'
          nextLinkClassName='page-link'
          disabledClassName='disabled'
          breakLabel='...'
          breakClassName='page-item'
          breakLinkClassName='page-link'
        />
        <div>
          {projectModal}
        </div>
      </div>
    );
  }
}
export default ProjectItem;