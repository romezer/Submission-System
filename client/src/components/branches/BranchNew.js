import React from 'react';
import BranchForm from './BranchForm';
import { connect } from 'react-redux';
import { postBranch } from '../../actions';

class BranchNew extends React.Component{

    onSubmit = (formValues) => {
        this.props.postBranch(formValues);
    }

    render(){
        return(
            <div>
                <h3>Create New Branch</h3>
                <BranchForm onSubmit={this.onSubmit} />
            </div>
        );
    }
}

export default connect(null, { postBranch })(BranchNew);