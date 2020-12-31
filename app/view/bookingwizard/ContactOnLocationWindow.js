Ext.define('Regardz.view.bookingwizard.ContactOnLocationWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.contactonlocationwindow',
    modal: true,
    border: false,
    title: 'Contact on Location_Title'.l('SC55400'),
    stores: ['bookingwizard.AllAttendeesStore', 'bookingwizard.AllAttendeesRoleStore'],
    width: 400,
    height: 250,
    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            itemid: 'contactLocationWindow',
            frame: false,
            layout: 'vbox',
            border: false,
            items: [{
                xtype: 'hiddenfield',
                name: 'InvitedByIndividualId'
            }, {
                xtype: 'hiddenfield',
                name: 'InvitedByCompanyId'
            }, {
                xtype: 'textfield',
                itemid: 'salutationField',
                name: 'Salutation',
                width: 300,
                padding: '10 5 0 10',
                fieldLabel: "Salutation".l('SC55400')
            }, {
                xtype: 'textfield',
                itemid: 'contactField',
                name: 'Name',
                width: 300,
                padding: '10 5 0 10',
                fieldLabel: "Name".l('SC55400')
            }, {
                xtype: 'textfield',
                itemid: 'emailField',
                name: 'Email',
                width: 300,
                padding: '10 5 0 10',
                fieldLabel: "E-Mail".l('SC55400')
            }, {
                xtype: 'combo',
                name: 'AttendeeRoleId',
                store: 'bookingwizard.AllAttendeesRoleStore',
                width: 300,
                padding: '10 5 10 10',
                displayField: 'AttendeesRole',
                valueField: 'AttendeeRoleId',
                itemid: 'comboWriteContact',
                fieldLabel: "Attendee's Role".l('SC55400'),
                emptyText: "Select Attendee's Role".l('SC55400')
            }],
            buttons: [{
                text: 'Close'.l('g'),
                handler: function () {
                    me.close();
                }
            }, {
                text: 'Save'.l('g'),
                action: 'selectContact'
            }]
        }];
        me.callParent(arguments);
    }
});