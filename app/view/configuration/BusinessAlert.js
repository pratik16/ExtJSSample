Ext.define('Regardz.view.configuration.BusinessAlert', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.businessalert',
    itemid: 'businessalertsgrid',
    store: 'configuration.TriggerListStore',
    requires: [
		'Ext.ux.form.SearchField'
	],
    initComponent: function () {
        var me = this;
        me.title = "Triggers_Title".l('SC21000');
        me.remoteSort = true;
        me.columns = [
            {
                header: 'Name'.l('SC21000'),
                dataIndex: 'AlertName',
                flex: 1
            },
			{
			    header: 'Role'.l('SC21000'),
			    dataIndex: 'RoleName'
			},
            {
                header: 'Message'.l('SC21000'),
                dataIndex: 'AlertMessage'
            },

             {
                 header: 'Actions'.l('SC21000'),
                 dataIndex: 'Action'
             },
			{
			    dataIndex: 'AlertId',
			    renderer: this.deleteAlert,
			    align: 'center',
			    width: 25,
			    name: 'deleteBusinessAlert'
			},
			 {
			     dataIndex: 'AlertId',
			     renderer: this.editAlert,
			     align: 'center',
			     width: 25,
			     name: 'editBusinessAlert'
			 }

        /* {
        xtype: 'actioncolumn',
        width: 50,
        items: [{
        iconCls: 'icon-delete',
        tooltip: 'Delete'.l('SC21000')
        },{
        iconCls: 'icon-edit',
        tooltip: 'Edit'.l('SC21000')
        }
        ]
        } */
		];

        me.tbar = [{
            xtype: 'button',
            iconCls: 'new',
            text: 'Add new'.l('SC21000'),
            tooltip: 'Add New Alert'.l('SC21000'),
            action: 'addNewAlert'
        },
			'->', {
			    xtype: 'button',
			    iconCls: 'filter',
			    disabled: true
			}, {
			    xtype: 'searchfield',
			    store: Ext.getStore('configuration.TriggerListStore'),
			    iconCls: 'filter',
			    paramName: 'searchParam'
			}
		];
        me.layout = 'fit';
        me.autoScroll = true;
        me.autoExpandColumn = 'Name';

        me.viewConfig = {
            forceFit: true
        };

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            //pageSize: 5,
            displayInfo: true,
            //displayMsg: 'Displaying topics {0} - {1} of {2}',
            emptyMsg: "No topics to display".l('g')
        };

        me.callParent();
    },
    editAlert: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Edit Alert".l('SC21000');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-edit';
    },
    deleteAlert: function (value, metadata, record, rowIndex, colIndex, store) {
        //var tooltipText = "Property delete is not functional yet as its depeneds on Booking section";
        var tooltipText = "Delete Alert".l('SC21000');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-delete';
    }
});