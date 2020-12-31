Ext.define('Regardz.view.bookingwizard.BookingWizardStep4', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bookingwizardstep4',
    // views: ['bookingwizard.MeetingItems', 'bookingwizard.MeetingSharableRoomsItems', 'bookingwizard.SetNewReduction', 'bookingwizard.EditEvent'],
    loadMask: false,
    padding: '10',

    initComponent: function () {

        var me = this;
       
        me.title = 'Customize package: ';
        me.itemid = 'bookingwizardstep4';
        me.frame = true;
        me.layout = 'fit';
        me.autoScroll = true,
        me.buttonAddEvent = Ext.create('Ext.Button', {
            id: 'button_add_event',
            scale: 'small',
            action: 'addEventButtonAction',
            iconCls: 'new',
            tooltip: 'Add Event_Title'.l('SC54100'),
            width: 25,
            iconAlign: 'left',
            margin: '0 10 0 10'
        });

        me.buttonAddDiscount = Ext.create('Ext.Button', {
            id: 'button_add_discount',
            scale: 'small',
            action: 'addDiscountButtonAction',
            iconCls: 'icon-percentage',
            tooltip: 'Set Reduction_Title'.l('SC54500'),
            width: 20,
            iconAlign: 'left',
            margin: '0 10 0 0'
        });

        me.items = {
            layout: 'vbox',
            frame: false,
            border: 'none',
            width: '100%',
            loadMask: false,
            autoScroll: true,
            //itemid: 'itemBigPanelStep4',
            items: [
            //{
            //    layout: 'hbox',
            //    //padding: '0 0 0 10',
            //    items: [
            //        me.butonAddEvent                        
            //    ]

            //},
                {
                layout: 'hbox',
                items: [me.buttonAddEvent, me.buttonAddDiscount]
            },


            //            {
            //                xtype: 'panel',
            //                itemid: 'eventsPanel',
            //                frame: false,
            //                border: 'none',
            //                width: '100%',
            //                autoScroll: true,
            //                //height: 800,
            //                //renderTo: Ext.getBody(),
            //                viewConfig: {
            //                    loadMask: false,
            //                    forceFit: true
            //                }
            //            }, 

            {
            xtype: 'tabpanel',
            itemid: 'tabeventpanel',
            activeTab: 0,
            width: '100%',
            plain: false,
            border: false,
            bodyPadding: 1,
            padding: 5,
            flex: 1,
            style: 'background:none; border:0px;',
            autoScroll: true
        },

            {
                xtype: 'hidden',
                itemid: 'PropertyId'
            }, {
                xtype: 'hidden',
                itemid: 'currentBookingEventTrackingId'
            }, {
                xtype: 'hidden',
                itemid: 'RoomSetupId'
            }, {
                xtype: 'hidden',
                itemid: 'NumberOfPeople'
            }
        //{
        //    title: 'Meeting',
        //    margin: '10',
        //    xtype: 'meetingitems'
        //},
        //{
        //    title: 'Lunch',
        //    margin: '30 10 10 10 ',
        //    xtype: 'meetingsharableroomsitems',
        //    customViewName: 'lunch'
        //},
        // {
        //     title: 'Dinner',
        //     margin: '30 10 10 10 ',
        //     xtype: 'meetingsharableroomsitems',
        //     customViewName: 'dinner'
        // }
            ]
    };
    me.callParent();
},

editItem: function (value, metadata, record, rowIndex, colIndex, store) {
    var tooltipText = "Update Item".l('SC21900');
    metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
    metadata.tdCls = 'icon-documentadd';
},

deteleItem: function (value, metadata, record, rowIndex, colIndex, store) {
    var tooltipText = "Delete Item".l('SC21900');
    metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
    metadata.tdCls = 'icon-delete';
}

});