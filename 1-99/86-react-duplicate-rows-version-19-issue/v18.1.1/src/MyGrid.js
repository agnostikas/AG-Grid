import React from 'react';
import { AgGrid } from 'ag-grid';
import { AgGridReact } from 'ag-grid-react';
import _ from 'lodash';
import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import 'ag-grid-enterprise';


export default class MyGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [],
      rowDatas: [],
      restoreDefault: false,
      entityName: '',
      ids: []
    };
  }


  componentDidMount = () => {
    this.setState({ rowDatas: this.props.rowDatas });
  }

  onGridReady = params => {
    this.gridApi = params.api
  }

  getRowNodeId = (data) => {
    return data.uniqueId;
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ rowDatas: nextProps.rowDatas }, () => {
      //NO NEED TO DO THIS!
      this.gridApi.setRowData(nextProps.rowDatas);
    });
  }


  render() {
    return (
      <div className="ag-theme-balham" style={{ width: '100vw', height: '100vh' }}>
        <AgGridReact
          // properties
          columnDefs={[{
            field: 'test'
          }]}
          rowData={this.state.rowDatas}
          showToolPanel={false}
          enableSorting
          enableColResize
          enableFilter
          onGridReady={this.onGridReady}
          onRowDoubleClicked={this.openEditObjectModal}
          groupUseEntireRow
          processRowPostCreate={this.processRowPostCreate}
          rememberGroupStateWhenNewData
          deltaRowDataMode
          getRowNodeId={this.getRowNodeId}
          onCellClicked={this.handleTabClicked} />
      </div>

    );
  }
}