Ext.namespace("Ext.ux");

Ext.require([
		//    'Ext.grid.*',
		//    'Ext.data.*',
		//    'Ext.util.*',
		//    'Ext.state.*',
		//    'Ext.form.*',
		'Ext.ux.CheckColumn'
	]);

var barStore = new Ext.data.SimpleStore({
		fields : ["BarId", "BarName"],
		data : [
			[1, "A"],
			[2, "B"],
			[3, "C"],
			[4, "D"]
		]
	});

var reLoadBarStore = function (duration) {
	barStore.getStore().load({
		params : {
			id : duration
		}
	});
};

var barCombo = new Ext.form.ComboBox({
		store : barStore,
		valueField : "BarId",
		displayField : "BarName",
		allowBlank : false,
		emptyText: 'Select a BAR'.l('SC75000')
		//    listeners: {
		//        change: function (field, newValue, oldValue) {
		//            reLoadBarStore(newValue);
		//        }
		//    }
	});

	Ext.ux.comboBoxRenderer = function (combo) {
	    return function (value) {
	        var idx = combo.store.find(combo.valueField, value);
	        var rec = combo.store.getAt(idx);
	        return (rec == null ? '' : rec.get(combo.displayField));
	    };
	};

var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
		clicksToMoveEditor : 1,
		autoCancel : false,
		listeners : {
			afteredit : {
				fn : function (roweditor, obj, data, rowindex) {
					Ext.Ajax.request({
						url : webAPI_path + 'api/ConfigYieldTemplate/UpdateYieldTemplate',
						type : 'POST',
						params : obj.newValues, //obj.originalValues
						success : function (response) {
							console.log(response);
							var r = Ext.decode(response.responseText);
							var ResultText = r.result;
							if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
							    ResultText = ResultText.l("SP_DynamicCode");
							if (r.success == true) {
								Ext.getStore('yield.YieldTemplateStore').reload();
								Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
							} else {
								Ext.getStore('yield.YieldTemplateStore').reload();
								Ext.Msg.alert('Error', ResultText);
							}
						},
						failure : function () {
							Ext.getStore('yield.YieldTemplateStore').reload();
							Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
						}
					});
				}
			}
		}
	});


var weekStore = new Ext.data.SimpleStore({
		fields : ["value", "WeekNo"],
		data : [
			["1", "1"], ["2", "2"], ["3", "3"], ["4", "4"], ["5", "5"], ["6", "6"], ["7", "7"], ["8", "8"], ["9", "9"], ["10", "10"],
			["11", "11"], ["12", "12"], ["13", "13"], ["14", "14"], ["15", "15"], ["16", "16"], ["17", "17"], ["18", "18"], ["19", "9"], ["20", "20"],
			["21", "21"], ["22", "22"], ["23", "23"], ["24", "24"], ["25", "25"], ["26", "26"], ["27", "27"], ["28", "28"], ["29", "29"], ["30", "30"],
			["31", "31"], ["32", "32"], ["33", "33"], ["34", "34"], ["35", "35"], ["33", "36"], ["37", "37"], ["38", "38"], ["39", "39"], ["40", "40"],
			["41", "41"], ["42", "42"], ["43", "43"], ["44", "44"], ["45", "45"], ["46", "46"], ["47", "47"], ["48", "48"], ["49", "49"], ["50", "50"],
			["51", "51"], ["52", "52"], ["53", "53"]],
		listeners : {
			load : function (store) {
				// console.log('Try harder');
				var rec = {
					'value' : '0',
					'WeekNo': '--Clear Selection--'.l('SC75000')
				};
				store.insert(0, rec);
			}
		}
	});

Ext.define('Regardz.view.yield.YieldTemplate', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.yieldtemplate',

	store : 'yield.YieldTemplateStore',

	requires : ['Ext.ux.form.SearchField'],

	loadMask : true,

	columnLines : true,

	viewConfig : {
		forceFit : true
	},
	plugins : [rowEditing],

	initComponent : function () {

		var me = this;
		me.title = 'Yield Template List_Title'.l('SC75000');

		me.columns = [{
				header : 'Property Name'.l('SC75000'),
				dataIndex : 'PropertyName',
				flex : 1
			}, {
				header : 'WeekNo'.l('SC75000'),
				dataIndex : 'WeekNo',
				flex : 1
			}, {
				header : 'Day'.l('SC75000'),
				dataIndex : 'Day',
				flex : 1
			}, {
				header : 'Time Slot'.l('SC75000'),
				dataIndex : 'TimeslotCode',
				flex : 1
			}, {
				header : 'Bar'.l('SC75000'),
				dataIndex : 'BarId',
				flex : 1,
				editor : barCombo,
				renderer : Ext.ux.comboBoxRenderer(barCombo)
			},
			//{ dataIndex: 'Duration', header: 'Duration'.l('SC20400'), align: 'center', editor: durationCombo, renderer: Ext.ux.comboBoxRenderer(durationCombo) },
			// {dataIndex: 'YieldTemplateId', renderer: this.editBAR, align: 'center', width: 25, name: 'EditBar', hideable: false },
			{
				hidden : true,
				dataIndex : 'PropertyId',
				align : 'center',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'TimeslotId',
				align : 'center',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'YieldTemplateId',
				align : 'center',
				hideable : false
			}
		];

		me.tbar = [{
				xtype : 'combo',
				name : 'PropertyId',
				id : 'drpPropertyId',
				forceSelection : false,
				queryMode : 'local',
				displayField : 'PropertyName',
				valueField : 'PropertyId',
				emptyText: "Select property".l('SC75000'),
				store: Ext.getStore('common.PropertyForNamesStore'),
				width : 200
			}, {
				xtype : 'combo',
				id : 'drpWeekNo',
				name : 'WeekNo',
				forceSelection : false,
				queryMode : 'local',
				displayField : 'WeekNo',
				valueField : 'value',
				emptyText: "Select Week No".l('SC75000'),
				store : weekStore
			}, {
				xtype : 'button',
				iconCls : 'filter',
				disabled : false,
				action : 'searchYieldTemp'
			}
		];

		me.layout = 'fit';
		me.autoScroll = true;

		me.height = 250;
		me.viewConfig = {
			forceFit : true
		};

		me.bbar = {
			xtype : 'pagingtoolbar',
			store : me.store,
			displayInfo : true
		};

		me.callParent();
	},

	editBAR : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update BAR".l('SC75000');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';
	}

});