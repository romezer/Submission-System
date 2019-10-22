import React from 'react';
import { Field, reduxForm } from 'redux-form';

class LoginForm extends React.Component{
        render(){
            return(
                <div>
                    <h2> Login</h2>
                    <form onSubmit={this.props.handleSubmit(values => this.props.onSubmit(values))}>
                        
                            <label>User Name</label>
                            <Field type="text" name="username" component="input" />
                            <label>Password</label>
                            <Field type="text" name="password" component="input" />
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
    form: 'loginForm'
})(LoginForm);