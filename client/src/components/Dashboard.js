import React from 'react';
import axios from 'axios';
import _ from 'lodash';
import Chart from 'chart.js';
import uniqid from 'uniqid';

class Dashboard extends React.Component{

    state = {
        list: []
    }

  async componentDidMount(){

        const records = await axios.get('/api/find/pending');
        // console.log('Records: ' + JSON.stringify(records.data));
        // console.log('Length: ' + JSON.stringify(records.data).length);
        // const l = records.data.map(item =>{
        //     console.log('item: ' + item.userJoinSubs.length)
        //     if(item.userJoinSubs.length === 0){
        //         console.log('ITEM: ' + item)
        //         return item;
        //     }
        // })
         
        const submitedList = _.filter(records.data, function(o){
            return o.userJoinSubs.lenth !== 0 && o.username !== 'admin';
        })
        const list = _.filter(records.data, function(o){
            return o.userJoinSubs.length === 0;
        });
        this.setState({list});
        // console.log("LIST: " + JSON.stringify(list));

        var ctx = document.getElementById('myChart');
        var myChart = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: ['Waiting for submission', 'Submisions current month', 'Yellow', 'Green', 'Purple', 'Orange'],
                datasets: [{
                    label: 'Amount ',
                    data: [3, 5, 3, 5, 2, 3],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)',
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 206, 86, 0.2)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(153, 102, 255, 0.2)',
                        'rgba(255, 159, 64, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
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
                    }]
                }
            }
        });
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

    render(){
        return(
            <div>
                <h3>Dashboard</h3>
                <canvas id="myChart" width="300" height="200"></canvas>
                <ul className="collection with-header">
                    <li className="collection-header"><h4>Pending for submission</h4></li>
                    {this.renderList()}
                </ul>
                
            </div>
            
        );
    }
}

export default Dashboard;