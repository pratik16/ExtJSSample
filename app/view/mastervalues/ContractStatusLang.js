Ext.define('Regardz.view.mastervalues.ContractStatusLang', {
    extend: 'Ext.window.Window',
    alias: 'widget.contractstatuslang',
    modal: false,
    width: 400,
    border: false,
    title: 'Lang Contract Status_Title'.l('SC21820'),
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('contractStatusLang'))
            Ext.getCmp('contractStatusLang').destroy();

        var me = this;
        me.items = [{
            xtype: 'form',
            id: 'contractStatusLang',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:10px;",
            fileUpload: true,
            items: [{
                xtype: 'combo',
                name: 'LanguageId',
                fieldLabel: 'Lang. for content'.l('SC21820'),
                //queryMode: 'local',
                displayField: 'Name',
                valueField: 'LanguageId',
                emptyText: "Select language for content".l('SC21820'),
                anchor: '100%',
                allowBlank: false,
                store: Ext.getStore('common.LanguageListStore')
            }, {
                xtype: 'hidden',
                name: 'ContractStatusId',
                value: me.contractStatusId
            }, {
                xtype: 'hidden',
                name: 'LangContractStatusId',
                value: me.langContractStatusId
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
            }],
            buttons: [{
                text: 'Cancel'.l('w'),
                scope: me,
                handler: function () {
                    this.close();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveContractStatusLang'
            }]
        }];
        me.callParent(arguments);
    }
});