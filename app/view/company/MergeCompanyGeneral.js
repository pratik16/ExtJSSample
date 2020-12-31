Ext.define('Regardz.view.company.MergeCompanyGeneral', {
	extend : 'Ext.window.Window',
	alias : 'widget.mergecompanygeneral',
	modal : true,
	width : 930,
	border : false,
	//title: 'Company Overview', //.l('SC61100'),
	autoShow : true,
	initComponent : function () {

		if (Ext.getCmp('mergeCompanyGeneral'))
			Ext.getCmp('mergeCompanyGeneral').destroy();

		var me = this;
		me.items = [{
				xtype : 'form',
				id : 'mergeCompanyGeneral',
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
						width : 400,
						border : false,
						style : 'background:none; border:0px;',
						layout : 'hbox',
						// padding: '0 0 5 0',
						items : [{
								xtype : 'panel',
								//frame: true,
								width : 400,
								border : false,
								style : 'background:none; border:0px;',
								layout : 'vbox',
								// padding: '0 0 5 0',
								items : [{
										xtype : 'fieldset',
										title : 'General Info'.l('SC61300'),
										width : 400,
										//collapsible: true,
										defaultType : 'textfield',
										layout : 'anchor',
										//style: 'padding-left:30px',
										defaults : {
											anchor : '100%'
										},

										items : [{
												xtype : 'displayfield',
												fieldLabel : 'Address'.l('SC61300'),
												name : 'Address1_Postal'
											}, {
												xtype : 'displayfield',
												fieldLabel : 'Postal code'.l('SC61300'),
												name : 'Pincode_Postal'
											}, {
												xtype : 'displayfield',
												fieldLabel : 'City'.l('SC61300'),
												name : 'City_Postal'
											}, {
												xtype : 'displayfield',
												fieldLabel : 'Country'.l('SC61300'),
												name : 'Country_Postal'

											}
										]
									}, {
										xtype : 'fieldset',
										title : 'Internet Info'.l('SC61300'),
										width : 400,
										//collapsible: true,
										defaultType : 'textfield',
										layout : 'anchor',
										//style: 'padding-left:30px',
										defaults : {
											anchor : '100%'
										},

										items : [{
												xtype : 'displayfield',
												fieldLabel : 'Address'.l('SC61300'),
												name : 'Address1_Postal'
											}, {
												xtype : 'displayfield',
												fieldLabel : 'Postal code'.l('SC61300'),
												name : 'Pincode_Postal'
											}, {
												xtype : 'displayfield',
												fieldLabel : 'City'.l('SC61300'),
												name : 'City_Postal'
											}, {
												xtype : 'displayfield',
												fieldLabel : 'Country'.l('SC61300'),
												name : 'Country_Postal'

											}
										]
									}
								]
							}, {
								xtype : 'tbspacer',
								width : 10
							}, {
								xtype : 'panel',
								//frame: true,
								width : 100,
								border : false,
								style : 'background:none; border:0px;',
								layout : 'vbox',
								// padding: '0 0 5 0',
								items : [{
										xtype : 'label',
										style : 'padding-left:30px',
										text : 'Use:'
									},
									{
										xtype : 'tbspacer',
										height : 13
									},
									{
										xtype : 'panel',
										//frame: true,
										width : 100,
										border : false,
										style : 'background:none; border:0px;padding:2px',
										layout : 'hbox',
										// padding: '0 0 5 0',
										items : [
											{
												xtype : 'button',
												text : '1',
												height : 18,
												width : 40
											}, {
												xtype : 'tbspacer',
												width : 3
											},
											{
												xtype : 'button',
												text : '2',
												height : 18,
												width : 40
											}

										]
									}, {
										xtype : 'panel',
										//frame: true,
										width : 100,
										border : false,
										style : 'background:none; border:0px;padding:2px',
										layout : 'hbox',
										// padding: '0 0 5 0',
										items : [
											{
												xtype : 'button',
												text : '1',
												height : 18,
												width : 40
											}, {
												xtype : 'tbspacer',
												width : 3
											}, {
												xtype : 'button',
												text : '2',
												height : 18,
												width : 40
											}

										]
									}, {
										xtype : 'panel',
										//frame: true,
										width : 100,
										border : false,
										style : 'background:none; border:0px;padding:2px',
										layout : 'hbox',
										// padding: '0 0 5 0',
										items : [
											{
												xtype : 'button',
												text : '1',
												height : 18,
												width : 40
											}, {
												xtype : 'tbspacer',
												width : 3
											},
											{
												xtype : 'button',
												text : '2',
												height : 18,
												width : 40
											}

										]
									}, {
										xtype : 'panel',
										//frame: true,
										width : 100,
										border : false,
										style : 'background:none; border:0px;padding:2px',
										layout : 'hbox',
										// padding: '0 0 5 0',
										items : [
											{
												xtype : 'button',
												text : '1',
												height : 18,
												width : 40
											}, {
												xtype : 'tbspacer',
												width : 3
											},
											{
												xtype : 'button',
												text : '2',
												height : 18,
												width : 40
											}

										]
									}, {
										xtype : 'tbspacer',
										height : 50
									},
									{
										xtype : 'panel',
										//frame: true,
										width : 100,
										border : false,
										style : 'background:none; border:0px;padding:2px',
										layout : 'hbox',
										// padding: '0 0 5 0',
										items : [
											{
												xtype : 'button',
												text : '1',
												height : 18,
												width : 40
											}, {
												xtype : 'tbspacer',
												width : 3
											},
											{
												xtype : 'button',
												text : '2',
												height : 18,
												width : 40
											}

										]
									}, {
										xtype : 'panel',
										//frame: true,
										width : 100,
										border : false,
										style : 'background:none; border:0px;padding:2px',
										layout : 'hbox',
										// padding: '0 0 5 0',
										items : [
											{
												xtype : 'button',
												text : '1',
												height : 18,
												width : 40
											}, {
												xtype : 'tbspacer',
												width : 3
											}, {
												xtype : 'button',
												text : '2',
												height : 18,
												width : 40
											}

										]
									}, {
										xtype : 'panel',
										//frame: true,
										width : 100,
										border : false,
										style : 'background:none; border:0px;padding:2px',
										layout : 'hbox',
										// padding: '0 0 5 0',
										items : [
											{
												xtype : 'button',
												text : '1',
												height : 18,
												width : 40
											}, {
												xtype : 'tbspacer',
												width : 3
											},
											{
												xtype : 'button',
												text : '2',
												height : 18,
												width : 40
											}

										]
									}, {
										xtype : 'panel',
										//frame: true,
										width : 100,
										border : false,
										style : 'background:none; border:0px;padding:2px',
										layout : 'hbox',
										// padding: '0 0 5 0',
										items : [
											{
												xtype : 'button',
												text : '1',
												height : 18,
												width : 40
											}, {
												xtype : 'tbspacer',
												width : 3
											},
											{
												xtype : 'button',
												text : '2',
												height : 18,
												width : 40
											}

										]
									}

								]
							}, {
								xtype : 'tbspacer',
								width : 10
							}, {
								xtype : 'panel',
								//frame: true,
								width : 400,
								border : false,
								style : 'background:none; border:0px;',
								layout : 'vbox',
								// padding: '0 0 5 0',
								items : [{
										xtype : 'fieldset',
										title : 'General Info'.l('SC61300'),
										width : 400,
										//collapsible: true,
										defaultType : 'textfield',
										layout : 'anchor',
										//style: 'padding-left:30px',
										defaults : {
											anchor : '100%'
										},

										items : [{
												xtype : 'displayfield',
												fieldLabel : 'Address'.l('SC61300'),
												name : 'Address1_Postal'
											}, {
												xtype : 'displayfield',
												fieldLabel : 'Postal code'.l('SC61300'),
												name : 'Pincode_Postal'
											}, {
												xtype : 'displayfield',
												fieldLabel : 'City'.l('SC61300'),
												name : 'City_Postal'
											}, {
												xtype : 'displayfield',
												fieldLabel : 'Country'.l('SC61300'),
												name : 'Country_Postal'

											}
										]
									}, {
										xtype : 'fieldset',
										title : 'Internet Info'.l('SC61300'),
										width : 400,
										//collapsible: true,
										defaultType : 'textfield',
										layout : 'anchor',
										//style: 'padding-left:30px',
										defaults : {
											anchor : '100%'
										},

										items : [{
												xtype : 'displayfield',
												fieldLabel : 'Address'.l('SC61300'),
												name : 'Address1_Postal'
											}, {
												xtype : 'displayfield',
												fieldLabel : 'Postal code'.l('SC61300'),
												name : 'Pincode_Postal'
											}, {
												xtype : 'displayfield',
												fieldLabel : 'City'.l('SC61300'),
												name : 'City_Postal'
											}, {
												xtype : 'displayfield',
												fieldLabel : 'Country'.l('SC61300'),
												name : 'Country_Postal'

											}
										]
									}
								]
							}

						]
					}
				]

			}
		];
		me.callParent(arguments);
	}
});