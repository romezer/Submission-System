import React from 'react';
import { connect } from 'react-redux';
import { Router, Link } from 'react-router-dom';
import { fetchProducts } from '../../actions';
import history from '../../history';
import uniqid from 'uniqid';


class ProductsList extends React.Component{
    componentDidMount(){
        this.props.fetchProducts();
    }

    renderAddBtn(){
        if(this.props.auth !== null){
            if(this.props.auth.isAdmin){
                return(
                    <Router history={history}>
                        <div className="fixed-action-btn">
                            <Link to="/ProductNew" className="btn-floating btn-large red">
                                <i className="material-icons">add</i>
                            </Link>
                        </div>
                    </Router>
                )
            }   
        }
    }

    renderTabelRows(){
        const list = [];
        this.props.products.map(product => {
            if(product._id !== undefined){
                return list.push(product);
            }
        })
        return list.map( (product, i) =>{
            return(
                <tr>
                    <td>{i + 1}</td>
                    <td>{product.serialNumber}</td>
                    <td>{product.category}</td>
                    <td>{product.description}</td>
                    <td>
                        <Router history={history}>
                                    <Link key={uniqid()} to={`/ProductEdit/${product._id}`}>
                                        Edit
                                    </Link>
                        </Router>
                    </td>
                </tr>
            )
        })
    }

    render(){
        return(
            <div>
                <h3 style={{fontStyle: 'italic'}}>Products</h3>
                <table>
                    <thead>
                        <tr>
                        <th></th>
                        <th>Serial Number</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Action</th>
                        </tr>
                    </thead>
                        
                    <tbody>
                        {this.renderTabelRows()}
                    </tbody>
                </table>
              
                {this.renderAddBtn()}
            </div>
        );
        
    }
}

function mapStateToProps(state){
    return { products: Object.values(state.products),
                auth : state.auth
             };
}

export default connect(mapStateToProps, { fetchProducts })(ProductsList);