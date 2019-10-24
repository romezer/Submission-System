import React from 'react';
import { CSVLink, CSVDownload } from "react-csv";
import _ from 'lodash';

class CsvDownloader extends React.Component{


    render(){
        const filteredList = [];
         this.props.list.map( item =>{
            const record = _.omit(item, ['_id', 'userId', 'date', 'authProp']);
            const rec = {
                Branch: item.authProp,
                Date: item.date
            }
            filteredList.push({...rec, ...record})
        })

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
