 Ext.define('Regardz.view.mastervalues.TaskTypeLang', {
	extend : 'Ext.window.Window',
	alias : 'widget.tasktypelang',
	modal : false,
	width : 400,
	border : false,
	title : 'Lang TaskType_Title'.l('SC21420'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('taskTypeLang'))
			Ext.getCmp('taskTypeLang').destroy();

		var me = this;
		me.items = [{
				xtype : 'form',
				id : 'taskTypeLang',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				items : [{
						xtype : 'combo',
						name : 'LanguageId',
						fieldLabel: 'Lang. for content'.l('SC21420'),
						//queryMode: 'local',
						displayField : 'Name',
						valueField : 'LanguageId',
						emptyText: "Select language for content".l('SC21420'),
						anchor : '100%',
						allowBlank : false,
						store : Ext.getStore('common.LanguageListStore')
					}, {
						xtype : 'hidden',
						name : 'TaskTypeId',
						value : me.taskTypeId
					}, {
						xtype : 'hidden',
						name : 'LangTaskTypeId',
						value : me.langTaskTypeId
					}, {
						xtype : 'textfield',
						fieldLabel : 'TaskType Name'.l('SC21400'),
						name : 'Name',
						allowBlank : false,
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 50
					}, {
						xtype : 'textareafield',
						fieldLabel : 'Description'.l('SC21410'),
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
						action : 'saveTaskTypeLang'
					}
				]
			}
		];

		me.callParent(arguments);
	}
});