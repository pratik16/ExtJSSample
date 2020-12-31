Ext.define('Regardz.view.operations.DayClosure', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.dayclosure',
    border: false,
    autoShow: true,
    modal: true,
    frame: false,
    itemid: 'dayclosurePanel',
    layout: 'fit',
    store: 'operations.OperationsDayClosureStore',
    initComponent: function () {
        var me = this;

        me.topItems = {
            layout: 'hbox',
            border: false,
            items: [
                {
                    xtype: 'combo', // Combo with properties
                    width: 200,
                    itemid: 'dayclosureProperty',
                    store: Ext.getStore('property.PropertyListByUserIdStore'),
                    displayField: 'PropertyName',
                    valueField: 'PropertyId'
                },
               '->', {
                   xtype: 'button',
                   iconCls: 'filter',
                   disabled: true
               }, {
                   xtype: 'searchfield',
                   store: Ext.getStore('operations.OperationsDayClosureStore'),
                   iconCls: 'filter',
                   paramName: 'id3'
               }
            ]
        };
        me.items = {
            xtype: 'grid',
            title: 'Bookings',
            layout: 'fit',
            border: true,
            width: "100%",
            autoScroll: true,
            //height: parseInt(Ext.getBody().getViewSize().height * (0.92)),
            noResize: true,
            layout: 'fit',
            store: Ext.data.StoreManager.lookup('operations.OperationsDayClosureStore'),
            itemid: 'dayclosureGrid',
            tbar: [

                {
                    xtype: 'combo', // Combo with properties
                    width: 200,
                    itemid: 'dayclosureProperty',
                    store: Ext.getStore('property.PropertyListByUserIdStore'),
                    displayField: 'PropertyName',
                    valueField: 'PropertyId'
                },
               '->', {
                   xtype: 'button',
                   iconCls: 'filter',
                   disabled: true
               }, {
                   xtype: 'searchfield',
                   store: Ext.getStore('operations.OperationsDayClosureStore'),
                   iconCls: 'filter',
                   paramName: 'id3'
               }

            ],
            columns: [
                { text: 'Date', dataIndex: 'BookingDate', name: 'BookingDate', renderer: this.dateRender },
                { text: 'Start', dataIndex: 'FromTime', name: 'FromTime', width: 50, renderer: this.timeRender },
                { text: 'End', dataIndex: 'ToTime', name: 'ToTime', width: 50, renderer: this.timeRender },
                { text: 'Persons', dataIndex: 'NoOfPeople', name: 'Persons', width: 50 },
                { text: 'Booking ID', dataIndex: 'BookingNumber', name: 'BookingNumber', width: 70 },
                { text: 'Booking Name', dataIndex: 'BookingName', name: 'BookingName', flex: 1 },
                { text: 'Company Name', dataIndex: 'CompanyName', name: 'CompanyName' },
                { text: 'Contact', dataIndex: 'Contact', name: 'Contact', renderer: this.RendererContact },
                { text: 'Status', dataIndex: 'InternalStatus', name: 'InternalStatus', renderer: this.RendererStatus, width: 50 },
				{ tdCls: 'icon-upload', align: 'center', width: 25, hideable: false, name: 'checkout', renderer: this.CheckOut },
                { tdCls: 'searchIcon', align: 'center', width: 25, hideable: false, name: 'view', renderer: this.ViewBooking },
                { tdCls: 'icon-wizard', align: 'center', width: 25, hideable: false, name: 'wizard', renderer: this.EditBooking },
                { tdCls: 'icon-items', align: 'center', width: 25, hideable: false, name: 'items', renderer: this.ShowItems },
                { tdCls: 'icon-info-bubble', align: 'center', width: 25, hideable: false, name: 'internalremark', renderer: this.Information },
                { align: 'center', width: 25, hideable: false, name: 'readyinvoice', renderer: this.readyinvoice },
                { hidden: true, dataIndex: 'BookingEventId', name: 'start' },
                { hidden: true, dataIndex: 'Extraz', name: 'Extraz' },
                { hidden: true, dataIndex: 'BookingAmount', name: 'BookingAmount' },
                { hidden: true, dataIndex: 'BookingId', name: 'start' },
                { hidden: true, dataIndex: 'ReservationId', name: 'start' }

            ]
        }
        me.callParent();
    },
    dateRender: function (value, metadata, record) {
        var d = Ext.Date.parse(value, 'c');
        return Ext.util.Format.date(d, usr_dateformat);
    },
    timeRender: function (value, metadata, record) {
        var d = new Date();
        var newDate = Ext.util.Format.date(d, "Y-m-d") + 'T' + value;
        var newDate = Ext.Date.parse(newDate, 'c');
        return Ext.Date.format(newDate, 'H:i');
    },
    readyinvoice: function (value, metadata, record) {
        if (record.data.InternalStatus == "SPC_GDCBD_O")
            record.data.InternalStatus = "Ok"
        
        if (record.data.InternalStatus == "Ok") {
            var tooltipText = "Tooltip:ReadyInvoice".l('SC70000');
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
            metadata.tdCls = 'icon-approve';
        }
        else {
            metadata.tdCls = 'icon-approve-disable';
        }
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
    Information: function (value, metadata, record, rowIndex, colIndex, store) {
        metadata.tdAttr = 'data-qtip="' + "Tooltip:Information".l('SC70000') + '"';
    },
    RendererStatus: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value && value.length > 0 && value.substring(0, 4) == "SPC_")
            value = value.l("SP_DynamicCode");
        return value;
    },
    RendererContact: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value && value.length > 0 && value.substring(0, 4) == "SPC_")
            value = value.l("SP_DynamicCode");
        return value;
    }
});