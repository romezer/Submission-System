import React from 'react';
import { connect } from 'react-redux';
import ProductForm from './ProductForm';
import { postProduct } from '../../actions';

class ProductNew extends React.Component{
    onSubmit = (formValues) => {
        this.props.postProduct(formValues);
    }

    render(){
        return(
            <div>
                <h3>Create New Product</h3>
                <ProductForm onSubmit={this.onSubmit}/>
            </div>
        );
    }
}

export default connect(null, { postProduct })(ProductNew);