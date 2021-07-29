import React from "react"
import TeamItem from './TeamItem';
import ProjectItem from './ProjectItem';
import TaskItem from './TaskItem';

class Index extends React.Component {
  render() {
    return (
        <div className='container'>
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