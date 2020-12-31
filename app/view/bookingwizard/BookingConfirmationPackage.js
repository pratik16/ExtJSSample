Ext.define('Regardz.view.bookingwizard.BookingConfirmationPackage', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bookingconfirmationpackage',
    title: 'RVC Meeting: Tenititive'.l('SC55000'),

    initComponent: function () {

        var me = this;

        me.itemid = 'bookingconfirmationpackage';

        me.items = [
			{
			    xtype: 'grid',
			    store: Ext.getStore('bookingwizard.BookingConfirmationStore'),
			    viewConfig: {
			        forceFit: true, flex: 1
			    },
			    // anchor: '100%',
			    height: 245,
			    frame: false,
			    autoScroll: true,
			    autoExpandColumn: 'item',
			    features: [{
			        ftype: 'grouping'
			    }],
			    columns: [
					{ header: "Item".l('SC55000'), sortable: true, dataIndex: 'item', name: 'item', flex: 1 },
					{ header: "Start".l('SC55000'), sortable: true, dataIndex: 'start', dataIndex: 'start', width: 150 },
					{ header: "End".l('SC55000'), sortable: true, dataIndex: 'end', dataIndex: 'end', width: 150 },
                    { header: "Price".l('SC55000'), sortable: true, dataIndex: 'price', dataIndex: 'price', width: 150 },
                    { header: "Quantity".l('SC55000'), sortable: true, dataIndex: 'quantity', dataIndex: 'quantity', width: 150 },
                    { header: "Group name".l('SC55000'), sortable: true, dataIndex: 'groupname', dataIndex: 'groupname', width: 150 },
                    { header: "Total".l('SC55000'), sortable: true, dataIndex: 'total', dataIndex: 'total', width: 150 }
				]
			}
		];

        me.callParent(arguments);
    }
});