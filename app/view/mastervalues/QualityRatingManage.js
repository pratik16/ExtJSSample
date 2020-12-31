Ext.define('Regardz.view.mastervalues.QualityRatingManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.qualityratingmanage',
    modal: true,
    width: 400,
    border: false,
    title: 'Add Quality Rating_Title'.l('SC21610'),
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('addQualityRating'))
            Ext.getCmp('addQualityRating').destroy();

        var me = this;

        me.disableitems = true;
        if (me.qualityRatingId > 0) {
            me.disableitems = false;
        }

        me.items = [{
            xtype: 'form',
            id: 'addQualityRating',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:10px;",
            fileUpload: true,
            tbar: ['->', {
                xtype: 'button',
                text: 'Language'.l('g'),
                action: 'LanguageContent',
                disabled: me.disableitems
            }],
            items: [{
                xtype: 'hidden',
                name: 'LanguageId',
                value: user_language
            }, {
                xtype: 'hidden',
                name: 'QualityRatingId',
                value: me.qualityRatingId
            }, {
                xtype: 'textfield',
                fieldLabel: 'Quality Rating'.l('SC21600'),
                name: 'Rating',
                allowBlank: false,
                selectOnFocus: true,
                maxLength: 10,
                anchor: '100%',
                maxLength: 50
            }, {
                xtype: 'textareafield',
                fieldLabel: 'Description'.l('SC21610'),
                name: 'Description',
                selectOnFocus: true,
                anchor: '100%',
                maxLength: 500
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
            }],
            buttons: [{
                text: 'Cancel'.l('w'),
                scope: me,
                handler: function () {
                    this.close();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveQualityRating'
            }]
        }];
        me.callParent(arguments);
    }
});