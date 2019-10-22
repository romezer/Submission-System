import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Link } from 'react-router-dom';
import history from '../history';
import { fetchUser } from '../actions';


class Header extends Component{


    onLinkClick = (roue) => {
        history.push(`/${roue}`);
    }

    componentDidUpdate(prevProps){
        if(this.props.auth.isAdmin && prevProps){
           
            if(this.props.auth.isAdmin !== prevProps.isAdmin){
                // this.props.fetchUser();
            }
        }
    }

    componentWillMount(){
        

    }

    renderContent = () =>{
            switch(this.props.auth){
                case null:
                    return;
                case false:
                    return(
                        <div>Please Login</div>
                    )
                default:
                    if(this.props.auth.isAdmin){
                        return(
                            <ul className="right">
                            <li to="/Products">
                                <Link to="/Products" >
                                Products
                                </Link>
                                </li>
                        <li to="/Submissions" style={{ margin: ' 0 10px' }}>
                            <Link to="/Submissions">
                            Submissions
                            </Link>
                            </li>
                        <li>
                            <Link to="/Branches">
                                Branches
                            </Link>
                        </li>
                        </ul>
                        )
                    }
                    else{
                        return(
                            <div></div>
                        )
                    }
            }
}

    render(){
        return (
            <div>
                 <nav>
                    <Router history={history}>
                    <div className="nav-wrapper teal lighten-2">
                        <Link to={this.props.auth ? '/Products' : '/Login'} className="left brand-logo">
                        <img src="/logo.jpg" alt="Smiley face" height= "64"/>
                        </Link>
                        {this.renderContent()}
                        
                    </div>
                    </Router>
                </nav>
            </div>
            )
        
    }
}

function mapStateToProps({ auth }){
    return { auth };
}

export default connect(mapStateToProps, { fetchUser })(Header);