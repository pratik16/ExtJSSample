Ext.define('Regardz.view.bookingwizard.RightSide.Windows.BookingNavigation.BookingEventItemList', {
    extend: 'Ext.window.Window',
    alias: 'widget.bookingeventitemlist',
    modal: true,
    border: false,
    maximizable: true,    
    title: 'Booking Event Item',
	store: 'bookingwizard.RightSide.BookingEventItemListStore',	
	width: parseInt(Ext.getBody().getViewSize().width * (0.65)),
    height: parseInt(Ext.getBody().getViewSize().height * (0.45)),
    initComponent: function () {
        var me = this;
		
		me.layout = 'fit';
		
		var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToMoveEditor: 1,
			autoCancel: false
		});
		
		var hoursArray = new Array();
        for (var i = 8; i <= 22; i++) {
            if (i < 10) {
                hoursArray.push(['0' + i + ':00', '0' + i + ':00']);
                hoursArray.push(['0' + i + ':30', '0' + i + ':30']);
            } else {
                hoursArray.push([i + ':00', i + ':00']);
                hoursArray.push([i + ':30', i + ':30']);
            }
        }
		
        
		me.items = {
            xtype: 'treepanel',
			itemid: 'bookingeventitemlist',
            store: me.store,
            title: 'Cancellation items',
            border: true,
            frame: false,   
			rootVisible: false,
			plugins: [rowEditing],
            columns: [
				 {
                 xtype: 'treecolumn', //this is so we know which column will show the tree
                 header: 'Item',
                 width: 200,
                 flex: 2,
                 sortable: true,
                 dataIndex: 'ItemName'
             },
            {header: 'Start', dataIndex: 'StartTimeHHMM', flex: 1, align: 'center' },
            { header: 'End', dataIndex: 'EndTimeHHMM', flex: 1, align: 'center' },
            {
                header: 'Price', dataIndex: 'Price', flex: 1, align: 'right',
                renderer: this.priceRenderer
            },
            { header: 'Persons', dataIndex: 'Quantity', flex: 1, align: 'center' },
            { header: 'Quantity', dataIndex: 'ServedQuantity', flex: 1, align: 'center' },
            { header: 'Red.%', dataIndex: 'ReductionPercentage', flex: 1, editor: new Ext.form.NumberField({ maxValue: 100, minValue: 0 }), align: 'center' },
            { header: 'Red.', dataIndex: 'Reduction', flex: 1, editor: new Ext.form.NumberField({}), align: 'right', renderer: this.priceRenderer },
            { header: 'Group name', dataIndex: 'GroupName', flex: 1},
            {
                header: 'Total', dataIndex: 'TotalPrice', flex: 1, align: 'right',
                renderer: this.totalPriceRenderer
            },
			
            { hidden: true, dataIndex: 'ItemId', align: 'center', hideable: false },
            { hidden: true, dataIndex: 'ItemGroupId', align: 'center', hideable: false },
			{ hidden: true, dataIndex: 'BarId', align: 'center', hideable: false }
			
            ],            
            width: '100%'

        };

        me.callParent();
    },
	priceRenderer: function (val, metadata, record) {
	    return Ext.util.Format.number(val, '0,000.00');
    },
	totalPriceRenderer: function (val, metadata, record) {
	    return Ext.util.Format.number(val, '0,000.00');
    }	
});
