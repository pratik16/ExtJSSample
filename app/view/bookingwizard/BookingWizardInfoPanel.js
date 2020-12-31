Ext.define('Regardz.view.bookingwizard.BookingWizardInfoPanel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bookingwizardinfopanel',
    //requires: ['Regardz.view.bookingwizard.infopanel.IntakeNotes'],
    views: ['bookingwizard.RightSide.IntakeNotes', 'bookingwizard.RightSide.BookingNavigation', 'bookingwizard.RightSide.BookingInformation',
    'bookingwizard.RightSide.RequiredActions', 'bookingwizard.RightSide.SentConfirmations', 'bookingwizard.RightSide.Invoices'],

    loadMask: true,
    initComponent: function () {
        var me = this;

        //me.title = 'Booking Wizard'.l('SC50000');
        me.layout = 'accordion';
        me.itemid = "bookingwizardinfopanel";
        me.collapseFirst = true;
        me.multi = true;
        //me.bodyStyle = 'padding:15px';

        me.border = false,
        me.panDisabled = true;
        me.bodyStyle = 'background: none',
        autoHeight = true;

        me.buttonAdd = Ext.create('Ext.Button', {
            //scale: 'small',
            itemid: 'bookingInformationCompanyContractId',
            action: 'openCompanyContract',
            //iconCls: 'contract',
            //margin: '10 0 5 10',
            border: true,
            disabled: true,
            iconAlign: 'left',
            width: 10
        });

        me.items = [{
            title: '<b>' + 'Intake Notes'.l('SC50000') + '</b>',
            autoScroll: true,
            disabled: me.panDisabled,
            itemid: 'rpIntakeNote',
            xtype: 'rightintakenotes'
        }, {
            title: '<b>' + 'Booking Navigation'.l('SC50000') + '</b>',
            autoScroll: true,
            disabled: me.panDisabled,
            itemid: 'rpBooingNav'
            // xtype: 'rightbookingnavigation'
        }, {
            title: '<b>' + 'Booking Inforamation'.l('SC50000') + '</b>',
            autoScroll: true,
            disabled: me.panDisabled,
            itemid: 'rpBookingInfo',
            tbar: [me.buttonAdd, '->']
            // xtype: 'rightbookingninformation'
        }, {
            title: '<b>' + 'Required actions'.l('SC50000') + '</b>',
            autoScroll: true,
            itemid: 'rpRequiredActions',
            disabled: me.panDisabled
            // xtype: 'rightrequiredactions'
        }, {
            title: '<b>' + 'Communication Notes'.l('SC50000') + '</b>',
            autoScroll: true,
            itemid: 'rpCommunicationNote',
            disabled: me.panDisabled
            //  xtype: 'rightcommunicationnotes'
        }, {
            title: '<b>' + 'Send Confirmations'.l('SC50000') + '</b>',
            autoScroll: true,
            itemid: 'rpSendConfitmation',
            disabled: me.panDisabled
            // xtype: 'sentconfirmations'
        }, {
            title: '<b>' + 'Invoices'.l('SC50000') + '</b>',
            autoScroll: true,
            itemid: 'rpInvoices',
            disabled: me.panDisabled
            //  xtype: 'invoices'
        }, {
            title: '<b>' + 'Traces'.l('SC50000') + '</b>',
            autoScroll: true,
            itemid: 'rpTraces',
            disabled: me.panDisabled
            //  xtype: 'traces'
        }, {
            title: '<b>' + 'Tasks'.l('SC50000') + '</b>',
            autoScroll: true,
            itemid: 'rpTasks',
            disabled: me.panDisabled
            //   xtype: 'tasks'
        }, {
            title: '<b>' + 'Sales Info'.l('SC50000') + '</b>',
            autoScroll: true,
            itemid: 'rpSalesInfo',
            disabled: me.panDisabled,
            xtype: 'rightsalesinfo'
        }]

        me.callParent();
    },
    showPanel: function (number, el) {
        el.items.items[number].expand();
    }

});