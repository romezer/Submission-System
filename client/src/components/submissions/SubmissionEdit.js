import React from 'react';
import { connect } from 'react-redux';
import { fetchSubmission, editSubmission } from '../../actions';
import SubmissionEditForm from './SubmissionEditForm';

class SubmissionEdit extends React.Component{

    componentDidMount(){
        this.props.fetchSubmission(this.props.match.params.id);
    }

    onSubmit = (formValues) => {

        const id = this.props.submission._id; 
        const res = {id, formValues};
        
        this.props.editSubmission(res);
    }

    render(){
        return(
            <div>
                <SubmissionEditForm onSubmit={this.onSubmit} submission={this.props.submission} initialValues={this.props.submission}/>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
    return { submission: state.submissions[ownProps.match.params.id]}
    }

export default connect(mapStateToProps, { fetchSubmission, editSubmission })(SubmissionEdit);