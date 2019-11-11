import React from 'react';
import { connect } from 'react-redux';
import { Router, Link } from 'react-router-dom';
import { fetchProducts } from '../../actions';
import history from '../../history';
import _ from 'lodash';


class ProductsList extends React.Component{
    componentDidMount(){
        this.props.fetchProducts();
    }

    renderAddBtn(){
        if(this.props.auth !== null){
            if(this.props.auth.isAdmin){
                return(
                    <Router history={history}>
                        
                        <div key="1" className="fixed-action-btn">
                            <div className="section">
                            <Link to="/ProductNew" className="btn-floating btn-large red">
                                <i key="2" className="material-icons">add</i>
                            </Link>
                            </div>
{/*                           
                            <div className="section">
                            <Link to="/ProductNew" className="btn-floating btn-large blue">
                                <i key="3" className="material-icons">edit</i>
                            </Link>
                            </div> */}
                           
                        </div>
                        
                    </Router>
                )
            }else{
                history.push('/Login');
            }   
        }
    }

    renderTabelRows(){
       const sortedList =  _.sortBy(this.props.products, ['category'])
        const list = _.filter(sortedList, function(o){ return o._id !== undefined})
        return _.uniqBy(list, '_id').map( (product, i) =>{
            return(
                <tr key={i}>
                    <td key={i + 1}>{i + 1}</td>
                    <td key={i + 2}>{product.serialNumber}</td>
                    <td key={i + 3}>{product.category}</td>
                    <td key={i + 4}>{product.description}</td>
                    <td key={i + 5}> 
                        <Router history={history}>
                                    <Link  to={`/ProductEdit/${product._id}`}>
                                        Edit
                                    </Link>
                                    &nbsp;&nbsp;&nbsp;
                                    <Link to={`/ProductDelete/${product._id}`}>
                                        Delete
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
                        <th>Actions</th>
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