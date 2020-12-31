Ext.namespace("Ext.ux");

Ext.require([
		//    'Ext.grid.*',
		//    'Ext.data.*',
		//    'Ext.util.*',
		//    'Ext.state.*',
		//    'Ext.form.*',
		'Ext.ux.CheckColumn'
	]);

//var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
//    clicksToMoveEditor: 1,
//    autoCancel: false,
//    listeners: {
//        beforeedit: function (roweditor, obj) {
//            //console.log(obj);
//            if (obj.record.data.Duration != null && obj.record.data.Duration != undefined && obj.record.data.Duration != '' && obj.record.data.Duration > 0)
//                loadStore(obj.record.data.Duration);
//        },
//        afteredit: {
//            fn: function (roweditor, obj, data, rowindex) {
//                obj.newValues.StartingSlotId = obj.newValues.TimeSlotId;
//                Ext.Ajax.request({
//                    url: webAPI_path + 'api/configProgramDefinition/ManageProgramDefinition',
//                    type: 'POST',
//                    params: obj.newValues, //obj.originalValues

//                    success: function (response) {
//                        var r = Ext.decode(response.responseText);
//                        //var r = jsonDecode(response);
//                        if (r.success == true) {
//                            Ext.getStore('configuration.ProgramDefinitionStore').reload();
//                            Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
//                        }
//                        else {
//                            Ext.getStore('configuration.ProgramDefinitionStore').reload();
//                            Ext.Msg.alert('Error', r.result);
//                        }
//                    },
//                    failure: function () {
//                        Ext.getStore('configuration.ProgramDefinitionStore').reload();
//                        Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
//                    }
//                });
//            }
//        },
//        canceledit: function (grid, obj) {
//            Ext.getStore('configuration.ProgramDefinitionStore').rejectChanges();
//        }
//    }
//});


//Ext.ux.comboBoxRenderer = function (combo) {
//    return function (value) {
//        var idx = combo.store.find(combo.valueField, value);
//        var rec = combo.store.getAt(idx);
//        return (rec == null ? '' : rec.get(combo.displayField));
//    };
//}


//var slotStore = new Ext.data.SimpleStore({
//    fields: ['TimeSlotId', 'TimeSlotCode'],
//    proxy: {
//        type: 'jsonp',
//        url: webAPI_path + 'api/configProgramDefinition/GetStartSlotsByDuration',
//        reader: {
//            type: 'json',
//            root: 'data'
//        }
//    }
//});

//var slotCombo = new Ext.form.ComboBox({
//    store: slotStore,
//    valueField: "TimeSlotId",
//    displayField: "TimeSlotCode",
//    allowBlank: false,
//    emptyText: 'Select a slot'
//});

//var loadStore = function (duration) {
//    slotCombo.getStore().load({
//        params: {
//            id: duration
//        }
//    });
//};


//var durationStore = new Ext.data.SimpleStore({
//    fields: ["Duration", "Duration"],
//    data: [
//    [2, 2],
//    [4, 4],
//    [8, 8],
//    [12, 12]
//  ],
//    listeners: {
//        load: {
//            fn: function (s, r) {
//                if (r[0].data.Duration > 0) {
//                    loadStore(r[0].data.Duration);
//                }
//            }
//        }
//    }

//});

//var durationCombo = new Ext.form.ComboBox({
//    store: durationStore,
//    valueField: "Duration",
//    displayField: "Duration",
//    allowBlank: false,
//    emptyText: 'Select a duration',
//    listeners: {
//        select: function (combo, newValue, oldValue) {
//            if (combo.getValue() > 0) {
//                loadStore(combo.getValue());
//            }
//        }
//    }
//});


Ext.define('Regardz.view.configuration.ProgramDefinitionList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.programdefinitionlist',
	store : 'configuration.ProgramDefinitionStore',
	id : 'programdefinitionlist',
	loadMask : true,
	columnLines : false,
	selType : 'rowmodel',
	viewConfig : {
		forceFit : true,
		markDirty : false
	},
	//plugins: [rowEditing],
	plugins : [
		Ext.create('Ext.grid.plugin.RowEditing', {
			clicksToEdit : 2
		})
	],

	initComponent : function () {

		var me = this;

		if (Ext.getCmp('slotComboId')) {
			Ext.getCmp('slotComboId').destroy();
		}

		if (Ext.getCmp('durationId')) {
			Ext.getCmp('durationId').destroy();
		}

		me.slotCombo = new Ext.form.ComboBox({
				store : Ext.getStore('configuration.SlotStore'),
				valueField : "TimeSlotId",
				id : 'slotComboId',
				displayField : "TimeSlotCode",
				allowBlank : false,
				emptyText: 'Select a slot'.l('SC23600')
			});

		me.durationCombo = new Ext.form.ComboBox({
				store : Ext.getStore('configuration.DurationStore'),
				valueField : "Duration",
				displayField : "Duration",
				id : 'durationId',
				allowBlank : false,
				emptyText: 'Select a duration'.l('SC23600'),
				listeners : {
					select : function (combo, newValue, oldValue) {
						if (combo.getValue() > 0) {
							//loadStore(combo.getValue());
							me.slotCombo.getStore().load({
								params : {
									id : combo.getValue()
								}
							});
						}
					}
				}
			});

		me.autoHeight = true;
		me.title = "Program Definition List_Title".l('SC23600');
		me.columns = [{
				header : 'Name'.l('SC23600'),
				dataIndex : 'Name',
				flex : 1,
				editor : {
					allowBlank : false,
					maxLength: 120
				}
			}, {
				dataIndex : 'Duration',
				header : 'Duration'.l('SC23600'),
				align : 'center',
				editor : me.durationCombo,
				renderer : this.renderDuration
			}, //renderer: Ext.ux.comboBoxRenderer(durationCombo)
			{
				dataIndex : 'TimeSlotId',
				header : 'Starting Slot'.l('SC23600'),
				align : 'center',
				editor : me.slotCombo,
				renderer : this.renderSlot
			}, {
				header : 'Active'.l('SC23600'),
				renderer : this.IsChecked,
				dataIndex : 'IsActive',
				align : 'center',
				width : 60,
				editor : {
					xtype : 'checkbox',
					cls : 'x-grid-checkheader-editor'
				}
			}, {
				dataIndex : 'ProgramDefinitionId',
				renderer : this.manageEvent,
				align : 'center',
				width : 25,
				name : 'manageEvent',
				hideable : false
			}, {
				dataIndex : 'ProgramDefinitionId',
				renderer : this.deteleProgDefi,
				align : 'center',
				width : 25,
				name : 'ProgDefiDelete',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'ProgramDefinitionId',
				align : 'center',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'StartingSlotId',
				align : 'center',
				hideable : false
			}
		];

		me.tbar = [{
				xtype : 'button',
				action : 'addProgramDefinition',
				iconCls : 'new',
				text : 'Add New'.l('SC23600'),
				tooltip : 'Add Program Definition'.l('SC23600'),
				handler : function () {
					//                rowEditing.cancelEdit();
					//                // Create a model instance
					//                var r = Ext.create('Regardz.model.configuration.ProgramDefinition', {
					//                    Name: 'New Program Defination',
					//                    IsActive: true,
					//                    //Duration: durationCombo.getValue(),
					//                    ProgramDefinitionId: 0
					//                    //StartingSlotId: slotCombo.getValue()
					//                });
					//                me.store.insert(0, r);
					//                rowEditing.startEdit(0, 0);
				}
			}
		];

		me.bbar = {
			xtype : 'pagingtoolbar',
			store : me.store,
			displayInfo : true,
			emptyMsg : "No data to display".l('g')
		};

		//        me.on('beforeedit', function (editor, e) {
		//            loadStore(e.record.get('Duration'));
		//        });

		me.callParent();
	},

	//    IsActive: function (value, metadata, record, rowIndex, colIndex, store) {
	//        if (value == 1) {
	//            var tooltipText = "Active";
	//            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
	//            metadata.tdCls = 'icon-active';
	//        }
	//        else {
	//            var tooltipText = "InActive";
	//            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
	//            metadata.tdCls = 'icon-deactive';
	//        }
	//    },

	deteleProgDefi : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete Program Definition".l('SC23600');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-dele';
	},
	manageEvent : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Manage Event for Program Denition".l('SC23600');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-documentadd';
	},
	IsChecked : function (value, metadata, record, rowIndex, colIndex, store) {
		if (value == true) {
			metadata.tdCls = 'icon-active-indication';
		} else {
			metadata.tdCls = 'icon-deactive-indication';
		}
	},
	renderDuration : function (value, metadata, record, rowIndex, colIndex, store) {
		return record.data.Duration;
	},
	renderSlot : function (value, metadata, record, rowIndex, colIndex, store) {
		return record.data.TimeSlotcode;
	}
});