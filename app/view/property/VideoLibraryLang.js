Ext.define('Regardz.view.property.VideoLibraryLang', {
	extend : 'Ext.window.Window',
	alias : 'widget.videolibrarylang',
	modal : false,
	width : 400,
	border : false,
	title : 'Lang Video Library_Title'.l('SC31320'),
	autoShow : true,

	initComponent : function () {

		var me = this;

		if (Ext.getCmp('videolibMultiLang'))
			Ext.getCmp('videolibMultiLang').destroy();

		me.items = [{
				xtype : 'form',
				id : 'videolibMultiLang',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				fileUpload : true,
				items : [{
						xtype : 'combo',
						name : 'LanguageId',
						fieldLabel: 'Lang. for content'.l('SC31300'),
						//queryMode: 'local',
						displayField : 'Name',
						valueField : 'LanguageId',
						emptyText: "Select language for content".l('SC31300'),
						allowBlank : false,
						anchor : '100%',
						store : Ext.getStore('common.LanguageListStore')
					}, {
						xtype : 'hidden',
						name : 'VideoDetailId',
						value : me.videoDetailId
					}, {
						xtype : 'hidden',
						name : 'LangPropertyVideoDetailId',
						value : me.langPropertyVideoDetailId
					}, {
						xtype : 'textfield',
						fieldLabel : 'Video Name'.l('SC31300'),
						name : 'VideoName',
						allowBlank : false,
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 100
					}, {
						xtype : 'textareafield',
						fieldLabel : 'Description'.l('SC31300'),
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
						action : 'saveVideoLibraryMultiLing'
					}
				]
			}
		];
		//console.log('end form');
		me.callParent(arguments);
	}
});