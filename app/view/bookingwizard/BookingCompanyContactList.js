Ext.define('Regardz.view.bookingwizard.BookingCompanyContactList', {
    extend: 'Ext.grid.Panel',
    //  id: 'gridCompanyContact',
    itemid: 'gridCompanyContact',
    alias: 'widget.bookingcompanycontactlist',
    store: 'bookingwizard.CompanyContactListStore',
    maxHeight: 300,
    loadMask: true,
    viewConfig: {
        markDirty: false
    },
    title: 'Company Contact'.l('SC51100'),
    iconCls: 'icon-contact',

    padding: '10px 0 0 0',

    initComponent: function () {

        if (Ext.getCmp('button_2')) {
            Ext.getCmp('button_2').destroy();
        }

        var me = this;
        me.noResize = true;

        me.columns = [
            { dataIndex: 'Checked', renderer: this.radioRender2, align: 'center', width: 25, name: 'Checked', hideable: false },
            { header: 'Salutation'.l('SC51100'), dataIndex: 'Prefix', flex: 1 },
            { header: 'Initials'.l('SC51100'), dataIndex: 'FirstName', flex: 1 },
            { header: 'Surname'.l('SC51100'), dataIndex: 'LastName', flex: 1 },
            { header: 'Email address'.l('SC51100'), dataIndex: 'Email', flex: 1 },
            { header: 'Phone'.l('SC51100'), renderer: this.phoneRender, flex: 1 },
            { hidden: true, dataIndex: 'IndividualId', hideable: false },
            { header:'PhoneType', dataIndex: 'PhoneType', flex:1 },
            { hidden: true, dataIndex: 'IndividualName', name: 'IndividualName', hideable: false }

        ];

        var buttonSearch = Ext.create('Ext.Button', {
            id: 'button_2',
            scale: 'small',
            action: 'searchIndividualButtonAction',
            itemid: 'buttonSearchIndividual',
            iconCls: 'search-icon',
            tooltip: 'Search/Add individual'.l('SC51000'),
            width: 20,
            iconAlign: 'left'
        });
        var filterField = Ext.create('Ext.form.TextField', {
            xtype: 'textfield',
            name: 'filterContact',
            itemid: 'fieldFilterIndividual',
            selectOnFocus: true
        });
        me.tbar = [{
            xtype: 'button',
            action: 'addIndividual',
            itemid: 'buttonAddIndividual',
            iconCls: 'new',
            text: 'Add Individual'.l('SC51100'),
            tooltip: 'Search/Add individual'.l('SC51000')
        }, "->", filterField,
        buttonSearch];

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            displayInfo: true,
            emptyMsg: "No data to display".l('g')
        };

        me.callParent();
    },

    phoneRender: function (v, meta, record, rowIdx, col_idx, store) {
       
        if (record.data.Mobile != null && record.data.Mobile != '') {
            record.data.PhoneType = 'Mobile';
            return record.data.Mobile;
        }
        else if (record.data.Direct != null && record.data.Direct != '') {
            record.data.PhoneType = 'Direct';
            return record.data.Direct;
        }
        else if (record.data.Phone != null && record.data.Phone != '') {
            record.data.PhoneType = 'Phone';
            return record.data.Phone;
        }
        record.data.PhoneType = 'Direct';
        return '';
    },

    radioRender2: function (v, meta, record, rowIdx, col_idx, store) {
        return '<input ' + (record.data.Checked == true ? 'checked=checked' : '') + ' onclick="setDefaultBookingCompanyContact(' + rowIdx + ',\'' + store.storeId + '\')" type=radio name="rgrp' + this.body.id + '">'//myEl //         
    }
});