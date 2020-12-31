Ext.define('Regardz.view.dashboard.TaskBookingList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.taskbookinglist',
    store: 'dashboard.TaskBookingStore',

    requires: [
		'Ext.ux.form.SearchField'
	],

    loadMask: true,

    initComponent: function () {

        var me = this;
        me.autoHeight = true;
        //me.title = 'Select User_SCCOD'.l('SC61140');
        me.columns = [{
            header: 'Number'.l('SC80000'),
            dataIndex: 'BookingNumber',
            width: '10%',
            align: 'center'
        }, {
            header: 'Date'.l('SC80000'),
            dataIndex: 'BookingDate',
            width: '13%',
            align: 'center',
            renderer: this.dateRenderer
        }, {
            header: 'Name'.l('SC80000'),
            dataIndex: 'BookingName',
            align: 'left',
            flex: 1
        },  {
            header: 'Booking Location'.l('SC80000'),
            dataIndex: 'BookingLocation',
            align: 'left',
            width: '10%'
        }, {
            header: 'MeetingType'.l('SC80000'),
            dataIndex: 'BookingMeetingType',
            align: 'left',
            width: '10%'
        }, {
            header: 'Company Name'.l('SC80000'),
            dataIndex: 'CompanyName',
            flex: 1
        }, {
            header: 'Individual Name'.l('SC80000'),
            dataIndex: 'IndividualName',
            flex: 1
        }, {
            header: 'Status'.l('SC80000'),
            dataIndex: 'Status',
            width: '10%'
        }, {
            dataIndex: 'BookingId',
            renderer: this.selectBooking,
            align: 'center',
            width: 25,
            name: 'selectTaskBooking',
            action: 'selectTaskBooking',
            hideable: false
        },{
            hidden: true,
            dataIndex: 'Email'
        }, {
            hidden: true,
            dataIndex: 'Phone'
        }, {
            hidden: true,
            dataIndex: 'ReservationId'
        }, {
            hidden: true,
            dataIndex: 'CompanyId'
        }, {
            hidden: true,
            dataIndex: 'IndividualId'
        }, {
            hidden: true,
            dataIndex: 'StatusId'
        }];

        me.tbar = ['->', {
            xtype: 'button',
            iconCls: 'filter',
            disabled: true
        }, {
            xtype: 'searchfield',
            store: Ext.getStore('dashboard.TaskBookingStore'),
            iconCls: 'filter',
            paramName: 'searchParam'
        }];

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            displayInfo: true,
            emptyMsg: "No data to display".l("g")
        };

        me.callParent();
    },

    selectBooking: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = 'Click here for Select Booking'.l('SC80000');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'selectUser';
    },
    dateRenderer: function (value, metadata, record, rowIndex, colIndex, store) {   
        var d = Ext.Date.parse(value, 'c');
        return Ext.util.Format.date(d, usr_dateformat);
    }

});