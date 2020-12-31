Ext.define('Regardz.view.property.ItemExemptionPriceManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.itemexemptionpricemanage',
    modal: true,
    width: parseInt(Ext.getBody().getViewSize().width * (0.40)),
    height: parseInt(Ext.getBody().getViewSize().height * (0.40)),
    border: false,
    title: 'Item Exception Manage_Title'.l('SC31610'),
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('manageItemExemption'))
            Ext.getCmp('manageItemExemption').destroy();

        var me = this;
        var dateValue = me.rec.StartDate;
        startDate = Ext.util.Format.date(dateValue, 'Y-m-d');

        var itemId = (me.rec.ItemId > 0) ? me.rec.ItemId : 0;

        if (me.type == 'add')
            startDate = null;
        else if (me.type == 'edit')
            startDate = startDate;
        else
            startDate = null;

        me.layout = 'fit';
        me.items = [{
            xtype: 'form',
            itemid: 'manageItemExemption',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:10px;",
            defaults: {
                anchor: '100%',
                padding: '10 0 0 10'
            },
            items: [{
                xtype: 'hidden',
                name: 'ItemExemptionIds',
                value: me.rec.ExemptionIds
            },           
            {
                xtype: 'hidden',
                name: 'ItemId',
                value: itemId
            }, {
                xtype: 'hidden',
                name: 'PropertyId',
                value: me.propertyId
            },
             {
                xtype: 'hidden',
                name: 'SubmitType',
                itemid: 'SubmitType',
                value: me.type
            },
             {
                 xtype: 'datefield',
                 fieldLabel: 'Start Date'.l('SC31610'),
                 itemid: 'StartDate',
                 name: 'StartDate',
                 itemid: 'StartDate',
                 format: usr_dateformat,
                 submitFormat: 'Y-m-d',
                 value: startDate,
                 allowBlank: false

             },
            {
                xtype: 'numberfield',
                decimalPrecision: 2,
                allowBlank: false,
                maxLength: 120,
                fieldLabel: 'A'.l('SC31610'),
                name: 'PriceAbar',
                allowNegative: false,
                allowBlank: false,
                value: me.rec.A,
                minValue: 0,
                maxValue: 99999,
                enforceMaxLength: true,
                maxLength: 8,                        
                renderer: this.decimalComma

            }, {
                xtype: 'numberfield',
                decimalPrecision: 2,
                allowBlank: false,
                maxLength: 120,
                fieldLabel: 'B'.l('SC31610'),
                name: 'PriceBbar',
                allowBlank: false,
                value: me.rec.B,
                minValue: 0,
                maxValue: 99999,
                enforceMaxLength: true,
                maxLength: 8,    
                renderer: this.decimalComma
            }, {
                xtype: 'numberfield',
                decimalPrecision: 2,
                allowBlank: false,
                maxLength: 120,
                fieldLabel: 'C'.l('SC31610'),
                name: 'PriceCbar',
                allowBlank: false,
                decimalPrecision: 2,
                value: me.rec.C,
                minValue: 0, 
                maxValue: 99999,
                enforceMaxLength: true,
                maxLength: 8,   
                renderer: this.decimalComma
            }, {
                xtype: 'numberfield',
                decimalPrecision: 2,
                allowBlank: false,
                maxLength: 120,
                fieldLabel: 'D'.l('SC31610'),
                name: 'PriceDbar',
                allowBlank: false,
                decimalPrecision: 2,
                minValue: 0,
                maxValue: 99999,
                enforceMaxLength: true,
                maxLength: 8,
                value: me.rec.D,
                renderer: this.decimalComma
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
                    this.close();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveItemExemptionPrice'
            }]
        }
		];
        me.callParent(arguments);
    },
    decimalComma: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value > 0)
            return String(value).replace('.', Ext.util.Format.decimalSeparator);
        return value;
        //    return 1;
    }
});