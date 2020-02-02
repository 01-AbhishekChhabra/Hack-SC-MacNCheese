import React, { Component } from 'react'
import axios from 'axios';

export class Immigrant extends Component {
    state = {
        immigrantDetails:[],
        columns:[
          'DOB',
          'EntryDateTime',
          'Location',
          'aNumber',
          'country',
          'language',
          'manner',
          'given-name',
          'last-name'
        ],
        filterColumn:'country',
        filterStr:''
      };
    componentDidMount(){
		axios
			.get('https://heretostay-267008.firebaseio.com/caseHistory.json')
			.then((res) => {
                this.setState({immigrantDetails:Object.values(res.data).filter((each_im)=>{
                    return each_im['Location'] == this.props.match.params.location
                })});
            });
        console.log('HELLO',this.state.immigrantDetails)
    }
    onChange = (e) => this.setState({ [e.target.name]: e.target.value });

    createTable = (immigrantDetails) => {
      let table = []
    
        for (let i = 0; i < immigrantDetails.length; i++) {
          let today = new Date(Date.parse(immigrantDetails[i]['EntryDateTime']))
          let today1 = new Date(Date.parse(immigrantDetails[i]['DOB']))

          table.push(
            <div className="card">
              <div className="card-body">
                <h3 classname="card-title">{immigrantDetails[i]['name']['given-name']+immigrantDetails[i]['name']['last-name']}</h3>
                <p class="card-text">Location: {immigrantDetails[i]['Location']}</p>
                <p classNam = "card-text">Immigration Date: {today.toDateString()}</p>
                <div className="card">
                  <div className="card-body">
                    <p class="card-text"><em>Country: </em>{immigrantDetails[i]['country']}</p>
                    <p class="card-text"><em>D.O.B: </em>{today1.toDateString()}</p>
                    <p class="card-text"><em>A_Number:</em> {immigrantDetails[i]['aNumber']}</p>
                    <p class="card-text"><em>Language:</em> {immigrantDetails[i]['language']}</p>
                    <p class="card-text"><em>Criminal Activities: </em>{immigrantDetails[i]['manner']}</p>
                    
                  </div>
                </div>
              </div>
              <hr/>
            </div>
            
          )
        }
        return table
      }

    render() {
        const {location}  = this.props.match.params
        
        return (
            
            <React.Fragment>
                <h2 className = "container">Immigrant Details in {location}</h2>
                  
                  <div  className = "container row"> 
                  {this.createTable(this.state.immigrantDetails)}
                  </div>
                  
            </React.Fragment>
        )
    }
}

export default Immigrant
