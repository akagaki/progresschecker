import React from 'react';
import ReactDOM from 'react-dom';
import ReactPaginate from 'react-paginate'; 


class TaskItem extends React.Component{
  constructor(){
      super()
      this.state = {
          loading:false,
          userTasks: [],
          userProjects:[],
          userIndex: [],
          taskModalOpen: false,
          taskInformation:[],
          progressString:'',
          updateUserString:'',
          projectName:'',
          start: 0, //最初は0番目(=最新)の要素から
      }
  }
// API取得
  componentDidMount(){
      this.setState({loading: true})
      const load = async () =>{
        // ユーザーチーム一覧
        const taskData = await fetch("http://0.0.0.0:8000/api/userTasks")
        const tasks = await taskData.json();
        // ユーザープロジェクト一覧
        const projectData = await fetch("http://0.0.0.0:8000/api/userProjects")
        const projects = await projectData.json();
        // ユーザー一覧
        const userData = await fetch("http://0.0.0.0:8000/api/userIndex")
        const users = await userData.json();
            this.setState({
                userTasks: tasks,
                userProjects: projects,
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
  handleClickOpen(id,project_id) {
    const data = this.state.userTasks.find(obj=> obj.id === id);
    // 更新者表示変更
    const updateUser = this.state.userIndex.find(obj=> obj.id === data.user_id);
    // プロジェクト情報表示変更
    const projectData = this.state.userProjects.find((obj)=>obj.id === project_id);
    // 対象データ取得
    this.setState({
      taskInformation:data,
      updateUserString:updateUser.name,
      projectName:projectData.name,
      taskModalOpen: true
    });
     // 進捗表示変更
     switch(data.progress){
      case 0:
        this.setState({progressString:"未対応"});
        break;
      case 1:
        this.setState({progressString:"対応中"});
        break;
      case 2:
        this.setState({progressString:"対応済"});
        break;
      case 3:
        this.setState({progressString:"完了"});
        break;
      }
  }
// 詳細を閉じる
  handleClickClose(){
    this.setState({
      taskModalOpen: false,
      taskInformation:[],
      progressString:'',
      updateUserString:'',
      projectName:'',
    });
  }
  
  render() {
// 『データ』
// 一覧
    const taskName = this.state.loading ? "NowLoading..." : this.state.userTasks.slice(this.state.start, this.state.start + 3).map((obj,index)=>
      <div className="col text-left btn btn-light p-1 m-2" key={index} onClick={() => {this.handleClickOpen(obj.id,obj.project_id)}}>{obj.name}</div>
    )
    
// 詳細
    const taskShow = (    
      <div className="m-4">
        <div className="border-bottom text-center pb-2 mb-3">{this.state.taskInformation.name}
          <span className="small">　belong to {this.state.projectName}</span>
        </div>
        <div>詳細　　：　{this.state.taskInformation.information}</div>  
        <div>進捗　　：　{this.state.progressString}</div>  
        <div>期日　　：　{this.state.taskInformation.deadline}</div>  
        <div>更新日　：　{this.state.taskInformation.updated_at}</div>  
        <div>更新者　：　{this.state.updateUserString}</div> 
      </div>
    )
// 『描写』
// 詳細
    let taskModal;
    if(this.state.taskModalOpen === true){
        taskModal = (
          <div className='modal'>
            <div className='modal-container'>
              {taskShow}
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
        <h2 className="border-bottom text-center pb-2 mb-3">Task</h2>
        <div className="px-2">
          {taskName}
        </div>
        <ReactPaginate 
          pageCount={Math.ceil(this.state.userTasks.length / 3)} //総ページ数。今回は一覧表示したいデータ数 / 1ページあたりの表示数としてます。
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
          {taskModal}
        </div>
      </div>
    );
  }
}
export default TaskItem;