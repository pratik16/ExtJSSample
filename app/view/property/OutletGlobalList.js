Ext.define('Regardz.view.property.OutletGlobalList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.outletgloballist',

	store : 'property.OutletGlobalListStore',

	loadMask : true,
	isButtonInGrid: true,
	initComponent : function () {

	    var me = this;
	    me.title = "Outlet List_Title".l('SC31700');
		me.frame = true;
		me.resizable = true;
		me.height = parseInt(Ext.getBody().getViewSize().height * (0.85));
		me.autoScroll = true;
		me.viewConfig = {
			forceFit : true
		};
		me.columns = [
			// { dataIndex: 'Checked', xtype: 'checkcolumn', renderer: this.CheckSelect, width: 25, hideable: false },
			{
				header : 'Outlet Name'.l('SC31700'),
				dataIndex : 'OutletName',
				flex : 1
			}, {
				dataIndex : 'Checked',
				renderer : this.IsAssociate,
				align : 'center',
				width : 25,
				hideable : false
			}, {
				dataIndex : 'Checked',
				renderer : this.approveReject,
				width : 110,
				name : 'ApproveReject',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'OutletId',
				align : 'center',
				hideable : false
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
	IsAssociate : function (value, metadata, record, rowIndex, colIndex, store) {
		if (value == 1) {
			var tooltipText = 'Associated'.l('SC31700');
			metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
			metadata.css = 'icon-active';
		} else {
			var tooltipText = 'Not Associated'.l('SC31700');
			metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
			metadata.css = 'icon-deactive';
		}
	},
	//    CheckSelect: function (value, metadata, record, rowIndex, colIndex, store) {
	//        alert(value);
	//        if (record.data.Checked == 1) {
	//            var tooltipText = "Associated";
	//            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
	//            metadata.css = 'x-grid-checkheader-checked';
	//        }
	//        else {
	//            var tooltipText = "Not Associated";
	//            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
	//            metadata.css = 'x-grid-checkheader';
	//        }
	//    },
	approveReject : function (value, metadata, record, rowIndex, colIndex, store) {

		var btnText;
		btnText = '';
		cls = '';

		if (value == 1) {
			btnText = 'Dissociate'.l('SC31700');
		} else {
			btnText = 'Associate'.l('SC31700');
		}

        return '<div class="customButtonDiv">' + btnText + '</div>';
        /*
		var id = Ext.id();
		Ext.defer(function () {
			Ext.widget('button', {
				renderTo : id,
				text : btnText,
				width : 100,
				height : 17
			});
		}, 50);
		return Ext.String.format('<div id="{0}"></div>', id);*/

	}
});