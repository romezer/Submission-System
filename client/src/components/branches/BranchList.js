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

    renderList(){
        return this.props.branches.map(branch => {
            return(
                <li key={uniqid()} key={branch._id} className="collection-item avatar">
                <i key={uniqid()} className="material-icons circle red">turned_in</i>
                <span key={uniqid()}  className="title">{branch.branchName}</span>
                <p key={uniqid()}>{branch.username}</p>
                </li>
            )
        })
    }

    render(){
        return(
            <div>
                <h3>Branch List</h3>
                <ul className="collection">
                    {this.renderList()}
                </ul>
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