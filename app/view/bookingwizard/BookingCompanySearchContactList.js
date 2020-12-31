Ext.define('Regardz.view.bookingwizard.BookingCompanySearchContactList', {
    extend: 'Ext.grid.Panel',
    //id: 'gridCompanySearch',
    alias: 'widget.bookingcompanysearchcontactlist',
    store: 'bookingwizard.CompanySearchListStore',
    loadMask: true,
    title: 'Company Search'.l('SC51100'),
    iconCls: 'icon-company',
    viewConfig: {
        markDirty: false
    },

    initComponent: function () {

        if (Ext.getCmp('button_1')) {
            Ext.getCmp('button_1').destroy();
        }

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

        var filterField = Ext.create('Ext.form.TextField', {
            xtype: 'textfield',
            name: 'filterContact',
            itemid: 'fieldFilterCompanies',
            selectOnFocus: true
        });
        var buttonSearch = Ext.create('Ext.Button', {
            id: 'button_1',
            scale: 'small',
            action: 'searchCompanyButtonAction',
            tooltip: 'Search/Add company'.l('SC51000'),
            iconCls: 'search-icon',
            width: 20,
            iconAlign: 'left'
        });
        me.tbar = [{
            xtype: 'button',
            action: 'addCompany',
            iconCls: 'new',
            text: 'Add Company'.l('SC51100'),
            tooltip: 'Search/Add company'.l('SC51100')
        }, "->", filterField, buttonSearch];

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            displayInfo: true,
            itemid: 'bbarCompanySearch',
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
        return '<input ' + (record.data.Checked == true ? 'checked=checked' : '') + ' onclick="setDefaultBookingCompany(' + rowIdx + ',\'' + store.storeId + '\')" type=radio name="rgrp' + this.body.id + '">'//myEl // 
    }
});
