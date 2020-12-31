Ext.define('Regardz.view.property.PhotoGalleryLang', {
	extend : 'Ext.window.Window',
	alias : 'widget.photogallerylang',
	modal : false,
	width : 400,
	border : false,
	title : 'Lang Photo Gallery_Title'.l('SC31520'), //.l('PROPERTY_VIDEOLIBRARY'),
	autoShow : true,

	initComponent : function () {

		var me = this;
		me.items = [{
				xtype : 'form',
				id : 'photoGalleryLang',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				fileUpload : true,
				items : [{
						xtype : 'combo',
						name : 'LanguageId',
						fieldLabel: 'Lang. for content'.l('SC31520'),
						//queryMode: 'local',
						displayField : 'Name',
						valueField : 'LanguageId',
						emptyText: "Select language for content".l('SC31520'),
						anchor : '100%',
						allowBlank : false,
						store : Ext.getStore('common.LanguageListStore')
					}, {
						xtype : 'hidden',
						name : 'PhotoGalleryId',
						value : me.photoGalleryId
					}, {
						xtype : 'hidden',
						name : 'LangPhotoGalleryId',
						value : me.langPhotoGalleryId
					}, {
						xtype : 'textfield',
						fieldLabel: 'Photo Title'.l('SC31520'),
						name : 'PhotoTitle',
						allowBlank : false,
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 100
					}, {
						xtype : 'textareafield',
						//grow: true,
						fieldLabel: 'Description'.l('SC31520'),
						name : 'Description',
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 500
					}
				],
				buttons : [{
						text : 'Cancel'.l('w'),
						scope : me,
						handler : function () {
							this.close();
						}
					}, {
						text : 'Save'.l('w'),
						action : 'savePhotoGalleryLang'
					}
				]
			}
		];
		//console.log('end form');
		me.callParent(arguments);
	}
});