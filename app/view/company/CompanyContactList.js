Ext.define('Regardz.view.company.CompanyContactList', {
    extend: 'Ext.grid.Panel',
    id: 'gridCompanyContact',
    alias: 'widget.companycontactlist',
    store: 'company.CompanyContactListStore',
    loadMask: true,

    viewConfig: {
        markDirty: false
    },


    title: 'Company Contact'.l('SC51100'),

    padding: '10px 0 0 0',

    initComponent: function () {

        var me = this;
        me.columns = [
            { dataIndex: 'Checked', renderer: this.radioRender2, align: 'center', width: 25, name: 'Checked', hideable: false },
            { header: 'Individual Name'.l('SC51100'), dataIndex: 'IndividualName', flex: 1 },
            { header: 'First Name'.l('SC51100'), dataIndex: 'FirstName', flex: 1 },
            { header: 'Last Name'.l('SC51100'), dataIndex: 'Email', flex: 1 },
            { hidden: true, dataIndex: 'IndividualId', hideable: false },
            { hidden: true, dataIndex: 'Phone', hideable: false }
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
            emptyMsg: "No data to display".l("g")
        };

        me.callParent();
    },

    radioRender2: function (v, meta, record, rowIdx, col_idx, store) {
        return '<input ' + (record.data.Checked == true ? 'checked=checked' : '') + ' onclick="setDefaultCompanyContact(' + rowIdx + ',\'' + store.storeId + '\')" type=radio name="rgrp' + this.body.id + '">';//myEl //         
    }
});