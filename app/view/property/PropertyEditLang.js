Ext.define('Regardz.view.property.PropertyEditLang', {
	extend : 'Ext.window.Window',
	alias : 'widget.propertyeditlang',

	initComponent : function () {
		var me = this;

		me.autoScroll = true;
		me.height = 300;
		me.autoShow = true;

		if (Ext.getCmp('propertyEditLng'))
			Ext.getCmp('propertyEditLng').destroy();

		me.propertyBasic = {
			xtype : 'form',
			layout : 'form',
			border : false,
			padding : 5,
			frame : true,
			plain : true,
			// modal: true,
			border : '0px',
			id : 'propertyEditLng',
			cls : 'propertyEdit',
			//bodyPadding :'5px',
			defaultType : 'textfield',
			buttonAlign : 'center',
			items : [{
					xtype : 'combo',
					name : 'LanguageId',
					fieldLabel: 'Lang. for content'.l('SC31130'),
					displayField : 'Name',
					valueField : 'LanguageId',
					emptyText: "Language for content".l('SC31130'),
					anchor : '100%',
					allowBlank : false,
					store : Ext.getStore('common.LanguageListStore')
					//value: user_language
				}, {
					name : 'PropertyId',
					hidden : true
				}, {
					name : 'PropertyName',
					fieldLabel : 'Property Name'.l('SC31130'),
					allowBlank : false,
					flex : 1,
					maxLength: 256
				}, {
					xtype : 'textarea',
					name : 'Description',
					height : 55, //ie
					fieldLabel : 'Description'.l('SC31130'),
					allowBlank : false,
					maxLength: 512
				}, {
					name : 'Address',
					fieldLabel : 'Address'.l('SC31130'),
					allowBlank : false,
					maxLength: 512
				}, {
					name : 'LangPropertyId',
					hidden : true
				}, {
					name : 'PropertyContent',
					hidden : true
				}
			]
		};

		me.dockedItems = [{
				dock : 'bottom',
				align : 'right',
				buttonAlign : 'right',
				buttons : [{
						text : 'Cancel'.l('w'),
						action : 'cancel',
						handler : function () {
							me.destroy();
						}
					}, {
						text : 'Save'.l('w'),
						action : 'propertyEditLang',
						formBind : true //, //only enabled once the form is valid
						//disabled : true
					}
				]

			}
		];

		me.windowWidth = 400;
		Ext.apply(me, {
		    title: 'Property Edit Language_Title'.l('SC31130'),
			autoShow : true,
			closable : true,
			resizable : true,
			border : false,
			width : me.windowWidth,
			items : me.propertyBasic
		});

		me.callParent();
	}
});