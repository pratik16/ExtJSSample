Ext.define('Regardz.view.company.MergeOverview', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.mergeoverview',
    //store: 'company.MergeCompaniesStore',   
    modal: true,
    border: false,
    autoShow: true,
    width: parseInt(Ext.getBody().getViewSize().width * (0.95)),
    initComponent: function () {
        var me = this;
        me.autoScroll = true;

        var isHidden = true;
        var fieldHidden = true;

        me.items = [
		{
		    xtype: 'form',
		    border: false,
		    //width: me.width,                       
		    defaults: { anchor: '100%' },
		    padding: '10px 10px 10px 10px',
		    layout: 'hbox',
		    hidden: isHidden,
		    itemid: 'generalinfoGroup',
		    items: [
				{
				    xtype: 'fieldset',
				    title: 'General Info'.l('SC61140'),
				    itemid: 'generalinfoL',
				    width: parseInt(me.width * (0.40)),
				    items: [
						{ xtype: 'displayfield', fieldLabel: 'Phone'.l('SC61140'), name: 'PhoneL', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Fax'.l('SC61140'), name: 'FaxL', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Market segment'.l('SC61140'), name: 'MarketSegmentL', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'SICC'.l('SC61140'), name: 'SICCL', hidden: fieldHidden, labelWidth: 155 }
					]
				},
				{ xtype: 'tbspacer', width: '4%' },
				{
				    xtype: 'field',
				    width: 20,
				    //height: 100,
				    padding: '25 0 0 0',
				    align: top,
				    fieldSubTpl: new Ext.XTemplate('<img src="public/icons/arrow_left_green.png"/>')
				},
				{ xtype: 'tbspacer', width: '4%' },
				{
				    xtype: 'fieldset',
				    title: 'General Info'.l('SC61140'),
				    itemid: 'generalinfoR',
				    width: parseInt(me.width * (0.40)),
				    items: [
						{ xtype: 'displayfield', fieldLabel: 'Phone'.l('SC61140'), name: 'PhoneR', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Fax'.l('SC61140'), name: 'FaxR', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Market segment'.l('SC61140'), name: 'MarketSegmentR', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'SICC'.l('SC61140'), name: 'SICCR', hidden: fieldHidden, labelWidth: 155 }
					]
				}

			]
		},

        {
            xtype: 'form',
            border: false,
            //width: me.width,                       
            defaults: { anchor: '100%', width: '35%' },
            padding: '10px 10px 10px 10px',
            layout: 'hbox',
            itemid: 'InternetInfoGroup',
            hidden: isHidden,
            items: [
				{
				    xtype: 'fieldset',
				    title: 'Internet Info'.l('SC61140'),
				    itemid: 'internetinfoL',
				    width: parseInt(me.width * (0.40)),
				    items: [
						{ xtype: 'displayfield', fieldLabel: 'Web address'.l('SC61140'), name: 'webaddressL', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Twitter'.l('SC61140'), name: 'TwitterL', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Facebook'.l('SC61140'), name: 'FacebookL', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'LinkedIn'.l('SC61140'), name: 'LinkedInL', hidden: fieldHidden, labelWidth: 155 }
					]
				},
				{ xtype: 'tbspacer', width: '4%' },
				{
				    xtype: 'field',
				    width: 20,
				    //height: 100,		
				    padding: '25 0 0 0',
				    align: top,
				    fieldSubTpl: new Ext.XTemplate('<img src="public/icons/arrow_left_green.png"/>')
				},
				{ xtype: 'tbspacer', width: '4%' },
				{
				    xtype: 'fieldset',
				    title: 'Internet Info'.l('SC61140'),
				    itemid: 'internetinfoR',
				    width: parseInt(me.width * (0.40)),
				    items: [
						{ xtype: 'displayfield', fieldLabel: 'Web address'.l('SC61140'), name: 'webaddressR', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Twitter'.l('SC61140'), name: 'TwitterR', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Facebook'.l('SC61140'), name: 'FacebookR', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'LinkedIn'.l('SC61140'), name: 'LinkedInR', hidden: fieldHidden, labelWidth: 155 }
					]
				}
			]
        },
		 {
		     xtype: 'form',
		     border: false,
		     //width: me.width,                       
		     defaults: { anchor: '100%', width: '35%' },
		     padding: '10px 10px 10px 10px',
		     layout: 'hbox',
		     hidden: isHidden,
		     itemid: 'InvoiceAddressGroup',
		     items: [
				{
				    xtype: 'fieldset',
				    title: 'Invoice Address'.l('SC61140'),
				    itemid: 'invoiceaddressL',
				    width: parseInt(me.width * (0.40)),
				    items: [
						{ xtype: 'displayfield', fieldLabel: 'Address'.l('SC61140'), name: 'AddressInvoiceL', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Postal code'.l('SC61140'), name: 'PostalcodeInvoiceL', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'City'.l('SC61140'), name: 'CityInvoiceL', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Country'.l('SC61140'), name: 'CountryInvoiceL', hidden: fieldHidden, labelWidth: 155 }
					]
				},
				{ xtype: 'tbspacer', width: '4%' },
				{
				    xtype: 'field',
				    width: 20,
				    //height: 100,		
				    padding: '25 0 0 0',
				    align: top,
				    fieldSubTpl: new Ext.XTemplate('<img src="public/icons/arrow_left_green.png"/>')
				},
				{ xtype: 'tbspacer', width: '4%' },
				{
				    xtype: 'fieldset',
				    title: 'Invoice Address'.l('SC61140'),
				    itemid: 'invoiceaddressR',
				    width: parseInt(me.width * (0.40)),
				    items: [
						{ xtype: 'displayfield', fieldLabel: 'Address'.l('SC61140'), name: 'AddressInvoiceR', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Postal code'.l('SC61140'), name: 'PostalcodeInvoiceR', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'City'.l('SC61140'), name: 'CityInvoiceR', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Country'.l('SC61140'), name: 'CountryInvoiceR', hidden: fieldHidden, labelWidth: 155 }
					]
				}

			]
		 },

		{
		    xtype: 'form',
		    border: false,
		    //width: me.width,                       
		    defaults: { anchor: '100%', width: '35%' },
		    padding: '10px 10px 10px 10px',
		    layout: 'hbox',
		    hidden: isHidden,
		    itemid: 'VisitingAddressGroup',
		    items: [
				{
				    xtype: 'fieldset',
				    title: 'Visiting address'.l('SC61140'),
				    itemid: 'visitingaddressL',
				    width: parseInt(me.width * (0.40)),
				    items: [
						{ xtype: 'displayfield', fieldLabel: 'Address'.l('SC61140'), name: 'AddressVistingL', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Postal code'.l('SC61140'), name: 'PostalcodeVistingL', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'City'.l('SC61140'), name: 'CityVistingL', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Country'.l('SC61140'), name: 'CountryVistingL', hidden: fieldHidden, labelWidth: 155 }
					]
				},
				{ xtype: 'tbspacer', width: '4%' },
				{
				    xtype: 'field',
				    width: 20,
				    //height: 100,		
				    padding: '25 0 0 0',
				    align: top,
				    fieldSubTpl: new Ext.XTemplate('<img src="public/icons/arrow_left_green.png"/>')
				},
				{ xtype: 'tbspacer', width: '4%' },
				{
				    xtype: 'fieldset',
				    title: 'Visiting address'.l('SC61140'),
				    itemid: 'visitingaddressR',
				    width: parseInt(me.width * (0.40)),
				    items: [
						{ xtype: 'displayfield', fieldLabel: 'Address'.l('SC61140'), name: 'AddressVistingR', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Postal code'.l('SC61140'), name: 'PostalcodeVistingR', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'City'.l('SC61140'), name: 'CityVistingR', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Country'.l('SC61140'), name: 'CountryVistingR', hidden: fieldHidden, labelWidth: 155 }
					]
				}

			]
		},

		 {
		     xtype: 'form',
		     border: false,
		     //width: me.width,                       
		     defaults: { anchor: '100%', width: '35%' },
		     padding: '10px 10px 10px 10px',
		     layout: 'hbox',
		     hidden: isHidden,
		     itemid: 'PostalAddressGroup',
		     items: [
				{
				    xtype: 'fieldset',
				    title: 'Postal address'.l('SC61140'),
				    itemid: 'postaladdressL',
				    width: parseInt(me.width * (0.40)),
				    items: [
						{ xtype: 'displayfield', fieldLabel: 'Address'.l('SC61140'), name: 'AddressPostalL', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Postal code'.l('SC61140'), name: 'PostalcodePostalL', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'City'.l('SC61140'), name: 'CityPostalL', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Country'.l('SC61140'), name: 'CountryPostalL', hidden: fieldHidden, labelWidth: 155 }
					]
				},
				{ xtype: 'tbspacer', width: '4%' },
				{
				    xtype: 'field',
				    width: 20,
				    //height: 100,	
				    padding: '25 0 0 0',
				    align: top,
				    fieldSubTpl: new Ext.XTemplate('<img src="public/icons/arrow_left_green.png"/>')
				},
				{ xtype: 'tbspacer', width: '4%' },
				{
				    xtype: 'fieldset',
				    title: 'Postal address'.l('SC61140'),
				    itemid: 'postaladdressR',
				    width: parseInt(me.width * (0.40)),
				    items: [
						{ xtype: 'displayfield', fieldLabel: 'Address'.l('SC61140'), name: 'AddressPostalR', labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Postal code'.l('SC61140'), name: 'PostalcodePostalR', labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'City'.l('SC61140'), name: 'CityPostalR', labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Country'.l('SC61140'), name: 'CountryPostalR', labelWidth: 155 }
					]
				}
			]
		 },

         {
             xtype: 'form',
             border: false,
             //width: me.width,                       
             defaults: { anchor: '100%', width: '35%' },
             padding: '10px 10px 10px 10px',
             layout: 'hbox',
             hidden: isHidden,
             itemid: 'ContactGroup',
             items: [
				{
				    xtype: 'fieldset',
				    title: 'Users'.l('SC61140'),
				    itemid: 'UsersL',
				    width: parseInt(me.width * (0.40)),
				    items: [
						{ xtype: 'displayfield', name: 'UsersL', hidden: fieldHidden, labelWidth: 155 }
					]
				},
				{ xtype: 'tbspacer', width: '4%' },
				{
				    xtype: 'field',
				    width: 20,
				    //height: 100,
				    padding: '25 0 0 0',
				    align: top,
				    fieldSubTpl: new Ext.XTemplate('<img src="public/icons/arrow_left_green.png"/>')
				},
				{ xtype: 'tbspacer', width: '4%' },
				{
				    xtype: 'fieldset',
				    title: 'Users'.l('SC61140'),
				    itemid: 'UsersR',
				    width: parseInt(me.width * (0.40)),
				    items: [
						{ xtype: 'displayfield', name: 'UsersR', labelWidth: 155 }
					]
				}

			]
         },

		 {
		     xtype: 'form',
		     border: false,
		     //width: me.width,                       
		     defaults: { anchor: '100%', width: '35%' },
		     padding: '10px 10px 10px 10px',
		     layout: 'hbox',
		     itemid: 'SalesGroup',
		     hidden: isHidden,
		     items: [
				{
				    xtype: 'fieldset',
				    title: 'Sales'.l('SC61140'),
				    itemid: 'salesL',
				    width: parseInt(me.width * (0.40)),
				    items: [
						{ xtype: 'displayfield', fieldLabel: 'Sales manager'.l('SC61140'), name: 'SalesManageL', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Sales manager assistant'.l('SC61140'), name: 'SalesManagerAssistantL', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Lead source'.l('SC61140'), name: 'LeadSourceL', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Company status'.l('SC61140'), name: 'CompanyStatusL', hidden: fieldHidden, labelWidth: 155 },
                        { xtype: 'displayfield', fieldLabel: 'Quality rating'.l('SC61140'), name: 'QualityRatingL', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Business type'.l('SC61140'), name: 'BusinessTypeL', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Credit status'.l('SC61140'), name: 'CreditStatusL', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Number of employees'.l('SC61140'), name: 'NumberOfEmployeesL', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Bookings per year'.l('SC61140'), name: 'BookingsPerYearL', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Group size'.l('SC61140'), name: 'GroupSizeL', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Roomnights per year'.l('SC61140'), name: 'RoomnightsPerYearL', hidden: fieldHidden, labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Lead status'.l('SC61140'), name: 'LeadStatusL', hidden: fieldHidden, labelWidth: 155 }
					]
				},
				{ xtype: 'tbspacer', width: '4%' },
				{
				    xtype: 'field',
				    width: 20,
				    //height: 100,	
				    padding: '25 0 0 0',
				    align: top,
				    fieldSubTpl: new Ext.XTemplate('<img src="public/icons/arrow_left_green.png"/>')
				},
				{ xtype: 'tbspacer', width: '4%' },
				{
				    xtype: 'fieldset',
				    title: 'Sales'.l('SC61140'),
				    itemid: 'salesR',
				    width: parseInt(me.width * (0.40)),
				    items: [
						{ xtype: 'displayfield', fieldLabel: 'Sales manager'.l('SC61140'), name: 'SalesManageR', labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Sales manager assistant'.l('SC61140'), name: 'SalesManagerAssistantR', labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Lead source'.l('SC61140'), name: 'LeadSourceR', labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Company status'.l('SC61140'), name: 'CompanyStatusR', labelWidth: 155 },
                        { xtype: 'displayfield', fieldLabel: 'Quality rating'.l('SC61140'), name: 'QualityRatingR', labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Business type'.l('SC61140'), name: 'BusinessTypeR', labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Credit status'.l('SC61140'), name: 'CreditStatusR', labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Number of employees'.l('SC61140'), name: 'NumberOfEmployeesR', labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Bookings per year'.l('SC61140'), name: 'BookingsPerYearR', labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Group size'.l('SC61140'), name: 'GroupSizeR', labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Roomnights per year'.l('SC61140'), name: 'RoomnightsPerYearR', labelWidth: 155 },
						{ xtype: 'displayfield', fieldLabel: 'Lead status'.l('SC61140'), name: 'LeadStatusR', labelWidth: 155 }
					]
				}
			]
		 },

		 {
		     xtype: 'form',
		     border: false,
		     //width: me.width,                       
		     defaults: { anchor: '100%', width: '35%' },
		     padding: '10px 10px 10px 10px',
		     layout: 'hbox',
		     hidden: isHidden,
		     itemid: 'ParentGroup',
		     items: [
				{
				    xtype: 'fieldset',
				    title: 'Parent'.l('SC61140'),
				    itemid: 'ParentL',
				    width: parseInt(me.width * (0.40)),
				    items: [
						{ xtype: 'displayfield', fieldLabel: 'Parent'.l('SC61140'), name: 'ParentL', hidden: fieldHidden, labelWidth: 155 }
					]
				},
				{ xtype: 'tbspacer', width: '4%' },
				{
				    xtype: 'field',
				    width: 20,
				    //height: 100,
				    padding: '25 0 0 0',
				    align: top,
				    fieldSubTpl: new Ext.XTemplate('<img src="public/icons/arrow_left_green.png"/>')
				},
				{ xtype: 'tbspacer', width: '4%' },
				{
				    xtype: 'fieldset',
				    title: 'Parent'.l('SC61140'),
				    itemid: 'ParentR',
				    width: parseInt(me.width * (0.40)),
				    items: [
						{ xtype: 'displayfield', fieldLabel: 'Parent'.l('SC61140'), name: 'ParentR', labelWidth: 155 }
					]
				}

			]
		 },

		 {
		     xtype: 'form',
		     border: false,
		     //width: me.width,                       
		     defaults: { anchor: '100%', width: '35%' },
		     padding: '10px 10px 10px 10px',
		     layout: 'hbox',
		     hidden: isHidden,
		     itemid: 'ChildrenGroup',
		     items: [
				{
				    xtype: 'fieldset',
				    title: 'Children'.l('SC61140'),
				    itemid: 'ChildrenL',
				    width: parseInt(me.width * (0.40)),
				    items: [
						{ xtype: 'displayfield', name: 'ChildrenL', hidden: fieldHidden, labelWidth: 155 }
					]
				},
				{ xtype: 'tbspacer', width: '4%' },
				{
				    xtype: 'field',
				    width: 20,
				    //height: 100,
				    padding: '25 0 0 0',
				    align: top,
				    fieldSubTpl: new Ext.XTemplate('<img src="public/icons/arrow_left_green.png"/>')
				},
				{ xtype: 'tbspacer', width: '4%' },
				{
				    xtype: 'fieldset',
				    title: 'Children'.l('SC61140'),
				    itemid: 'ChildrenR',
				    width: parseInt(me.width * (0.40)),
				    items: [
						{ xtype: 'displayfield', name: 'ChildrenR', labelWidth: 155 }
					]
				}

			]
		 },

		 {
		     xtype: 'form',
		     border: false,
		     //width: parseInt(me.width * (0.40)),
		     defaults: { anchor: '100%', width: '35%' },
		     padding: '10px 10px 10px 10px',
		     layout: 'hbox',
		     hidden: isHidden,
		     itemid: 'LogoGroup',
		     items: [
                {
                    xtype: 'fieldset',
                    title: 'Logo'.l('SC61140'),
                    itemid: 'LogoItemL',
                    width: parseInt(me.width * (0.40)),
                    items: [
						{ 
                            xtype: 'image',
						    title: 'Preview',
						    height: 100,
						    width: 100,
						    style: "border: 1px solid",
						    itemid: 'LogoOverviewL',
						    border: true
						}
					]
                },
				{ xtype: 'tbspacer', width: '4%' },
				{
				    xtype: 'field',
				    width: 20,
				    //height: 100,
				    padding: '25 0 0 0',
				    align: top,
				    fieldSubTpl: new Ext.XTemplate('<img src="public/icons/arrow_left_green.png"/>')
				},
				{ xtype: 'tbspacer', width: '4%' },
				{
				    xtype: 'fieldset',
				    title: 'Logo'.l('SC61140'),
				    itemid: 'LogoItemR',
				    width: parseInt(me.width * (0.40)),
				    items: [
						{
						    xtype: 'image',
						    title: 'Preview'.l('g'),
						    height: 100,
						    width: 100,
						    style: "border: 1px solid",
						    itemid: 'LogoOverviewR',
						    border: true
						}
					]
				}
			]
		 }
		];

        me.callParent(arguments);
    }
});