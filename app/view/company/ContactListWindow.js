Ext.define('Regardz.view.company.ContactListWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.contactlistwindow',
    modal: true,
    width: 800,
    border: false,
    title: 'Individual search'.l('SC51200'),

    layout: 'fit',
    viewConfig: {
        forceFit: true
    },

    autoShow: true,

    initComponent: function () {

        var me = this;

        me.padding = '25px';

        me.items = [{
            xtype: 'panel',
            border: false,
            bodyStyle: 'background: none',
            items: [{
                title: 'Individuals'.l('SC51200'),
                padding: '0',
                xtype: 'companycontactlist'
            }]
        }];



        me.buttons = [{
            text: 'Cancel'.l('g'),
            scope: me,
            handler: function () {
                this.close();
            }
        }, {
            text: 'Select'.l('g'),
            action: 'selectIndividual',
            id: 'btnSelectCompanyContact',
            disabled: true
        }];
        me.callParent(arguments);
    }
});