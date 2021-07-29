import React from 'react';


class ProjectItem extends React.Component{
  constructor(){
      super()
      this.state = {
          loading:false,
          projectIndex: [],
          projectModalOpen: false,
          projectInformation:[]
      }
  }
// API取得
  componentDidMount(){
      this.setState({
          loading: true
      })
      fetch("http://0.0.0.0:8000/api/projectIndex")
          .then(response => response.json())
          .then(json => {
              console.log(json.map(obj => obj.name));
              this.setState({
                  projectIndex: json,
                  loading: false
              })
          })
      }
// 『イベント』
// 詳細表示
  handleClickOpen(id) {
    const data = this.state.projectIndex.find(obj=> obj.id === id);
    console.log(data);
    this.setState({
      projectInformation:data,
      projectModalOpen: true
    });
  }
// 詳細を閉じる
  handleClickClose(){
    this.setState({
      projectModalOpen: false,
      projectInformation:[]
    });
  }
  render() {
// 『データ』
// 一覧
    const projectName = this.state.loading ? "NowLoading..." : this.state.projectIndex.map(obj =>
      <tr>
        <td onClick={() => {this.handleClickOpen(obj.id)}}>{obj.name}</td>
      </tr>
    )
// 詳細
    const projectShow = (    
      <div>
        <tr><td>プロジェクト名：{this.state.projectInformation.name}</td></tr>  
        <tr><td>詳細　　：{this.state.projectInformation.information}</td></tr>  
        <tr><td>作成日　：{this.state.projectInformation.created_at}</td></tr>  
        <tr><td>作成者　：{this.state.projectInformation.user_id}</td></tr> 
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
        <h2>Project</h2>
        <div>
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