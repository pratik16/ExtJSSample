Ext.define('Regardz.view.dashboard.DraftQuatationList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.draftquatationlist',
    store: 'dashboard.DraftQuatationStore',
    height: parseInt(Ext.getBody().getViewSize().height * (0.27)),
    modal: true,
    requires: [
		'Ext.ux.form.SearchField'
	],
    initComponent: function () {
        var me = this;
        me.title = 'Draft and Quatation'.l('SC80000');
        me.collapsible = true;
        me.noResize = true;
        me.itemid = 'draftquatationlist';
        me.frame = true;

        me.columns = [{
            header: 'Date'.l('SC80000'),
            dataIndex: 'CreatedDate',
            width: '20%',
            align: 'center',
            renderer: this.dateRenderer
        }, {
            header: 'Number'.l('SC80000'),
            dataIndex: 'ReservationId',
            align: 'center'
        }, {
            header: 'Type'.l('SC80000'),
            dataIndex: 'Status',  
            align: 'center'
        }, {
            header: 'Client'.l('SC80000'),
            dataIndex: 'Client',
            flex: 1,
            align: 'left'
        }, {
            header: 'User'.l('SC80000'),
            dataIndex: 'Initial',
            align: 'left'
        }, {
            dataIndex: 'ReservationId',
            renderer: this.editIcon,
            name: 'editDQ',
            align: 'center',
            width: 25
//        }, {
//            dataIndex: 'ReservationId',
//            renderer: this.deleteIcon,
//            align: 'center',
//            width: 25
        }];

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            displayInfo: true,
            emptyMsg: "No data to display".l('g')
        };

        me.autoScroll = true;
        me.layout = 'fit';
        me.callParent();
    },
    dateRenderer: function (value, metadata, record, rowIndex, colIndex, store) {
        //this.colorRender(value, metadata, record, rowIndex, colIndex, store);
        var d = Ext.Date.parse(value, 'c');
        return Ext.util.Format.date(d, usr_dateformat + ' ' + 'H:i');
    },
    editIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        //this.colorRender(value, metadata, record, rowIndex, colIndex, store);
        var tooltipText = "Edit".l('g');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-edit';
    },
    deleteIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        //this.colorRender(value, metadata, record, rowIndex, colIndex, store);
        var tooltipText = "Delete".l('g');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-delete';
    }
});
