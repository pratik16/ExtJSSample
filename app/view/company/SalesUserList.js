Ext.define('Regardz.view.company.SalesUserList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.salesuserlist',
    store: 'company.SalesUserStore',

    requires: [
		'Ext.ux.form.SearchField'
	],

    loadMask: true,

    initComponent: function () {

        var me = this;
        me.autoHeight = true;
        //me.title = 'Select User_SCCOD'.l('SC61140');
        me.columns = [{
            header: 'Name'.l('SC61140'),
            dataIndex: 'FirstName',
            renderer: this.fullUserName,
            flex: 1
        }, {
            header: 'Abbriviation'.l('SC61140'),
            dataIndex: 'Initial',
            flex: 1
        },
        {
            header: 'Gender'.l('SC61140'),
            dataIndex: 'Name',
            flex: 1
        }, {
            header: 'E-mail'.l('SC61140'),
            dataIndex: 'Email',
            flex: 1
        }, {
            dataIndex: 'UserId',
            renderer: this.selectSalesUser,
            align: 'center',
            width: 25,
            name: 'SelectSalesUser',
            action: 'SelectSalesUser',
            hideable: false
        }, {
            hidden: true,
            dataIndex: 'UserId',
            hideable: false
        }];

        me.tbar = ['->', {
            xtype: 'button',
            iconCls: 'filter',
            disabled: true
        }, {
            xtype: 'searchfield',
            store: Ext.getStore('company.SalesUserStore'),
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

    selectSalesUser: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = 'Click here for Select User'.l('SC61140');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'selectUser';
    },
    fullUserName: function (value, metadata, record, rowIndex, colIndex, store) {
        //console.log(record.data);
        var newVal = value + ' ' + record.data.LastName;
        return newVal;
    }

});