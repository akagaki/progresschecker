import React from 'react';


class TeamItem extends React.Component{
  constructor(){
      super()
      this.state = {
          loading:false,
          teamIndex: [],
      }
  }

  componentDidMount(){
      this.setState({
          loading: true
      })
      fetch("http://0.0.0.0:8000/api/teamIndex")
          .then(response => response.json())
          .then(json => {
              console.log(json.map(obj => obj.name));
              this.setState({
                  teamIndex: json,
                  loading: false
              })
          })
      }
  render() {
    const teamName = this.state.loading ? "now loading...." : this.state.teamIndex.map(obj=>
      <tr>
        <td>{obj.name}</td>
      </tr>
    )
    return (
      <div>
        <h2>Team</h2>
        {teamName}
      </div>
    );
  }
}
export default TeamItem;