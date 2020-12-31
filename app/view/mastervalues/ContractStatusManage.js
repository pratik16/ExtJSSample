Ext.define('Regardz.view.mastervalues.ContractStatusManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.contractstatusmanage',
    modal: true,
    width: 400,
    border: false,
    title: 'Update Contract Status_Title_SCCODE'.l('SC21810'),
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('editContractStatus'))
            Ext.getCmp('editContractStatus').destroy();

        var me = this;

        me.items = [{
            xtype: 'form',
            id: 'editContractStatus',
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
                name: 'ContractStatusId',
                value: me.contractStatusId
            }, {
                xtype: 'textfield',
                fieldLabel: 'Contract Status'.l('SC21800'),
                name: 'Status',
                allowBlank: false,
                selectOnFocus: true,
                anchor: '100%',
                maxLength: 50
            }, {
                xtype: 'textareafield',
                fieldLabel: 'Description'.l('SC21810'),
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
                action: 'saveContractStatus'
            }]
        }];
        me.callParent(arguments);
    }
});