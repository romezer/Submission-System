import React from 'react';
import { connect } from 'react-redux';
import { Router, Link } from 'react-router-dom';
import history from '../../history';
import _ from 'lodash';
import moment from 'moment';
import { fetchSubmission, deleteSubmission } from '../../actions';

class SubmissionDelete extends React.Component {

    componentDidMount(){
        this.props.fetchSubmission(this.props.match.params.id);
    }

    deleteClick =() =>{
        this.props.deleteSubmission(this.props.submission._id, this.props.submission)
    }


    renderTableRows(){
        if(this.props.submission){
            return  _.map(_.pick(this.props.submission, ['date', 'authProp']), function(value, key){
                if(key === 'date'){
                  return(
                      <tr key={key}>
                          <td key={key + 1}>Date of submission</td>
                          <td key={key + 2}>
                              {moment(value).format('DD-MM-YYYY')}
                          </td>
                      </tr>
                  )
                }else{
                  return(
               
                      <tr key={key + 3}>
                          <td key={key + 4}> Submitted By</td>
                          <td key={key + 5}>{value}</td>
                      </tr>
              )
  
                }
  
            })
          }
    }

    render(){
        return(
            <div>
                <h3>Submission Delete</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Details</th>
                        </tr>
                    </thead>

                    <tbody>
                    {this.renderTableRows()}
                    </tbody>
                </table>
                <br></br>
                <Router history={history}>
                        <Link to='/Submissions' className="blue btn-flat white-text">
                            Cancel
                        </Link>

                        <button className="red btn-flat right white-text" onClick={this.deleteClick}>
                                Delete
                        <i className="material-icons right">delete_forever</i>
                    </button>
                    </Router>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    return { submission: state.submissions[ownProps.match.params.id]}
    }

export default connect(mapStateToProps, { fetchSubmission, deleteSubmission })(SubmissionDelete);