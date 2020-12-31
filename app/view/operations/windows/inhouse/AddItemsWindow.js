Ext.define('Regardz.view.operations.windows.inhouse.AddItemsWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.inhouseadditemswindow',
    modal: true,
    border: false,
    title: 'Add items'.l('SC71200'),
    width: parseInt(Ext.getBody().getViewSize().width * (0.65)),
    height: parseInt(Ext.getBody().getViewSize().height * (0.75)),
    padding: 10,
    BookingId: 0,
    BarId: 0,
    initComponent: function () {
        var me = this;

        var comboTypes = {
            xtype: 'combo',
            name: 'ItemCategoryId',
            itemid: 'inhouseitemcategorycombo',
            displayField: 'ItemCategoryName',
            valueField: 'ItemCategoryId',
            action: 'itemCatChangeAddItems',
            store: Ext.getStore('configuration.ItemCategoryStore'),
            listeners: {
                afterrender: function (combo) {
                    combo.setValue(combo.getStore().getAt('0').get('ItemCategoryId'));
                }
            }
        };
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false
        });
        me.itemsGrid = {
            xtype: 'gridpanel',
            border: true,
            width: '100%',
            height: parseInt(Ext.getBody().getViewSize().height * (0.75)) - 150,
            title: 'Items'.l('SC71200'),
            itemid: 'inhouseItemsGrid',
            store: Ext.getStore('operations.InhouseItemsList'),
            viewConfig: {
                forceFit: true,
                emptyText: 'No records'.l('SC70000')
            },
            columns: [
                { dataIndex: 'Checked', width: 50, align: 'center', renderer: this.checkboxrenderer },
                { text: 'Name'.l('SC71200'), dataIndex: 'ItemName', flex: 3, editor: new Ext.form.TextField({}) },
                { text: 'Price'.l('SC71200'), dataIndex: 'Price', align: 'right', flex: 2, renderer: this.amountRender, editor: new Ext.form.NumberField() }, //, renderer: this.IsTallyItem
                {text: 'Quantity'.l('SC71200'), dataIndex: 'Quantity', align: 'center', flex: 1, editor: new Ext.form.NumberField() },
                { text: 'Total'.l('SC71200'), dataIndex: 'TotalPrice', align: 'right', flex: 2, renderer: this.totalRender }, //, renderer: this.IsTallyItem
                {dataIndex: 'Checked', flex: 2, align: 'center', text: 'Is Tally Item?'.l('SC71200'), renderer: this.checkboxrendererTellyItem }
            ],
            plugins: [rowEditing],
            tbar: [
                  comboTypes,
                  {
                      xtype: 'combo',
                      margin: '0 0 0 10',
                      store: Ext.getStore('operations.InhouseBarListStore'),
                      displayField: 'FormattedName',
                      itemid: 'inhouseBarCombo',
                      valueField: 'BarId',
                      action: 'barChangeAddItems'
                  },
                  {
                      xtype: 'textfield', //Filter textbox
                      width: 100,
                      margin: '0 0 0 10',
                      itemid: 'inhouseItemFilterText'
                  },
                  {
                      xtype: 'button', // Search button
                      scale: 'small',
                      iconCls: 'search-icon',
                      itemid: 'inhouseSearchAction',
                      width: 20,
                      margin: '0 0 0 5'
                  }
            ],
            bbar: [{
                xtype: 'pagingtoolbar',
                store: Ext.getStore('operations.InhouseItemsList'),
                displayInfo: true,
                emptyMsg: "No data to display".l("g")
            }]
        };
        me.items = [
            {
                xtype: 'fieldcontainer',
                fieldLabel: 'Sales on location'.l('SC71200'),
                labelWidth: 150,
                items: [{
                    xtype: 'displayfield',
                    itemid: 'inhouseSalesOnLocationText',
                    value: 'N/A'
                }, {
                    xtype: 'hidden',
                    itemid: 'inhouseSalesOnLocationTextValue'
                }]
            },
        //            {
        //                xtype: 'fieldcontainer',
        //                fieldLabel: '  ',
        //                labelWidth: 150,
        //                items: [{
        //                    xtype: 'button',
        //                    text: 'Change'.l('SC71200'),
        //                    action: 'inhouseOpenLocationSales',
        //                    itemid: 'buttonChangeSales'
        //                }]
        //            },
             {
             xtype: 'fieldcontainer',
             fieldLabel: 'Event'.l('SC71200'),
             labelWidth: 150,
             items: [{
                 xtype: 'combo',
                 itemid: 'inhouseEventsCombo',
                 store: Ext.getStore('operations.InhouseBookingEventsListStore'),
                 displayField: 'EventRoomName',
                 valueField: 'BookingEventId'
                 //                     displayTpl: '<tpl for=".">{EventName} ({RoomName})</tpl>',
                 //                     tpl: '<tpl for="."><div class="x-combo-list-item" >{EventName} ({RoomName})</div></tpl>'                  
             }]
         },
             me.itemsGrid,
             {
                 hidden: true,
                 xtype: 'textfield',
                 value: me.BookingId,
                 itemid: 'inhouseCurrentBookingId'
             },
              {
                  hidden: true,
                  xtype: 'textfield',
                  value: me.BarId,
                  itemid: 'inhouseSelectedbar'
              }
        ];

        me.buttons = [
            {
                text: 'Close'.l('g'),
                action: 'inhouseAddItemsCancel'
            }, {
                text: 'Add'.l('SC71200'),
                action: 'inhouseAddItems',
                itemid: 'inhouseAddItemsButton',
                disabled: false
            }];
        me.callParent();
    },
    checkboxrenderer: function (value, metadata, record, rowIdx, colIndex, store) {
        //reductionItem_
        return '<input id="inhouseItem_' + record.get('ItemId') + '" data-id="' + record.get('ItemId') + '" onclick="setDefaultInhouseItems(' + rowIdx + ',\'' + store.storeId + '\')" ' + (record.data.Checked == true ? 'checked=checked' : '') + ' type=checkbox name="rgrp' + this.body.id + '">';
    },
    //    IsTallyItem: function (value, metadata, record, rowIdx, colIndex, store) {
    //        if (record.data.IsTallyItem == true) {
    //            return 'Included'.l('SC71200');
    //        }
    //        return value;
    //    },
    checkboxrendererTellyItem: function (value, metadata, record, rowIdx, colIndex, store) {
        //reductionItem_
        return '<input id="inhouseTeleItem_' + record.get('ItemId') + '" ' + (record.data.Checked ? '' : 'disabled') + ' data-id="' + record.get('ItemId') + '" onclick="setDefaultTellyItems(' + rowIdx + ',\'' + store.storeId + '\')" ' + (record.data.IsTallyItem ? 'checked=checked' : '') + ' type=checkbox name="rgrpTI' + this.body.id + '">';
    },
    amountRender: function (value, metadata, record, rowIdx, colIndex, store) {
        var displayValue = value - record.data.Discount;
        return Ext.util.Format.number(displayValue, '0.00');
    },
    totalRender: function (value, metadata, record, rowIdx, colIndex, store) {        
        return Ext.util.Format.number(value, '0.00');
    }
});