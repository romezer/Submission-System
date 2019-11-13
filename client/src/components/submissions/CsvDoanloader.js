import React from 'react';
import { CSVLink } from "react-csv";
import { connect } from 'react-redux';
import { fetchProducts } from '../../actions';
import moment from 'moment';
import _ from 'lodash';

class CsvDownloader extends React.Component{

    state = {
        products: this.props.products
    }

  async  componentDidMount(){
    this.props.fetchProducts();
    }

    static getDerivedStateFromProps(props, current_state) {
        if (current_state.products.length !== props.products.length) {
          return {
            list: props.products,
        
          }
        }
        return null
      }
 

    render(){
        const filteredList = [];
         _.map(this.props.list, item =>{
            const record = _.omit(item, ['_id', 'userId', 'date', 'authProp', 'branchName']);
            const rec = {
                Branch: item.authProp,
                Branch_Name: item.branchName, 
                Date: item.date
            }
            filteredList.push({...rec, ...record})
        })

        const rows = [];
        const  headers = [
            { label: "Serial Number", key: "Serial Number" },
            { label: "Category", key: "Category" },
            { label: "Description", key: "Description" }
          ];
        const producstList = [];
         
        _.map(this.props.list, (item, i) => {
            _.map(item, function(value, key){
                    if(_.startsWith(key,'p_')){
                        producstList.push(_.trimStart(key, 'p_'));
                    }
                    if(_.startsWith(key, 'authProp')){
                        headers.push(
                            {
                                label: value,
                                key: value + '_' + item._id // 1.1
                            }
                        )
                    }
                   
            })
        })

        var firstRow = {};
        _.map(this.props.list, sub => {
            
            
            _.set(firstRow, sub.authProp + '_' + sub._id, sub.branchName);
            firstRow = {...firstRow}
        })
        rows.push(firstRow)
        

        var secondRow = {};
        this.props.list.map(sub => {
            _.set(secondRow, sub.authProp + '_' + sub._id, moment(sub.date).format('DD-MM-YYYY'))
            secondRow = {...secondRow}
        })
       
        rows.push(secondRow);
        
        // _.uniq(producstList)
        this.props.products.map(product => {
            var row = {};
            _.set(row, 'Serial Number', product.serialNumber);
            row.Category = product.category;
            row.Description = product.description;
            this.props.list.map((item, i) => {
                if(_.pick(item, ['p_' + product.serialNumber, 'authProp'])){
                    const temp = _.pick(item, ['p_' + product.serialNumber, 'authProp', 'branchName', 'date']);

                    const user = temp.authProp + '_' + item._id;
                    const amount = _.get(item, ['p_' + product.serialNumber]);
                    const ob = _.set(_.omit(temp, 'p_' + product.serialNumber, ['authProp', 'date', 'branchName']) , user, amount)
                    row = {...row, ...ob }
                    
                  
                }
            })
         
            rows.push(row);
            
           
        })
     

        return(
            <CSVLink
                headers={headers}
                 data={_.sortBy(rows, 'Category')}
                 filename={this.props.name + '.csv'}
                 className='btn-small green'>
                    Export
                </CSVLink>
        )
    }

}

function mapStateToProps(state){
    return { products: Object.values(state.products),
                auth : state.auth
             };
}

export default connect(mapStateToProps, { fetchProducts })(CsvDownloader);
