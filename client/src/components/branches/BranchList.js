import React from 'react';
import { connect } from 'react-redux';
import { fetchBranches } from '../../actions';
import { Router, Link } from 'react-router-dom';
import history from '../../history';
import uniqid from 'uniqid';

class BranchList extends React.Component{
    componentDidMount(){
        this.props.fetchBranches();
    }


    rendeTableRows(){
        return this.props.branches.map((branch, i) =>{
            return(
                <tr>
                    <td>{i + 1}</td>
                    <td>{branch.branchName}</td>
                    <td>{branch.username}</td>
                    <td>
                        <Router history={history}>
                            <Link to={`/BranchEdit/${branch._id}`}>
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

               
                <Router history={history}>
                    <div className="fixed-action-btn">
                        <Link to="/BranchNew" className="btn-floating btn-large red">
                            <i className="material-icons">add</i>
                        </Link>
                    </div>
                </Router>
            </div>
        );
    }
}

function mapStateToProps(state){
    return { branches: Object.values(state.branches) };
}

export default connect(mapStateToProps, { fetchBranches })(BranchList);