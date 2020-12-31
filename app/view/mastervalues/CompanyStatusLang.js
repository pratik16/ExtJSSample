Ext.define('Regardz.view.mastervalues.CompanyStatusLang', {
    extend: 'Ext.window.Window',
    alias: 'widget.companystatuslang',
    modal: false,
    width: 400,
    border: false,
    title: 'Lang Company Status_Title'.l('SC21720'),
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('companyStatusLang'))
            Ext.getCmp('companyStatusLang').destroy();

        var me = this;
        me.items = [{
            xtype: 'form',
            id: 'companyStatusLang',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:10px;",
            fileUpload: true,
            items: [{
                xtype: 'combo',
                name: 'LanguageId',
                fieldLabel: 'Lang. for content'.l('SC21720'),
                //queryMode: 'local',
                displayField: 'Name',
                valueField: 'LanguageId',
                emptyText: "Select language for content".l('SC21720'),
                anchor: '100%',
                allowBlank: false,
                store: Ext.getStore('common.LanguageListStore')
            }, {
                xtype: 'hidden',
                name: 'CompanyStatusId',
                value: me.companyStatusId
            }, {
                xtype: 'hidden',
                name: 'LangCompanyStatusId',
                value: me.langCompanyStatusId
            }, {
                xtype: 'textfield',
                fieldLabel: 'Company Status'.l('SC21700'),
                name: 'Status',
                allowBlank: false,
                selectOnFocus: true,
                anchor: '100%',
                maxLength: 50
            }, {
                xtype: 'textareafield',
                fieldLabel: 'Description'.l('SC21710'),
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
                action: 'saveCompanyStatusLang'
            }]
        }];
        me.callParent(arguments);
    }
});