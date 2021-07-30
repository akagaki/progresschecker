import React from 'react';
import ReactDOM from 'react-dom';


class TaskItem extends React.Component{
  constructor(){
      super()
      this.state = {
          loading:false,
          userTasks: [],
          userIndex: [],
          taskModalOpen: false,
          taskInformation:[],
          progressString:'',
          updateUserString:'',
      }
  }
// API取得
  componentDidMount(){
      this.setState({
          loading: true
      })
      // ログインユーザーのタスク情報
      fetch("http://0.0.0.0:8000/api/userTasks")
          .then(response => response.json())
          .then(json => {
              console.log(json.map(obj => obj.name));
              this.setState({
                  userTasks: json,
                  loading: false
              })
          })
      // 登録ユーザー情報
      fetch("http://0.0.0.0:8000/api/userIndex")
          .then(response => response.json())
          .then(users => {
              console.log(users);
              this.setState({
                  userIndex: users,
              })
          })
      }
// 詳細表示
  handleClickOpen(id) {
    const data = this.state.userTasks.find(obj=> obj.id === id);
    console.log(data);
    // 対象データ取得
    this.setState({          
      taskInformation:data,
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
    const updateUser = this.state.userIndex.find(obj=> obj.id === data.user_id);
    this.setState({updateUserString:updateUser.name});
  }
// 詳細を閉じる
  handleClickClose(){
    this.setState({
      taskModalOpen: false,
      taskInformation:[],
      progressString:'',
      updateUserString:'',
    });
  }
  
  render() {
// 『データ』
// 一覧
    const taskName = this.state.loading ? "NowLoading..." : this.state.userTasks.map(obj=>
      <tr>
        <td onClick={() => {this.handleClickOpen(obj.id)}}>{obj.name}</td>
      </tr>
    )
    
// 詳細
    const taskShow = (    
      <div>
        <tr><td>タスク名：{this.state.taskInformation.name}</td></tr>  
        <tr><td>詳細　　：{this.state.taskInformation.information}</td></tr>  
        <tr><td>進捗　　：{this.state.progressString}</td></tr>  
        <tr><td>期日　　：{this.state.taskInformation.deadline}</td></tr>  
        <tr><td>更新日　：{this.state.taskInformation.updated_at}</td></tr>  
        <tr><td>更新者　：{this.state.updateUserString}</td></tr> 
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
              <button onClick={() => {this.handleClickClose()}}>
                Close
              </button>
            </div>
          </div>
      )
    }
// 一覧
    return (
      <div>
        <h2>Task</h2>
        <div>
          {taskName}
        </div>
        <div>
          {taskModal}
        </div>
      </div>
    );
  }
}
export default TaskItem;