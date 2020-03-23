import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { GridOptions } from "ag-grid-community";

import 'ag-grid-enterprise';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html"
})
export class AppComponent implements OnInit {
  title = "app";

  columnDefs = [
    { headerName: "Make", rowGroup: true, field: "make", sortable: true, filter: true },
    { headerName: "Model", field: "model", sortable: true, filter: true },
    { headerName: "Price", field: "price", sortable: true, filter: true }
  ];

  rowData: any;

  gridOptions: GridOptions = {
    columnDefs: this.columnDefs
  };

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.rowData = this.http.get("https://api.myjson.com/bins/15psn9");

  }
}
