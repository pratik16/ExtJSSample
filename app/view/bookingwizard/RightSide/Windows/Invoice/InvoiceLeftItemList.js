Ext.define('Regardz.view.bookingwizard.RightSide.Windows.Invoice.InvoiceLeftItemList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.invoiceleftitemlist',
    itemid: 'invoiceleftitemlist',
    store: 'bookingwizard.BookingInvoiceSearchItemsStore',
    viewConfig: {
        forceFit: true,
        emptyText: 'No records'.l('SC70000')
    },
    loadMask: true,
    height: 281,
    autoScroll: true,
    initComponent: function () {
        var me = this;
        me.rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
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
            emptyText: 'filter'.l('SC70000'),
            width: 70,
            itemid: 'filteredText'
        });

        me.comboItemType = {
            xtype: 'combo',
            width: 200,
            itemid: 'ItemCategoryCombo',
            action: 'ItemCategoryChange',
            displayField: 'ItemCategoryName',
            valueField: 'ItemCategoryId',
            store: 'configuration.ItemCategoryStore'
        }

        me.comboBars = {
            xtype: 'combo',
            itemid: 'BarCombo',
            action: 'BarChange',
            width: 100,
            store: Ext.getStore('operations.InhouseBarListStore'),
            displayField: 'FormattedName',
            valueField: 'BarId'
        }

        me.plugins = [me.rowEditing];
        me.columns = [
                { text: 'Article'.l('SC55500'), dataIndex: 'ItemName', flex: 5 },
                { text: 'Price'.l('SC55500'), dataIndex: 'NetPrice', flex: 2, align: 'right', renderer: this.amountRender, editor: new Ext.form.NumberField() },
                { width: 30, name: 'AddItemToRightGrid', renderer: this.renderIcon }
                ];

        me.tbar = [{ xtype: 'tbfill' }, me.comboItemType, me.comboBars, filterField, buttonSearch];

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
    }
});