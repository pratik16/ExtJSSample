Ext.define('Regardz.view.property.FacilitiesList', {
	extend : 'Ext.grid.Panel',
	alias : 'widget.facilitieslist',
	store : 'property.PropertyFacilityIcons',
	loadMask : true,
	initComponent : function () {
		if (Ext.getCmp('facilities'))
			Ext.getCmp('facilities').destroy();

		var me = this;
		me.id = "facilities";
		me.frame = true;
		me.layout = 'fit';
		me.autoScroll = true;
		me.viewConfig = {
			forceFit : true
        };

        /*Its prevent to reload grid from resize function from common file*/
        me.noResize = true; 

        //me.autoHeight = true;
        me.tbar = ['->', {
            xtype: 'button',
            iconCls: 'filter',
            disabled: true
        }, {
            xtype: 'searchfield',
            store: Ext.getStore('property.PropertyFacilityIcons'),
            iconCls: 'filter',
            paramName: 'id1'
        }];
		me.columns = [{
				dataIndex : 'Checked',
				renderer : this.checkboxRender,
				align : 'center',
				width : 25,
				name : 'Checked',
				hideable : false
			}, {
				header : 'Description'.l('SC31100'),
				dataIndex : 'FacilityName',
				flex : 1
			}, {
				dataIndex : 'IconPath',
				renderer : this.imageRender,
				align : 'center',
				width : 50,
				name : 'IconPath',
				hideable : false
			}, {
				hidden : true,
				dataIndex : 'FacilityIconId',
				hideable : false
			}
		];

		//        me.bbar = {
		//            xtype: 'pagingtoolbar',
		//            store: this.store,
		//            displayInfo: true,
		//            emptyMsg: "No data to display"
		//        };

		me.callParent();
	},

	checkboxRender : function (v, meta, record, rowIdx, col_idx, store) {
		return '<input ' + (record.data.Checked == true ? 'checked=checked' : '') + ' onclick="setDefaultPropertyFeatures(this,' + rowIdx + ',\'' + store.storeId + '\')" type=checkbox>';
	},

	imageRender : function (v, meta, record, rowIdx, col_idx, store) {
		return '<div style="background-image:url(' + image_path + '/' + escape(record.data.IconPath) + ');  background-repeat:no-repeat; height:35px;width:35px; display:inline-block">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</div>';
	}
});