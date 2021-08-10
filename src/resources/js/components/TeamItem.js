import React from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import ProjectAdd from './add/projectAdd';
import TeamDel from './delete/teamDel';
import TeamMemberEdit from './member/teamMemberEdit';
import TeamMemberIndex from './member/teamMemberIndex';



class TeamItem extends React.Component{
  constructor(){
      super()
      this.state = {
          teamModalOpen: false,
          teamInformation:[],
          createUserString:'',
          start: 0,
      }  
  }
// ページネーション時のメソッド
  pageChange = (data) => {
    let pageNumber = data['selected'] * 3; //選択されたページ番号
    this.setState({
      start: pageNumber
    });
  }
// 詳細表示
  handleClickOpen(id) {
    const data = this.props.userTeams.find(obj=> obj.id === id);
    this.setState({
      teamInformation:data,
      teamModalOpen: true
    });
    //作成者表示変更
    const createUser = this.props.userIndex.find(obj=> obj.id === data.user_id);
    this.setState({createUserString:createUser.name});
  }
  // 詳細を閉じる
  handleClickClose(){
    this.setState({
      teamModalOpen: false,
      teamInformation:[],
      createUserString:'',
    });
  }
  
  render() {
// 『データ』
// タイトル(リロード)
    const title = <div className="border-bottom  btn btn-block"><h4>Team</h4></div>
// 一覧
    const teamName = this.props.loading ? "NowLoading..." : this.props.userTeams.slice(this.state.start, this.state.start + 3).map((obj,index)=>
        <div  key={index}>
          <div className="col text-left btn btn-light p-1 m-1" onClick={() => {this.handleClickOpen(obj.id)}}>
            <div className="border-bottom">{obj.name}</div>
            <br></br>
          </div>
        </div>
    )
// 詳細
    const teamShow = (
      <div className="m-4">
        <div className="border-bottom pb-2 mb-3 text-center">
          <h5>{this.state.teamInformation.name}</h5>
          {/* 削除ボタン */}
          <div className="text-right mr-3">
            <TeamDel
                teamId={this.state.teamInformation.id}
            />
          </div>
        </div>
        <div className="container">
          <div className="row">
          {/* 詳細情報 */}
            <div className="col-auto">
              <div>詳細　　：　{this.state.teamInformation.information}</div>  
              <div>作成日　：　{this.state.teamInformation.created_at}</div>  
              <div>作成者　：　{this.state.createUserString}</div> 
            </div>
            <div className="col text-right">
              {/* 新規プロジェクト作成 */}
              <ProjectAdd 
                loginUserId={this.props.loginUserId} 
                teamId={this.state.teamInformation.id}
                teamName={this.state.teamInformation.name}
              />
              {/* チームメンバー表示ボタン */}
              <TeamMemberIndex
                teamId={this.state.teamInformation.id}
                teamName={this.state.teamInformation.name}
              />
              {/* チームメンバー登録 */}
              <TeamMemberEdit
                teamId={this.state.teamInformation.id}
                teamName={this.state.teamInformation.name}
              />
            </div>
          </div>
        </div>
      </div>
    )
// 『描写』
// 詳細
    let teamModal;
    if(this.state.teamModalOpen === true){
        teamModal = (
          <div className='custom-modal'>
            <div className='custom-modal-container'>
              {teamShow}
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
          {teamName}
        </div>
        {/* ページネーション */}
        <ReactPaginate
          pageCount={Math.ceil(this.props.userTeams.length / 3)}
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
          {teamModal}
        </div>
      </div>
    );
  }
}
export default TeamItem;