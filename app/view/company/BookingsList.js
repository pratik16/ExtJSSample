Ext.define('Regardz.view.company.BookingsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.bookingslist',
    store: 'company.BookingStore',
    loadMask: true,

    requires: [
		'Ext.ux.form.SearchField'
	],
    CompanyData: null,
    initComponent: function () {

        var me = this;
        //me.autoHeight = true;
        //    height = 300;
        me.title = "Bookings".l('SC61300');
        me.layout = "fit";
        //me.noResize = true;
        me.viewConfig = {
            forceFit: true
        };
        me.frame = true;
        me.columns = [
                { header: 'Date'.l('SC61300'), renderer: this.dateRenderer, dataIndex: 'BookingDate', width: 75 },
                { header: 'Booking'.l('SC61300'), dataIndex: 'BookingNumber', align: 'right', width: 80 },
                { header: 'Name'.l('SC61300'), dataIndex: 'BookingName', flex: 1 },
                { header: 'Status'.l('SC61300'), dataIndex: 'Status', width: 50 },
                { dataIndex: 'BookingId', align: 'center', width: 25, renderer: this.ManageBusinessType, name: 'businessTypeEdit' },
                { dataIndex: 'ContractBedroomId', align: 'center', width: 25, renderer: this.ManageBooking, name: 'ManageBooking', hideable: false },
                { hidden: true, dataIndex: 'ContractBedroomId', align: 'center', hideable: false },
                { hidden: true, dataIndex: 'BusinessTypeId', align: 'center', hideable: false },
                { hidden: true, dataIndex: 'BookingId', align: 'center', hideable: false },
                { hidden: true, dataIndex: 'BookingTrackingId', align: 'center', hideable: false },
                { hidden: true, dataIndex: 'StepNumber', align: 'center', hideable: false }
        ];

        me.tbar = [{
            xtype: 'button',
            action: 'addBooking',
            iconCls: 'new',
            text: 'Add New'.l('SC61300'),
            tooltip: 'Add Booking'.l('SC61300')
        }, '->', {
            xtype: 'button',
            iconCls: 'filter',
            disabled: true
        }, {
            xtype: 'searchfield',
            store: Ext.getStore('company.BookingStore'),
            iconCls: 'filter',
            paramName: 'searchString'
        }];

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            displayInfo: true,
            emptyMsg: "No data to display".l("g")
        };

        me.callParent();
    },
    dateRenderer: function (value, metadata, record, rowIndex, colIndex, store) {

        var d = Ext.Date.parse(value, 'c');

        return Ext.util.Format.date(d, usr_dateformat);
    },
    ManageBusinessType: function (value, metadata, record, rowIndex, colIndex, store) {
        if (store.data.items[0].data.CompanyId != null && store.data.items[0].data.CompanyId != '') {
            var tooltipText = "Edit Business Type".l('SC61200');
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
            metadata.tdCls = 'icon-signal';
        }
        else {
            return "";
        }
    },
    ManageChild: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value == true)
            return "Yes".l("g");
        else
            return "No".l("g");
    },

    ManageBooking: function (value, metadata, record, rowIndex, colIndex, store) {
        if (record.data["IsDisable"]) {
            metadata.css = metadata.css + ' icon-edit-disable';
        }
        else
        {
            var tooltipText = "Edit Booking".l('SC61200');
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
            metadata.tdCls = 'icon-edit';
        }
    }

});
