Ext.define('Regardz.view.extraz.ExtrazPointsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.extrazpointslist',
    store: 'extraz.ExtrazPointsListStore',
    requires: [
		'Ext.ux.form.SearchField'
	],

    loadMask: true,

    initComponent: function () {

        var me = this;
        //me.viewConfig = { forceFit: true };
        //me.height = parseInt(Ext.getBody().getViewSize().height * (0.83));
        me.title = 'Points Activity'.l('SC37200');
        me.columns = [{
            header: 'Date'.l('SC37200'),
            dataIndex: 'ExtrazDate',
            width: 75,
            renderer: this.dateRenderer

        }, {
            header: 'Description'.l('SC37200'),
            dataIndex: 'Description',
            flex: 1
        }, {
            header: 'Extraaz'.l('SC37200'),
            dataIndex: 'Extraz',
            align: 'center',
            width: 50,
            renderer: this.ExtraazPoint
        }, {
            header: 'In / Out'.l('SC37200'),
            dataIndex: 'Extraz',
            align: 'center',
            width: 50,
            renderer: this.setInOut
        }, {
            header: 'User'.l('SC37200'),
            dataIndex: 'CreatedPrefix',
            align: 'center',
            width: 50
        }, {
            hidden: true,
            dataIndex: 'ExtrazHistoryId',
            hideable: false
        }];

        me.tbar = [{
            xtype: 'button',
            action: 'mangeWebshopPoints',
            iconCls: 'new',
            text: '',
            tooltip: 'Manage extraaz points'.l('SC37200')
        }, '->', {
            xtype: 'button',
            iconCls: 'filter',
            disabled: true
        }, {
            xtype: 'searchfield',
            store: Ext.getStore('extraz.ExtrazPointsListStore'),
            iconCls: 'filter',
            paramName: 'searchString'
        }];

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            displayInfo: true,
            emptyMsg: "No data to display".l("g")
        };

        me.callParent();
    },
    setInOut: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value >= 0)
            return "In".l('SC37200');
        else
            return "Out".l('SC37200');
    },
    ExtraazPoint: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value >= 0)
            return value;
        else
            return -(value);
    },
    dateRenderer: function (value, metadata, record, rowIndex, colIndex, store) {

        var d = Ext.Date.parse(value, 'c');

        return Ext.util.Format.date(d, usr_dateformat);
    }
});