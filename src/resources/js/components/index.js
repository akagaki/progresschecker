import React, {Component} from "react"
import TeamItem from './TeamItem';
import ProjectItem from './ProjectItem';
import TaskItem from './TaskItem';

class Index extends React.Component {
  render() {
    return (
      <div>
        <div className='team-box'>
          <div className='main-conteiner'>
            <TeamItem className='main-information'/>
            <ProjectItem className='main-information'/>
            <TaskItem className='main-information'/>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;