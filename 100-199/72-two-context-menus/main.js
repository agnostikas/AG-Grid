var columnDefs = [
    { headerName: 'Athlete', field: 'athlete', width: 150, cellRenderer: 'athleteCellRenderer' },
    { headerName: 'Age', field: 'age', width: 90 },
    { headerName: 'Country', field: 'country', width: 120 },
    { headerName: 'Year', field: 'year', width: 90 },
    { headerName: 'Date', field: 'date', width: 110 },
    { headerName: 'Sport', field: 'sport', width: 110 },
    { headerName: 'Gold', field: 'gold', width: 100 },
    { headerName: 'Silver', field: 'silver', width: 100 },
    { headerName: 'Bronze', field: 'bronze', width: 100 },
    { headerName: 'Total', field: 'total', width: 100 }
];

var gridOptions = {
    columnDefs: columnDefs,
    enableRangeSelection: true,
    getContextMenuItems: getContextMenuItems,
    allowContextMenuWithControlKey: true,
    components: {
        athleteCellRenderer: AthleteCellRenderer
    },
    // onCellClicked: params => {
    //     params.api.contextMenuFactory.showMenu(params.node, params.column, params.value, params.event)
    // },
    // onCellContextMenu: params => {
    //     params.api.contextMenuFactory.hideActiveMenu()
    // }
};

function getContextMenuItems(params) {
    console.log(params)
    var result = [
        {
            // custom item
            name: 'Alert ' + params.value,
            action: function () {
                window.alert('Alerting about ' + params.value);
            },
            cssClasses: ['redFont', 'bold']
        },
        {
            // custom item
            name: 'Always Disabled',
            disabled: true,
            tooltip: 'Very long tooltip, did I mention that I am very long, well I am! Long!  Very Long!'
        },
        {
            name: 'Country',
            subMenu: [
                {
                    name: 'Ireland',
                    action: function () {
                        console.log('Ireland was pressed');
                    },
                    icon: ('ie')
                },
                {
                    name: 'UK',
                    action: function () {
                        console.log('UK was pressed');
                    },
                    icon: ('gb')
                },
                {
                    name: 'France',
                    action: function () {
                        console.log('France was pressed');
                    },
                    icon: ('fr')
                }
            ]
        },
        {
            name: 'Person',
            subMenu: [
                {
                    name: 'Niall',
                    action: function () {
                        console.log('Niall was pressed');
                    }
                },
                {
                    name: 'Sean',
                    action: function () {
                        console.log('Sean was pressed');
                    }
                },
                {
                    name: 'John',
                    action: function () {
                        console.log('John was pressed');
                    }
                },
                {
                    name: 'Alberto',
                    action: function () {
                        console.log('Alberto was pressed');
                    }
                },
                {
                    name: 'Tony',
                    action: function () {
                        console.log('Tony was pressed');
                    }
                },
                {
                    name: 'Andrew',
                    action: function () {
                        console.log('Andrew was pressed');
                    }
                },
                {
                    name: 'Kev',
                    action: function () {
                        console.log('Kev was pressed');
                    }
                },
                {
                    name: 'Will',
                    action: function () {
                        console.log('Will was pressed');
                    }
                },
                {
                    name: 'Armaan',
                    action: function () {
                        console.log('Armaan was pressed');
                    }
                }
            ]
        }, // built in separator
        'separator',
        {
            // custom item
            name: 'Windows',
            shortcut: 'Alt + W',
            action: function () {
                console.log('Windows Item Selected');
            },
        },
        {
            // custom item
            name: 'Mac',
            shortcut: 'Alt + M',
            action: function () {
                console.log('Mac Item Selected');
            },
        }, // built in separator
        'separator',
        {
            // custom item
            name: 'Checked',
            checked: true,
            action: function () {
                console.log('Checked Selected');
            },
        }, // built in copy item
        'copy'
    ];

    return result;
}

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);

    // do http request to get our sample data - not using any framework to keep the example self contained.
    // you will probably use a framework like JQuery, Angular or something else to do your HTTP calls.
    var httpRequest = new XMLHttpRequest();
    httpRequest.open('GET', 'https://raw.githubusercontent.com/ag-grid/ag-grid/master/packages/ag-grid-docs/src/olympicWinners.json');
    httpRequest.send();
    httpRequest.onreadystatechange = function () {
        if (httpRequest.readyState == 4 && httpRequest.status == 200) {
            var httpResult = JSON.parse(httpRequest.responseText);
            gridOptions.api.setRowData(httpResult);
        }
    };
});

function AthleteCellRenderer() { }

AthleteCellRenderer.prototype.init = function (params) {
    this.eGui = document.createElement('div');
    this.eGui.className = 'athlete-cell-renderer';
    let span = document.createElement('span');
    span.textContent = params.value;
    this.eGui.appendChild(span);
    let icon = document.createElement('icon');
    icon.addEventListener('click', event => {
        params.api.contextMenuFactory.hideActiveMenu();
        params.api.contextMenuFactory.showMenu(params.node, params.column, params.value, event, 'hello world');
    });
    icon.className = "fas fa-ellipsis-v";
    this.eGui.appendChild(icon);
}

AthleteCellRenderer.prototype.getGui = function () {
    return this.eGui;
}