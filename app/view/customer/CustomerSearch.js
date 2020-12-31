Ext.define('Regardz.view.customer.CustomerSearch', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.customersearch',
    id: 'customersearch',
    itemid: 'customersearch',
    store: 'customer.CustomerListStore',
    requires: ['Ext.ux.IFrame', 'Ext.ux.form.SearchField'],
    initComponent: function () {
        var me = this;
        if (Ext.getCmp('customersearch')) {
            Ext.getCmp('customersearch').destroy();
        }
        me.noResize = true;
        me.title = "Customers_Title".l('SC61000');
        me.frame = true;
        me.columns = [{
            header: 'Name'.l('SC61000'),
            flex: 1,
            dataIndex: 'CompanyName',
            width: 80
        }, {
            header: 'Abbr.'.l('SC61000'),
            flex: 1,
            dataIndex: 'Abbreviation',
            width: 20
        }, {
            header: 'Contact'.l('SC61000'),
            dataIndex: 'ContactName',
            flex: 1,
            width: 80
        }, {
            header: 'Address'.l('SC61000'),
            dataIndex: 'Address',
            flex: 1,
            width: 80
        }, {
            header: 'City'.l('SC61000'),
            dataIndex: 'City',
            width: 80
        }, {
            header: 'Manager'.l('SC61000'),
            dataIndex: 'EmployeeName',
            width: 80
        }, {
            header: 'Quality rating'.l('SC61000'),
            dataIndex: 'Rating',
            width: 80
        }, {
            header: 'Industry-SIC'.l('SC61000'),
            width: 80,
            dataIndex: 'SicCodeName'
        }, {
            header: 'Cont.'.l('SC61000'),
            width: 50,
            dataIndex: 'HasContract',
            renderer: this.HasParent
        }, {
            header: 'Parent'.l('SC61000'),
            width: 50,
            dataIndex: 'HasParent',
            renderer: this.HasParent
        }, {
            header: 'Child'.l('SC61000'),
            width: 50,
            dataIndex: 'HasChild',
            renderer: this.HasParent
        },
        //{ dataIndex: 'CompanyId', width: 25, renderer: this.Company, name: 'Company' },
        //{ dataIndex: 'IndividualId', width: 25, renderer: this.Indiv, name: 'Indiv' },
        //{ dataIndex: 'IndividualId', width: 25, renderer: this.Indiv, name: 'Indiv_Overview' },
        {
        dataIndex: 'IsMergedCompany',
        width: 25,
        renderer: this.mergeCompanies,
        name: 'mergeCompanies'
    },
    {
        dataIndex: 'CompanyId',
        width: 25,
        renderer: this.Company,
        name: 'Company'
    }, {
        hidden: true,
        dataIndex: 'CompanyId'
    }, {
        hidden: true,
        dataIndex: 'IndividualId'
    }
];
    //icon-tick
    me.tbar = [{
        xtype: 'form',
        buttonAlign: 'left',
        minButtonWidth: 16,
        id: 'searchCustomer',
        width: '100%',
        border: 0,
        layout: {
            type: 'table',
            columns: 10
        },
        items: [{
            xtype: 'textfield',
            name: 'CompanyName',
            itemid: 'txtCompanyName',
            padding: '5 5 0 5',
            fieldLabel: 'Company'.l('SC61000') + ':',
            allowBlank: true,
            enableKeyEvents: true
        }, {
            xtype: 'checkbox',
            itemid: 'chkCompanyName',
            name: 'CompanyNameSrc',
            inputValue: 'true',
            enableKeyEvents: true
        }, {
            xtype: 'tbspacer',
            width: 50
        }, {
            xtype: 'combo',
            enableKeyEvents: true,
            itemid: 'companyStatusCombo',
            padding: '5 5 0 5',
            fieldLabel: 'Company status'.l('SC61000') + ':',
            name: 'CompanyStatusId',
            //emptyText: 'Select Company status'.l('SC61000'),
            allowBlank: true,
            store: Ext.create('Regardz.store.mastervalues.CompanyStatusStore'),
            queryMode: 'local',
            displayField: 'Status',
            valueField: 'CompanyStatusId'
        }, {
            xtype: 'tbspacer',
            width: 50
        }, {
            xtype: 'checkbox',
            itemid: 'chkInActive',
            name: 'InActive',
            padding: '5 5 0 5',
            labelWidth: 120,
            fieldLabel: 'Include inactive'.l('SC61000') + ':',
            inputValue: 'true',
            enableKeyEvents: true
        }, {
            xtype: 'tbspacer',
            width: 50
        }, {
            xtype: 'tbspacer',
            width: 50
        }, {
            xtype: 'tbspacer',
            width: 5
        }, {
            xtype: 'tbspacer',
            width: 50
        }, {
            xtype: 'textfield',
            name: 'Abbreviation',
            itemid: 'txtAbbreviation',
            padding: '0 5 0 5',
            fieldLabel: 'Abbreviation'.l('SC61000') + ':',
            allowBlank: true,
            enableKeyEvents: true
        }, {
            xtype: 'checkbox',
            itemid: 'chkAbbreviation',
            inputValue: 'true',
            name: 'AbbreviationSrc',
            enableKeyEvents: true
        }, {
            xtype: 'tbspacer',
            width: 50
        }, {
            xtype: 'combo',
            name: 'QualityRating',
            padding: '0 5 0 5',
            itemid: 'qualityRatingCombo',
            fieldLabel: 'Quality rating'.l('SC61000') + ':',
            //emptyText: 'Select Quality rating'.l('SC61000'),
            allowBlank: true,
            store: 'company.CompanyQualityRatingStore',
            queryMode: 'local',
            displayField: 'Description',
            valueField: 'QualityRatingId',
            enableKeyEvents: true
        }, {
            xtype: 'tbspacer',
            width: 50
        }, {
            xtype: 'checkbox',
            itemid: 'chkIncludeMerged',
            name: 'IncludeMerged',
            padding: '0 5 0 5',
            labelWidth: 120,
            fieldLabel: 'IncludeMerged'.l('SC61000') + ':',
            inputValue: 'true',
            enableKeyEvents: true
        }, {
            xtype: 'tbspacer',
            width: 50
        }, {
            xtype: 'tbspacer',
            width: 50
        }, {
            xtype: 'tbspacer',
            width: 5
        }, {
            xtype: 'tbspacer',
            width: 50
        }, {
            xtype: 'textfield',
            itemid: 'txtContact',
            name: 'Contact',
            padding: '0 5 0 5',
            fieldLabel: 'Contact'.l('SC61000') + ':',
            allowBlank: true,
            enableKeyEvents: true
        }, {
            xtype: 'checkbox',
            itemid: 'chkContact',
            inputValue: 'true',
            name: 'ContactSrc',
            enableKeyEvents: true
        }, {
            xtype: 'tbspacer',
            width: 50
        }, {
            xtype: 'combo',
            name: 'SalesManager',
            padding: '0 5 0 5',
            itemid: 'salesManagerCombo',
            fieldLabel: 'Sales manager'.l('SC61000') + ':',
            //emptyText: 'Select Sales manager'.l('SC61000'),
            allowBlank: true,
            store: 'customer.EmployeeStore',
            queryMode: 'local',
            displayField: 'FirstName',
            valueField: 'UserId',
            enableKeyEvents: true,
            listConfig: {
                getInnerTpl: function () {
                    return '{FirstName} {LastName}';
                }
            }
        }, {
            xtype: 'tbspacer',
            width: 50
        }, {
            xtype: 'checkbox',
            itemid: 'chkHasParent',
            name: 'HasParent',
            padding: '0 5 0 5',
            labelWidth: 120,
            fieldLabel: 'Has parent'.l('SC61000') + ':',
            inputValue: 'true',
            enableKeyEvents: true
        }, {
            xtype: 'tbspacer',
            width: 50
        }, {
            xtype: 'tbspacer',
            width: 50
        }, {
            xtype: 'tbspacer',
            width: 5
        }, {
            xtype: 'tbspacer',
            width: 50
        }, {
            xtype: 'textfield',
            itemid: 'txtCity',
            name: 'City',
            padding: '0 5 0 5',
            fieldLabel: 'City'.l('SC61000') + ':',
            allowBlank: true,
            colspan: 2,
            enableKeyEvents: true
        }, {
            xtype: 'tbspacer',
            width: 50
        }, {
            xtype: 'combo',
            name: 'MarketSegment',
            padding: '0 5 0 5',
            itemid: 'marketSegmentCombo',
            fieldLabel: 'Market segment'.l('SC61000') + ':',
            //emptyText: 'Select Market segment'.l('SC61000'),
            allowBlank: true,
            store: 'mastervalues.MarketSourceStore',
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'MarketSourceId',
            enableKeyEvents: true
        }, {
            xtype: 'tbspacer',
            width: 50
        }, {
            xtype: 'checkbox',
            itemid: 'chkHasChild',
            name: 'HasChild',
            padding: '0 5 0 5',
            labelWidth: 120,
            fieldLabel: 'Has child'.l('SC61000') + ':',
            inputValue: 'true',
            enableKeyEvents: true
        }, {
            xtype: 'tbspacer',
            width: 50
        }, {
            xtype: 'tbspacer',
            width: 50
        }, {
            xtype: 'tbspacer',
            width: 5
        }, {
            xtype: 'tbspacer',
            width: 50
        }, {
            xtype: 'combo',
            fieldLabel: 'Country'.l('SC61000') + ':',
            itemid: 'countryCombo',
            colspan: 2,
            name: 'Country',
            padding: '0 5 0 5',
            //emptyText: 'Select Country'.l('SC61000'),
            allowBlank: true,
            store: 'common.CountryStore',
            queryMode: 'local',
            displayField: 'CountryName',
            valueField: 'CountryId',
            enableKeyEvents: true
        }, {
            xtype: 'tbspacer',
            width: 50
        }, {
            xtype: 'combo',
            padding: '0 5 0 5',
            colspan: 2,
            itemid: 'industrySICCombo',
            fieldLabel: 'Industry-SIC'.l('SC61000') + ':',
            name: 'IndustrySIC',
            //emptyText: 'Select Industry-SIC'.l('SC61000'),
            allowBlank: true,
            store: 'mastervalues.SicCodeStore',
            queryMode: 'local',
            displayField: 'Name',
            valueField: 'SicId',
            enableKeyEvents: true
        }, {
            xtype: 'checkbox',
            itemid: 'chkContract',
            padding: '0 5 0 5',
            labelWidth: 120,
            fieldLabel: 'Contract'.l('SC61000') + ':',
            name: 'Contract',
            inputValue: 'true',
            enableKeyEvents: true
        }, {
            xtype: 'tbspacer',
            width: 10
        }, {
            xtype: 'button',
            padding: 2,
            text: 'Search'.l('w'),
            action: 'searchCustomer'
        }, {
            xtype: 'tbspacer',
            width: 5
        }, {
            xtype: 'button',
            padding: 2,
            text: 'Reset'.l('w'),
            action: 'resetSearchCustomer'
        }, {
            xtype: 'tbspacer',
            width: 10,
            colspan: 3
        }, {
            xtype: 'combo',
            itemid: 'creditStatusCombo',
            padding: '0 5 0 5',
            fieldLabel: 'Credit status'.l('SC61000') + ':',
            colspan: 2,
            name: 'CreditStatus',
            //emptyText: 'Select Credit status'.l('SC61000'),
            allowBlank: true,
            store: 'configuration.CreditStatusStore',
            queryMode: 'local',
            displayField: 'CreditStatus',
            valueField: 'Value'
        }, {
            xtype: 'tbspacer',
            width: 10,
            colspan: 4
        }],
        buttons: [{
            text: '',
            action: 'addNewCompany',
            style: "width : 16px;",
            iconCls: 'Add_Company',
            tooltip: 'AddCompany_ToolTip'.l('SC61000')
        }, {
            text: '',
            style: "width : 16px;",
            action: 'indvProfile',
            iconCls: 'Add_Individual',
            tooltip: 'AddIndividual_ToolTip'.l('SC61000')
        }, {
            text: '',
            action: 'exprtExcel',
            style: "width : 16px;",
            iconCls: 'Export_Excel',
            tooltip: 'ExportExcel_ToolTip'.l('SC61000')
        }]
    }
		];

    me.layout = 'fit';
    me.autoScroll = true;

    me.height = 250;
    me.viewConfig = {
        forceFit: true
    };

    //    me.bbar = {
    //        xtype: 'pagingtoolbar',
    //        store: Ext.getStore('customer.CustomerListStore'),
    //        pageSize: 100,
    //        displayInfo: false,
    //        displayMsg: 'Displaying topics {0} - {1} of {2}',
    //        emptyMsg: "No topics to display"
    //    };

    me.callParent();
},

dateRenderer: function (value, metadata, record, rowIndex, colIndex, store) {
    var d = Ext.Date.parse(value, 'c');
    return Ext.util.Format.date(d, usr_dateformat);
},
ContactName: function (value, metadata, record, rowIndex, colIndex, store) {
    if (value != null) {
        metadata.tdCls = 'icon-tick';
    } else {
        // metadata.tdCls = 'icon-untick'; //icon-untick
    }
},
Company: function (value, metadata, record, rowIndex, colIndex, store) {

    if (value > 0) {
        var tooltip = 'Company Profile';
        return "<img src='public/icons/Company_Indiv.png' title='" + tooltip + "' style='cursor:pointer'>";
    } else if (value == null) {
        var tooltip = 'Individual Profile';
        return "<img src='public/icons/Company_Indiv.png' title='" + tooltip + "' style='cursor:pointer'>";
    }
},
Indiv: function (value, metadata, record, rowIndex, colIndex, store) {
    if (value > 0) {
        metadata.tdCls = 'icon-tick';
    } else if (value == null) {
        metadata.tdCls = 'icon-tick';
    }
},
HasParent: function (value, metadata, record, rowIndex, colIndex, store) {
    if (value == true) {
        metadata.tdCls = 'icon-tick';
    } else {
        //metadata.tdCls = 'icon-tick'; //icon-untick
    }
},
mergeCompanies: function (value, metadata, record, rowIndex, colIndex, store) {
    var objStore = store.data.items[rowIndex].data;
    if (objStore.CompanyId == null || objStore.CompanyId == undefined || objStore.CompanyId == 0) return;
    if (value == null || value == false) {
        var tooltipText = 'Merge Companies';
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        //metadata.tdCls = 'icon-Company_Merge-disable';
        /// Use below class when we want Enable company merge -By MM
        metadata.tdCls = 'icon-Company_Merge';
    }
}
});