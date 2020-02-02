import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  state = {
    detentionCentres:[],
    columns:[
      'Authority',
      'Capacity',
      'Demographics and segregation',
      'Facility type',
      'Location',
      'Management',
      'Max-single day pop',
      'Name',
      'Security',
      'Status'
    ],
    filterColumn:'',
    filterStr:''
  };
  componentDidMount(){
		axios
			.get('https://imhelp.firebaseio.com/detentionCentres.json')
			.then((res) => {
        this.setState({detentionCentres:res.data});
        console.log(this.state.detentionCentres[0]['Status'])
      });
  }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  createTable = (detentionCentres) => {
    let table = []

    for (let i = 0; i < detentionCentres.length; i++) {
      let children = []
      for (let j = 0; j < this.state.columns.length; j++) {
        children.push(<td>{detentionCentres[i][this.state.columns[j]]}</td>)
      }
      table.push(<tr>{children}</tr>)
    }
    return table
  }
  createHead = () => {
    let head = []
    for (let j = 0; j < this.state.columns.length; j++) {
      head.push(<th>{this.state.columns[j]}</th>)
    }
    return head
  }
	render() {
    const { detentionCentres, filterStr, filterColumn } = this.state;
    let filteredElements = []
    for (let i = 0; i < detentionCentres.length; i++) {
      if (detentionCentres[i][filterColumn].includes(filterStr) ){
        filteredElements.push(detentionCentres[i])
      }
    }
    return (
      <div>
        <input type="text" name="filterStr" placeholder="Enter filter" onChange={this.onChange} value={this.state.filterStr} />
        <input type="text" name="filterColumn" placeholder="Choose column" onChange={this.onChange} value={this.state.filterColumn} />
        <table>
          <thead><tr>{this.createHead()}</tr></thead>
          <tbody>{this.createTable(filteredElements)}</tbody>
        </table>
      </div>
    );
  }
}

export default App;
