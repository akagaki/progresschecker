import React from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate'; 
import TaskAdd from './add/taskAdd'; 


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
// 一覧
    const projectName = this.state.loading ? "NowLoading..." : this.state.userProjects.slice(this.state.start, this.state.start + 3).map((obj,index) =>
      <div key={index}>
        <div className="col text-left btn btn-light p-1 m-1" onClick={() => {this.handleClickOpen(obj.id,obj.team_id)}}>
          <div className="border-bottom">{obj.name}</div>
          <div><small>Team：{this.getBelongsName(obj.team_id)}</small></div>
          <br></br>
        </div>
        
      </div>
    )
// 詳細
    const projectShow = (    
      <div className="m-4">
        <div className="text-center">
          <a href={"/project/show?id="+this.state.projectInformation.id}>{this.state.projectInformation.name}</a>
          <span className="small">　belong to {this.state.teamName}</span>
        </div>
        {/* 新規タスク作成 */}
            <TaskAdd 
              loginUserId={this.state.loginUser.id} 
              projectId={this.state.projectInformation.id}
              projectName={this.state.projectInformation.name}
            />
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
        <h3 className="border-bottom text-center pb-2 mb-2">Project</h3>
        <div className="px-1">
          {projectName}
        </div>
        <ReactPaginate 
          pageCount={Math.ceil(this.state.userProjects.length / 3)} //総ページ数。今回は一覧表示したいデータ数 / 1ページあたりの表示数としてます。
          marginPagesDisplayed={1} //先頭と末尾に表示するページの数。今回は2としたので1,2…今いるページの前後…後ろから2番目, 1番目 のように表示されます。
          pageRangeDisplayed={0} //上記の「今いるページの前後」の番号をいくつ表示させるかを決めます。
          onPageChange={this.pageChange} //ページネーションのリンクをクリックしたときのイベント(詳しくは下で解説します)
          containerClassName='pagination pagination-sm' //ページネーションリンクの親要素のクラス名
          pageClassName='page-item' //各子要素(li要素)のクラス名
          pageLinkClassName='page-link' //ページネーションのリンクのクラス名
          activeClassName='active' //今いるページ番号のクラス名。今いるページの番号だけ太字にしたりできます 
          previousLabel='<' //前のページ番号に戻すリンクのテキスト
          nextLabel='>' //次のページに進むボタンのテキスト
          previousClassName='page-item' // '<'の親要素(li)のクラス名
          nextClassName='page-item' //'>'の親要素(li)のクラス名
          previousLinkClassName='page-link'  //'<'のリンクのクラス名
          nextLinkClassName='page-link'　//'>'のリンクのクラス名
          disabledClassName='disabled' //先頭 or 末尾に行ったときにそれ以上戻れ(進め)なくするためのクラス
          breakLabel='...' // ページがたくさんあるときに表示しない番号に当たる部分をどう表示するか
          breakClassName='page-item' // 上記の「…」のクラス名
          breakLinkClassName='page-link' // 「…」の中のリンクにつけるクラス
        />
        <div>
          {projectModal}
        </div>
      </div>
    );
  }
}
export default ProjectItem;