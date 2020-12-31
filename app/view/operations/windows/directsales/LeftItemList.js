Ext.define('Regardz.view.operations.windows.directsales.LeftItemList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.directsalesleftitemlist',
    itemid: 'invoiceleftitemlist',
    store: 'operations.OperationDirectSalesItemsStore',
    title: 'Search Items'.l('SC74000'),
    viewConfig: {
        forceFit: true
        //emptyText: 'No records'.l('SC70000')
    },
    loadMask: true,
    height: 500,
    noResize: true,
    autoScroll: true,
    initComponent: function () {
        var me = this;
        me.rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        me.noResize = true;
        var buttonSearch = Ext.create('Ext.Button', {
            scale: 'small',
            iconCls: 'search-icon',
            width: 20,
            iconAlign: 'left',
            action: 'searchItemsWithFilterText'
        });

        var filterField = Ext.create('Ext.form.TextField', {
            xtype: 'textfield',
            selectOnFocus: true,
            emptyText: 'Filter'.l('g'),
            width: 150,
            itemid: 'filteredText'
        });

        me.comboItemType = {
            xtype: 'combo',
            width: 200,
            itemid: 'ItemCategoryCombo',
            action: 'ItemCategoryChange',
            displayField: 'ItemCategoryName',
            valueField: 'ItemCategoryId',
            emptyText: 'Select Item Category'.l('SC74000'),
            store: 'configuration.ItemCategoryStore'
        };

        me.columns = [
                { text: 'Article'.l('SC55500'), dataIndex: 'ItemName', flex: 5 },
                { width: 16, height: 16, align: 'center', sortable: false, renderer: this.externalRentedRender }, //16
                { text: 'Price'.l('SC55500'), dataIndex: 'NetPrice', flex: 2, align: 'right', renderer: this.amountRender, editor: new Ext.form.NumberField() },
                { width: 30, name: 'AddItemToRightGrid', renderer: this.renderIcon }
                ];

        me.tbar = [me.comboItemType, '->', filterField, buttonSearch];
        me.plugins = [me.rowEditing];
        me.listeners = {
            edit: function (editor, e) {
                e.record.commit();
            },
            beforeedit: function (editor, e, eOpts) {
                var itemId = e.record.data.ItemId;
                var price = e.record.data.NetPrice;
                var isItemGroup = e.record.data.IsItemGroup;
                if (itemId != null && itemId > 0 && price == 0 && !isItemGroup) {
                    return true;
                }
                return false;
            }
        };

        me.callParent();
    },
    renderIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        metadata.css = metadata.css + ' selectUser';
    },
    amountRender: function (value, metadata, record, rowIndex, colIndex, store) {
        return Ext.util.Format.number(value, '0.00');
    },
    externalRentedRender: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.data.ExternalRented == true) {
            metadata.tdCls = ' icon-info-blue ';
            var tooltipText = "Tooltip".l('SC54300');
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        }
    }
});