Ext.define('Regardz.view.bookingwizard.EditMenu', {
    extend: 'Ext.window.Window',
    alias: 'widget.editmenu',
    modal: true,
    border: false,
    title: 'Menu Edit_Title'.l('SC54600'),
    store: 'bookingwizard.BookingMenuListStore',
    width: '80%',
    currentMenu: 'A lunch made by the chef with three sandwiches per person and milk and fresh orange juice in a bottle.',

    initComponent: function () {

        var me = this;
        me.itemid = 'editmenu';
        //me.localStore = Ext.create('Ext.data.Store', {
        //    //model: 'configuration.MenuItem',
        //    fields: ['MenuItemId', 'MenuItemName', 'ItemId', 'ItemName', 'CreatedDate', 'CreatedBy', 'UpdatedDate', 'UpdatedBy', 'Type', 'Description'],
        //    data: [
        //        {
        //            'MenuItemId': 1,
        //            'MenuItemName': 'Sea food',
        //            'ItemId': 2,
        //            'ItemName': 'Standard menu',
        //            'CreatedDate': '',
        //            'CreatedBy': '',
        //            'UpdatedDate': '',
        //            'UpdatedBy': '',
        //            'Type': 'Global',
        //            'Description': 'A lunch made by the chef with three sandwiches per person and milk and fresh orange juice in a bottle.'
        //        },
        //        {
        //            'MenuItemId': 2,
        //            'MenuItemName': 'Sea food',
        //            'ItemId': 2,
        //            'ItemName': 'Spring & Summer menu',
        //            'CreatedDate': '',
        //            'CreatedBy': '',
        //            'UpdatedDate': '',
        //            'UpdatedBy': '',
        //            'Type': 'Property',
        //            'Description': 'Two fresh sandwiches per person, including saled and a selection of fresh juices.'
        //        },
        //        {
        //            'MenuItemId': 3,
        //            'MenuItemName': 'Sea food',
        //            'ItemId': 3,
        //            'ItemName': 'Autumn & Winter menu',
        //            'CreatedDate': '',
        //            'CreatedBy': '',
        //            'UpdatedDate': '',
        //            'UpdatedBy': '',
        //            'Type': 'Property',
        //            'Description': 'Two sandwiches per person with soupe of the day and a selection of warm drinks.'
        //        }]

        //});

        me.availableMenus = Ext.create('Ext.grid.Panel', {
            //store: 'configuration.MenuItemStore',
            store: me.store,
            itemid: "menuItemGrid",
            title: "Available menus".l("SC54600"),
            height: 200,
            width: '100%',
            margin: '10',
            noResize: true,
            columns: [
                { baseCls: '', width: 150, header: 'Description'.l("SC54600"), dataIndex: 'MenuItemName', flex: 1, name: 'ItemDiscription' }, //ItemGroupId
                {baseCls: '', width: 50, header: 'Type'.l("SC54600"), dataIndex: 'MenuType', flex: 1, renderer: this.rendererType, name: 'ItemType' }, //ItemGroupId
                {renderer: this.renderIcon, name: 'ItemSelected' },
                { hidden: true, dataIndex: 'MenuItemId', hideable: false },
                { hidden: true, dataIndex: 'ItemGroupId', hideable: false }
            ]
        });

        me.items = [{
            layout: 'hbox',
            xtype: 'fieldcontainer',
            width: '100%',
            items:
                [
                    {
                        layout: 'vbox',
                        xtype: 'fieldcontainer',
                        width: '50%',
                        items: [
                            me.availableMenus,
                            {
                                xtype: 'panel',
                                title: 'Menu preview'.l('SC54600'),
                                height: 240,
                                margin: '10',
                                width: '100%',
                                items: [{
                                    xtype: "displayfield",
                                    margin: '10',
                                    itemid: 'menuDescriptionId',
                                    //height: 190,
                                    width: '90%'
                                },
                                {
                                    xtype: 'hidden',
                                    name: 'IGroupId',
                                    itemid: 'IGroupId',
                                    value: me.IGroupId
                                },
                                {
                                    xtype: 'hidden',
                                    name: 'BEventTrackingId',
                                    itemid: 'BEventTrackingId',
                                    value: me.bookingEventTrackingId
                                },
                                {
                                    xtype: 'hidden',
                                    name: 'BEventId',
                                    itemid: 'BEventId',
                                    value: me.bookingEventId
                                }
                                ]
                            }
                        ]
                    },
                    {
                        xtype: 'panel',
                        title: 'Current menu'.l('SC54600'),
                        width: '50%',
                        margin: '10',
                        items: [{
                            xtype: "textareafield",
                            value: this.currentMenu,
                            itemid: 'CurrentMenuDescriptionId',
                            width: '90%',
                            margin: '10',
                            height: 450

                        }]
                    }

                ]
        }];

        me.dockedItems = [{
            dock: 'bottom',
            buttonAlign: 'right',
            buttons: [
                {
                    text: 'Save'.l('g'),
                    action: 'SaveItemMenu'
                },
                {
                    text: 'Cancel'.l('g'),
                    handler: function () {
                        me.close();
                    }
                }
            ]
        }];
        me.callParent(arguments);

    },
    renderIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        metadata.css = metadata.css + ' selectUser';
    },
    rendererType: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value.substring(0, 4) == "SPC_")
            value = value.l("SP_DynamicCode");
        return value;
    }
});