import React from 'react';
import { CSVLink } from "react-csv";
import moment from 'moment';
import axios from 'axios';
import _ from 'lodash';

class CsvDownloader extends React.Component{

    state = {
        products: []
    }

  async  componentDidMount(){
        const records = await axios.get('/api/products');
        this.setState({
            products: _.sortBy(records.data, ['category'])
        })
    }
 

    render(){
        const filteredList = [];
         this.props.list.map( item =>{
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
         
        this.props.list.map((item, i) => {
            _.map(item, function(value, key){
                    if(_.startsWith(key,'p_')){
                        producstList.push(_.trimStart(key, 'p_'));
                    }
                    if(_.startsWith(key, 'authProp')){
                        headers.push(
                            {
                                label: value,
                                key: value
                            }
                        )
                    }
                   
            })
        })

        var firstRow = {};
        this.props.list.map(sub => {
            
            
            _.set(firstRow, sub.authProp, sub.branchName);
            firstRow = {...firstRow}
        })
        rows.push(firstRow)
        

        var secondRow = {};
        this.props.list.map(sub => {
            _.set(secondRow, sub.authProp, moment(sub.date).format('DD-MM-YYYY'))
            secondRow = {...secondRow}
        })
       
        rows.push(secondRow);
        
        // _.uniq(producstList)
        this.state.products.map(product => {
            var row = {};
            _.set(row, 'Serial Number', product.serialNumber);
            row.Category = product.category;
            row.Description = product.description;
            this.props.list.map((item, i) => {
                if(_.pick(item, ['p_' + product.serialNumber, 'authProp'])){
                    const temp = _.pick(item, ['p_' + product.serialNumber, 'authProp', 'branchName', 'date']);

                    const user = temp.authProp ;
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
                 data={rows}
                 filename={this.props.name}
                 className='btn-small green'>
                    Export
                </CSVLink>
        )
    }

}

export default CsvDownloader;
