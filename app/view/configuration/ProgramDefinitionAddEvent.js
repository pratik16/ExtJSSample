Ext.apply(Ext.form.field.VTypes, {
	//  vtype validation function
	timeValue : function (val, field) {
		var value = /^([0-1]?[0-9]|2[0-4]):([0-5][0-9])(:[0-5][0-9])?$/;  
			return value.test(val);
	},
	// vtype Text property to display error Text
	// when the validation function returns false
	timeText : 'Not a valid time'.l('g'),
	// vtype Mask property: The keystroke filter mask
	timeMask : /[\d\s:amp]/i
});

Ext.define('Regardz.view.configuration.ProgramDefinitionAddEvent', {
	extend : 'Ext.window.Window',
	alias : 'widget.programdefinitionaddevent',
	modal : true,
	width : 400,
	border : false,
	title: 'Add Event_Title'.l('SC23620'),
	autoShow : true,

	initComponent : function () {

		var me = this;
		me.items = [{
				xtype : 'form',
				id : 'progDefiAddEvent',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				fileUpload : true,
				items : [{
						xtype : 'combo',
						name : 'EventId',
						fieldLabel: 'Select Event'.l('SC23620'),
						forceSelection : true,
						queryMode : 'local',
						displayField : 'EventName',
						valueField : 'EventId',
						allowBlank : false,
						emptyText: "Select Event".l('SC23620'),
						store : 'common.EventListForProgramDefinitionStore',
						anchor : '100%'
					}, {
						xtype : 'hidden',
						name : 'ProgramDefinitionId',
						value : me.programDefinitionId
					}, {
						xtype : 'hidden',
						name : 'Duration',
						value : me.duration

					}, {
						xtype : 'hidden',
						name : 'StartingSlotId',
						value : me.startingSlotId
					}, {
						xtype : 'timefield',
						fieldLabel: 'Start time'.l('SC23620'),
						name : 'StartTime',
						format : "H:i",
						selectOnFocus : true,
						minValue : '8:30',
						maxValue : '22:00',
						increment : 30
						//vtype: 'timeValue'
					}, {
						xtype : 'timefield',
						fieldLabel: 'End time'.l('SC23620'),
						name : 'EndTime',
						selectOnFocus : true,
						format : "H:i",
						minValue : '8:30',
						maxValue : '22:00',
						increment : 30
						//vtype: 'timeValue'
					}, {
						xtype : 'checkboxfield',
						//fieldLabel: 'Event Time is same as Booking Time'.l('SC20411'),
						boxLabel: 'Event Time is same as Booking Time'.l('SC23620'),
						name : 'IsAntSlot',
						inputValue : 'true',
						labelWidth : 130,
						uncheckedValue : 'false'
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
						action : 'saveProgDefiAddEvent'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});