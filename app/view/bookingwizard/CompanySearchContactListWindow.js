Ext.define('Regardz.view.bookingwizard.CompanySearchContactListWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.bookcompanysearchcontactlistwindow',
    modal: true,
    width: 800,
    y: 10,
    border: false,
    title: 'Company and Contact search_Title'.l('SC51100'),
    id: 'companySearchContactWindow',
    layout: 'fit',
    itemid: 'itemCompanySearchContactWindow',
    viewConfig: {
        forceFit: true
    },

    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('btnSelectBookingCompanyContact'))
            Ext.getCmp('btnSelectBookingCompanyContact').destroy();

        if (Ext.getCmp('companySearchContactWindow'))
            Ext.getCmp('companySearchContactWindow').destroy();

        var me = this;

        me.padding = '25px';
        me.items = [{
            xtype: 'panel',
            border: false,
            bodyStyle: 'background: none',
            items: [{
                xtype: 'bookingcompanysearchcontactlist'
            }, {
                xtype: 'bookingcompanycontactlist'
            }, { xtype: 'hidden', itemid: 'ItemNo', name: 'ItemNo', value: me.ItemNo },
               { xtype: 'hidden', itemid: 'FormType', name: 'FormType', value: me.FormType}]
        }];


        me.buttons = [{
            text: 'Cancel'.l('g'),
            scope: me,
            handler: function () {
                this.close();
            }
        }, {
            text: 'Select'.l('g'),
            action: 'selectCompanyContact',
            id: 'btnSelectBookingCompanyContact',
            // itemid:'btnSelectBookingCompanyContact',
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