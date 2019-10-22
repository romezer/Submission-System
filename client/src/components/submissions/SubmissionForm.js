import React from 'react';
import { Field, reduxForm } from 'redux-form';
import uniqId from 'uniqid';
import history from '../../history';


class SubmissionForm extends React.Component{
  
    renderContent = () =>{
        return this.props.products.map(product =>{
            if(product.serialNumber){
                return(
                    <div key={uniqId()}>
                        <div key={uniqId()}>
                        {product.serialNumber}<br/>
                        <label key={uniqId()}>{product.description}</label>
                        </div>
                        <Field key={uniqId()} type="number" name={'p_' + product.serialNumber} component="input" />
                    </div>
                )
            }
           
        })
    }

     onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
        history.push('/SubmissionThx');
    }



    render(){
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    {this.renderContent()}
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
    form: 'submissionForm'
})(SubmissionForm);