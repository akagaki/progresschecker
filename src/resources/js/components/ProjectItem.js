import React from 'react';


class ProjectItem extends React.Component{
  constructor(){
      super()
      this.state = {
          loading:false,
          projectIndex: [],
      }
  }

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
  render() {
    const projectName = this.state.loading ? "NowLoading..." : this.state.projectIndex.map(obj =>
      <tr>
        <td>{obj.name}</td>
      </tr>
    )
    return (
      <div>
        <h2>Project</h2>
        {projectName}
      </div>
    );
  }
}
export default ProjectItem;