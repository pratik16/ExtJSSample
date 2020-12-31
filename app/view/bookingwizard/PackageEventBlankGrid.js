Ext.define('Regardz.view.bookingwizard.PackageEventBlankGrid', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.packageeventblankgrid',

    loadMask: true,

    padding: '10',

    initComponent: function () {

        var me = this;
        me.title = 'Events';
        me.autoHeight = true;
        me.columns = [
            { header: 'Item'.l('SC54000'), dataIndex: 'Item', flex: 1 },
            { header: 'Start'.l('SC54000'), dataIndex: 'Start', flex: 1 },
            { header: 'End'.l('SC54000'), dataIndex: 'End', flex: 1 },
            { header: 'Price'.l('SC54000'), dataIndex: 'Price', flex: 1 },
            { header: 'Quantity'.l('SC54000'), dataIndex: 'Quantity', flex: 1 },
            { header: 'Red.%'.l('SC54000'), dataIndex: 'RedPercent', flex: 1 },
            { header: 'Red.'.l('SC54000'), dataIndex: 'Red', flex: 1 },
            { header: 'Group name'.l('SC54000'), dataIndex: 'groupName', flex: 1 },
            { dataIndex: 'ItemId', renderer: this.deteleItem, align: 'center', width: 25, name: 'ItemDelete', hideable: false },
            { dataIndex: 'ItemId', renderer: this.editItem, align: 'center', width: 25, name: 'ItemEdit', hideable: false },
            { hidden: true, dataIndex: 'ItemId', align: 'center', hideable: false }
        ];

      /*  me.tbar = [{
            xtype: 'button',
            action: 'addPackageEventA',
            iconCls: 'new',
            tooltip: 'Add event'.l('SC54000')
        }, {
            xtype: 'button',
            action: 'addItem',
            iconCls: 'icon-tentitive',
            tooltip: 'Make tentitive'.l('SC54000')
        }, {
            xtype: 'button',
            action: 'addItem',
            iconCls: 'icon-yes',
            tooltip: 'Make Definite'.l('SC54000')
        }, {
            xtype: 'button',
            action: 'addItem',
            iconCls: 'icon-stop',
            tooltip: 'Cancel'.l('SC54000')
        }, {
            xtype: 'button',
            action: 'addItem',
            iconCls: 'icon-documentadd',
            tooltip: 'Edit Remark'.l('SC54000')
        }];
        */
        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            displayInfo: true,
            emptyMsg: "No data to display".l("g")
        };

        me.callParent();
    },

    editItem: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Update Item".l('SC54000');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-documentadd';
    },

    deteleItem: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Delete Item".l('SC54000');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-delete';
    }

});