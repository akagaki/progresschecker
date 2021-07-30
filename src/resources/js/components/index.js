import React from "react"
import ReactDOM from 'react-dom';
import TeamItem from './TeamItem';
import ProjectItem from './ProjectItem';
import TaskItem from './TaskItem';
import UserItem from './UserItem';

class Index extends React.Component {
  render() {
    return (
      <div className='container'>
        <UserItem/>
          <div className='row'>
            <TeamItem className='col' />
            <ProjectItem className='col' />
            <TaskItem className='col' />
          </div>
      </div>
    );
  }
}

export default Index;