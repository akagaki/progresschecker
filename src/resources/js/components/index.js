import React from "react"
import ReactDOM from 'react-dom';
import TeamItem from './TeamItem';
import ProjectItem from './ProjectItem';
import TaskItem from './TaskItem';
import LoginUser from './LoginUser';

class Index extends React.Component {
  render() {
    return (
      <div className='container'>
          <div className='row'>
            <div><LoginUser className='col' /></div>
            <div><TeamItem className='col' /></div>
            <div><ProjectItem className='col' /></div>
            <div><TaskItem className='col' /></div>
          </div>
      </div>
    );
  }
}

export default Index;