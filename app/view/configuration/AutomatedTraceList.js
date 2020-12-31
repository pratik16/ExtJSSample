Ext.define('Regardz.view.configuration.AutomatedTraceList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.automatedtracelist',
    store: 'configuration.AutomatedTraceListStore',
    loadMask: true,
    height: parseInt(Ext.getBody().getViewSize().height * (0.85)),
    modal: true,
    requires: [
		'Ext.ux.form.SearchField'
	],
    initComponent: function () {
        var me = this;
        me.title = 'Automated Traces_Title'.l('SC20900');
        me.collapsible = true;
        //me.noResize = true;
        me.itemid = 'automatedTracegrid';
        me.frame = true;

        me.columns = [{
            header: 'Item'.l('SC20900'),
            dataIndex: 'Name',
            flex: 1
        }, {
            header: 'Trigger'.l('SC20900'),
            dataIndex: 'TriggerAction',
            renderer: this.TriggerAction,
            width: '30%',
            flex: 1
        }, {
            header: 'Message'.l('SC20900'),
            width: '30%',
            dataIndex: 'Message',
            flex: 1
        }, {
            dataIndex: 'AutomatedTraceId',
            align: 'center',
            width: 25,
            renderer: this.editTrace,
            name: 'TraceEdit',
            hideable: false
        }, {
            dataIndex: 'AutomatedTraceId',
            align: 'center',
            width: 25,
            renderer: this.deleteTrace,
            name: 'TraceDelete',
            hideable: false
        }, {
            hidden: true,
            dataIndex: 'ItemId',
            align: 'center'
        }, {
            hidden: true,
            dataIndex: 'ItemGroupId',
            align: 'center'
        }];

        me.tbar = [{
            xtype: 'button',
            action: 'addTrace',
            iconCls: 'new',
            text: 'Add New'.l('SC20700'),
            tooltip: 'Add Trace'.l('SC20900')
        }, '->', {
            xtype: 'button',
            iconCls: 'filter',
            disabled: true
        }, {
            xtype: 'searchfield',
            store: Ext.getStore('configuration.AutomatedTraceListStore'),
            iconCls: 'filter',
            paramName: 'searchParam'
        }];

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            displayInfo: true,
           // displayMsg: 'Displaying topics {0} - {1} of {2}',
            emptyMsg: "No topics to display".l('g')
        };

        me.layout = 'fit';
        me.callParent();
    },
    TriggerAction: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value.substring(0, 4) == "SPC_")
            return value.l("SP_DynamicCode");
        else
            return value;
    },
    editTrace: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Update Trace".l('SC20900');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-edit';
    },

    deleteTrace: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Delete Trace".l('SC20900');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-delete';
    }

});