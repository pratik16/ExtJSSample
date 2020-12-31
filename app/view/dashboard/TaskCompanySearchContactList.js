Ext.define('Regardz.view.dashboard.TaskCompanySearchContactList', {
    extend: 'Ext.grid.Panel',
    //id: 'gridCompanySearch',
    alias: 'widget.taskcompanysearchcontactlist',
    store: 'bookingwizard.CompanySearchListStore',
    loadMask: true,
    itemid: 'companySearchContactList',
    title: 'Company Search'.l('SC51100'),
    viewConfig: {
        markDirty: false
    },
    initComponent: function () {

        if (Ext.getCmp('button_1'))
            Ext.getCmp('button_1').destroy();        
        
        var me = this;
        me.noResize = true;
        me.columns = [
            { dataIndex: 'Checked', renderer: this.radioRender, align: 'center', width: 25, name: 'Checked', hideable: false },
            { header: 'Company'.l('SC51100'), dataIndex: 'CompanyName', flex: 1 },
            { header: 'Address'.l('SC51100'), dataIndex: 'Address', flex: 1 },
            { header: 'Postcode'.l('SC51100'), dataIndex: 'PinCode', flex: 1 },
            { header: 'City'.l('SC51100'), dataIndex: 'City', flex: 1 },
            { dataIndex: 'HasParent', renderer: this.hasCompanyRelationship, align: 'center', width: 25, name: 'HasCompanyRelationship', hideable: false },
            { dataIndex: 'HasContract', renderer: this.hasContact, align: 'center', width: 25, name: 'hasContact', hideable: false },
            { hidden: true, dataIndex: 'CompanyId', align: 'center', hideable: false }
            ];

        //        var filterField = Ext.create('Ext.form.TextField', {
        //            xtype: 'textfield',
        //            name: 'filterContact',
        //            itemid: 'fieldFilterCompanies',
        //            selectOnFocus: true
        //        });
        //        var buttonSearch = Ext.create('Ext.Button', {
        //            id: 'button_1',
        //            scale: 'small',
        //            action: 'searchCompanyButtonAction',
        //            iconCls: 'search-icon',
        //            width: 20,
        //            iconAlign: 'left'
        //        });
        me.tbar = ['->', {
            xtype: 'button',
            iconCls: 'filter',
            disabled: true
        }, {
            xtype: 'searchfield',
            store: Ext.getStore('bookingwizard.CompanySearchListStore'),
            iconCls: 'filter',
            itemid: 'fieldFilterCompanies',
            paramName: 'searchParam'
        }];

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            //pageSize: 5,
            displayInfo: true,
            //displayMsg: 'Displaying topics {0} - {1} of {2}',
            emptyMsg: "No topics to display".l('g')
        };

        me.callParent();
    },

    hasCompanyRelationship: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.data.HasChild || record.data.HasParent) {
            //            var tooltipText = "".l('SC51100');
            //            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
            metadata.tdCls = 'icon-companyRelation';
        }
    },

    hasContact: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value) {
            //var tooltipText = "".l('SC51100');
            //metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
            metadata.tdCls = 'contract';
        }
        //        else {
        //            metadata.tdCls = 'icon-add-menu-disable';
        //        }
    },

    radioRender: function (v, meta, record, rowIdx, col_idx, store) {
        return '<input ' + (record.data.Checked == true ? 'checked=checked' : '') + ' onclick="setDefaultCompanyContactDashboard(' + rowIdx + ',\'' + store.storeId + '\')" type=radio name="rgrp' + this.body.id + '">'//myEl // 
    }
});