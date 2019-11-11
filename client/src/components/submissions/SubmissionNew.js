import React from 'react';
import { connect } from 'react-redux';
import { postSubmission, fetchProducts, fetchUser } from '../../actions';
import SubmissionForm from './SubmissionForm';
import _ from 'lodash';

class SubmissionNew extends React.Component {
    componentDidMount(){
        this.props.fetchProducts();
        this.props.fetchUser();
    }

    onSubmit = (formValues) => {
        
        const currentDate = new Date();
        const date = currentDate;
        const userId = this.props.auth._id;
        const authProp = this.props.auth.username;
        const branchName = this.props.auth.branchName;
        const res = {...formValues, authProp, userId, date, branchName}

        this.props.postSubmission(res);
    }

    getCategoryOptions = () =>{
        const options = [];
        _.map(this.props.products, product =>{
            options.push({
                value: product.category,
                label: product.category
            })
        })
        return _.uniqBy(options, 'value')
    }

    render(){
        return(
            <div>
                <SubmissionForm auth={this.props.auth} products={this.props.products} onSubmit={this.onSubmit} options={this.getCategoryOptions()} />
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