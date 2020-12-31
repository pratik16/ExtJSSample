Ext.define('Regardz.view.property.RoomEditLang', {
	extend : 'Ext.window.Window',
	alias : 'widget.roomeditlang',
	modal : false,
	border: false,
	width: parseInt(Ext.getBody().getViewSize().width * (0.40)),
	height: parseInt(Ext.getBody().getViewSize().height * (0.35)),
	title : 'Room Edit Language_Title'.l('SC33160'),
	autoShow : true,
	initComponent : function () {
		var me = this;
		me.items = [{
				xtype : 'form',
				border: false,
                itemid: 'RoomEditLang',
				bodyStyle : 'background: none',
				style : "padding:10px;",
				items : [{
						xtype : 'combo',
						name : 'LanguageId',
						fieldLabel: 'Lang. for content'.l('SC33160') + '*',
						displayField : 'Name',
						valueField : 'LanguageId',
						emptyText: "Select language for content".l('SC33160'),
						allowBlank : false,
						anchor : '100%',
						store : Ext.getStore('common.LanguageListStore')
					}, {
						xtype : 'hidden',
						name : 'RoomId'
					}, {
						xtype : 'hidden',
						name : 'LangRoomId'
					}, {
						xtype : 'textfield',
						fieldLabel: 'External Name'.l('SC33160') + '*',
						name : 'ExternalName',
						allowBlank : false,
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 100
					}, 
					{
						xtype : 'textfield',
						fieldLabel: 'Internal Name'.l('SC33160') + '*',
						name: 'RoomName',
						allowBlank : false,
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 100
					},
					{
						xtype : 'textareafield',
						fieldLabel : 'Description'.l('SC33160'),
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
						action : 'saveRoomEditMultiLing'
					}
				]
			}
		];
		//console.log('end form');
		me.callParent(arguments);
	}
});