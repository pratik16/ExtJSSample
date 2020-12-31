Ext.define('Regardz.view.usermanage.RolesList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.roleslist',
    itemid: 'adminroleslistgrid',
    store: 'usermanage.UserlistStore',
    //noResize: true,
    requires: [
		'Ext.ux.form.SearchField'
	],
    initComponent: function () {
        var me = this;

        me.title = "Users".l('SC32200');
        me.columns = [{
            header: 'First Name'.l('SC32000'),
            dataIndex: 'FirstName',
            flex: 1,
            name: 'FirstName'
        }, {
            header: 'Last Name'.l('SC32000'),
            dataIndex: 'LastName',
            flex: 1,
            name: 'LastName'
        }, {
            header: 'Code'.l('SC32200'),
            dataIndex: 'Initial',
            width: 100,
            align: 'center',
            name: 'Initial'
        }, {
            header: 'E-mail'.l('SC32000'),
            dataIndex: 'Email',
            flex: 1,
            name: 'Username'
        }, {
            header: 'Sub depart.'.l('SC32000'),
            dataIndex: 'DepartmentName',
            align: 'center',
            flex: 1,
            name: 'DepartmentName'
        }, {
            header: 'Designation'.l('SC32000'),
            dataIndex: 'DesignationName',
            flex: 1,
            align: 'center',
            name: 'DesignationName'
        }, {
            header: 'Active'.l('SC32210'),
            dataIndex: 'IsActive',
            renderer: this.userstatus,
            align: 'center',
            width: 80,
            name: 'IsActive'
        }, {
            header: 'CreatedDate'.l('SC32000'),
            dataIndex: 'CreatedDate',
            width: 100,
            align: 'center',
            name: 'CreatedDate',
            renderer: this.dateRenderer
        }, {
            dataIndex: 'UserId',
            renderer: this.editUser,
            align: 'center',
            width: 25,
            name: 'EditUser',
            hideable: false
        }, {
            dataIndex: 'UserId',
            renderer: this.deteleUser,
            align: 'center',
            width: 25,
            name: 'DeleteUser',
            hideable: false
        }, {
            hidden: true,
            dataIndex: 'UserId',
            hideable: false
        }];

        me.tbar = [{
            xtype: 'button',
            iconCls: 'new',
            action: 'add_User',
            tooltip: 'Add User'.l('SC34000'),
            text: 'Add New'.l('SC34000')
        }, '->', {
            xtype: 'button',
            iconCls: 'filter',
            disabled: true
        }, {
            xtype: 'searchfield',
            store: Ext.getStore('usermanage.UserlistStore'),
            iconCls: 'filter',
            paramName: 'searchString'
        }];
        me.layout = 'fit';
        me.autoScroll = true;

        me.height = 650;
        me.viewConfig = {
            forceFit: true
        };

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            //pageSize: 5,
            displayInfo: true,
          //  displayMsg: 'Displaying topics {0} - {1} of {2}',
            emptyMsg: "No data to display".l('g')
        };

        me.callParent();
    },
    editUser: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Update User".l('SC34000');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-edit';
    },
    deteleUser: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Delete User".l('SC34000');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-delete';
    },
    userstatus: function (value, metadata, r, rowIndex, colIndex, store) {
        if (value == true)
            metadata.tdCls = 'icon-yes';
    },
    dateRenderer: function (value, metadata, record, rowIndex, colIndex, store) {
        var d = Ext.Date.parse(value, 'c');
        return Ext.util.Format.date(d, usr_dateformat);
    }
});