Ext.define('Regardz.view.bookingwizard.CompanyContractWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.companycontractwindow',
    modal: true,
    width: 650,
    height: 400,
    border: false,
    title: 'Company Contract'.l('SC50300'),

    layout: 'fit',
    viewConfig: {
        forceFit: true
    },

    autoShow: true,

    initComponent: function () {

        var me = this;

        me.items = [{
            xtype: 'hidden',
            name: 'CompanyId',
            //id: 'programDefinitionID',
            value: 0

        }];
        me.callParent(arguments);
    }
});