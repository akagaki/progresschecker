import React from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate';
import ProjectAdd from './add/projectAdd';
import TeamDel from './delete/teamDel';



class TeamItem extends React.Component{
  constructor(){
      super()
      this.state = {
          loading:false,
          loginUser: [],
          userTeams: [],
          userIndex: [],
          teamModalOpen: false,
          teamInformation:[],
          createUserString:'',
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
      // ユーザーチーム一覧
      const teamData = await fetch("http://0.0.0.0:8000/api/userTeams")
      const teams = await teamData.json();
      // ユーザー一覧
      const userData = await fetch("http://0.0.0.0:8000/api/userIndex")
      const users = await userData.json();
          this.setState({
            loginUser: user,
            userTeams: teams,
            userIndex: users,
            loading: false
        });  
      }
      load();
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
    const data = this.state.userTeams.find(obj=> obj.id === id);
    this.setState({
      teamInformation:data,
      teamModalOpen: true
    });
    //作成者表示変更
    const createUser = this.state.userIndex.find(obj=> obj.id === data.user_id);
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
    const title = <div className="border-bottom  btn btn-block" onClick={() => {this.componentDidMount()}}><h4>Team</h4></div>
// 一覧
    const teamName = this.state.loading ? "NowLoading..." : this.state.userTeams.slice(this.state.start, this.state.start + 3).map((obj,index)=>
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
          <a className="mr-2" href={"/team/show?id="+this.state.teamInformation.id}>{this.state.teamInformation.name}</a>
        </div>
        <div className="container">
          <div className="row">
          {/* 詳細情報 */}
            <div className="col-auto">
              <div>詳細　　：　{this.state.teamInformation.information}</div>  
              <div>作成日　：　{this.state.teamInformation.created_at}</div>  
              <div>作成者　：　{this.state.createUserString}</div> 
            </div>
          {/* ツールボタン */}
            <div className="col text-right">
              <ProjectAdd 
                loginUserId={this.state.loginUser.id} 
                teamId={this.state.teamInformation.id}
                teamName={this.state.teamInformation.name}
              />
              <TeamDel
                teamId={this.state.teamInformation.id}
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
          <div className='modal'>
            <div className='modal-container'>
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
        <div className="px-1">
          {teamName}
        </div>
        {/* ページネーション */}
        <ReactPaginate
          pageCount={Math.ceil(this.state.userTeams.length / 3)} //総ページ数。今回は一覧表示したいデータ数 / 1ページあたりの表示数としてます。
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
          {teamModal}
        </div>
      </div>
    );
  }
}
export default TeamItem;