import React from 'react';
import { connect } from 'react-redux';
import { Router, Link } from 'react-router-dom';
import { fetchSubmissions } from '../../actions';
import history from '../../history';
import uniqid from 'uniqid';

class SubmissionList extends React.Component{
    componentDidMount(){
        this.props.fetchSubmissions();
    }

    renderList(){
        return this.props.submissions.map(submission =>{
            return(
                <Router key={uniqid()} history={history}>
                    <li key={uniqid()} className="collection-item avatar">
                     <i key={uniqid()} className="material-icons circle #b3e5fc light-blue lighten-4">turned_in</i>
                     <span key={uniqid()}  className="title">{submission.authProp}</span>
                     <p key={uniqid()}>{submission.date}</p>
                     <Link key={uniqid()} to={`/SubmissionView/${submission._id}`} className="waves-effect waves-light btn-small right #757575 grey darken-1" style={{ marginTop: '-30px' }}>
                     <i key={uniqid()} className="material-icons ">pageview</i>
                     </Link>
                     <Link key={uniqid()} to={`/SubmissionEdit/${submission._id}`} className="btn-small right #757575 grey darken-1" style={{ marginTop: '-30px', marginRight: '5px' }}>
                     <i key={uniqid()} className="material-icons">edit</i>
                     </Link>
                </li>
                </Router>
                
            )
        })
    }

    render(){
        return(
            <div>
                <h3>Submission List</h3>
                <ul className="collection">
                {this.renderList()}
                </ul>
            </div>
        )    
    }
    
}

function mapStateToProps(state){
    return { submissions: Object.values(state.submissions) };
}

export default connect(mapStateToProps, { fetchSubmissions })(SubmissionList);