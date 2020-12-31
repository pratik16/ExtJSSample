Ext.apply(Ext.form.field.VTypes, {
    //  vtype validation function
    decimalPercentageValue: function (val, field) {

        //var value = /^\s*-?[1-9]\d*(\.\d{1,2})?\s*$/i;
        var value = /(^100(\.0{1,2})?$)|(^([1-9]([0-9])?|0)(\.[0-9]{1,2})?$)/i;
        return value.test(val);
    },
    // vtype Text property to display error Text
    // when the validation function returns false
    decimalPercentageValueText: "Insert proper value for this field".l("g"),
    // vtype Mask property for keystroke filter mask
    decimalPercentageValueMask: /[\d\.]/i
});

Ext.define('Regardz.view.configuration.DiscountManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.discountmanage',
    modal: true,
    width: 400,
    border: false,
    //title: 'Add Fixed Price'.l('RAP-A05-06'),
    title: 'Add Discount_Title'.l('SC23410'),
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('addDiscount'))
            Ext.getCmp('addDiscount').destroy();

        var me = this;


        //        me.disableitems = true;
        //        if (me.itemCategoryId > 0) {
        //            me.disableitems = false;
        //        }

        me.items = [{
            xtype: 'form',
            id: 'addDiscount',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:10px;",
            fileUpload: true,
            items: [{
                xtype: 'hidden',
                name: 'DiscountId',
                value: me.DiscountId
            }, {
                xtype: 'textfield',
                //fieldLabel: 'Fixed Price Package Name'.l('RAP-A05-06'),
                fieldLabel: 'Discount Name'.l('SC20700'),
                name: 'DiscountName',
                maxLength: 400,
                allowBlank: false,
                selectOnFocus: true,
                anchor: '100%'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Value'.l('SC20700'),
                name: 'DiscountValue',
                maxLength: 9,
                allowBlank: false,
                selectOnFocus: true,
                //forceDecimals: true,
                //allowNegative: false,
                vtype: 'decimalPercentageValue'

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
                text: 'Cancel'.l('g'),
                scope: me,
                handler: function () {
                    this.close();
                }
            }, {
                text: 'Save'.l('g'),
                action: 'saveDiscount'
            }]
        }];
        me.callParent(arguments);
    }
});

















 