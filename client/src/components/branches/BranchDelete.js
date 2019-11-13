import React from 'react';
import { connect } from 'react-redux';
import { Router, Link } from 'react-router-dom';
import { fetchBranch, deleteBranch } from '../../actions';
import history from '../../history';

class BranchDelete extends React.Component{
    componentDidMount(){
        this.props.fetchBranch(this.props.match.params.id);
     

   }

    deleteClick =() =>{
           this.props.deleteBranch(this.props.branch._id)
   }

   render(){
       if(this.props.branch !== undefined){
        return(
            <div>
                <h3>Branch Delete</h3>
                <table>
                    <thead>
                        <tr>
                            <th>Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Branch Name</td>
                            <td>{this.props.branch.branchName}</td>
                        </tr>
                        <tr>
                            <td>User Name</td>
                            <td>{this.props.branch.username}</td>
                        </tr>
                    </tbody>
                </table>
                <br></br>
                <Router history={history}>
                        <Link to='/Branches' className="blue btn-flat white-text">
                            Cancel
                        </Link>

                        <button className="red btn-flat right white-text" onClick={this.deleteClick}>
                                Delete
                        <i className="material-icons right">delete_forever</i>
                    </button>
                    </Router>
            </div>
        )
       }else{
           return(
               <div></div>
           )
       }
   }
}

const mapSateToProps = (state, ownProps) =>{
    return { branch: state.branches[ownProps.match.params.id]}
};

export default connect(mapSateToProps, { fetchBranch, deleteBranch })(BranchDelete);
