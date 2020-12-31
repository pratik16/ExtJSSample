Ext.define('Regardz.view.dashboard.TaskCompanyContactList', {
    extend: 'Ext.grid.Panel',
    //  id: 'gridCompanyContact',
    itemid: 'companyContactList',
    alias: 'widget.taskcompanycontactlist',
    store: 'bookingwizard.CompanyContactListStore',
    loadMask: true,

    viewConfig: {
        markDirty: false
    },

    title: 'Company Contact'.l('SC51100'),
    padding: '10px 0 0 0',
    initComponent: function () {

        if (Ext.getCmp('button_2'))
            Ext.getCmp('button_2').destroy();

        var me = this;
        me.noResize = true;
        me.columns = [
            { dataIndex: 'Checked', renderer: this.radioRender2, align: 'center', width: 25, name: 'Checked', hideable: false },
            { header: 'Salutation'.l('SC51100'), dataIndex: 'Prefix', flex: 1 },
            { header: 'Initials'.l('SC51100'), dataIndex: 'FirstName', flex: 1 },
            { header: 'Surname'.l('SC51100'), dataIndex: 'LastName', flex: 1 },
            { header: 'Email address'.l('SC51100'), dataIndex: 'Email', flex: 1 },
            { header: 'Phone'.l('SC51100'), dataIndex: 'Phone', flex: 1 },
            { hidden: true, dataIndex: 'IndividualId', hideable: false },
            { hidden: true, dataIndex: 'IndividualName', name: 'IndividualName', hideable: false }
        ];

        //        var buttonSearch = Ext.create('Ext.Button', {
        //            id: 'button_2',
        //            scale: 'small',
        //            action: 'searchIndividualButtonAction',
        //            iconCls: 'search-icon',
        //            width: 20,
        //            iconAlign: 'left'
        //        });
        //        var filterField = Ext.create('Ext.form.TextField', {
        //            xtype: 'textfield',
        //            name: 'filterContact',
        //            itemid: 'fieldFilterIndividual',
        //            selectOnFocus: true
        //        });
        me.tbar = ['->', {
            xtype: 'button',
            iconCls: 'filter',
            disabled: true
        }, {
            xtype: 'searchfield',
            store: Ext.getStore('bookingwizard.CompanyContactListStore'),
            iconCls: 'filter',            
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

    radioRender2: function (v, meta, record, rowIdx, col_idx, store) {
        return '<input ' + (record.data.Checked == true ? 'checked=checked' : '') + ' onclick="setDefaultBookingCompanyContact(' + rowIdx + ',\'' + store.storeId + '\')" type=radio name="rgrp' + this.body.id + '">'//myEl //         
    }
});