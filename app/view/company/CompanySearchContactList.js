Ext.define('Regardz.view.company.CompanySearchContactList', {
    extend: 'Ext.grid.Panel',
    id: 'gridCompanySearch',
    alias: 'widget.companysearchcontactlist',
    store: 'company.CompanySearchListStore',
    loadMask: true,

    title: 'Company Search'.l('SC51100'),


    viewConfig: {
        markDirty: false
    },

    initComponent: function () {

        var me = this;
        //me.selModel = sm;
        me.columns = [
            { dataIndex: 'Checked', renderer: this.radioRender, align: 'center', width: 25, name: 'Checked', hideable: false },
            { header: 'Company'.l('SC51100'), dataIndex: 'CompanyName', flex: 1 },
            { header: 'Address'.l('SC51100'), dataIndex: 'Address1', flex: 1 },
            { header: 'Postcode'.l('SC51100'), dataIndex: 'Pincode', flex: 1 },
            { header: 'City'.l('SC51100'), dataIndex: 'City', flex: 1 },
            { dataIndex: 'HasParent', renderer: this.hasCompanyRelationship, align: 'center', width: 25, name: 'HasCompanyRelationship', hideable: false },
            { dataIndex: 'HasContract', renderer: this.hasContact, align: 'center', width: 25, name: 'hasContact', hideable: false },
            { hidden: true, dataIndex: 'CompanyId', align: 'center', hideable: false }
        ];

        me.tbar = [{
            xtype: 'button',
            action: 'addCompany',
            iconCls: 'new',
            text: 'Add Company'.l('SC51100')
        }];

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            displayInfo: true,
            emptyMsg: "No data to display".l("g")
        };

        me.callParent();
    },

    //    deteleEvents: function (value, metadata, record, rowIndex, colIndex, store) {
    //        var tooltipText = "Delete Event".l('SC20411');
    //        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
    //        metadata.tdCls = 'icon-dele';
    //    },

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
        return '<input ' + (record.data.Checked == true ? 'checked=checked' : '') + ' onclick="setDefaultCompany(' + rowIdx + ',\'' + store.storeId + '\')" type=radio name="rgrp' + this.body.id + '">'; //myEl // 
    }
});
