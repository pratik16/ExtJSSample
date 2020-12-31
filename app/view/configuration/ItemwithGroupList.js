Ext.define('Regardz.view.configuration.ItemwithGroupList', {
    extend: 'Ext.window.Window',
    alias: 'widget.itemwithgrouplist',
    store: 'configuration.ItemswithGroupStore',
    modal: true,
    //    loadMask: true,
    requires: [
		'Ext.ux.form.SearchField'
	],
    initComponent: function () {
        var me = this;
        me.title = 'Item'.l('SC20900') + 's';
        me.height = parseInt(Ext.getBody().getViewSize().height * (0.50));
        me.width = '40%',
        me.autoShow = true;
        //        me.collapsible = true;
        //        me.noResize = true;
        //        me.padding = 10;        
        me.autoScroll = true;

        me.ItemsGrid = {
            xtype: 'grid',
            store: me.store,
            itemid: 'itemwithgroupgrid',
            cls: 'gridwhitebackground',
            height: parseInt(me.height * (0.91)),
            frame: false,
            autoScroll: true,
            layout: 'fit',
            columns: [{
                width: 16,
                sortable: false,
                renderer: this.addIconClassByType,
                align: 'center'
            }, {
                hidden: true,
                dataIndex: 'ItemId',
                align: 'center'
            }, {
                hidden: true,
                dataIndex: 'ItemGroupId',
                align: 'center'
            }, {
                hidden: true,
                dataIndex: 'ItemCategoryId',
                align: 'center'
            }, {
                header: 'Item'.l('SC54000'),
                width: '25%',
                flex: 2,
                sortable: true,
                dataIndex: 'Name'
            }, {
                width: 16,
                sortable: false,
                renderer: this.addIconClassByExternalRented,
                align: 'center'
            }, {
                header: 'ItemTypeName'.l('SC54000'),
                width: '25%',
                flex: 2,
                sortable: true,
                dataIndex: 'ItemTypeName'
            }, 
            /*{
                header: "Price".l('SC54300'),
                width: '25%',
                sortable: true,
                renderer: this.priceRenderer,
                dataIndex: 'Price',
                align: 'right'
            },*/ 
            {
                renderer: this.selectItem,
                align: 'center',
                width: 25,
                name: 'selectItem',
                action: 'selectItem',
                hideable: false
            }],
            tbar: [{ xtype: 'combo',
                name: 'ItemCategoryId',
                itemid: 'itemcategorycombo',
                displayField: 'ItemCategoryName',
                valueField: 'ItemCategoryId',
                store: 'configuration.ItemCategoryStore',
                width: '50%',
                action: 'selectItemCategory',
                emptyText: 'Select Item Category'.l('SC23500')
            }, '->', {
                xtype: 'button',
                iconCls: 'filter',
                disabled: true
            }, {
                xtype: 'searchfield',
                store: Ext.getStore('configuration.ItemswithGroupStore'),
                iconCls: 'filter',
                paramName: 'sort'
            }],
            bbar: {
                xtype: 'pagingtoolbar',
                store: this.store,
                displayInfo: true,
                emptyMsg: "No data to display".lastIndexOf('g')
            }
        };
        Ext.apply(me, {
            title: 'Items'.l('SC54300'),
            layout: 'fit',
            items: {
                xtype: 'form',
                border: false,
                margin: 5,
                buttonAlign: 'center',
                items: [{
                    xtype: 'container',
                    width: '100%',
                    items: [{
                        xtype: "container",
                        items: [me.ItemsGrid],
                        width: '100%'
                    }]
                }]
            }
        });
        me.callParent();
    },
    addIconClassByType: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.data.ItemGroupId != null) {
            metadata.tdCls = ' tree-icon-itemgroup-add ';
        }
        else {
            metadata.tdCls = ' tree-icon-item-add ';
        }
    },
    addIconClassByExternalRented: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.data.IsExternalRented == true) {
            metadata.tdCls = ' tree-icon-item-ExternalRented ';
        }
    
    },
    selectItem: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = 'Click here for Select Item'.l('SC20910');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'selectItem';
    },
    priceRenderer: function (val, metadata, record) {
        return Ext.util.Format.number(record.data.Price, '0,000.00');
    }
});
