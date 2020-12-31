Ext.define('Regardz.view.mastervalues.TaskTypeManage', {
	extend : 'Ext.window.Window',
	alias : 'widget.tasktypemanage',
	modal : true,
	width : 400,
	border : false,
	title : 'Add TaskType_Title'.l('SC21410'),
	autoShow : true,

	initComponent : function () {

		if (Ext.getCmp('addTaskType'))
			Ext.getCmp('addTaskType').destroy();

		var me = this;

		me.disableitems = true;
		if (me.taskTypeId > 0) {
			me.disableitems = false;
		}

		me.items = [{
				xtype : 'form',
				id : 'addTaskType',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				fileUpload : true,
				tbar : ['->', {
						xtype : 'button',
						text: 'Language'.l('g'),
						action : 'LanguageContent',
						disabled : me.disableitems
					}
				],
				items : [{
						xtype : 'hidden',
						name : 'LanguageId',
						value : user_language
					}, {
						xtype : 'hidden',
						name : 'TaskTypeId',
						value : me.taskTypeId
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
					}, {
						xtype : 'hidden',
						name : 'CreatedDate'
					}, {
						xtype : 'hidden',
						name : 'CreatedBy'
					}, {
						xtype : 'hidden',
						name : 'UpdatedDate'
					}, {
						xtype : 'hidden',
						name : 'UpdatedBy'
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
						action : 'saveTaskType'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});