Ext.define('Regardz.view.operations.Inhouse', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.inhouse',
    border: false,
    autoShow: true,
    modal: true,
    frame: false,
    itemid: 'inhousePanel',
    initComponent: function () {
        var me = this;

        me.topItems = {
            layout: 'hbox',
            border: false,
            items: [
                {
                    xtype: 'combo', // Combo with properties
                    width: 200,
                    itemid: 'inhouseProperty',
                    store: Ext.getStore('property.PropertyListByUserIdStore'),
                    displayField: 'PropertyName',
                    valueField: 'PropertyId'
                },
                {
                    xtype: 'datefield', //Datefield picker
                    itemid: 'inhouseDateField',
                    format: usr_dateformat,
                    value: new Date(),
                    //value: '2013-07-26',
                    selectOnFocus: true,
                    layout: 'form',
                    margin: '0 0 0 10'
                },
                {
                    xtype: 'textfield', //Filter textbox
                    width: 100,
                    margin: '0 0 0 10',
                    itemid: 'inhouseFilterText'
                },
                {
                    xtype: 'button', // Search button
                    scale: 'small',
                    iconCls: 'search-icon',
                    width: 20,
                    margin: '0 0 0 5'
                }
            ]
        };
        me.grid = {
            xtype: 'gridpanel',
            title: 'Events overview'.l('SC70000'),
            border: true,
            noResize: true,
            width: "100%",
            store: Ext.data.StoreManager.lookup('operations.OperationsInhouseEventsListStore'),
            itemid: 'inhouseGrid',
            viewConfig: {
                forceFit: true,
                emptyText: 'No records'.l('SC70000'),
                getRowClass: function (record) {
                    switch (record.get('Sts')) {
                        case '1':
                            return " inhouse-grey ";
                            break;
                        case '2':
                            return " inhouse-white ";
                            break;
                        case '3':
                            return " inhouse-green  ";
                            break;
                        case '1!':
                            return " inhouse-red ";
                            break;
                        case '2!':
                            return " inhouse-orange ";
                            break;
                    }
                    return record.get('Class');
                }
            },
            columns: [
                { text: 'Start'.l('SC70000'), dataIndex: 'FromTime', name: 'FromTime' },
                { text: 'End'.l('SC70000'), dataIndex: 'ToTime', name: 'ToTime' },
                { text: 'Sts'.l('SC70000'), dataIndex: 'Sts', name: 'Sts' },
                { text: 'Persons'.l('SC70000'), dataIndex: 'Persons', name: 'Persons' },
                { text: 'Booking ID'.l('SC70000'), dataIndex: 'BookingNumber', name: 'BookingNumber' },
                { text: 'Booking Name'.l('SC70000'), dataIndex: 'BookingName', name: 'BookingName' },
                { text: 'Company Name'.l('SC70000'), dataIndex: 'CompanyName', name: 'CompanyName' },
            //{ text: 'Contact'.l('SC70000'), dataIndex: 'Contact', name: 'Contact' },
                {text: 'Contact'.l('SC70000'), dataIndex: 'Contact', name: 'Contact', renderer: this.ContactPerson },
                { text: 'Room'.l('SC70000'), dataIndex: 'RoomName', name: 'RoomName' },
                { dataIndex: 'HasSubRoom', renderer: this.hasSubRoom, name: 'hasSubRoom', width: 50 },
                { text: 'By'.l('SC70000'), dataIndex: 'By', name: 'By' },
                { text: 'End'.l('SC70000'), dataIndex: 'PreviousEnd', name: 'PreviousEnd' },
                { tdCls: 'searchIcon', align: 'center', width: 25, hideable: false, name: 'view', renderer: this.ViewBooking },
                { tdCls: 'icon-wizard', align: 'center', width: 25, hideable: false, name: 'wizard', renderer: this.EditBooking },
                { tdCls: 'icon-items', align: 'center', width: 25, hideable: false, name: 'items', renderer: this.ShowItems },
                { tdCls: 'icon-download2', align: 'center', width: 25, hideable: false, name: 'checkin', renderer: this.CheckIn },
                { tdCls: 'icon-euro', align: 'center', width: 25, hideable: false, name: 'nopayment', renderer: this.DirectPayment },
                { tdCls: 'icon-info-bubble', align: 'center', width: 25, hideable: false, name: 'internalremark', renderer: this.Information },
                { tdCls: 'icon-upload', align: 'center', width: 25, hideable: false, name: 'checkout', renderer: this.CheckOut },
                { hidden: true, dataIndex: 'BookingEventId', name: 'start' },
                { hidden: true, dataIndex: 'BookingId', name: 'start' },
                { hidden: true, dataIndex: 'ReservationId', name: 'start' },
                { hidden: true, dataIndex: 'IsDisable', name: 'IsDisable' }
            ]
        }
        me.content = { //Big content panel
            xtype: 'form',
            title: "Inhouse".l('SC70000'),
            anchor: '100%',
            frame: true,
            collapsible: true,
            autoScroll: true,
            border: false,
            layout: 'vbox',
            items: [me.topItems]
        };
        me.items = [me.content, me.grid];
        me.callParent();
    },
    hasSubRoom: function (val, metadata, record) {
        if (val == true) { metadata.tdCls = ' icon-copy-table '; metadata.tdAttr = 'data-qtip="' + "Tooltip:SubRoom".l('SC70000') + '"'; }
        else return '';
    },
    ViewBooking: function (value, metadata, record, rowIndex, colIndex, store) {
        metadata.tdAttr = 'data-qtip="' + "Tooltip:ViewBooking".l('SC70000') + '"';
    },
    EditBooking: function (value, metadata, record, rowIndex, colIndex, store) {
        metadata.tdAttr = 'data-qtip="' + "Tooltip:EditBooking".l('SC70000') + '"';
    },
    ShowItems: function (value, metadata, record, rowIndex, colIndex, store) {
        metadata.tdAttr = 'data-qtip="' + "Tooltip:ShowItems".l('SC70000') + '"';
    },
    CheckOut: function (value, metadata, record, rowIndex, colIndex, store) {
        metadata.tdAttr = 'data-qtip="' + "Tooltip:CheckOut".l('SC70000') + '"';
    },
    DirectPayment: function (value, metadata, record, rowIndex, colIndex, store) {
        if(!record.data.IsDisable)
            metadata.tdAttr = 'data-qtip="' + "Tooltip:DirectPayment".l('SC70000') + '"';
        else
            metadata.css = " icon-copy-disable ";
    },
    Information: function (value, metadata, record, rowIndex, colIndex, store) {
        metadata.tdAttr = 'data-qtip="' + "Tooltip:Information".l('SC70000') + '"';
    },
    CheckIn: function (value, metadata, record, rowIndex, colIndex, store) {
        metadata.tdAttr = 'data-qtip="' + "Tooltip:CheckIn".l('SC70000') + '"';
    },
    SubRoom: function (value, metadata, record, rowIndex, colIndex, store) {
        metadata.tdAttr = 'data-qtip="' + "Tooltip:SubRoom".l('SC70000') + '"';
    },
    ContactPerson: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value && value.length > 0 && value.substring(0, 4) == "SPC_")
            value = value.l("SP_DynamicCode");
        return value;
    }
});
