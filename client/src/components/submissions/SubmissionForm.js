import React from 'react';
import { Field, reduxForm } from 'redux-form';
import uniqId from 'uniqid';
import _ from 'lodash';
import history from '../../history';


class SubmissionForm extends React.Component{

    
    renderContent = () =>{
        
        const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
            <div>
              <label>{label}</label>
              <div>
                <input {...input} placeholder={label} type={type}/>
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
              </div>
            </div>
          )

        const list = _.sortBy(this.props.products, ['category']);
        return list.map(product =>{
                return(
                    <div key={product._id}>
                        <div key={product.serialNumber}>
                            <div>
                            {product.serialNumber}
                            <br></br>
                            {product.category}
                            </div>
                            
                            {/* <label key={uniqId()}>{product.description}</label> */}
                        </div>
                        <Field key={uniqId()}
                         type="number"
                         name={'p_' + product.serialNumber} 
                         component={renderField}
                         label={product.description}
                         
                          />
                    </div>
                )
           
        })
    }

     onSubmit = (formValues) => {
        this.props.products.map( product =>{
            if(!_.has(formValues, 'p_' + product.serialNumber)){
                _.set(formValues, 'p_' + product.serialNumber, 0);
            }
        })
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