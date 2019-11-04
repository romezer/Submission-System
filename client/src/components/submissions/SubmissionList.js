import React from 'react';
import { connect } from 'react-redux';
import { Router, Link } from 'react-router-dom';
import { fetchSubmissions } from '../../actions';
import history from '../../history';
import uniqid from 'uniqid';
import _ from 'lodash';
import moment from 'moment';


import CsvDownloader from './CsvDoanloader';
class SubmissionList extends React.Component{
    
    componentDidMount(){
        this.props.fetchSubmissions();
    }


    renderTabelRows(month, year){
  
        const list = []; 
        const filteredList = _.sortBy(this.props.submissions, ['date']);
        filteredList.map(submission =>{
            if(submission._id !== undefined){
                if(year === moment(submission.date).year() && month === moment(submission.date).month()){
                    list.push(submission);
                }

            }
        })
        return list.map((submission, i) =>{
                    return(
                        <tr key={i}>
                            <td key={i + 1}>{i + 1}</td>
                            <td key={i + 2}>{submission.authProp}</td>
                            <td key={i + 3}>{submission.branchName}</td>
                            <td>{moment(submission.date).format("DD-MMM-YYYY") }</td>
                            <td>
                                <Router history={history}>
                                    <Link key={uniqid()} to={`/SubmissionView/${submission._id}`}>
                                         View
                                     </Link>
                                     &nbsp;&nbsp;&nbsp;
                                     <Link key={uniqid()} to={`/SubmissionEdit/${submission._id}`}>
                                       Edit
                                     </Link>
                                </Router>
                            </td>
                        </tr>
                    )
        })
    }



    render(){
        if(this.props.auth !== null){
            if(!this.props.auth.isAdmin){
                history.push('/Login');
            }
            return(
                <div>
                    <h3 style={{fontStyle: 'italic'}}>Submissions</h3>
                    <h5>Current month submissions</h5>
    
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Branch User</th>
                                <th>Branch Name</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                            
                        <tbody>
                            {this.renderTabelRows(moment(new Date()).month(), moment(new Date()).year())}
                        </tbody>
                    </table>
                    <br></br>
    
                   <CsvDownloader list={_.filter(this.props.submissions, function(o){
                       return moment(o.date).month()  === moment(new Date).month() && moment(o.date).year() === moment(new Date).year();
                        }
                       )} 
                       name="Current Month Report.csv"/>
    
                    <br></br>
                    <br></br>
                    <h5>Last month submissions</h5>
                    
                    <table>
                        <thead>
                            <tr>
                                <th></th>
                                <th>Branch User</th>
                                <th>Branch Name</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                            
                        <tbody>
                            {this.renderTabelRows(moment(new Date()).subtract(1, 'month').month(), moment(new Date()).subtract(1, 'month').year())}
                        </tbody>
                    </table>
                    <br></br>
    
                    <CsvDownloader list={_.filter(this.props.submissions, function(o){
                       var d = new Date(o.date);
                    
                       var current = new Date();
                       return moment(o.date).month()  === moment(new Date).subtract(1, 'month').month() && moment(o.date).year() === moment(new Date).subtract(1, 'month').year();
                        }
                       )}  name="Last Month Report.csv"/>
                </div>
            )  
        }
        return(
            <div>pending...</div>
        )
  
    }
    
}

function mapStateToProps(state){
    return { submissions: Object.values(state.submissions),
            auth : state.auth };
}

export default connect(mapStateToProps, { fetchSubmissions })(SubmissionList);