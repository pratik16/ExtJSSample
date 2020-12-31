Ext.define('Regardz.view.configuration.ProgramDefinitionEventList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.programdefinitioneventlist',
    store: 'configuration.ProgramDefinitionEventListStore',
    loadMask: true,

    initComponent: function () {

        var me = this;
        //alert(me.programDefinitionId);
        //me.height = 500;
        me.columns = [{
            header: 'Program Defination Name'.l('SC23610'),
            dataIndex: 'Name',
            flex: 1
        }, {
            header: 'Event Name'.l('SC23610'),
            dataIndex: 'EventName',
            flex: 1
        }, {
            dataIndex: 'ProgramDefinitionDetailId',
            renderer: this.deteleEvents,
            align: 'center',
            width: 25,
            name: 'PDEventsDelete',
            hideable: false
        }, {
            hidden: true,
            dataIndex: 'ProgramDefinitionDetailId',
            align: 'center',
            hideable: false
        }];

        me.tbar = [{
            xtype: 'button',
            action: 'addPDEvents',
            iconCls: 'new',
            text: 'Add Event'.l('SC23610'),
            tooltip: 'Add Program Definition Event'.l('SC23610')
        }];

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            displayInfo: true,
            emptyMsg: "No data to display".l('g')
        };
        me.callParent();
    },
    deteleEvents: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Delete Event".l('SC23610');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-dele';
    }
});