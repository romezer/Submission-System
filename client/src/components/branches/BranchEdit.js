import React from 'react';
import { connect } from 'react-redux';
import { fetchBranch, editBranch } from '../../actions';
import BranchForm from './BranchForm';
import _ from 'lodash';

class BranchEdit extends React.Component{

    componentDidMount(){
        this.props.fetchBranch(this.props.match.params.id);
    }

    onSubmit = formValues =>{
        this.props.editBranch(this.props.match.params.id,formValues);
    }

    render(){
        return(
            <div>
                <h3>Branch Edit</h3>
                <BranchForm onSubmit={this.onSubmit} initialValues={_.omit(this.props.branch, 'password')} />
            </div>
        )
    }
}

const mapSateToProps = (state, ownProps) =>{
    return { branch: state.branches[ownProps.match.params.id]}
};

export default connect(mapSateToProps, { fetchBranch, editBranch })(BranchEdit);