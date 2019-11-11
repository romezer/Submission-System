import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchUser, fetchProducts, fetchBranches } from '../actions';
import _ from 'lodash';
import Chart from 'chart.js';
import uniqid from 'uniqid';

class Dashboard extends React.Component{
    _isMounted = false;
    state = {
        list: [],
        products: this.props.products,
        branches: this.props.branches
    }

   

  async componentDidMount(){
      this.props.fetchProducts();
      this.props.fetchBranches();
        this._isMounted = true;
        this.props.fetchUser();
        const records = await axios.get('/api/find/pending');
        const list = _.filter(records.data, function(o){
            return o.userJoinSubs.length === 0 && o.username !== 'admin';
        });
        
        
        if(this._isMounted && this.state.list.length !== null && records.data.length !== null){
            this.setState({list});
            var char2 = document.getElementById('myChart2');
        new Chart(char2, {
            type: 'doughnut',
            data: {
                labels: ['Waiting for submission', 'Submisions current month'],
                datasets: [{
                    label: 'Amount ',
                    data: [this.state.list.length, records.data.length - this.state.list.length - 1],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                      
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        
                    ],
                    borderWidth: 1
                }]
            },
            options: {
        
            }
        });


        var ctx = document.getElementById('myChart');
         new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: ['Products', 'Branches'],
                datasets: [{
                    label: 'Amount ',
                    data: [this.props.products.length, this.props.branches.length],
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                    ],
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }],
                    xAxes: [{
                        ticks: {
                            beginAtZero: true
                        }
                    }]
                }
            }
        });
        }
        
    }

    componentWillUnmount() {
        this._isMounted = false;
      }

    renderList(){
        return(
          
            this.state.list.map(item =>{
                return(
                    <li key={uniqid()} className="collection-item avatar">
                        <i key={uniqid()} className="material-icons circle #b3e5fc light-blue lighten-4">
                             <img src="/pb-logo.png" alt="Smiley face" height= "42"/>
                             </i>
                        <span key={uniqid()} className="title">{item.username}</span>
                        <p key={uniqid()}>{item.branchName}</p>
                    </li>
                )
            })
        )
    }

    renderTableRows(){
        return this.state.list.map((item, i) =>{
            return(
                <tr key = {i + 3}>
                    <td key={i}>{i + 1}</td>
                    <td key={i + 1}>{item.branchName}</td>
                    <td key={i + 2}>{item.username}</td>
                </tr>
            )
        })
    }

    render(){
        return(
            <div>
                <h3 style={{fontStyle: 'italic'}}>Dashboard</h3>
                <div className="row">
                    <div className="col s12">

                    <h4 style={{fontStyle: 'italic'}}>Pending for submission</h4>
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Branch Name</th>
                                <th>Branch User</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.renderTableRows()}
                        </tbody>
                    </table>
                    <br></br>
                    <br></br>
                    </div>
                    <div className="col s6">
                        <canvas id="myChart" width="300" height="200"></canvas>
                    </div>
                    <div className="col s6">
                        <canvas id="myChart2" width="300" height="200"></canvas>
                    </div>
                </div>  
                
                {/* <ul className="collection with-header">
                    <li className="collection-header"><h4 style={{fontStyle: 'italic'}}>Pending for submission</h4></li>
                    {this.renderList()}
                </ul> */}
                
            </div>
            
        );
    }
}

function mapStateToProps({ auth, products, branches }){
    return { auth,
             products: Object.values(products),
             branches: Object.values(branches)
            };
}

export default connect(mapStateToProps, { fetchUser, fetchProducts, fetchBranches })(Dashboard);