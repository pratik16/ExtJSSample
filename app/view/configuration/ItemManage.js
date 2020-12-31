///*Minified by P*/
Ext.apply(Ext.form.field.VTypes, {
    nymberOnly: function (val, field) {
        var value = /^\d+$/i;
        return value.test(val);
    },
    nymberOnlyText: "Insert proper value for this field".l('g')
});
Ext.define('Regardz.view.configuration.ItemManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.itemmanage',
    modal: true,
    layout: 'fit',
    y: 0,
    width: 550,
    border: false,
    title: 'Add Item_Title'.l('SC21910'),
    autoShow: true,
    config: {},
    initComponent: function () {
        if (Ext.getCmp('additem'))
            Ext.getCmp('additem').destroy();
        if (Ext.getCmp('additemtypeprice'))
            Ext.getCmp('additemtypeprice').destroy();
        var me = this;
        me.disableitems = true;
        me.langClass = 'languagebutton-disable';
        if (me.itemId > 0) {
            me.disableitems = false;
            me.langClass = 'languagebutton';
        }
        me.tbar = ['->', {
            xtype: 'button',
            itemid: 'langButton',
            tooltip: 'Update multilingual contents'.l('g'),
            cls: me.langClass,
            action: 'LanguageContent',
            disabled: me.disableitems
        }
		];
        me.items = [{
            xtype: 'form',
            id: 'additem',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:10px;",
            items: [{
                xtype: 'hidden',
                name: 'LanguageId',
                value: user_language
            }, {
                xtype: 'hidden',
                name: 'eventIds',
                value: 0
            }, {
                xtype: 'hidden',
                name: 'ItemId',
                value: me.itemId
            }, {
                xtype: 'textfield',
                fieldLabel: 'Item Name'.l('SC21900'),
                name: 'ItemName',
                allowBlank: false,
                selectOnFocus: true,
                anchor: '100%',
                maxLength: 120
            }, {
                xtype: 'textareafield',
                fieldLabel: 'Description'.l('SC21900'),
                name: 'Description',
                selectOnFocus: true,
                anchor: '100%',
                maxLength: 256
            }, {
                xtype: 'combo',
                name: 'ItemCategoryId',
                fieldLabel: 'Item Category'.l('SC21900'),
                forceSelection: true,
                queryMode: 'local',
                mode: 'remote',
                displayField: 'ItemCategoryName',
                valueField: 'ItemCategoryId',
                emptyText: "Select Item Category".l('SC21900'),
                store: 'common.ItemCategoryStore',
                anchor: '100%',
                allowBlank: false
            }, {
                xtype: 'combo',
                name: 'ItemTypeId',
                fieldLabel: 'Item Type'.l('SC21900'),
                forceSelection: true,
                queryMode: 'local',
                displayField: 'ItemTypeName',
                valueField: 'ItemTypeId',
                emptyText: "Select Item Type".l('SC21900'),
                store: 'common.ItemTypeStore',
                anchor: '100%',
                allowBlank: false
            }, {
                xtype: 'combo',
                name: 'CancellationItemTypeId',
                fieldLabel: 'Item Type for Cancellation'.l('SC21900'),
                forceSelection: true,
                queryMode: 'local',
                displayField: 'ItemTypeName',
                valueField: 'ItemTypeId',
                emptyText: "Select Item Type".l('SC21900'),
                store: 'common.ItemTypeStore',
                anchor: '100%',
                allowBlank: false
            }, {
                xtype: 'checkboxfield',
                name: 'IsMenuItem',
                padding: '0 0 0 105px',
                boxLabel: 'Has Menu Item?'.l('SC21900'),
                inputValue: 'true',
                uncheckedValue: 'false'
            }, {
                xtype: 'checkboxfield',
                name: 'IsEndtimeRequire',
                padding: '0 0 0 105px',
                boxLabel: 'Has End Time Require?'.l('SC21900'),
                inputValue: 'true',
                uncheckedValue: 'false'
            }, {
                xtype: 'checkboxfield',
                name: 'IsSoldPerPerson',
                action: 'IsSoldPerson',
                padding: '0 0 0 105px',
                boxLabel: 'Sold Per Person'.l('SC21900'),
                inputValue: 'true',
                uncheckedValue: 'false'
            }, {
                xtype: 'checkboxfield',
                name: 'IsAvailableInROP',
                //action: 'IsSoldPerson',
                padding: '0 0 0 105px',
                allowBlank: false,
                boxLabel: 'Is Available In ROP?'.l('SC21900'),
                inputValue: 'true',
                uncheckedValue: 'false'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Quantity'.l('SC21900'),
                name: 'Quantity',
                allowBlank: false,
                selectOnFocus: true,
                vtype: 'nymberOnly',
                maxLength: 7
            }, {
                xtype: 'label',
                text: 'Events:'.l('SC21900')
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
                action: 'saveItem'
            }
				]
        }
		];
        me.callParent(arguments);
    }
});