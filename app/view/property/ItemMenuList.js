Ext.define('Regardz.view.property.ItemMenuList', {
    extend: 'Ext.window.Window',
    alias: 'widget.itemmenulist',
    store: 'property.ItemMenuListStore',
    modal: true,
    initComponent: function () {
        var me = this;

        me.height = parseInt(Ext.getBody().getViewSize().height * (0.5));
        me.width = parseInt(Ext.getBody().getViewSize().width * (0.4));
        me.gridHeight = parseInt(me.height * (0.35));
        me.autoShow = true;

        me.itemGroupId = (me.itemGroupId > 0) ? me.itemGroupId : 0;

        me.Menus = {
            xtype: 'grid',
            store: me.store,
            itemid: 'menulist',
            cls: 'gridwhitebackground',
            height: me.height,
            frame: false,
            autoScroll: true,
            layout: 'fit',
            columns: [{
                hidden: true,
                name: 'MenuItemId',
                dataIndex: 'MenuItemId'
            }, {
                hidden: true,
                name: 'PropertyId',
                dataIndex: 'PropertyId'
            }, {
                header: 'Name'.l('SC31148'),
                dataIndex: 'MenuItemName',
                flex: 1,
                align: 'left'
            }, {
                header: 'Type'.l('SC31148'),
                dataIndex: 'MenuType',
                renderer: this.rendererType,
                width: '15%',
                align: 'left'
            }, {
                dataIndex: 'IsActive',
                renderer: this.menuItemStatus,
                align: 'center',
                width: 25,
                name: 'menuStatusChange',
                hideable: false
            }, {
                dataIndex: 'MenuItemId',
                renderer: this.editMenuItemICon,
                name: 'editMenuItem',
                align: 'center',
                width: 25
            }, {
                dataIndex: 'MenuItemId',
                renderer: this.deleteMenuItemIcon,
                align: 'center',
                width: 25,
                name: 'deleteMenuItem'
            }],
            tbar: [{
                xtype: 'button',
                iconCls: 'new',
                action: 'menuItemAdd',
                tooltip: 'Add Menu Item'.l('SC31148'),
                text: 'Add new'.l('SC33000')
            }]
        };
        Ext.apply(me, {
            title: 'Property Group Item Menus_Title'.l('SC31148'),
            layout: 'fit',
            items: {
                xtype: 'form',
                border: false,
                margin: 5,
                buttonAlign: 'center',
                items: [{
                    xtype: 'hidden',
                    name: 'itemGroupId',
                    itemid: 'itemGroupId',
                    value: me.itemGroupId
                }, {
                    xtype: 'container',
                    width: '100%',
                    items: [{
                        xtype: "container",
                        items: [me.Menus],
                        width: '100%'
                    }]
                }]
            }
        });
        me.callParent();
    },
    editMenuItemICon: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.data.PropertyId != null) {
            var tooltipText = 'Edit Menu Item'.l('SC31148');
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
            metadata.tdCls = 'icon-edit';
        }
    },    
    menuItemStatus: function (value, metadata, r, rowIndex, colIndex, store) {
        if (value == true) {
            var tooltipText = 'De Activate'.l('SC31500');
            metadata.css = 'icon-active';
        }
        else {
            var tooltipText = 'Activate'.l('SC31500');
            metadata.css = 'icon-deactive';
        }
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
    },
    deleteMenuItemIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.data.PropertyId != null) {
            var tooltipText = 'Delete Menu Item'.l('SC31148');
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
            metadata.tdCls = 'icon-delete';
        }
    },
    rendererType: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value.substring(0, 4) == "SPC_")
            value = value.l("SP_DynamicCode");
        return value;
    }
});