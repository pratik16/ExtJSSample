Ext.define('Regardz.view.configuration.ProgramDefinitionEventListWindow', {
	extend : 'Ext.window.Window',
	alias : 'widget.programdefinitioneventlistwindow',
	modal : true,
	width : 650,
	height : 400,
	border : false,
	title: 'Program Definition Event List_Title'.l('SC23610'),

	layout : 'fit',
	viewConfig : {
		forceFit : true
	},

	autoShow : true,

	initComponent : function () {

		var me = this;

		me.items = [{
				xtype : 'programdefinitioneventlist'
			}, {
				xtype : 'hidden',
				name : 'ProgramDefinitionId',
				id : 'programDefinitionID',
				value : me.programDefinitionId

			}, {
				xtype : 'hidden',
				name : 'Duration',
				id : 'DurationVALUE',
				value : me.duration

			}, {
				xtype : 'hidden',
				name : 'StartingSlotId',
				id : 'startingSlotID',
				value : me.startingSlotId

			}
		];
		me.callParent(arguments);
	}
});