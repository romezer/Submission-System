import React from 'react';
import { connect } from 'react-redux';
import { Router, Link } from 'react-router-dom';
import { fetchSubmissions } from '../../actions';
import history from '../../history';
import uniqid from 'uniqid';
import _ from 'lodash';
import moment from 'moment';
import SubmissionListDisplay from './SubmissionListDisplay';

class SubmissionList extends React.Component{

    
    componentDidMount(){
        this.props.fetchSubmissions();
    }

    checkBoxChange = (event, id) =>{
        console.log('id: ' + id);
        const element = this.refs[id];
        element.removeAttribute("checked")
    }

    renderTabelRows(month, year){
        const list = []; 
        const filteredList = _.sortBy(this.props.submissions, ['date']);
        _.map(filteredList, submission =>{
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
                            <td>
                            {/* <p>
                                <label>
                                    <input ref={submission._id} type="checkbox" className="filled-in" checked  onClick={(e) => this.checkBoxChange(e, submission._id)}/>
                                    <span></span>
                                </label>
                                </p> */}
                                <i key="2" ref={submission._id} className="material-icons" onClick={(e) => this.checkBoxChange(e, submission._id)}>delete</i>
                            </td>
                            <td key={i + 2}>{submission.authProp}</td>
                            <td key={i + 3}>{submission.branchName}</td>
                            <td key={i + 4}>{moment(submission.date).format("DD-MMM-YYYY") }</td>
                            <td key={i + 5}>
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
                    <SubmissionListDisplay title="Current Month" submissions={_.filter(this.props.submissions, function(o){
                       return moment(o.date).month()  === moment(new Date()).month() && moment(o.date).year() === moment(new Date()).year();
                        }
                       )} />

                    <SubmissionListDisplay title="Last Month" submissions={_.filter(this.props.submissions, function(o){
                    
                    return moment(o.date).month()  === moment(new Date()).subtract(1, 'month').month() && moment(o.date).year() === moment(new Date()).subtract(1, 'month').year();
                     }
                    )} />                


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