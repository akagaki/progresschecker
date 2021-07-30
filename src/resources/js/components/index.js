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
            <LoginUser className='col' />
            <TeamItem className='col' />
            <ProjectItem className='col' />
            <TaskItem className='col' />
          </div>
      </div>
    );
  }
}

export default Index;