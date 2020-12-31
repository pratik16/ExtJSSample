Ext.define('Regardz.view.dashboard.TaskCompanyContactListWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.taskcompanycontactlistwindow',
    modal: true,
    width: 800,
    border: false,
    id: 'btnSelectBookingCompanyContactWin',
    y: 100,
    title: 'Company and Contact search_Title'.l('SC51100'),
    //itemid: 'companySearchContactWindow',
    layout: 'fit',
    viewConfig: {
        forceFit: true
    },

    autoShow: true,
    initComponent: function () {

        if (Ext.getCmp('btnSelectBookingCompanyContact'))
            Ext.getCmp('btnSelectBookingCompanyContact').destroy();

        var me = this;
        me.itemid;
        me.padding = '25px';
        me.items = [{
            xtype: 'panel',
            border: false,
            bodyStyle: 'background: none',
            items: [{
                xtype: 'taskcompanysearchcontactlist'
            }, {
                xtype: 'taskcompanycontactlist'
            }]
        }];

        me.buttons = [{
            text: 'Cancel'.l('g'),
            action: 'cancel',
            handler: function () {
                me.destroy();
            }
        }, {
            text: 'Save'.l('g'),
            action: 'selectCompanyContact',
            formBind: true,
            itemid: 'btnSelectTaskCompanyContact',
            disabled: true
        }];
        /*, {
        xtype: 'hidden',
        name: 'ProgramDefinitionId',
        id: 'programDefinitionID',
        value: me.programDefinitionId
        }*/
        me.callParent(arguments);
    }
});