import React from 'react';
import { CSVLink } from "react-csv";
import moment from 'moment';
import _ from 'lodash';

class CsvDownloader extends React.Component{
 

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
        const producstList = [];
         
        this.props.list.map((item, i) => {
            _.map(item, function(value, key){
                if(true){
                    if(_.startsWith(key,'p_')){
                        producstList.push(key);
                    }
                }
            })
        })
        
        _.uniq(producstList).map(product => {
            var row = {};
            row.Product = product;
            this.props.list.map((item, i) => {
                if(_.pick(item, [product, 'authProp'])){
                    const temp = _.pick(item, [product, 'authProp', 'branchName', 'date']);

                    const user = temp.authProp + '_ ' + temp.branchName + '_ ' + moment(temp.date).format();
                    const amount = _.get(item, [product]);
                    const ob = _.set(_.omit(temp, product, ['authProp', 'date', 'branchName']) , user, amount)
                    // const obj = _.set(ob, _.get(item,['authProp']) , _.get(item, ['branchName']))
                    row = {...row, ...ob }
                    
                   // row.push(_.pick(item, [product, 'authProp']));
                }

            })
            // console.log("### Row: " + JSON.stringify(row))
            rows.push(row);
           
        })

        // console.log('Rows: ' + JSON.stringify(rows))

        // const data = [
        //               {name: 'test',test: 'test', product: {productName: 'productTest', productCategory: 'ctegotyTest'}},
        //               {name: 'test2',test: 'test2', product: {productName: 'productTest2', productCategory: 'ctegotyTest2'}}
        //             ]
        return(
            <CSVLink
                 data={rows}
                 filename={this.props.name}
                 className='btn-small green'>
                    Export
                </CSVLink>
        )
    }

}

export default CsvDownloader;
