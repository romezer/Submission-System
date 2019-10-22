import React from 'react';
import { connect } from 'react-redux';
import LoginForm from './LoginForm';
import { loginUser } from '../actions'

class Login extends React.Component{

    onSubmit = (values) =>{
        this.props.loginUser(values);
    }

    render(){
        return(
            <div>
                <LoginForm onSubmit={this.onSubmit} />
            </div>
        )
    }
}



export default connect(null, { loginUser })(Login);