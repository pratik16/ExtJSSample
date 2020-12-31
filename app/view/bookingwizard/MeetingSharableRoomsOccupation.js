Ext.define('Regardz.view.bookingwizard.MeetingSharableRoomsOccupation', {
    extend: 'Ext.window.Window',
    alias: 'widget.meetingsharableroomsoccupation',
    modal: true,
    border: false,
    title: 'Sharable Room Occupation_Title'.l('SC54700'),
    outletId: null,
    bookingEventId: null,
    bookingEventTrackingId: null,
    outletName: null,
    startTime: null,
    endTime: null,
    Persons: null,
    width: 500,
    initComponent: function () {

        var me = this;
        me.itemid = 'sharableoccupation';
        //Passed when clicking button                
        //me.localStore = Ext.create('Ext.data.Store', {
        //    //model: '',
        //    fields: ['Name', 'Persons', 'Checked'],
        //    data: [
        //        {
        //            'Name': 'Restaurant',
        //            'Persons': '50',
        //            'Checked': true
        //        },
        //        {
        //            'Name': 'Brasserie',
        //            'Persons': '30',
        //            'Checked': false
        //        },
        //        {
        //            'Name': 'Lobby',
        //            'Persons': '0',
        //            'Checked': false
        //        },
        //        {
        //            'Name': 'Open bar',
        //            'Persons': '10',
        //            'Checked': false
        //        }
        //    ]

        //});
        me.items = [
            {
                layout: 'vbox',
                frame: false,
                margin: '10',
                width: '100%',
                xtype: 'fieldcontainer',
                items: [
                     {

                         xtype: 'fieldcontainer',
                         fieldLabel: 'Outlet'.l('SC54700'),
                         labelWidth: 200,
                         name: 'outletName',
                         margin: me.leftMarginLabel,
                         items: [{
                             xtype: 'label',
                             text: this.outletName
                         }]
                     },
                     {

                         xtype: 'fieldcontainer',
                         fieldLabel: 'Start time'.l('SC54700'),
                         labelWidth: 200,
                         name: 'startTime',
                         margin: me.leftMarginLabel,
                         items: [{
                             xtype: 'label',
                             text: this.startTime
                         }]
                     },
                     {

                         xtype: 'fieldcontainer',
                         fieldLabel: 'End time'.l('SC54700'),
                         labelWidth: 200,
                         name: 'endTime',
                         margin: me.leftMarginLabel,
                         items: [{
                             xtype: 'label',
                             text: this.endTime
                         }]
                     },
                     {

                         xtype: 'fieldcontainer',
                         fieldLabel: 'Persons'.l('SC54700'),
                         labelWidth: 200,
                         name: 'endTime',
                         margin: me.leftMarginLabel,
                         items: [{
                             xtype: 'label',
                             itemid: 'meetingsharablePersonsCount',
                             text: this.Persons
                         }]
                     },
                ]
            },
            {
                xtype: 'grid',
                title: 'Rooms'.l('SC54700'),
                width: '99%',
                //store: Ext.getStore('bookingwizard.ReductionStore'),
                store: 'bookingwizard.SharableRoomsForEvent',
                viewConfig: {
                    forceFit: true
                },
                height: 245,
                frame: false,
                autoScroll: true,
                autoExpandColumn: 'name',
                columns: [
                    { header: "Name".l('SC54700'), flex: 1, dataIndex: 'RoomName' },
                    { header: "Persons".l('SC54700'), width: 100, dataIndex: 'PersonCount' },
                    { hidden: true, dataIndex: 'RoomId' },
                    { width: 25, sortable: true, dataIndex: 'IsChecked', renderer: this.checkboxrenderer }

                ],
                buttons: [{
                    text: 'Cancel'.l('g'),
                    handler: function () {
                        me.close();
                        Utils.MeetingDefaultRecord = null;
                    }
                }, {
                    text: 'Save'.l('g'),
                    bookingEventTrackingId: me.bookingEventTrackingId,
                    bookingEventId: me.bookingEventId,
                    action: 'saveSharableRoomButtonAction'
                }]
            }];

        me.callParent(arguments);
    },
    checkboxrenderer: function (value, metadata, record, rowIdx, colIndex, store) {
        if (record.data.IsChecked == true) {
            Utils.SelectedSharableRoomId = record.data.RoomId
        }
        return '<input onclick="Utils.MeetingSharableRoomRadioClick(' + rowIdx + ',\'' + store.storeId + '\',' + record.data.RoomId + ')" ' + (record.data.IsChecked == true ? 'checked=checked' : '') + ' type=radio name="rgrp">';
    }
});