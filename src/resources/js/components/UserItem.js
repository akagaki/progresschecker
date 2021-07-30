import React from 'react';
import ReactDOM from 'react-dom';


class UserItem extends React.Component{
  constructor(){
      super()
      this.state = {
        loading:false,
        userIndex: [],
      }
  }
// API取得
  componentDidMount(){
    this.setState({
        loading: true
    })
  fetch("http://0.0.0.0:8000/api/userIndex")
      .then(response => response.json())
      .then(json => {
          console.log(json);
          this.setState({
              userIndex: json,
              loading: false
          })
      })
  }

  render() {
    return ({userIndex});
  }
}
export default UserItem;