import React from 'react';
import { connect } from 'react-redux';
import { postSubmission, fetchProducts, fetchUser } from '../../actions';
import SubmissionForm from './SubmissionForm';

class SubmissionNew extends React.Component {
    componentDidMount(){
        this.props.fetchProducts();
        this.props.fetchUser();
    }

    onSubmit = (formValues) => {
        console.log('Form Values: ' + JSON.stringify(formValues));
        console.log('auth: '  + this.props.auth);
        const currentDate = new Date();
        // const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1 );
        const date = currentDate;
        const userId = this.props.auth._id;
        const authProp = this.props.auth.username;
        const branchName = this.props.auth.branchName;
        const res = {...formValues, authProp, userId, date, branchName}

        this.props.postSubmission(res);
    }

    render(){
        return(
            <div>
                <SubmissionForm products={this.props.products} onSubmit={this.onSubmit}/>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return{
        products: Object.values(state.products),
        auth: state.auth
    }
}

export default connect(mapStateToProps, { postSubmission, fetchProducts, fetchUser })(SubmissionNew);