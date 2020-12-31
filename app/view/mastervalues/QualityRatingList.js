Ext.define('Regardz.view.mastervalues.QualityRatingList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.qualityratinglist',

	store : 'mastervalues.QualityRatingStore',

	loadMask : true,

	initComponent : function () {

		var me = this;
		me.autoHeight = true;
		me.title = "Quality Rating List_Title".l('SC21600');
		me.columns = [{
				header : 'Quality Rating'.l('SC21600'),
				dataIndex : 'Rating',
				flex : 1
			}, {
				dataIndex : 'QualityRatingId',
				renderer : this.editQualityRating,
				align : 'center',
				width : 25,
				name : 'QualityRatingEdit',
				hideable : false
			}, {
				dataIndex : 'QualityRatingId',
				renderer : this.deteleQualityRating,
				align : 'center',
				width : 25,
				name : 'QualityRatingDelete',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'QualityRatingId',
				align : 'center',
				hideable : false
			}
		];

		me.tbar = [{
				xtype : 'button',
				action : 'addQualityRating',
				iconCls : 'new',
				text : 'Add New'.l('SC21600'),
				tooltip : 'Add Quality Rating'.l('SC21600')
			}
		];

		me.bbar = {
			xtype : 'pagingtoolbar',
			store : this.store,
			displayInfo : true,
			emptyMsg: "No data to display".l("g")
		};

		me.callParent();
	},

	editQualityRating : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Update Quality Rating".l('SC21600');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-edit';
	},

	deteleQualityRating : function (value, metadata, record, rowIndex, colIndex, store) {
		var tooltipText = "Delete Quality Rating".l('SC21600');
		metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
		metadata.tdCls = 'icon-delete';
	}

});