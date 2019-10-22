import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import * as actions from '../actions';

 import Header from './Header';
 import Login from './Login';
 import SubmissionList  from './submissions/SubmissionList';
 import SubmissionNew from './submissions/SubmissionNew';
 import Products from './products/ProductList';
 import ProductNew from './products/ProductNew';
 import BranchList from './branches/BranchList';
 import ProductEdit from './products/ProductEdit';
 import SubmissionView from './submissions/SubmissionView';
 import SubmissionEdit from './submissions/SubmissionEdit';
 import SubmissionThx from './submissions/SubmissionThx';
 import BranchNew from './branches/BranchNew';



class App extends Component{
    componentDidMount(){
        this.props.fetchUser();
    }

    render(){
        return(
            <div className="container">
                <Header />
                <Router history={history}>
                    <div>
                    
                        <Route exact path="/Login" component={Login} />
                        <Route exact path="/Submissions" component={SubmissionList} />
                        <Route exact path="/SubmissionNew" component={SubmissionNew} />
                        <Route exact path="/Products" component={Products} />
                        <Route exact path="/ProductNew" component={ProductNew} />
                        <Route exact path="/BranchNew" component={BranchNew} />
                        <Route exact path="/Branches" component={BranchList} />
                        <Route exact path="/ProductEdit/:id" component={ProductEdit} />
                        <Route exact path="/SubmissionView/:id" component={SubmissionView} />
                        <Route exact path="/SubmissionEdit/:id" component={SubmissionEdit} />
                        <Route exact path="/SubmissionThx" component={SubmissionThx} />
                        
                    </div>
                </Router>
            </div>
        );
    };
}


export default connect(null, actions) (App);