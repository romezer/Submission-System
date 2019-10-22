import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Router, Link } from 'react-router-dom';
import history from '../../history';

class BranchForm extends React.Component{

    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }

    render(){
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>

                <label>Branch Name</label>
                    <Field type="text" name="branchName" component="input" />
                
                <label>User Name</label>
                <Field type="text" name="username" component="input" />

                <label>Password</label>
                <Field type="text" name="password" component="input" />

                <Router history={history}>
                        <Link to='/Branches' className="red btn-flat white-text">
                            Cancel
                        </Link>
                    </Router>

                    <button className="teal btn-flat right white-text" type="submit">
                                Submit
                        <i className="material-icons right">done</i>
                    </button>
                </form>
            </div>
        );
    }
}

export default reduxForm({
    form: 'branchForm'
})(BranchForm);