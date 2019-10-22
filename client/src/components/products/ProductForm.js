import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Router, Link } from 'react-router-dom';
import history from '../../history';


class ProductForm extends React.Component{
    onSubmit = (formValues) => {
        this.props.onSubmit(formValues);
    }


    render(){
        return(
            <div>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>

                    <label>Serial Number</label>
                    <Field type="text" name="serialNumber" component="input" />

                    <label>Description</label>
                    <Field type="text" name="description" component="input" />
                    <Router history={history}>
                        <Link to='/Products' className="red btn-flat white-text">
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
    form: 'productForm'
})(ProductForm);