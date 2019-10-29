import React from 'react';
import { connect } from 'react-redux';
import { fetchSubmission, editSubmission } from '../../actions';
import SubmissionEditForm from './SubmissionEditForm';
import _ from 'lodash';

class SubmissionEdit extends React.Component{

    componentDidMount(){
        this.props.fetchSubmission(this.props.match.params.id);
    }

    onSubmit = (formValues) => {
        const values = _.omit(formValues, ['_id']);
        const id = this.props.submission._id; 
        const res = {id, values};
        this.props.editSubmission(res);
    }

    render(){
        return(
            <div>
                <SubmissionEditForm onSubmit={this.onSubmit} submission={_.omit(this.props.submission, 'branchName')} initialValues={_.omit(this.props.submission, 'branchName')}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    return { submission: state.submissions[ownProps.match.params.id]}
    }

export default connect(mapStateToProps, { fetchSubmission, editSubmission })(SubmissionEdit);