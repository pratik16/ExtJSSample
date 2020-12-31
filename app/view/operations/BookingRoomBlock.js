Ext.define('Regardz.view.operations.BookingRoomBlock', {
    extend: 'Ext.window.Window',
    alias: 'widget.bookingroomblock',
    modal: true,
    width: 800,
    border: false,
    title: 'Room Availability Block',
    layout: 'fit',
    viewConfig: {
        forceFit: true
    },

    autoShow: true,

    initComponent: function () {

        var me = this;

        me.padding = '25px';
        me.items = [{
            xtype: 'form',
            border: false,
            itemid: 'bookingroomblockform',
            bodyStyle: 'background: none',
            style: "padding:10px;",
            items: [
                    {
                        xtype: 'hidden',
                        name: 'RoomAvailabilityBlockId'
                    },
                    {
                        xtype: 'hidden',
                        name: 'SlotIds'
                    },
                    {
                        xtype: 'hidden',
                        name: 'PropertyId'
                    },
                    {
                        xtype: 'hidden',
                        name: 'RoomTypeId'
                    },
                    {
                        xtype: 'hidden',
                        name: 'RoomId'
                    },

                    {
                        xtype: 'datefield',
                        fieldLabel: 'Start date',
                        name: 'StartDate',
                        itemid: 'startdateid',
                        allowBlank: false,
                        format: usr_dateformat,
                        submitFormat: 'Y-m-d',                       
                        selectOnFocus: true,
                        layout: 'form',
                        flex: 1
                    },

                    {
		                xtype: 'datefield',
		                fieldLabel: 'End date',
		                name: 'EndDate',
		                itemid: 'enddateid',
		                minValue: new Date(),
		                allowBlank: false,
		                selectOnFocus: true,
		                format: usr_dateformat,
                        submitFormat: 'Y-m-d',
		                layout: 'form',
		                flex: 1
		            },
					{
					    xtype: 'panel',
					    layout: 'hbox',
					    bodyStyle: 'background: none',
					    border: false,
					    items: [{
					        xtype: 'label',
					        width: 100,
					        text: 'Slots:'
					    },
						{
						    xtype: 'checkboxgroup',
						    columns: 2,
                            name: 'slotsaa',
                            items: [
                                { name: 'slots', style: 'white-space:nowrap', 
                                  inputValue: '1', padding: 5, width: 120,
                                  checked: false, boxLabel: 'Slot 1'
                              },
                                { name: 'slots', style: 'white-space:nowrap',
                                    inputValue: '2', padding: 5, width: 120,
                                    checked: false, boxLabel: 'Slot 2'
                                },
                                { name: 'slots', style: 'white-space:nowrap',
                                    inputValue: '3', padding: 5, width: 120,
                                    checked: false, boxLabel: 'Slot 3'
                                }
                            ]
                        }]
                    }, 
                    
                    
                    
                    
                    
                    {
					    xtype: 'textarea',
					    fieldLabel: 'Comments',
					    name: 'Comment',
					    allowBlank: false,
					    anchor: '100%',
					    maxLength: 500
					}
				],
            buttons: [{
                text: 'Cancel'.l('w'),
                scope: me,
                handler: function () {
                    this.close();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveRoomAvailabilityBlock'
            }]
        }];

        me.callParent(arguments);
    }
});