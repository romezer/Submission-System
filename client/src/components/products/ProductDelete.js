import React from 'react';
import { connect } from 'react-redux';
import { Router, Link } from 'react-router-dom';
import { fetchProduct, deleteProduct } from '../../actions';
import history from '../../history';

class ProductDelete extends React.Component{

    componentDidMount(){
         this.props.fetchProduct(this.props.match.params.id);
      

    }

     deleteClick =() =>{
            this.props.deleteProduct(this.props.product._id)
    }

    render(){
        if(this.props.product !== undefined){
            return(
                <div>
                    <h3>Product Delete</h3>
                    <table>
                        <thead>
                            <tr>
                                 <th>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Serial Number</td>
                                <td>{this.props.product.serialNumber}</td>
                            </tr>
                            <tr>
                                <td>Category</td>
                                <td>{this.props.product.category}</td>
                            </tr>
                            <tr>
                                <td>Description</td>
                                <td>{this.props.product.description}</td>
                            </tr>
                        </tbody>
                    </table>
                    <br></br>
                    <Router history={history}>
                        <Link to='/Products' className="blue btn-flat white-text">
                            Cancel
                        </Link>

                        <button className="red btn-flat right white-text" onClick={this.deleteClick}>
                                Delete
                        <i className="material-icons right">delete_forever</i>
                    </button>
                    </Router>
                </div>
            )
        }
        else{
            return(
                <div></div>
            )
        }
    }
}

const mapSateToProps = (state, ownProps) =>{
    return { product: state.products[ownProps.match.params.id]}
};

export default connect(mapSateToProps, { fetchProduct, deleteProduct })(ProductDelete);