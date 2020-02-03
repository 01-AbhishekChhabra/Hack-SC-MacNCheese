import React, { Component } from 'react';
class Courts extends Component {
  state = {
    courts:[
        {
          "addr1": "1901 South Bell Street,",
          "addr2": "Suite 200",
          "city": "Arlington",
          "state": "VA",
          "zip": 22202
        },
        {
          "addr1": "Peachtree Summit Federal Building",
          "addr2": "401 W. Peachtree Street, Suite 2600",
          "city": "Atlanta",
          "state": "GA",
          "zip": 30308
        },
        {
          "addr1": "180 Ted Turner Drive, SW, Suite 241",
          "addr2": "Atlanta",
          "city": "GA",
          "state": 30303,
          "zip": ""
        },
        {
          "addr1": "3130 N. Oakland",
          "addr2": "Street",
          "city": "Aurora",
          "state": "CO",
          "zip": 80010
        },
        {
          "addr1": "Buffalo Federal Detention Center",
          "addr2": "4250 Federal Drive, Room F-108",
          "city": "Batavia",
          "state": "NY",
          "zip": 14020
        },
        {
          "addr1": "Bishop Henry Whipple Federal Building",
          "addr2": "1 Federal Drive, Suite 1850",
          "city": "Fort Snelling",
          "state": "MN",
          "zip": 55111
        },
        {
          "addr1": "15 New Sudbury Street",
          "addr2": "Room 320",
          "city": "Boston",
          "state": "MA",
          "zip": "02203"
        },
        {
          "addr1": "130 Delaware Avenue",
          "addr2": "Suite 300",
          "city": "Buffalo",
          "state": "NY",
          "zip": 14202
        },
        {
          "addr1": "5701 Executive Center Drive",
          "addr2": "Suite 400",
          "city": "Charlotte",
          "state": "NC",
          "zip": 28212
        },
        {
          "addr1": "525 West Van Buren Street",
          "addr2": "Suite 500",
          "city": "Chicago",
          "state": "IL",
          "zip": 60607
        },
        {
          "addr1": "801 W. Superior Avenue",
          "addr2": "Suite 13 - 100",
          "city": "Cleveland",
          "state": "OH",
          "zip": 44113
        },
        {
          "addr1": "1100 Commerce St.",
          "addr2": "Room 1060",
          "city": "Dallas",
          "state": "TX",
          "zip": 75242
        },
        {
          "addr1": "1961 Stout Street, Suite 3101",
          "addr2": "Denver",
          "city": "CO",
          "state": 80294,
          "zip": ""
        },
        {
          "addr1": "P.V. McNamara Federal Building",
          "addr2": "477 Michigan Avenue",
          "city": "Suite 440",
          "state": "Detroit",
          "zip": "MI"
        },
        {
          "addr1": "700 East San Antonio Avenue",
          "addr2": "Suite 750",
          "city": "El Paso, TX 79901",
          "state": "",
          "zip": ""
        },
        {
          "addr1": "El Paso Service Processing Center",
          "addr2": "8915 Montana Avenue, Suite 100",
          "city": "El Paso",
          "state": "TX",
          "zip": 79925
        },
        {
          "addr1": "Downstate Correctional Facility",
          "addr2": "121 Red Schoolhouse Road",
          "city": "Fishkill",
          "state": "NY",
          "zip": 12524
        },
        {
          "addr1": "Florence Service Processing Center",
          "addr2": "3260 North Pinal Parkway Avenue",
          "city": "Florence",
          "state": "AZ",
          "zip": 85132
        },
        {
          "addr1": "Houston Service Processing Center",
          "addr2": "5520 Green Road",
          "city": "Houston",
          "state": "TX",
          "zip": 77032
        },
        {
          "addr1": "2345 Grand Boulevard",
          "addr2": "Suite 525",
          "city": "Kansas City",
          "state": "MO",
          "zip": 64108
        },
        {
          "addr1": "830 Pine Hill Road",
          "addr2": "P.O. Box 2179",
          "city": "Jena",
          "state": "LA",
          "zip": 71342
        },
        {
          "addr1": "110 North City Parkway",
          "addr2": "Suite 400",
          "city": "Las Vegas",
          "state": "NV",
          "zip": 89106
        },
        {
          "addr1": "Los Angeles",
          "addr2": "606 S. Olive Street, 15th Floor",
          "city": "Los Angeles",
          "state": "CA 90014",
          "zip": ""
        },
        {
          "addr1": "Los Angeles-North",
          "addr2": "300 North Los Angeles Street, Rm. 4330",
          "city": "Los Angeles,CA,90012",
          "state": "",
          "zip": ""
        },
        {
          "addr1": "Brinkley Plaza",
          "addr2": "80 Monroe Ave, Suite 501",
          "city": "Memphis",
          "state": "TN",
          "zip": 38103
        },
        {
          "addr1": "One River View Square",
          "addr2": "333 South Miami Ave., Suite 700",
          "city": "Miami",
          "state": "FL",
          "zip": 33130
        },
        {
          "addr1": "970 Broad Street",
          "addr2": "Suite 1200",
          "city": "Newark",
          "state": "NJ",
          "zip": "07102"
        },
        {
          "addr1": "1717 Avenue H",
          "addr2": "Suite 100",
          "city": "Omaha, NE 68110",
          "state": "",
          "zip": ""
        },
        {
          "addr1": "3535 Lawton Road,",
          "addr2": "Suite 200",
          "city": "Orlando, FL 32803",
          "state": "",
          "zip": ""
        },
        {
          "addr1": "Port Isabel Detention Center",
          "addr2": "27991 Buena Vista Blvd.",
          "city": "Los Fresnos",
          "state": "TX",
          "zip": 78566
        },
        {
          "addr1": "800 Dolorosa Street",
          "addr2": "Suite 300",
          "city": "San Antonio",
          "state": "TX",
          "zip": 78207
        },
        {
          "addr1": "401 West \"A\" Street",
          "addr2": "Suite 800",
          "city": "San Diego",
          "state": "CA",
          "zip": 92101
        },
        {
          "addr1": "100 Montgomery Street, Suite 800",
          "addr2": "San Francisco",
          "city": "CA",
          "state": 94104,
          "zip": ""
        },
        {
          "addr1": "1000 Second Avenue",
          "addr2": "Suite 2500",
          "city": "Seattle",
          "state": "WA",
          "zip": 98104
        },
        {
          "addr1": "1623 East J Street",
          "addr2": "Suite 3",
          "city": "Tacoma",
          "state": "WA",
          "zip": 98421
        },
        {
          "addr1": "300 West Congress,",
          "addr2": "Suite 300",
          "city": "Tucson",
          "state": "AZ",
          "zip": 85701
        }
    ],
    columns:[
      'addr1',
      'city',
      'state',
      'zip'
    ]
  };
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
    let head = [
      <th scope = "col">Street Address</th>,
      <th scope = "col">City</th>,
      <th scope = "col">State</th>,
      <th scope = "col">ZIP Code</th>
    ]
    return head
  }
	render() {
  
    return (
        <div className='container'>
                  
                  <div className = "container-fluid table-responsive">
                  <table className = "table-sm table-striped table-hover">
                    <thead><tr>{this.createHead()}</tr></thead>
                    <tbody>{this.createTable(this.state.courts)}</tbody>
                  </table>
                  </div>

        </div>
    );
  }
}

export default Courts;
