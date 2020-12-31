Ext.define('Regardz.view.bookingwizard.BWContactList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.BWContactList',
    store: 'bookingwizard.CompanyContactListStore',
    loadMask: true,
    initComponent: function () {

        var me = this;

        me.title = 'Custom data list';
        me.columns =
            [{ dataIndex: 'Checked', renderer: this.radioRender2, align: 'center', width: 25, name: 'Checked', hideable: false },
             { header: 'Salutation'.l('SC51100'), dataIndex: 'Prefix', align: 'center', hideable: false, flex: 1 },
             { header: 'Initials'.l('SC51100'), dataIndex: 'FirstName', align: 'center', hideable: false, flex: 1 },
             { header: 'Surname'.l('SC51100'), dataIndex: 'LastName', align: 'center', hideable: false, flex: 1 },
             { header: 'Email address'.l('SC51100'), dataIndex: 'Email', align: 'center', hideable: false, flex: 1 },
             { header: 'Phone'.l('SC51100'), dataIndex: 'Phone', align: 'center', hideable: false, flex: 1 },
             { hidden: true, dataIndex: 'IndividualId', hideable: false },
             { hidden: true, dataIndex: 'IndividualName', name: 'IndividualName', hideable: false }
            ];
        me.tbar = [{
            xtype: 'button',
            action: 'addIndividual',
            iconCls: 'new',
            text: 'Add Individual'.l('SC51100')
        }];

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            displayInfo: true,
            pageSize: 5,
            emptyMsg: "No data to display".l("g")
        };

        console.log(me.columns);
        me.callParent();
    },
    radioRender2: function (v, meta, record, rowIdx, col_idx, store) {
        return '<input ' + (record.data.Checked == true ? 'checked=checked' : '') + ' onclick="setDefaultBookingCompanyContact(' + rowIdx + ',\'' + store.storeId + '\')" type=radio name="rgrp' + this.body.id + '">'//myEl //         
    }
});