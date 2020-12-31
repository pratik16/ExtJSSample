Ext.define('Regardz.view.extraz.ExtrazPointsManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.extrazpointsmanage',
    modal: true,
    layout: 'fit',
    width: 400,
    border: false,
    title: 'Add Points_Title'.l('SC37210'),
    autoShow: true,
    initComponent: function () {

        if (Ext.getCmp('addExtraazPointsInOut'))
            Ext.getCmp('addExtraazPointsInOut').destroy();

        var me = this;
        me.disableitems = true;
        me.langClass = 'languagebutton-disable';
        if (me.webShopCategoryId > 0) {
            me.disableitems = false;
            me.langClass = 'languagebutton';
        }

        me.items = [{
            xtype: 'form',
            id: 'addExtraazPointsInOut',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:15px;",
            items: [{
                xtype: 'hidden',
                name: 'LanguageId',
                value: user_language
            }, {
                xtype: 'hidden',
                name: 'CreatedBy'
            }, {
                xtype: 'hidden',
                name: 'IndividualId',
                value: me.individualId
            }, {
                xtype: 'textfield',
                fieldLabel: 'Description*'.l('SC37210'),
                name: 'Description',
                allowBlank: false,
                selectOnFocus: true,
                anchor: '100%',
                maxLength: 500
            }, {
                xtype: 'radiogroup',
                fieldLabel: 'In or Out'.l('SC37210')+'*',
                width: 250,
                columns: 1,
                vertical: false,
                items: [{
                    boxLabel: 'In'.l('SC37210'),
                    name: 'ExtrazInOut',
                    inputValue: 'IN'
                }, {
                    boxLabel: 'Out'.l('SC37210'),
                    name: 'ExtrazInOut',
                    inputValue: 'OUT',
                    checked: true
                }]
            }, {
                xtype: 'textfield',
                fieldLabel: 'Extraaz'.l('SC37210')+'*',
                name: 'Extraz',
                allowBlank: false,
                selectOnFocus: true,
                vtype: 'numeric',
                width: 200,
                maxLength: 5
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
                action: 'saveExtraazPointsInOut'
            }]
        }
		];
        me.callParent(arguments);
    }
});