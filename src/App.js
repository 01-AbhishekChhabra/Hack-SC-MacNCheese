import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Immigrant from './components/Immigrant'
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
    filterColumn:'Location',
    filterStr:''
  };
  componentDidMount(){
		axios
			.get('https://imhelp.firebaseio.com/detentionCentres.json')
			.then((res) => {
        this.setState({detentionCentres:res.data});
      });
  }
  onChange = (e) => this.setState({ [e.target.name]: e.target.value });

  createTable = (detentionCentres) => {
    let table = []

    for (let i = 0; i < detentionCentres.length; i++) {
      let children = []
      for (let j = 0; j < this.state.columns.length; j++) {
        if (this.state.columns[j] === 'Location'){
          children.push(
            <td><Link to={`/${detentionCentres[i][this.state.columns[j]].split(',',1)}`}>{detentionCentres[i][this.state.columns[j]]}</Link></td>
          )
        }
        else{
          children.push(<td>{detentionCentres[i][this.state.columns[j]]}</td>)
        }
      }
      table.push(<tr>{children}</tr>)
    }
    return table
  }
  createHead = () => {
    let head = []
    for (let j = 0; j < this.state.columns.length; j++) {
      head.push(<th scope = "col">{this.state.columns[j]}</th>)
    }
    return head
  }
	render() {
    const { detentionCentres, filterStr, filterColumn } = this.state;
    let filteredElements = []
    for (let i = 0; i < detentionCentres.length; i++) {
      if(filterColumn in detentionCentres[i] && detentionCentres[i][filterColumn].includes(filterStr)){
        filteredElements.push(detentionCentres[i])
      }
    }
  
    return (
			<Router>
        <div>
          <Route
              exact
              path='/'
              render={(props) => (
                <React.Fragment>
                  <h4>List of all the Detention centers across the US</h4><hr></hr><br></br>
                  <div className = "container">
                  <p> click on a city to get details about detainees in that city.</p>
                  <p>You can also use the form to filter according to the various columns</p>
                  <input type="text" name="filterStr" placeholder="Enter filter" onChange={this.onChange} value={this.state.filterStr} />

                  <select name="filterColumn" style = {{marginLeft: 10+'px'}} onChange={this.onChange} value={this.state.filterColumn} >
                    {this.state.columns.map(col => <option value={col}>{col}</option>)}
                  </select>

                  </div>
                  
                  <div className = "container-fluid table-responsive">
                  <table className = "table-sm table-striped table-hover">
                    <thead><tr>{this.createHead()}</tr></thead>
                    <tbody>{this.createTable(filteredElements)}</tbody>
                  </table>
                  </div>

                </React.Fragment>
              )}
          />
					<Route path='/:location' component={Immigrant}/>
          {/* <Route path='/map' component={LocationMap}/> */}

        </div>
      </Router>
    );
  }
}

export default App;
