Ext.define('Regardz.view.dashboard.AlertList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.alertlist',
    store: 'dashboard.AlertStore',
    height: parseInt(Ext.getBody().getViewSize().height * (0.27)),
    modal: true,
    requires: [
		'Ext.ux.form.SearchField'
	],
    initComponent: function () {
        var me = this;
        me.title = 'Alert'.l('SC80000');
        me.collapsible = true;
        me.noResize = true;
        me.itemid = 'alertlist';
        me.frame = true;

        me.columns = [
          { xtype: 'rownumberer' },
        {
            header: 'Booking'.l('SC81000'),
            dataIndex: 'BookingNumber',
            flex: 0.1,
            align: 'center'
        }, {
            header: 'Action'.l('SC61140'),
            dataIndex: 'AlertMessage',
            flex: 0.6,
            align: 'left'
        }, {
            header: 'User'.l('SC80000'),
            dataIndex: 'UserName',
            flex: 0.1,
            align: 'left'
        }, {
            dataIndex: 'AlertId',
            renderer: this.editIcon,
            name: 'editAlert',
            align: 'center',
            width: 25
        }];
        me.tbar = [/*'->', {
            xtype: 'button',
            iconCls: 'filter',
            disabled: true
        }, {
            xtype: 'textfield',
            name: 'searchStringAlert',
            itemid: 'searchStringAlert',
            enableKeyEvents: true
        }, {
            xtype: 'button',
            iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
            action: 'clearAlertFilter',
            hidden: true
        }, {
            xtype: 'button',
            action: 'searchAlert',
            iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
        }*/
        '->', {
            xtype: 'button',
            iconCls: 'filter',
            disabled: true
        }, {
            xtype: 'searchfield',
            store: Ext.getStore('dashboard.AlertStore'),
            iconCls: 'filter',
            paramName: 'searchString'
        }];
        me.layout = 'fit';
        me.callParent();
    },
    editIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        //this.colorRender(value, metadata, record, rowIndex, colIndex, store);
        var tooltipText = "Edit".l('g');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-edit';
    }
});
