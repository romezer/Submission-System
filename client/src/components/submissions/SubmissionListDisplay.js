import React from 'react'
import _ from 'lodash';
import moment from 'moment';
import history from '../../history';
import { Router, Link } from 'react-router-dom';
import SubmisssionCheckBox from './SubmissionCheckBox';
import CsvDoanloader from './CsvDoanloader'

class SubmissionListDisplay extends React.Component{
   state = {
       list: [],
       exportList: [],
       checkboxes: {},
       title: this.props.title
   }

   static getDerivedStateFromProps(props, current_state) {
    if (current_state.list.length !== props.submissions.length) {
        const obj = {}
        _.map(props.submissions, sub =>{
            _.set(obj, sub._id, 'checked')
        })
      return {
        list: props.submissions,
        exportList: props.submissions,
        checkboxes: obj
      }
    }
    return null
  }

  checkBoxChange = (e, id, sub) =>{
    const tempExportList = [];
    _.map(this.state.exportList, sub =>{
        tempExportList.push(sub)
    })
    
    if(_.get(this.state.checkboxes, id) === 'checked'){
        // this.state.exportList = _.filter(tempExportList, function(o){return o._id !== id})
        this.setState({
            checkboxes: _.set(this.state.checkboxes, id, ''),
            exportList: _.filter(tempExportList, function(o){return o._id !== id})
        })
        
    }else{
        this.state.exportList.push(sub)
        this.setState({
            checkboxes: _.set(this.state.checkboxes, id, 'checked'),
            exportList: this.state.exportList
        })
    }
    
}



    renderTableContent(){
      const filteredList = _.filter(this.state.list, function(o){ return o._id !== undefined})
      return  _.uniqBy(filteredList, '_id').map((sub, i) =>{
            return(
                <tr key={i + 2}>
                    <td>{i + 1}</td>
                    <td key={i + 3}>
                        <SubmisssionCheckBox submission={sub} label={sub._id} onCheckboxChange={this.checkBoxChange} isSelected={_.get(this.state.checkboxes, sub._id)}/>
                    </td>
                    <td key={i + 4}>{sub.authProp}</td>
                    <td key={i + 5}>{sub.branchName}</td>
                    <td key={i + 6}>{moment(sub.date).format("DD-MMM-YYYY")}</td>
                    <td key={i + 7}>
                        <Router history={history}>
                                    <Link  to={`/SubmissionView/${sub._id}`}>
                                         View
                                     </Link>
                                     &nbsp;&nbsp;
                                     <Link to={`/SubmissionEdit/${sub._id}`}>
                                       Edit
                                     </Link>
                                     &nbsp;&nbsp;
                                     <Link to={`/SubmissionDelete/${sub._id}`}>
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
                <h3>{this.props.title}</h3>
                <table>
                    <thead>
                        <tr>
                            <th></th>
                            <th>Selected</th>
                            <th>Branch User</th>
                            <th>Branch Name</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {this.renderTableContent()}
                    </tbody>
                </table>
                <br></br>
                <CsvDoanloader list={this.state.exportList} name={this.props.title}/>
            </div>
        )
    }
}

export default SubmissionListDisplay;