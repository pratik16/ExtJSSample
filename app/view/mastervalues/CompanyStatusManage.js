Ext.define('Regardz.view.mastervalues.CompanyStatusManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.companystatusmanage',
    modal: true,
    width: 400,
    border: false,
    title: 'Update Company Status'.l('SC21710'),
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('editCompanyStatus'))
            Ext.getCmp('editCompanyStatus').destroy();

        var me = this;

        me.items = [{
            xtype: 'form',
            id: 'editCompanyStatus',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:10px;",
            tbar: ['->', {
                xtype: 'button',
                text: 'Language'.l('g'),
                action: 'LanguageContent'
            }],

            items: [{
                xtype: 'hidden',
                name: 'LanguageId',
                value: user_language
            }, {
                xtype: 'hidden',
                name: 'CompanyStatusId',
                value: me.companyStatusId
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
                action: 'saveCompanyStatus'
            }]
        }];
        me.callParent(arguments);
    }
});