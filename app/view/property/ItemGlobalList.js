Ext.define('Regardz.view.property.ItemGlobalList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.itemgloballist',

    store: 'property.ItemGlobalListStore',
    itemid: 'itemgloballist',
    //noResize: true,
    loadMask: true,
    isButtonInGrid: false,
    initComponent: function () {

        var me = this;

        //me.layout = 'fit';
        me.title = "Items_Title".l('SC31144');
        me.frame = true;
        me.resizable = true;
        me.height = parseInt(Ext.getBody().getViewSize().height * (0.85));
        me.autoScroll = true;
        me.viewConfig = {
            forceFit: true
        };

        me.tbar =
            [
                '->',
                {
                    xtype: 'checkbox',
                    boxLabel: 'Without prices'.l('SC31144'),
                    name: 'IsWithOutPrice',
                    itemid: 'IsWithOutPrice',
                    inputValue: true
                },
                {
                    xtype: 'radiogroup',
                    action: 'item_type',
                    itemid: 'item_type',
                    name: 'ITemDispayTypeGroup',
                    //width: '25%',
                    column: 3,
                    items: [{
                        boxLabel: 'Both'.l('SC31144'),
                        inputValue: 3,
                        name: 'ITemDispayType',
                        checked: true,
                        width: 65
                    }, {
                        boxLabel: 'Items'.l('SC31144'),
                        inputValue: 1,
                        name: 'ITemDispayType',
                        width: 65
                    },
                    {
                        boxLabel: 'Group items'.l('SC31144'),
                        inputValue: 2,
                        name: 'ITemDispayType',
                        width: 85
                    }]
                },
                {
                    xtype: 'datefield',
                    anchor: '100%',
                    //   fieldLabel: 'Start Date'.l('SC31071'),
                    itemid: 'FromDate',
                    name: 'FromDate',
                    format: usr_dateformat,
                    submitFormat: 'Y-m-d',
                    width: '10%',
                    //  value: startDate,
                    padding: '10 0 0 10',
                    emptyText: "Start Date".l('g')
                },
                {
                    xtype: 'datefield',
                    anchor: '100%',
                    //   fieldLabel: 'Start Date'.l('SC31071'),
                    itemid: 'ToDate',
                    name: 'ToDate',
                    format: usr_dateformat,
                    submitFormat: 'Y-m-d',
                    width: '10%',
                    //   value: startDate,
                    padding: '10 0 0 10',
                    emptyText: "End Date".l('g')
                },
                {
                    xtype: 'combo',
                    hiddenName: 'Id',
                    name: 'categoryId',
                    itemid: 'categoryId',
                    store: Ext.getStore('property.ItemCategoryComboListStore'),
                    valueField: 'Id',
                    displayField: 'Name',
                    mode: 'local'
                },
                {
                    xtype: 'textfield',
                    name: 'SearchText',
                    width: '10%',
                    itemid: 'SearchText',
                    enableKeyEvents: true,
                    emptyText: "filter"
                },
                 {
                     xtype: 'button',
                     iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
                     action: 'clearItemListFilter',
                     hidden: true
                 },
                {
                    xtype: 'button',
                    action: 'searchItemList',
                    iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
                }
            ];

        /*Columns*/
        me.frame = true;
        me.columns = [
                        { width: 25, dataIndex: 'ItemGroupId', renderer: this.isCategory },
                        { header: 'Name'.l('SC31144'), flex: 1, dataIndex: 'ItemName' },
                        { header: 'Start'.l('SC31144'), width: 75, dataIndex: 'StartDate', renderer: this.dateRenderer },
                        { header: 'End'.l('SC31144'), width: 75, dataIndex: 'EndDate', renderer: this.dateRenderer },
                        { header: 'Category'.l('SC31144'), width: 130, dataIndex: 'ItemCategoryName' },
                        { header: 'Quantity'.l('SC31144'), width: 70, dataIndex: 'Quantity' },
                        { header: 'Bar A'.l('SC31144'), width: 50, dataIndex: 'A', renderer: this.decimalComma },
                        { header: 'Bar B'.l('SC31144'), width: 50, dataIndex: 'B', renderer: this.decimalComma },
                        { header: 'Bar C'.l('SC31144'), width: 50, dataIndex: 'C', renderer: this.decimalComma },
                        { header: 'Bar D'.l('SC31144'), width: 50, dataIndex: 'D', renderer: this.decimalComma },
                        { width: 25, dataIndex: 'ItemGroupId', renderer: this.itemMenu, name: "itemMenu" },
                        { width: 25, dataIndex: 'ItemId', renderer: this.copyItem, name: "cloneItem" },
                        { width: 25, dataIndex: 'ItemId', renderer: this.editItem, name: "editItem" },
                        { width: 25, dataIndex: 'ItemId', renderer: this.deleteItem, name: "addDeleteItem" }
                     ];
        /*End Columns*/

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            displayInfo: true,
            displayMsg: 'Displaying topics {0} - {1} of {2}',
            emptyMsg: "No topics to display".l('g')
        };

        me.callParent();
    },

    itemMenu: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.data.StartDate != null && record.data.ItemGroupId > 0) {
            metadata.tdCls = 'icon-menu';

            var tooltipText = "Add Menu Item".l('SC31144');
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        }
    },
    copyItem: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.data.StartDate != null) {
            metadata.tdCls = 'icon-copy';
            var tooltipText = "Clone".l('SC31144');
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        }
    },
    editItem: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.data.StartDate != null) {
            metadata.tdCls = 'icon-edit';
            var tooltipText = "Edit".l('SC31144');
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        }
        else if (record.data.ItemGroupId > 0) {
            metadata.tdCls = 'icon-menu';

            var tooltipText = "Add Menu Item".l('SC31144');
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        }
    },
    deleteItem: function (value, metadata, record, rowIndex, colIndex, store) {

        if (record.data.StartDate != null) {
            record.data.itemAction = "delete";
            metadata.tdCls = 'icon-delete';
            var tooltipText = "Delete".l('SC31144');
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        }
        else {
            record.data.itemAction = "addnew";
            metadata.tdCls = 'newItem';
            var tooltipText = "Add New".l('SC31144');
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        }
    },
    isCategory: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value == null)
            metadata.tdCls = 'icon-items';
        else {
            metadata.tdCls = 'icon-category';
        }
    },
    decimalComma: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value > 0)
            return String(value).replace('.', Ext.util.Format.decimalSeparator);
        return value;
        //    return 1;
    },
    dateRenderer: function (value, metadata, record, rowIndex, colIndex, store) {

        var d = Ext.Date.parse(value, 'c');

        return Ext.util.Format.date(d, usr_dateformat);
    }
});