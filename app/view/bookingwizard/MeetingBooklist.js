Ext.define('Regardz.view.bookingwizard.MeetingBooklist', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.meetingbooklist',
    modal: true,
    border: false,
    title: 'Bookings'.l('SC56000'),
    initComponent: function () {

        var me = this;
        me.items = [{
            xtype: 'grid',
			store: Ext.getStore('bookingwizard.MeetingBookinglistStore'),
			viewConfig: {
				forceFit: true
			},
			height: 200,
			frame: false,
			autoScroll: true,
			autoExpandColumn: 'name',
			columns: [	
				{ dataIndex: 'Bookid', name: 'bookid' },
				{ header: "Date".l('SC56000'), sortable: true, dataIndex: 'Date', name: 'Date' },
				{ header: "Name".l('SC56000'), sortable: true, dataIndex: 'Name', name: 'Name', flex: 1 },
				{ header: "Location".l('SC56000'), sortable: true, dataIndex: 'Location', name: 'Location' },
				{ header: "Net Price".l('SC56000'), sortable: true, dataIndex: 'NetPrice', name: 'NetPrice' },
				{ header: "VAT".l('SC56000'), sortable: true, dataIndex: 'VAT', name: 'VAT' },
				{ header: "Gross Price".l('SC56000'), sortable: true, dataIndex: 'GrossPrice', name: 'GrossPrice' },
				{ dateIndex: 'SetId', name: 'SetId'}
			],
			tbar: [
				
			],
			
			 bbar: {
				xtype: 'pagingtoolbar',
				store: Ext.getStore('bookingwizard.MeetingBookinglistStore'),
				displayInfo: true,
				emptyMsg: "No data to display".l('g')
			}

        }];
		
        me.callParent(arguments);
    }
});