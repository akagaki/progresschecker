import React from 'react';


class TaskItem extends React.Component{
  constructor(){
      super()
      this.state = {
          loading:false,
          taskIndex: [],
          taskModalOpen: false,
          taskInformation:[],
          progressString:'',
      }
  }
// API取得
  componentDidMount(){
      this.setState({
          loading: true
      })
      fetch("http://0.0.0.0:8000/api/taskIndex")
          .then(response => response.json())
          .then(json => {
              console.log(json.map(obj => obj.name));
              this.setState({
                  taskIndex: json,
                  loading: false
              })
          })
      }
// 詳細表示
  handleClickOpen(id) {
    const data = this.state.taskIndex.find(obj=> obj.id === id);
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
  }
// 詳細を閉じる
  handleClickClose(){
    this.setState({
      taskModalOpen: false,
      taskInformation:[],
      progressString:''
    });
  }
  
  render() {
// 『データ』
// 一覧
    const taskName = this.state.loading ? "NowLoading..." : this.state.taskIndex.map(obj=>
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
        <tr><td>更新者　：{this.state.taskInformation.user_id}</td></tr> 
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