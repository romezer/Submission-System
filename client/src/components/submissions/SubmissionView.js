import React from 'react';
import { connect } from 'react-redux';
import { fetchSubmission } from '../../actions';
import uniqid from 'uniqid';

class SubmissionView extends React.Component{
    componentDidMount(){
        this.props.fetchSubmission(this.props.match.params.id);
    }

    renderContent(){
        if(this.props.submission){
            return Object.keys(this.props.submission).map((keyName, keyIndex) => {
                
                if(keyName !== '_id' && keyName !== 'userId'){
                    if(keyName === 'date'){
                        return(
                            <li key={uniqid()} className="collection-item"><label key={uniqid()}>Date of submission:</label> {this.props.submission[keyName].toString()}</li>

                        )
                    }
                    else{
                        if(keyName === 'authProp'){
                            return(
                                <li key={uniqid()} className="collection-item"><label key={uniqid()}>Submitted By:</label> {this.props.submission[keyName]}</li>
                            )
                        }
                        else{
                            return(
                                <li key={uniqid()} className="collection-item">
                                    <label key={uniqid()}>{keyName}:</label>  {this.props.submission[keyName]}
                                </li>
                            )
                        }
                    }
                }
                   
              })
        }
        else{
            return(
                <div>panding...</div>
            )
            
        }

    }

    render(){
        return(
            <div>
                <ul className="collection with-header">
                <li className="collection-header"><h4>Submission View</h4></li>
                {this.renderContent()}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (state, ownProps) =>{
return { submission: state.submissions[ownProps.match.params.id]}
}

export default connect(mapStateToProps, { fetchSubmission })(SubmissionView);