Ext.define('Regardz.view.configuration.RolesList', {
    extend: 'Ext.grid.Panel',
    itemid: 'configroleslistgrid',
    alias: 'widget.configroleslist', //same alias applied at usermanage: by Pratik so changed it
    store: 'configuration.RolesListStore',
    requires: [
		'Ext.ux.form.SearchField'
	],
    initComponent: function () {
        var me = this;
        me.noResize = true;
        me.title = 'Roles'.l('SC22100');
        me.columns = [{
            header: 'Name'.l('SC22100'),
            dataIndex: 'RoleName',
            flex: 1,
            name: 'rolename'
        }, {
            dataIndex: 'RoleId',
            align: 'center',
            width: 25,
            name: 'editRole',
            renderer: this.editRoleIcon
        }, {
            dataIndex: 'RoleId',
            align: 'center',
            width: 25,
            name: 'deleteRole',
            renderer: this.deleteRoleIcon
        }, {
            hidden: true,
            dataIndex: 'roleId'
        }];

        me.tbar = [{
            xtype: 'button',
            iconCls: 'new',
            action: 'addRole',
            tooltip: 'Add Role'.l('SC22100')
        },
        '->', {
            xtype: 'button',
            iconCls: 'filter',
            disabled: true
        }, {
            xtype: 'searchfield',
            store: Ext.getStore('configuration.RolesListStore'),
            iconCls: 'filter',
            paramName: 'searchString'
        }];
        me.layout = 'fit';
        me.autoScroll = true;


        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            width: '100%',
            //pageSize: 5,
            displayInfo: true,
            displayMsg: 'Displaying topics {0} - {1} of {2}',
            emptyMsg: "No topics to display"
        };

        me.callParent();

    },

    editRoleIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Edit Role".l('SC34000');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-edit';
    },

    deleteRoleIcon: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Delete Role".l('SC34000');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-delete';
    }
});