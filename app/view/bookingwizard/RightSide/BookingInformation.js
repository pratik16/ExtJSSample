Ext.define('Regardz.view.bookingwizard.RightSide.BookingInformation', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.rightbookingninformation',
    localObject: {},
    loadMask: true,
    initComponent: function () {
        var me = this;
        me.marginLeft = "0 0 0 50";
        me.loadMask = true;
        //This needs to be passed

        me.buttonAdd = Ext.create('Ext.Button', {
            scale: 'small',
            itemid: 'bookingInformationCompanyContractId',
            action: 'openCompanyContract',
            iconCls: 'contract',
            //margin: '10 0 5 10',
            border: true,
            disabled: true,
            iconAlign: 'left'
        });

        me.hideitems = true;

        //        me.tbar = [    
        //            me.buttonAdd
        //        ];

        me.ContactInformation = {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: none',
            itemid: 'bookingInfoPanelForm',
            //layout: 'form',
            width: '93%',
            margin: '5',
            defaults: {
                margin: '0',
                labelWidth: 110
            },
            items: [
                {
                    xtype: 'hidden',
                    name: 'ContractId'
                },
                {
                    xtype: 'displayfield',
                    margin: '0',
                    fieldLabel: 'Company'.l('SC50000'),
                    name: 'CompanyName',
                    labelWidth: 110
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Contact'.l('SC50000'),
                    labelWidth: 110,
                    margin: '0',
                    name: 'Contact'
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'E-mail'.l('SC50000'),
                    margin: '0',
                    labelWidth: 110,
                    name: 'Email'
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Telephone'.l('SC50000'),
                    margin: '0',
                    labelWidth: 110,
                    name: 'Phone'
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Bookings in res.'.l('SC50000'),
                    margin: '0 0 15 0',
                    labelWidth: 110,
                    name: 'BookingsInReservation',
                    itemid: 'BookingsInReservation'
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Status'.l('SC50000'),
                    margin: '0',
                    labelWidth: 110,
                    name: 'Status'
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Number'.l('SC50000'),
                    labelWidth: 110,
                    margin: '0',
                    name: 'BookingNumber'
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Start'.l('SC50000'),
                    // format: usr_dateformat,
                    margin: '0',
                    name: 'BookingStartDate'
                },
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'End'.l('SC50000'),
                        //format: usr_dateformat,                      
                        name: 'BookingEndDate'
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Location'.l('SC50000'),
                        margin: '0',
                        name: 'PropertyName'
                    },
                    {
                        xtype: 'displayfield',
                        fieldLabel: 'Number of people'.l('SC50000'),
                        margin: '0',
                        name: 'NoOfPeople'
                    },
                     {
                         xtype: 'displayfield',
                         fieldLabel: 'Meeting type'.l('SC50000'),
                         name: 'MeetingType'
                     },
                     {
                         xtype: 'displayfield',
                         fieldLabel: 'Package'.l('SC50000'),
                         //margin: '0 0 15 0',
                         name: 'PackageName'
                     },
                     {
                         layout: 'hbox',
                         width: '100%',
                         margin: '0 0 15 0',
                         border: 0,
                         items: [{
                             xtype: 'displayfield',
                             width: '33%',
                             fieldLabel: 'Price per person'.l('SC50000')
                         }, {
                             xtype: 'displayfield',
                             width: '33%',
                             style: 'text-align: right',
                             margin: '0 10 0 0',
                             //name: 'PackagePrice',
                             itemid: 'PkgPricePerPerson'
                         }, {
                             xtype: 'displayfield',
                             width: '33%',
                             //margin: '0 0 0 10',
                             style: 'text-align: right',
                             //name: 'AlternateBarPackagePrice',
                             itemid: 'AlterPkgPricePerPerson',
                             hidden: me.hideitems
                         }]
                     },
					{
						xtype: 'container',
						layout: 'column',
						items: [
							{
								xtype: 'displayfield',
								columnWidth: 0.33,
								fieldLabel: 'BAR'.l('SC50000')
							}, {
								xtype: 'displayfield',
								columnWidth: 0.33,
								margin: '0 10 0 0',
								//name: 'Bar',
								itemid: 'Bar'
							}, {
								xtype: 'displayfield',
								columnWidth: 0.33,
								//name: 'AlternateBar',
								itemid: 'AlternateBar',
								hidden: me.hideitems
							}
						]					
					},
					{
					    xtype: 'container',
						layout: 'column',
						items: [
							{
								xtype: 'displayfield',
								columnWidth: 0.33,
								fieldLabel: 'Price Type'.l('SC50000')
							}, {
								xtype: 'displayfield',
								columnWidth: 0.33,
								margin: '0 10 0 0',
								//name: 'PriceTypeText',
								itemid: 'PriceTypeText'
							}, {
								xtype: 'displayfield',
								columnWidth: 0.33
								//margin: '0 0 0 10'
							}
						]
					},
					{
					    xtype: 'container',
						layout: 'column',
						items: [
							{
								xtype: 'displayfield',
								columnWidth: 0.33,
								fieldLabel: 'Package'.l('SC50000')
							}, {
								xtype: 'displayfield',
								columnWidth: 0.33,
								style: 'text-align: right',
								margin: '0 10 0 0',
								//name: 'PackagePrice',
								itemid: 'PackagePrice'
							}, {
								xtype: 'displayfield',
								columnWidth: 0.33,
								//margin: '0 0 0 10',
								style: 'text-align: right',
								//name: 'AlternateBarPackagePrice',
								itemid: 'AlternateBarPackagePrice',
								hidden: me.hideitems
							}
						]
					},
					{
					    xtype: 'container',
						layout: 'column',
						items: [
							{
								xtype: 'displayfield',
								columnWidth: 0.33,
								fieldLabel: 'Room rent'.l('SC50000')
							}, {
								xtype: 'displayfield',
								columnWidth: 0.33,
								style: 'text-align: right',
								margin: '0 10 0 0',
								// name: 'RoomRent',
								itemid: 'RoomRent'
							}, {
								xtype: 'displayfield',
								columnWidth: 0.33,
								//margin: '0 0 0 10',
								style: 'text-align: right',
								// name: 'AlternateBarRoomRent',
								itemid: 'AlternateBarRoomRent',
								hidden: me.hideitems
							}
						]
					},
					{
					    xtype: 'container',
						layout: 'column',
						items: [
							{
								xtype: 'displayfield',
								columnWidth: 0.33,
								fieldLabel: 'Extra items'.l('SC50000')
							}, {
								xtype: 'displayfield',
								columnWidth: 0.33,
								margin: '0 10 2 0',
								style: 'text-align: right;border-bottom: 1px solid Black !important;',
								//name: 'ExtraItems',
								itemid: 'ExtraItems'
							}, {
								xtype: 'displayfield',
								columnWidth: 0.33,
								margin: '0 0 2 0',
								style: 'text-align: right;border-bottom: 1px solid Black !important;', //margin-right:10px; 
								//name: 'AlternateBarExtraItems',
								itemid: 'AlternateBarExtraItems',
								hidden: me.hideitems
							}
						]
					},
					{
					    xtype: 'container',
						layout: 'column',
						items: [
							{
								xtype: 'displayfield',
								columnWidth: 0.33,
								fieldLabel: 'Sub total'.l('SC50000')
							}, {
								xtype: 'displayfield',
								columnWidth: 0.33,
								margin: '0 10 0 0',
								style: 'text-align: right',
								//name: 'TotalPrice',
								itemid: 'TotalPrice'
							}, {
								xtype: 'displayfield',
								columnWidth: 0.33,
								//margin: '0 0 0 10',
								style: 'text-align: right',
								//name: 'AlternateBarTotalPrice',
								itemid: 'AlternateBarTotalPrice',
								hidden: me.hideitems
							}
						]
					},
					{
					    xtype: 'container',
						layout: 'column',
						items: [
							{
								xtype: 'displayfield',
								columnWidth: 0.33,
								fieldLabel: 'Disc. on Invoice'.l('SC50000')
							}, {
								xtype: 'displayfield',
								columnWidth: 0.33,
								margin: '0 10 2 0',
								style: 'text-align: right;', /* Trello #633 remove hr line */
								//name: 'DiscountOnInvoice',
								itemid: 'DiscountOnInvoice'
							}, {
								xtype: 'displayfield',
								columnWidth: 0.33,
								margin: '0 0 2 0',
								style: 'text-align: right;', /* Trello #633 remove hr line */
								//name: 'AlternateDiscountOnInvoice',
								itemid: 'AlternateDiscountOnInvoice',
								hidden: me.hideitems
							}
						]
					},
					{
					    xtype: 'container',
						layout: 'column',
						items: [
							{
								xtype: 'displayfield',
								columnWidth: 0.33,
								fieldLabel: 'Total price'.l('SC50000')
							}, {
								xtype: 'displayfield',
								columnWidth: 0.33,
								margin: '0 10 0 0',
								style: 'text-align: right',
								//name: 'TotalPriceWD',
								itemid: 'TotalPriceWD'
							}, {
								xtype: 'displayfield',
								columnWidth: 0.33,
								//margin: '0 0 0 10',
								style: 'text-align: right',
								// name: 'AlternateTotalPriceWD',
								itemid: 'AlternateTotalPriceWD',
								hidden: me.hideitems
							}
						]
					},
					{
					    xtype: 'container',
						layout: 'column',
						items: [
							{
								xtype: 'displayfield',
								columnWidth: 0.33,
								fieldLabel: 'VAT (+)'.l('SC50000')
							}, {
								xtype: 'displayfield',
								columnWidth: 0.33,
								margin: '0 10 2 0',
								style: 'text-align: right; border-bottom: 1px solid Black !important;',
								//name: 'TotalVat',
								itemid: 'TotalVat'
							}, {
								xtype: 'displayfield',
								columnWidth: 0.33,
								margin: '0 0 2 0',
								style: 'text-align: right; border-bottom: 1px solid Black !important;',
								//name: 'AlternateTotalVat',
								itemid: 'AlternateTotalVat',
								hidden: me.hideitems
							}
						]
					},
					{
					    xtype: 'container',
						layout: 'column',
						items: [
							{
								xtype: 'displayfield',
								columnWidth: 0.33,
								fieldLabel: 'Gross Price'.l('SC50000')
							}, {
								xtype: 'displayfield',
								columnWidth: 0.33,
								margin: '0 10 0 0',
								style: 'text-align: right',
								//name: 'TotalPriceWVT',
								itemid: 'TotalPriceWVT'
							}, {
								xtype: 'displayfield',
								columnWidth: 0.33,
								//margin: '0 0 0 10',
								style: 'text-align: right',
								//name: 'AlternateTotalPriceWVT',
								itemid: 'AlternateTotalPriceWVT',
								hidden: me.hideitems
							}
						]
					},
                 {
                     xtype: 'displayfield',
                     width: '100%',
                     margin: '5 0 0 0',
                     name: 'Room',
                     renderer: columnWrap
                 },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'External Remark'.l('SC50000'),
                    width: '100%',
                    margin: '10 0 0 0',
                    name: 'ExternalNoteText',
                    itemid: 'ExternalNoteText',
                    renderer: columnWrap
                },
                {
                    xtype: 'displayfield',
                    fieldLabel: 'Internal Remark'.l('SC50000'),
                    width: '100%',
                    name: 'InternalNoteText',
                    itemid: 'InternalNoteText',
                    renderer: columnWrap
                }]
        };

        me.items = [
            me.ContactInformation
        ]
        me.callParent();
    }
});