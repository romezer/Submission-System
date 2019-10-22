import React from 'react';
import { connect } from 'react-redux';
import { postSubmission, fetchProducts } from '../../actions';
import SubmissionForm from './SubmissionForm';

class SubmissionNew extends React.Component {
    componentDidMount(){
        this.props.fetchProducts();
    }

    onSubmit = (formValues) => {
        const date = new Date().toISOString();
        const userId = this.props.auth._id;
        const authProp = this.props.auth.username;
        const res = {...formValues, authProp, userId, date}
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

export default connect(mapStateToProps, { postSubmission, fetchProducts })(SubmissionNew);