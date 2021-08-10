import React from 'react';
import ReactDOM from 'react-dom';

class TaskCount extends React.Component{
  constructor(){
      super()
      this.state = {
        modalOpen: false,
      }
  }
  // 未完了タスククリック
  handleClickOpen(){
    this.setState({modalOpen: true});
  }
  // 未完了タスク画面を閉じる
  handleClickClose(){
    this.setState({modalOpen: false,});
  }
  render() {
    // 未完了タスク数
    let taskCount ;
    if (this.props.incompTask === null) {
      taskCount = (
        <h3 className="task-couont col-auto">
            {this.props.loading ? "" :0}
        </h3>
    )} else {
      taskCount = (
        <h3 className="task-couont col-auto"onClick={() => {this.handleClickOpen()}}>
          {this.props.loading ? "" : Object.keys(this.props.incompTask).length}
        </h3>
    )
    }
    // モーダル情報取得
    let incompModal;
    if(this.state.modalOpen === true){
      incompModal = (
        <div className='custom-modal'>
          <div className='custom-modal-container'>
            <div className="border-bottom text-center pb-2 mb-3">未完了タスク一覧</div>
            <div>
                  {this.props.incompTask.map((obj,index)=>
                    <div className="m-3" key={index} >{obj.name}　({obj.deadline})
                    </div>)}
            </div>
            <button className="mt-3 btn btn-block btn-primary btn-info text-white" onClick={() => {this.handleClickClose()}}>
              Close
            </button>
          </div>
        </div>    
      )
    }
    return (
        <div>
          {taskCount}
          {incompModal}
        </div >
      );
    }
  }


export default TaskCount;