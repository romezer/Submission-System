import React from 'react';
import { connect } from 'react-redux';
import { fetchSubmission } from '../../actions';
import { Router, Link } from 'react-router-dom';
import history from '../../history';
import moment from 'moment';
import _ from 'lodash';
import uniqid from 'uniqid';

class SubmissionView extends React.Component{
    componentDidMount(){
        this.props.fetchSubmission(this.props.match.params.id);
    }

  

    renderTableRows(){
        if(this.props.submission){
          return  _.map(this.props.submission, function(value, key){
                if(_.startsWith(key, 'p_')){
                    return(
                        <tr>
                            <td>{_.trimStart(key, 'p_')}</td>
                            <td>{value}</td>
                        </tr>
                    )
                }
            })
        }
    }

    renderDetailRows(){
        if(this.props.submission){
          return  _.map(_.pick(this.props.submission, ['date', 'authProp']), function(value, key){
              if(key === 'date'){
                return(
                    <tr>
                        <td>Date of submission</td>
                        <td>
                            {moment(value).format('DD-MM-YYYY')}
                        </td>
                    </tr>
                )
              }else{
                return(
             
                    <tr>
                        <td>Submitted By</td>
                        <td>{value}</td>
                    </tr>
            )

              }

          })
        }
    }

    render(){
        return(
            <div>
                <h3 style={{fontStyle: 'italic'}}>Submission View</h3>
                <table>
                    <thead>
                        <tr>
                        <th>product</th>
                        <th>Quantity</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.renderTableRows()}
                    </tbody>
                </table>

                <h5>Details</h5>

                <table>
                    <thead>
                        <tr>

                        </tr>
                    </thead>

                    <tbody>
                        {this.renderDetailRows()}
                    </tbody>
                </table>
                <br></br>
                

                {/* <ul className="collection with-header">
                <li className="collection-header"><h4>Submission View</h4></li>
                {this.renderContent()}
                </ul> */}

                <Router history={history}>
                        <Link to='/Submissions' className="red btn-flat white-text">
                            Back
                        </Link>
                    </Router>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
return { submission: state.submissions[ownProps.match.params.id]}
}

export default connect(mapStateToProps, { fetchSubmission })(SubmissionView);