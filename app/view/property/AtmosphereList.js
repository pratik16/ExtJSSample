Ext.define('Regardz.view.property.AtmosphereList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.atmospherelist',
    store: 'property.PropertyFeatureType2Store',
    loadMask: true,
    initComponent: function () {

        if (Ext.getCmp('atmospheres')) {
            Ext.getCmp('atmospheres').destroy();
        }
        var me = this;
        me.id = 'atmospheres';
        me.frame = true;
        me.layout = 'fit';
        me.autoScroll = true;
        me.viewConfig = {
            forceFit: true
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
            store: Ext.getStore('property.PropertyFeatureType2Store'),
            iconCls: 'filter',
            paramName: 'languageId'
        }];
        me.columns = [{
            dataIndex: 'Checked',
            renderer: this.checkboxRender,
            align: 'center',
            width: 25,
            name: 'Checked',
            hideable: false
        }, {
            header: 'Description'.l('SC31100'),
            dataIndex: 'PropertyFeatureName',
            flex: 1
        }, {
            hidden: true,
            dataIndex: 'PropertyFeatureId',
            hideable: false
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

    checkboxRender: function (v, meta, record, rowIdx, col_idx, store) {
        return '<input ' + (record.data.Checked == true ? 'checked=checked' : '') + ' onclick="setDefaultPropertyFeatures(this,' + rowIdx + ',\'' + store.storeId + '\')" type=checkbox>';
    }
});