import React from 'react';
import { connect } from 'react-redux';
import { fetchBranches } from '../../actions';
import { Router, Link } from 'react-router-dom';
import history from '../../history';
import _ from 'lodash';

class BranchList extends React.Component{
    componentDidMount(){
        this.props.fetchBranches();
    }

    renderAddBtn(){
        if(this.props.auth !== null){
            if(this.props.auth.isAdmin){
                return(
                    <Router history={history}>
                        <div className="fixed-action-btn">
                            <Link to="/BranchNew" className="btn-floating btn-large red">
                                <i className="material-icons">add</i>
                            </Link>
                        </div>
                    </Router>
                )
            }else{
                history.push('/Login');
            }   
        }
    }


    rendeTableRows(){
        return _.uniqBy(this.props.branches, '_id').map((branch, i) =>{
            return(
                <tr key={i}>
                    <td key = {i + 1}>{i + 1}</td>
                    <td key = {i + 2}>{branch.branchName}</td>
                    <td key = {i + 3}>{branch.username}</td>
                    <td>
                        <Router history={history}>
                            <Link to={`/BranchEdit/${branch._id}`}>
                                Edit                            
                            </Link>
                            &nbsp;&nbsp;&nbsp;
                                    <Link to={`/BranchDelete/${branch._id}`}>
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
                <h3 style={{fontStyle: 'italic'}}>Branches</h3>

                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Branch Name</th>
                            <th>Branch User</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.rendeTableRows()}
                    </tbody>
                </table>

               {this.renderAddBtn()}
         
            </div>
        );
    }
}

function mapStateToProps(state){
    return { branches: Object.values(state.branches),
        auth : state.auth };
}

export default connect(mapStateToProps, { fetchBranches })(BranchList);