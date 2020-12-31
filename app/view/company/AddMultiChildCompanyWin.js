Ext.define('Regardz.view.company.AddMultiChildCompanyWin', {
    extend: 'Ext.window.Window',
    alias: 'widget.addmultichildcompanywin',
    modal: true,
    store: 'company.AddChildCompanyStore',

    requires: ['Regardz.view.company.AddChildCompany'],
    initComponent: function () {
        var me = this;
        me.height = parseInt(Ext.getBody().getViewSize().height * (0.7));
        me.width = parseInt(Ext.getBody().getViewSize().width * (0.85));
        me.title = "Select Company_Title".l('SC61130');
        Ext.apply(me, {
            items: [{ xtype: 'form', id: 'addMultiChildCompanyWinForm', items: [{ xtype: 'hidden', name: 'CompanyId', value: me.CompanyId },
            {
                width: me.windowWidth,
                xtype: 'addmultichildcompany'
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
                action: 'saveCompanyRelations'
            }]
        }];
        me.callParent();
    }
});