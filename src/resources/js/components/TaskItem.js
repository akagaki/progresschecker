import React from 'react';


class TaskItem extends React.Component{
  constructor(){
      super()
      this.state = {
          loading:false,
          taskIndex: [],
      }
  }

  componentDidMount(){
      this.setState({
          loading: true
      })
      fetch("http://0.0.0.0:8000/api/taskIndex")
          .then(response => response.json())
          .then(json => {
              console.log(json.map(obj => obj.name));
              this.setState({
                  taskIndex: json,
                  loading: false
              })
          })
      }
  render() {
    const taskName = this.state.loading ? "NowLoading..." : this.state.taskIndex.map(obj=>
      <tr>
        <td>{obj.name}</td>
      </tr>
    )
    return (
      <div>
        <h2>Task</h2>
        {taskName}
      </div>
    );
  }
}
export default TaskItem;