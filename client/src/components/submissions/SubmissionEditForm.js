import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Router, Link } from 'react-router-dom';
import history from '../../history';
import uniqid from 'uniqid';


class SubmissionEditForm extends React.Component{
  
    renderContent = () =>{
        if(this.props.submission){
            return Object.keys(this.props.submission).map((keyName, keyIndex) => {
                if(keyName !== '_id' && keyName !== 'userId' && keyName !== 'date' && keyName !== 'authProp'){
                    return(
                        <div key={uniqid()}> 
                        <label key={uniqid()}>{keyName}</label>
                            <Field key={uniqid()} name={keyName} type="number" component="input" /> 
                        </div>
                    )
                   
                }
            })
        }
        else{
            return(
                <div>
                    Pending ...
                </div>
            )
        }
    }

     onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }



    render(){
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                  <h3>Submission Edit Form</h3>
                  {this.renderContent()}
                  <Router history={history}>
                        <Link to='/Submissions' className="red btn-flat white-text">
                            Cancel
                        </Link>
                    </Router>
                    <button className="teal btn-flat right white-text" type="submit">
                                Submit
                        <i className="material-icons right">done</i>
                    </button>
                </form>
               
            </div>
        )
    }
}

export default reduxForm({
    form: 'submissionEditForm'
})(SubmissionEditForm);