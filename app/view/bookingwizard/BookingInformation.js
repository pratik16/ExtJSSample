var searchLocationRangeStore = new Ext.data.SimpleStore({
    fields: ["value", "Distance"],
    data: [
			[10, 10],
			[15, 15],
			[20, 20],
			[25, 25],
			[30, 30],
			[40, 40],
			[50, 50]]
});

Ext.define('Regardz.view.bookingwizard.BookingInformation', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.bookinginformation',
    initComponent: function () {

        var me = this;

        me.items = [
			{
				xtype: 'form',
				//id: 'bookingInformation',
				itemid: 'bookingInformation',
				border: false,
				bodyStyle: 'background: none',
				defaults: { padding: '0 0 15px 0', anchor: '100%' },
				items: [{
					xtype: 'fieldcontainer',
					fieldLabel: 'Wizard'.l('SC51000') + '*',
					defaultType: 'radiofield',
					allowBlank: false,
					// defaults: { flex: 1 },
					layout: 'vbox',
					items: [{
						boxLabel: 'Booking'.l('SC51000'),
						name: 'Wizard',
						inputValue: 1,
						checked: true
					}, {
						boxLabel: 'Quotation'.l('SC51000'),
						name: 'Wizard',
						inputValue: 2
					}, {
						boxLabel: 'Quotation without date'.l('SC51000'),
						name: 'Wizard',
						inputValue: 3,
						listeners: {
							change: function (cb, nv, ov) {
								var from = Ext.ComponentQuery.query('[itemid="bookingInformation"]')[0];
								if (nv) {
									 
									/*Ext.getCmp('bookingInformation').getForm().findField('StartDate').disable();
									Ext.getCmp('bookingInformation').getForm().findField('StartTime').disable();
									Ext.getCmp('bookingInformation').getForm().findField('EndDate').disable();
									Ext.getCmp('bookingInformation').getForm().findField('EndTime').disable();
									Ext.getCmp('bookingInformation').getForm().findField('Distance').disable();*/
									from.getForm().findField('StartDate').disable();
									from.getForm().findField('StartTime').disable();
									from.getForm().findField('EndDate').disable();
									from.getForm().findField('EndTime').disable();
									from.getForm().findField('Distance').disable();
								} else {
									/*Ext.getCmp('bookingInformation').getForm().findField('StartDate').enable();
									Ext.getCmp('bookingInformation').getForm().findField('StartTime').enable();
									Ext.getCmp('bookingInformation').getForm().findField('EndDate').enable();
									Ext.getCmp('bookingInformation').getForm().findField('EndTime').enable();
									Ext.getCmp('bookingInformation').getForm().findField('Distance').enable();*/
									
									from.getForm().findField('StartDate').enable();
									from.getForm().findField('StartTime').enable();
									from.getForm().findField('EndDate').enable();
									from.getForm().findField('EndTime').enable();
									from.getForm().findField('Distance').enable();
									
								}
							}
						}
					}
					  ]
				}, {
					xtype: 'textfield',
					fieldLabel: 'Booking Name'.l('SC51000') + '*',
					name: 'BookingName',
					allowBlank: false,
					selectOnFocus: true
				}, {
					layout: 'hbox',
					flex: 1,
					items: [{
						xtype: 'combo',
						layout: 'form',
						flex: 1,
						fieldLabel: 'Location'.l('SC51000') + '*',
						name: 'LocationName',
						forceSelection: true,
						queryMode: 'remote',
						displayField: 'PropertyName',
						allowBlank: false,
						valueField: 'PropertyId',
						//width: 75,
						typeAhead: true,
						//hideLabel: true,
						hideTrigger: true,
						triggerAction: 'all',
						minChars: 1,
						store: Ext.getStore('common.PropertyForNamesStore')
					}, {
						xtype: 'displayfield',
						width: 10
					}, {
						xtype: 'combo',
						name: 'Distance',
						forceSelection: true,
						displayField: 'Distance',
						//allowBlank: false,
						valueField: 'value',
						width: 75,
						store: searchLocationRangeStore
					}
					]
				}, {
					layout: 'hbox',
					flex: 1,
					items: [{
						xtype: 'datefield',
						fieldLabel: 'Start date'.l('SC51000') + '*',
						name: 'StartDate',
						allowBlank: false,
						format: 'Y-m-d H:i:s',
						selectOnFocus: true,
						layout: 'form',
						flex: 1
					}, {
						xtype: 'displayfield',
						width: 10
					}, {
						xtype: 'timefield',
						name: 'StartTime',
						allowBlank: false,
						minValue: '8:30',
						maxValue: '22:00',
						format: "H:i",
						selectOnFocus: true,
						width: 75,
						increment: 30
					}
					]
				},
					{
						layout: 'hbox',
						flex: 1,
						items: [{
							xtype: 'datefield',
							fieldLabel: 'End date'.l('SC51000') + '*',
							name: 'EndDate',
							allowBlank: false,
							selectOnFocus: true,
							format: 'Y-m-d H:i:s',
							layout: 'form',
							flex: 1
						}, {
							xtype: 'displayfield',
							width: 10
						}, {
							xtype: 'timefield',
							name: 'EndTime',
							allowBlank: false,
							minValue: '8:30',
							maxValue: '22:00',
							format: "H:i",
							submitFormat: "H:i",
							selectOnFocus: true,
							increment: 30,
							width: 75
						}
						]
					},
					{
						xtype: 'textfield',
						fieldLabel: 'No of People'.l('SC51000') + '*',
						name: 'NumberOfPeople',
						selectOnFocus: true,
						allowBlank: false,
						vtype: 'onlyNumber'
					}, {
						xtype: 'combo',
						name: 'RoomSetupId',
						fieldLabel: 'Setup'.l('SC51000') + '*',
						forceSelection: true,
						displayField: 'Arrangement',
						allowBlank: false,
						valueField: 'RoomSetupId',
						store: 'common.RoomSetupStore'
					}, {
						xtype: 'combo',
						name: 'PropertyFeatureId',
						fieldLabel: 'Meeting Type'.l('SC51000') + '*',
						//forceSelection: true,
						displayField: 'PropertyFeatureName',
						allowBlank: false,
						valueField: 'PropertyFeatureId',
						store: 'common.MeetingTypeStore'
					},

					{
						xtype: 'hiddenfield',
						name: 'CreatedDate'
					}, {
						xtype: 'hiddenfield',
						name: 'CreatedBy'
					}, {
						xtype: 'hiddenfield',
						name: 'UpdatedDate'
					}, {
						xtype: 'hiddenfield',
						name: 'UpdatedBy'
					},
					{
						xtype: 'hiddenfield',
						name: 'BookingId',
						value: 0
					}, {
						xtype: 'hiddenfield',
						name: 'ReservationId',
						value: 0
					}, {
						xtype: 'hiddenfield',
						name: 'PropertyId'
					},
					{
						xtype: 'hiddenfield',
						name: 'CompanyId'
					},
					{
						xtype: 'hiddenfield',
						name: 'IndividualId'
		            },
                    {
                        xtype: 'hiddenfield',
                        name: 'PhoneType'
                    },
					{
						xtype: 'hiddenfield',
						name: 'BookingWizardId'
					}
				]
			}
		];
        me.callParent(arguments);
    }
});