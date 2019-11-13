import React from 'react';
import { Field, reduxForm } from 'redux-form';
import uniqId from 'uniqid';
import _ from 'lodash';
import history from '../../history';
import Select from 'react-select';




class SubmissionForm extends React.Component{
    
    state = {
        selectedOption: [],
        options: [],
        rows: {}
      };

      static getDerivedStateFromProps(props, current_state) {
        if (current_state.selectedOption !== null && current_state.selectedOption.length !== props.options.length) {
          return {
            options: props.options,
          }
        }
        return null
      }


      handleChange = selectedOption => {
        this.setState({ selectedOption });
        
      };

     onSubmit = (formValues) => {
        var flag = false;
        _.map(this.props.products, product =>{
           
            if(_.get(formValues, 'p_' + product.serialNumber) < 0){
                flag = true; 
            }
        })

        if(!flag){
            _.map(this.props.products, product =>{
                if(!_.has(formValues, 'p_' + product.serialNumber)){
                    _.set(formValues, 'p_' + product.serialNumber, 0);
                }
            })
            this.props.onSubmit(formValues);
            history.push('/SubmissionThx');
        }else{
            alert('אנא הזן מספרים חיוביים בלבד');
        }
    }

    renderSendButton = () =>{
        if(this.props.auth !== false){
            return(
                <div className="fixed-action-btn" style={{left: 5}}>
                        <button className="btn-floating btn-large waves-light" type="submit">
                        SEND
                        </button>
                    </div>
            )
        }else{
            // history.push('/Login');
        }
    }

    renderTableRows = () =>{
        const renderField = ({ input, label, type, meta: { touched, error, warning } }) => (
            <div>
              <div>
                <input {...input}  type={type}/>
                {touched && ((error && <span>{error}</span>) || (warning && <span>{warning}</span>))}
              </div>
            </div>
          )

        const list = _.sortBy(this.props.products, ['category']);
            
        return _.map(list, (product, i) => {
           const f =   _.filter(this.state.selectedOption, op =>{
                return  op.value === product.category
             })
            return(
                    
                    <tr key={i + 1} style={{display: (this.state.selectedOption === null || f.length > 0 || this.state.selectedOption.length === 0) ? '' : 'none'}}>
                        <td key={i + 2}>{_.trimStart(product.serialNumber,'700-')}</td>
                        <td key={i + 3}>{product.category}</td>
                        <td key={i + 4}>{product.description}</td>
                        <td key={i + 5}>
                        <Field key={uniqId()}
                            type="number"
                            name={'p_' + product.serialNumber} 
                            component={renderField}
                            label={product.description}
                            
                            />
                        </td>
                </tr>
               
            )
        })
    }



    render(){
        const { selectedOption } = this.state;
        return(
            <div>
           
                <div className="input-field col s12">
                    <Select
                        value={selectedOption}
                        onChange={this.handleChange}
                        options={this.state.options}
                        isMulti
                        placeholder="בחר קטגוריית מוצר"
                    />
                </div>
              
                <br></br>
                <form onSubmit={this.props.handleSubmit(this.onSubmit)}>
                    <table>
                        <thead>
                            <tr>
                                <th>Serial Number</th>
                                <th>Category</th>
                                <th>Description</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>

                        <tbody>
                            {this.renderTableRows()}
                        </tbody>
                    </table>



                    {this.renderSendButton()}
                    {/* <div className="fixed-action-btn">
                        <button className="btn-floating btn-large green" type="submit">
                        SEND
                        </button>
                    </div> */}
                </form>

       
               
            </div>
        )
    }
}




export default reduxForm({
    form: 'submissionForm'
})(SubmissionForm);