Ext.define('Regardz.view.company.AddCompanyToMerge', {
    extend: 'Ext.window.Window',
    alias: 'widget.addcompanytomerge',
    modal: true,
    store: 'company.AddChildCompanyStore',

    requires: ['Regardz.view.company.AddChildCompany'],
    initComponent: function () {

        if (Ext.getCmp('addCompanyToMergeForm'))
            Ext.getCmp('addCompanyToMergeForm').destroy();

        var me = this;
        me.height = parseInt(Ext.getBody().getViewSize().height * (0.7));
        me.width = parseInt(Ext.getBody().getViewSize().width * (0.85));
        me.title = "Select Company_Title".l('SC61130');
        Ext.apply(me, {
            items: [{ xtype: 'form', id: 'addCompanyToMergeForm', items: [{ xtype: 'hidden', name: 'CompanyId', value: me.CompanyId },
            {
                width: me.windowWidth,
                xtype: 'addchildcompany'
            }]
            }]
        });
        me.dockedItems = [{
            dock: 'bottom',
            align: 'right',
            buttonAlign: 'right',
            buttons: [{
                text: 'Cancel'.l('w'),
                action: 'cancel',
                handler: function () {
                    me.destroy();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveCompanyRelationsMerge'
            }]
        }];
        me.callParent();
    }
});