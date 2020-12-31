Ext.define('Regardz.view.mastervalues.QualityRatingLang', {
    extend: 'Ext.window.Window',
    alias: 'widget.qualityratinglang',
    modal: false,
    width: 400,
    border: false,
    title: 'Lang Quality Rating_Title'.l('SC21620'),
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('qualityRatingLang'))
            Ext.getCmp('qualityRatingLang').destroy();

        var me = this;
        me.items = [{
            xtype: 'form',
            id: 'qualityRatingLang',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:10px;",
            fileUpload: true,
            items: [{
                xtype: 'combo',
                name: 'LanguageId',
                fieldLabel: 'Lang. for content'.l('SC21620'),
                //queryMode: 'local',
                displayField: 'Name',
                valueField: 'LanguageId',
                emptyText: "Select language for content".l('SC21620'),
                anchor: '100%',
                allowBlank: false,
                store: Ext.getStore('common.LanguageListStore')
            }, {
                xtype: 'hidden',
                name: 'QualityRatingId',
                value: me.qualityRatingId
            }, {
                xtype: 'hidden',
                name: 'LangQualityRatingId',
                value: me.langQualityRatingId
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Quality Rating'.l('SC21600'),
                value: me.rating
            }, {
                xtype: 'textareafield',
                fieldLabel: 'Description'.l('SC21610'),
                name: 'Description',
                selectOnFocus: true,
                anchor: '100%',
                maxLength: 500
            }],
            buttons: [{
                text: 'Cancel'.l('w'),
                scope: me,
                handler: function () {
                    this.close();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveQualityRatingLang'
            }]
        }];
        me.callParent(arguments);
    }
});