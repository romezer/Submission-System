import React from 'react';
import { connect } from 'react-redux';
import { Router, Link } from 'react-router-dom';
import { fetchSubmissions } from '../../actions';
import history from '../../history';
import uniqid from 'uniqid';
import _ from 'lodash';

import CsvDownloader from './CsvDoanloader';
var currentSubmissions = [];
const lastMonthSubmissions = [];
class SubmissionList extends React.Component{
    
    componentDidMount(){
        this.props.fetchSubmissions();
    }


    renderList(){
        return this.props.submissions.map(submission =>{
            // currentSubmissions = [];
            if(submission._id !== undefined){
                var d = new Date(submission.date);
                const subMonth = d.getMonth() + 1;
                var current = new Date();
                const formatedDate = d.getDate() + '-' + subMonth + '-' + d.getFullYear();
                if(d.getMonth()  === current.getMonth() && d.getFullYear() === current.getFullYear()){
                    currentSubmissions.push(submission);
                    return(
                        <Router key={uniqid()} history={history}>
                            <li key={uniqid()} className="collection-item avatar">
                             <i key={uniqid()} className="material-icons circle #b3e5fc light-blue lighten-4">
                             <img src="/pb-logo.png" alt="Smiley face" height= "42"/>
                             </i>
                             <span key={uniqid()}  className="title">{submission.authProp}</span>
                             <p key={uniqid()}>{formatedDate}</p>
                             <Link key={uniqid()} to={`/SubmissionView/${submission._id}`} className="waves-effect waves-light btn-small right blue darken-1" style={{ marginTop: '-30px' }}>
                             <i key={uniqid()} className="material-icons ">pageview</i>
                             </Link>
                             <Link key={uniqid()} to={`/SubmissionEdit/${submission._id}`} className="btn-small right right blue darken-1" style={{ marginTop: '-30px', marginRight: '5px' }}>
                             <i key={uniqid()} className="material-icons">edit</i>
                             </Link>
                        </li>
                        </Router>
                        
                    )       
                }
            }
            
        })
    }

    renderLastMonth(){
        return this.props.submissions.map(submission =>{
            if(submission._id !== undefined){
                var d = new Date(submission.date);
                const subMonth = d.getMonth() + 1;
                var current = new Date();
                const formatedDate = d.getDate() + '-' + subMonth + '-' + d.getFullYear();
                if(d.getMonth()  === current.getMonth() - 1 && d.getFullYear() === current.getFullYear()){
                    lastMonthSubmissions.push(submission);
                    return(
                        <Router key={uniqid()} history={history}>
                            <li key={uniqid()} className="collection-item avatar">
                             <i key={uniqid()} className="material-icons circle">
                             <img src="/pb-logo.png" alt="Smiley face" height= "42"/>
                             </i>
                             <span key={uniqid()}  className="title">{submission.authProp}</span>
                             <p key={uniqid()}>{formatedDate}</p>
                             <Link key={uniqid()} to={`/SubmissionView/${submission._id}`} className="waves-effect waves-light btn-small right right blue darken-1" style={{ marginTop: '-30px' }}>
                             <i key={uniqid()} className="material-icons ">pageview</i>
                             </Link>
                             <Link key={uniqid()} to={`/SubmissionEdit/${submission._id}`} className="btn-small right right blue darken-1" style={{ marginTop: '-30px', marginRight: '5px' }}>
                             <i key={uniqid()} className="material-icons">edit</i>
                             </Link>
                        </li>
                        </Router>
                        
                    )       
                }
            }
            
        })
    }



    render(){
        return(
            <div>
                <h3>Submission List</h3>
                <h5>Current month submissions</h5>
                <ul className="collection">
                {this.renderList()}
                </ul>

               <CsvDownloader list={_.filter(this.props.submissions, function(o){
                   var d = new Date(o.date);
                   var current = new Date();
                   return d.getMonth()  === current.getMonth() && d.getFullYear() === current.getFullYear();
                    }
                   )} 
                   name="Current Month Report.csv"/>

                <h5>Last month submissions</h5>
                <ul className="collection">
                {this.renderLastMonth()}
                </ul>

                <CsvDownloader list={_.filter(this.props.submissions, function(o){
                   var d = new Date(o.date);
                   const subMonth = d.getMonth() + 1;
                   var current = new Date();
                   return d.getMonth()  === current.getMonth() -1 && d.getFullYear() === current.getFullYear();
                    }
                   )}  name="Last Month Report.csv"/>
            </div>
        )    
    }
    
}

function mapStateToProps(state){
    return { submissions: Object.values(state.submissions) };
}

export default connect(mapStateToProps, { fetchSubmissions })(SubmissionList);