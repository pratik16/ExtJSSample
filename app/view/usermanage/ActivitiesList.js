Ext.define('Regardz.view.usermanage.ActivitiesList', {
    extend: 'Ext.grid.Panel',
    //extend: 'Ext.window.Window',
    alias: 'widget.activitieslist',

    store: 'usermanage.ActivitiesListStore',
    //renderTo: 'right_region', //
    requires: [
		'Ext.ux.form.SearchField'
	],
    initComponent: function () {
        var me = this;

        me.title = "User List".l('SC32100') + " >> " + "Activities List_Title".l('SC32100') + ' (' + me.data.FirstName + ' ' + me.data.LastName + ')';
        me.columns = [
			{
			    header: 'Property'.l('SC32100'),
			    dataIndex: 'PropertyName',
			    flex: 1,
			    name: 'PropertyName'
			}, {
			    header: 'Designation'.l('SC32100'),
			    dataIndex: 'DesignationName',
			    width: 200,
			    align: 'left',
			    name: 'Designation'
			}, {
			    header: 'Role'.l('SC32100'),
			    dataIndex: 'RoleName',
			    align: 'left',
			    width: 200,
			    name: 'Role'
			}, {
			    dataIndex: 'RoleId',
			    renderer: this.viewActivitiyDetail,
			    align: 'center',
			    width: 25,
			    name: 'ActivityView',
			    hideable: false
			}, {
			    dataIndex: 'ActivityId',
			    renderer: this.deleteActivity,
			    align: 'center',
			    width: 25,
			    name: 'DeleteActivities',
			    hideable: false
			}, {
			    hidden: true,
			    dataIndex: 'PropertyId',
			    hideable: false
			},
			{
			    hidden: true,
			    dataIndex: 'ActivityId',
			    hideable: false
			},
			{
			    hidden: true,
			    dataIndex: 'RoleId',
			    hideable: false
			}, {
			    hidden: true,
			    dataIndex: 'DesignationId',
			    hideable: false
			}

		];

        me.tbar = [{
            xtype: 'button',
            iconCls: 'icon-roleadd',
            action: 'assign_role',
            tooltip: 'Assign Role'.l('SC32100')
        }, {
            xtype: 'button',
            iconCls: 'icon-activitesadd',
            action: 'assign_activity',
            tooltip: 'Assign Activity'.l('SC32100')
        }      
		];
        me.layout = 'fit';
        me.autoScroll = true;

        me.height = 250;
        me.viewConfig = {
            forceFit: true
        };

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            //pageSize: 5,
            displayInfo: true,
            //displayMsg: 'Displaying topics {0} - {1} of {2}'
            emptyMsg: "No data to display".l('g')
        };

        me.callParent();
    },

    viewActivitiyDetail: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = 'Activity'.l('SC32100');

        if (record.data.RoleId > 0) {
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
            metadata.tdCls = 'icon-note';
        } else
            metadata.tdCls = 'note-disable';
    },

    deleteActivity: function (value, metadata, record, rowIndex, colIndex, store) {

        var tooltipText = 'Delete'.l('SC32100');

        if (record.data.DesignationId > 0) {
            metadata.tdCls = 'delete-disable';
        } else {
            metadata.tdCls = 'icon-delete';
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        }

    }
});