import React from 'react';
import ReactDOM from 'react-dom';

class ProjectMemberIndex extends React.Component{
  constructor(){
      super()
      this.state={ 
        memberIndexModalOpen: false,
        memberIndex: [],
        teamMemberIndex: [],
        memberData:[],
      }
  }
  componentDidMount(){
    this.setState({loading: true})
    const load = async () =>{
      // プロジェクトメンバー情報を取得
      // fetch("http://progresschecker-akagaki.herokuapp.com/api/projectMemberData",{
      fetch("http://0.0.0.0:8000/api/projectMemberData",{
      method: 'POST',
      body:JSON.stringify({
        id:this.props.projectId
      }),
      headers:{"Content-Type": "application/json"},
      }).then(response => response.json()
      ).then(json => {
        this.setState({
          memberIndex:json,
          loading: false,
        })
      }).catch((e) => {
        console.log(e);
        alert('情報を取得できませんでした');
      });
      // チームメンバー情報を取得
      // fetch("http://progresschecker-akagaki.herokuapp.com/api/teamMemberData",{
      fetch("http://0.0.0.0:8000/api/teamMemberData",{
        method: 'POST',
        body:JSON.stringify({
          id:this.props.teamId
        }),
        headers:{"Content-Type": "application/json"},
        }).then(response => response.json()
        ).then(json => {
          this.setState({
            teamMemberIndex:json
          })
        }).catch((e) => {
          console.log(e);
          alert('情報を取得できませんでした');
        });
    }
    load();
  }
  //メンバー削除ボタン
  handleClickDel(userId,userName){
    console.log(userId);
    const isYes = confirm("「"+ userName +"」さんをプロジェクトメンバーから削除してよろしいですか？");
    if(isYes === false){return}else{
    // fetch("http://progresschecker-akagaki.herokuapp.com/api/projectMemberDel",{
    fetch("http://0.0.0.0:8000/api/projectMemberDel",{
      method: 'POST',
      body:JSON.stringify({
        user_id:userId,
        project_id:this.props.projectId,
      }),
      headers:{"Content-Type": "application/json"},
    }).then(response => {
        return response.text();
      }).then((text) => {
        alert(text);
      }).catch((e) => {
        console.log(e);
        alert('削除に失敗しました');
      });
      this.setState({
        memberIndex:[],
        loading: true
      })
      this.componentDidMount();
    }
  }
    // セレクトボックス変更時
    onChangeData=(e)=>{
      this.setState({ 
        memberData: e.target.value,
      });
    }
    //メンバー登録ボタン
    handleClickAdd(){
      // fetch("http://progresschecker-akagaki.herokuapp.com/api/projectMemberAdd",{
      fetch("http://0.0.0.0:8000/api/projectMemberAdd",{
        method: 'POST',
        body:JSON.stringify({
          user_id:this.state.memberData,
          project_id:this.props.projectId,
        }),
        headers:{"Content-Type": "application/json"},
      }).then(response => {
          return response.text();
        }).then((text) => {
          alert(text);
        }).catch((e) => {
          console.log(e);
          alert('入力が正しくありません。');
        });
       this.setState({
          memberData:[],
          loading: true
        });
        this.componentDidMount();
        // this.handleClickClose();
    }
  // MemberIndexボタン
  memberIndex(){
    return(
      <div>
        <small className="btn btn-light bg-white  btn-sm shadow-sm" 
        onClick={() => {this.handleClickOpen()}}>Members　<i className="fas fa-users"></i></small>
      </div>
    )
  }
  //編集画面を開く
  handleClickOpen() {
    this.setState({
      memberIndexModalOpen: true
    });
  }
  // 編集画面を閉じる
  handleClickClose(){
    this.setState({
      memberIndexModalOpen: false,
    });
  }

  render() {
    const membersShow = (
      <div className="m-4">
        <div className="border-bottom text-center pb-2 mb-3">
          プロジェクトメンバー
          <span className="small">　for {this.props.projectName}</span>
        </div>        
        <div className="text-left m2">
        {this.state.loading ? "NowLoading..." : this.state.memberIndex.map((obj,index) =>
            <div key={index}>
              {obj.name}
              <small className="btn btn-sm" onClick={() => {this.handleClickDel(obj.id,obj.name)}}><i className="far fa-trash-alt"></i></small>
            </div>
          )}
        </div>
      </div>
    )
    const searchForm = (  
      <div className="border-top p-2 m-2">
        <div className="text-left">
          <div className="my-2">メンバー登録</div>
          <select className="custom-select my-2"onChange={this.onChangeData}>
            <option>選択してください</option>
            {this.state.teamMemberIndex.map((obj,index) =>
            <option key={index} value={obj.id}>{obj.name}</option>
            )}
          </select>
        </div>
        <button className="btn btn-info text-white btn-sm shadow-sm m-1 align-self-start" onClick={() => {this. handleClickAdd()}}>
          登録
        </button>
      </div>
    )
    let memberIndexModal;
    if(this.state.memberIndexModalOpen === true){
      memberIndexModal = (
          <div className='custom-modal'>
            <div className='custom-modal-container'>
              {membersShow}
              {searchForm} 
              <button className="btn btn-block btn-primary btn-info text-white" onClick={() => {this.handleClickClose()}}>
                Close
              </button>
            </div>
          </div>
        )
    }
    return (<div>
              {this.memberIndex()}
              {memberIndexModal}
            </div>
            );
  }
}
export default ProjectMemberIndex;