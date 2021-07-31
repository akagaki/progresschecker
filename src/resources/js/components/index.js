import React from "react"
import ReactDOM from 'react-dom';
import TeamItem from './TeamItem';
import ProjectItem from './ProjectItem';
import TaskItem from './TaskItem';
import LoginUser from './LoginUser';

class Index extends React.Component {
  render() {
    return (
      <div className='container rounded bg-light p-4 mb-4 shadow'>
          <div className='row border-bottom pb-4'>
            <div  className='col justify-content-around' ><LoginUser/></div>
            <div  className='col justify-content-around' ><TeamItem/></div>
            <div  className='col justify-content-around' ><ProjectItem/></div>
            <div  className='col justify-content-around' ><TaskItem/></div>
          </div>
      </div>
    );
  }
}

export default Index;