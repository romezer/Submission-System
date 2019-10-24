import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router, Link } from 'react-router-dom';
import history from '../history';
import { fetchUser } from '../actions';


class Header extends Component{


    onLinkClick = (roue) => {
        history.push(`/${roue}`);
    }

    componentDidMount(){
        this.props.fetchUser();
    }

    componentDidUpdate(prevProps){
       
    }


    renderContent = () =>{
            if(this.props.userAuth !== null){
                if(this.props.userAuth.isAdmin){
                    return(
                        <ul className="right">
                            <li to="/Submissions" style={{ margin: ' 0 10px' }}>
                            <Link to="/Submissions">
                            Submissions
                            </Link>
                            </li>
                        <li to="/Products">
                            <Link to="/Products" >
                            Products
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
                
            }else{
                return(
                    <div></div>
                )
            }
            
}

    render(){
        return (
            <div>
                 <nav>
                    <Router history={history}>
                    <div className="nav-wrapper blue darken-2">
                        <Link to={this.props.auth ? '/Products' : '/Login'} className="left brand-logo">
                        <img src="/pb-logo.png" alt="Smiley face" height= "64"/>
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