import React from 'react';
import { CSVLink } from "react-csv";
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
        // const data = [
        //               {name: 'test',test: 'test', product: {productName: 'productTest', productCategory: 'ctegotyTest'}},
        //               {name: 'test2',test: 'test2', product: {productName: 'productTest2', productCategory: 'ctegotyTest2'}}
        //             ]
        return(
            <CSVLink
                 data={filteredList}
                 filename={this.props.name}
                 className='btn-small green'>
                    Export
                </CSVLink>
        )
    }

}

export default CsvDownloader;
