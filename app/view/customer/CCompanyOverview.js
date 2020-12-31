
Ext.define('Regardz.view.customer.CCompanyOverview', {
	extend : 'Ext.window.Window',
	alias : 'widget.ccompanyoverview',
	modal : true,
	width : 1220,
	border : false,
	title : 'Company Overview', //.l('SC61100'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('CompanyOverview'))
			Ext.getCmp('CompanyOverview').destroy();

		var me = this;
		me.items = [{
				xtype : 'form',
				id : 'CompanyOverview',
				border : false,
				bodyStyle : 'padding:5px 5px 0',
				//width: 350,
				fieldDefaults : {
					msgTarget : 'side',
					labelWidth : 100
				},
				defaults : {
					anchor : '100%'
				},

				fileUpload : true,
				items : [{
						xtype : 'panel',
						//frame: true,
						width : 300,
						border : false,
						style : 'background:none; border:0px;',
						layout : 'hbox',
						padding : '0 0 5 0',
						items : [{
								xtype : 'panel',
								//frame: true,
								border : false,
								style : 'background:none; border:0px;',
								layout : 'vbox',
								padding : '0 0 5 0',
								items : [{
										xtype : 'fieldset',
										title : 'General Information'.l('SC61100'),
										width : 300,
										height : 250,
										autoScroll : true,
										//collapsible: true,
										defaultType : 'textfield',
										//layout: 'fit',
										defaults : {
											//anchor: '100%'
										},
										items : [{
												fieldLabel : 'Name'.l('SC61100'),
												allowBlank : false,
												name : 'Name'
											}, {
												xtype : 'panel',
												//frame: true,
												border : false,
												style : 'background:none; border:0px;',
												layout : 'hbox',
												padding : '0 0 5 0',
												items : [{
														xtype : 'textfield',
														fieldLabel : 'Abbreviation'.l('SC61100'),
														name : 'Abbreviation'
													}, {
														xtype : 'button',
														action : 'searchCompany',
														iconCls : 'icon-company',
														margin : '0',
														//                    height: 20,
														//                    width: 20,
														tooltip : 'Search/Add company'.l('SC50000')
													}
												]
											}, {
												fieldLabel : 'Agency'.l('SC61100'),
												vtype : 'email',
												allowBlank : false,
												name : 'Email'

											}, {
												fieldLabel : 'Account ID'.l('SC61100'),
												name : 'Phone'
											}, {
												fieldLabel : 'Phone'.l('SC61100'),
												name : 'Mobile'
											}, {
												name : 'Fax',
												//value: 'radiovalue1',
												fieldLabel : 'Fax'.l('SC61100')
											}, {
												xtype : 'panel',
												//frame: true,
												border : false,
												style : 'background:none; border:0px;',
												layout : 'hbox',
												padding : '0 0 5 0',
												items : [{
														xtype : 'label',
														width : 100,
														text : 'Visiting address:'
													}, {
														xtype : 'button',
														text : 'view'
													}
												]
											}, {
												xtype : 'panel',
												//frame: true,
												border : false,
												style : 'background:none; border:0px;',
												layout : 'hbox',
												padding : '0 0 5 0',
												items : [{
														xtype : 'label',
														width : 100,
														text : 'Postal addres:'
													}, {
														xtype : 'button',
														text : 'add',
														cls : 'background-position: 1000px 1000px;'

													}
												]
											}

										]
									}, {
										xtype : 'contactslist',
										width : 300,
										height : 300
									}
								]
							}, {
								xtype : 'tbspacer',
								width : 25
							}, {
								xtype : 'panel',
								//frame: true,

								border : false,
								style : 'background:none; border:0px;',
								layout : 'vbox',
								padding : '0 0 5 0',
								items : [{
										xtype : 'fieldset',
										title : 'View'.l('SC61300'),
										width : 450,
										height : 250,
										//collapsible: true,
										defaultType : 'textfield',
										layout : 'anchor',
										//style: 'padding-left:30px',
										defaults : {
											anchor : '100%'
										},
										items : [
											//                            { xtype: 'textarea',
											//                                //fieldLabel: 'Address'.l('SC61300'),
											//                                allowBlank: false,
											//                                //height: 250,
											//                                name: 'Comments'
											//                            },
										]
									}, {
										xtype : 'bookingslist',
										width : 450,
										height : 300
									}
								]
							}, {
								xtype : 'tbspacer',
								width : 25
							}, {
								xtype : 'panel',
								//frame: true,
								border : false,
								width : 400,
								style : 'background:none; border:0px;',
								layout : 'vbox',
								padding : '0 0 5 0',
								items : [{
										xtype : 'panel',
										//frame: true,
										border : false,
										width : 400,
										style : 'background:none; border:0px;',
										layout : 'hbox',
										padding : '0 0 5 0',
										items : [{
												xtype : 'fieldset',
												title : 'Relations'.l('SC61100'),
												width : 300,
												height : 250,
												//collapsible: true,
												defaultType : 'textfield',
												layout : 'anchor',
												//style: 'padding-left:30px',
												defaults : {
													anchor : '100%'
												},
												items : [{
														fieldLabel : 'Parent company'.l('SC61100'),
														name : 'Firstname'
													}, {
														fieldLabel : 'Child companies'.l('SC61100'),
														name : 'Firstname'
													}, {
														fieldLabel : 'Agency'.l('SC61100'),
														name : 'Firstname'
													}
												]
											}, {
												xtype : 'tbspacer',
												width : 25
											}, {
												xtype : 'fieldset',
												//title: 'Relations'.l('SC61100'),
												width : 80,
												height : 250,
												//collapsible: true,
												defaultType : 'textfield',
												layout : 'anchor',
												//style: 'padding-left:30px',
												defaults : {
													anchor : '100%'
												},
												items : [{
														xtype : 'textarea'
													}, {
														xtype : 'textfield'
													}, {
														xtype : 'textarea'
													}
												]
											}
										]
									}, {
										xtype : 'tasklist',
										width : 400,
										height : 300
									}
								]
							}
						]
					}

				],
				buttons : [{
						text : 'Cancel'.l('w'),

						handler : function () {
							me.close();
							//me.destroy();
						}
					}, {
					    text: 'Next'.l('w'), //.l('w'),
						action : 'saveOverview'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});