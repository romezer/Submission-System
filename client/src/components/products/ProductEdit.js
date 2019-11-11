import React from 'react';
import { connect } from 'react-redux';
import { fetchProduct, editProduct } from '../../actions';
import ProductForm from './ProductForm';

class ProductEdit extends React.Component{
    componentDidMount(){
        this.props.fetchProduct(this.props.match.params.id);
    }

    onSubmit = formValues =>{
        this.props.editProduct(this.props.match.params.id,formValues);
    }

    render(){
        console.log('Product: ' + JSON.stringify(this.props.product))
        return(
            <div>
                <h3>Edit Product</h3>
                <ProductForm onSubmit={this.onSubmit} initialValues={this.props.product}/>
            </div>
        )
    }
}

const mapSateToProps = (state, ownProps) =>{
    return { product: state.products[ownProps.match.params.id]}
};

export default connect(mapSateToProps, { fetchProduct, editProduct })(ProductEdit);
