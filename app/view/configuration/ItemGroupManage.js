///*Minified by P*/
Ext.define('Regardz.view.configuration.ItemGroupManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.itemgroupmanage',
    modal: true,
    layout: 'fit',
    y: 0,
    width: 550,
    border: false,
    title: 'Add Item Group_Title'.l('SC23510'),
    autoShow: true,
    initComponent: function () {
        if (Ext.getCmp('addItemGroup'))
            Ext.getCmp('addItemGroup').destroy();
        var me = this;
        me.disableitems = true;
        if (me.ItemGroupId > 0) {
            me.disableitems = false;
        }
        me.items = [{
            xtype: 'form',
            id: 'addItemGroup',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:10px;",
            tbar: ['->', {
                xtype: 'button',
                text: 'Language'.l('g'),
                action: 'LanguageContent',
                disabled: me.disableitems
            }
				],
            items: [{
                xtype: 'hidden',
                name: 'LanguageId',
                value: user_language
            }, {
                xtype: 'hidden',
                name: 'ItemGroupId',
                value: me.ItemGroupId
            }, {
                xtype: 'hidden',
                name: 'eventIds',
                value: 0
            }, {
                xtype: 'hidden',
                name: 'itemIds',
                value: 0
            }, {
                xtype: 'textfield',
                fieldLabel: 'Item Group Name'.l('SC23500'),
                name: 'ItemGroupName',
                allowBlank: false,
                selectOnFocus: true,
                anchor: '100%',
                maxLength: 120
            }, {
                xtype: 'textareafield',
                fieldLabel: 'Description'.l('SC23500'),
                name: 'Description',
                selectOnFocus: true,
                anchor: '100%',
                maxLength: 256
            }, {
                xtype: 'combo',
                name: 'ItemCategoryId',
                fieldLabel: 'Item Category'.l('SC23510'),
                forceSelection: true,
                queryMode: 'local',
                displayField: 'ItemCategoryName',
                valueField: 'ItemCategoryId',
                emptyText: "Select Item Category".l('SC23510'),
                store: 'common.ItemCategoryStore',
                anchor: '100%'
            }, {
                xtype: 'checkbox',
                name: 'IsSoldPerPersonOrQuantity',
                boxLabel: 'Is SoldPerPerson'.l('SC23510'),
                padding: '0 0 0 105px',
                allowBlank: true,
                inputValue: true,
                action: 'is_checked',
                checked: false
            }, {
                xtype: 'checkbox',
                name: 'IsAvailableInROP',
                boxLabel: 'Is Available In ROP?'.l('SC23510'),
                padding: '0 0 0 105px',
                allowBlank: true,
                inputValue: true,
                checked: false
            }, {
                xtype: 'label',
                text: 'Items:'.l('SC23510')
            }, {
                xtype: 'form',
                padding: '0 0 0 100',
                frame: true,
                border: false,
                autoScroll: true,
                style: 'background:none; border:0px;',
                id: 'itemList'
            }, {
                xtype: 'label',
                text: 'Events:'.l('SC23510')
            }, {
                xtype: 'form',
                padding: '0 0 0 100',
                frame: true,
                border: false,                
                style: 'background:none; border:0px;',
                autoScroll: true,
                id: 'eventsList'
            }, {
                xtype: 'hidden',
                name: 'CreatedDate'
            }, {
                xtype: 'hidden',
                name: 'CreatedBy'
            }, {
                xtype: 'hidden',
                name: 'UpdatedDate'
            }, {
                xtype: 'hidden',
                name: 'UpdatedBy'
            }
				],
            buttons: [{
                text: 'Cancel'.l('w'),
                scope: me,
                handler: function () {
                    this.close()
                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveItemGroup'
            }
				]
        }
		];
        me.callParent(arguments);
    }
});