Ext.define('Regardz.view.extraz.WebshopProductList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.webshopproductlist',
    itemid: 'webshopproductlistgrid',
    store: 'extraz.WebshopProductStore',
    requires: [
		'Ext.ux.form.SearchField'
	],
    loadmask: true,
    initComponent: function () {
        var me = this;

        me.title = 'Product'.l('SC37100');

        me.autoHeight = true;
        me.disableitems = false;

        var newObj = new Object();
        newObj.moduleName = 'EXTR001';

        if (Utils.ValidateUserAccess(newObj)) {
           // me.disableitems = false;            
        }

        me.columns = [{
            header: 'Name'.l('SC37100'),
            dataIndex: 'Item',
            flex: 1
        }, {
            header: 'Intro'.l('SC37100'),
            dataIndex: 'Intro',
            flex: 1
        }, {
            header: 'Extraaz'.l('SC37100'),
            dataIndex: 'Point',
            flex: 1
        }, {
            dataIndex: 'WebShopId',
            renderer: this.editWebShop,
            align: 'center',
            width: 25,
            name: 'WebShopEdit',
            hideable: false
        }, {
            dataIndex: 'WebShopId',
            renderer: this.deteleWebShop,
            align: 'center',
            width: 25,
            name: 'WebShopDelete',
            hideable: false
        }, {
            hidden: true,
            dataIndex: 'WebShopId',
            hideable: false
        }];
        me.tbar = [{
            xtype: 'button',
            action: 'addWebshopProduct',
            iconCls: 'new',
            text: '',
            disabled: me.disableitems,
            tooltip: 'Add new product'.l('SC37100')
        }, {
            xtype: 'button',
            action: 'extrazcategroy',
            iconCls: 'book_open',
            text: '',
            disabled: me.disableitems,
            tooltip: 'Add Extraaz Categories'.l('SC37100')
        }, '->', {
            xtype: 'button',
            iconCls: 'filter',
            disabled: true
        }, {
            xtype: 'searchfield',
            store: Ext.getStore('extraz.WebshopProductStore'),
            iconCls: 'filter',
            paramName: 'searchString'
        }];
        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            displayInfo: true,
            emptyMsg: "No data to display".l('g')
        };
        me.callParent();
    },
    editWebShop: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Update product".l('SC37100');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-edit';
    },
    deteleWebShop: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Delete product".l('SC37100');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-delete';
    }
});