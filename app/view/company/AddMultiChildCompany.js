Ext.define('Regardz.view.company.AddMultiChildCompany', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.addmultichildcompany',
    store: 'company.AddChildCompanyStore',
    itemid: 'AddMultiChildCompany',
    loadMask: true,

    requires: ['Ext.ux.form.SearchField', 'Regardz.view.common.CheckboxRow'],

    initComponent: function () {

        var me = this;
        height = 400;
        me.border = false;
        me.columns = [
        //{ dataIndex: 'CompanyId', renderer: this.radioColumn, align: 'center', width: 25 },
                {width: 30, dataIndex: 'Checked', xtype: 'checkboxrow' },
                 { header: 'Company'.l('SC61130'), dataIndex: 'CompanyName', flex: 1 }, //.l('SC61300')
                {header: 'Address'.l('SC61130'), dataIndex: 'Address', width: 250 }, //.l('SC61300')
                {header: 'Postcode'.l('SC61130'), dataIndex: 'PinCode', width: 50 }, //.l('SC61300')
                {header: 'City'.l('SC61130'), dataIndex: 'City', width: 100 },
                { dataIndex: 'HasParent', renderer: this.IsMergeCmp, align: 'center', width: 25},
                { dataIndex: 'HasContract', renderer: this.HasContract, align: 'center', width: 25 },
                { hidden: true, dataIndex: 'ContractBedroomId', align: 'center'},
                { hidden: true, dataIndex: 'CompanyId', align: 'center' }
        ];

        me.tbar = ['->', {
            xtype: 'button',
            iconCls: 'filter',
            disabled: true
        }, {
            xtype: 'searchfield',
            store: Ext.getStore('company.AddChildCompanyStore'),
            iconCls: 'filter',
            paramName: 'searchString'
        }];

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            displayInfo: true,
            emptyMsg: "No data to display".l("g")
        };

        me.callParent();
    },

    ContractBREdit: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Update Bedroom".l('SC61200');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-edit';

    },
    ManageChild: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value == true)
            return "Yes".l("g");
        else
            return "No".l("g");
    },
    ContactName: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value != null) {
            metadata.tdCls = 'icon-document';
        }
    },
    ContractBRDelete: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Delete Bedroom".l('SC61200');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-edit';
    },
    addItem: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Add".l('SC61200');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-add-menu';
    },
    radioColumn: function (v, meta, record, rowIdx, col_idx, store) {
        return '<input ' + (record.data.Checked == true ? 'checked=checked' : '') + ' onclick="setChildCompanyForCustomer(' + rowIdx + ',\'' + store.storeId + '\')" type=radio name="rgrp' + this.body.id + '">'//myEl //
    },
    IsMergeCmp: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.data.HasParent == true || record.data.HasChild) {
            metadata.tdCls = 'show_mergeCmp';
        }
    },
    HasContract: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.data.HasContract == true) {
            metadata.tdCls = 'show_contract';
        }
    }
});