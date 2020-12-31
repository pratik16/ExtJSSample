Ext.define('Regardz.view.usermanage.Userlist', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.userlist',
    itemid: 'adminuserlistgrid',
    store: 'usermanage.UserlistStore',
    noResize: true,
    width: '100%',
    //renderTo: 'right_region', //
    requires: [
		'Ext.ux.form.SearchField'
	],
    initComponent: function () {
        var me = this;
        me.title = "New registrations".l('SC32000');
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
            //tooltip : 'Last Name'.l('RAP-A03-01')
        }, {
            header: 'Username'.l('SC32000'),
            dataIndex: 'Username',
            flex: 1,
            name: 'Username'
        }, {
            header: 'Department'.l('SC32000'),
            dataIndex: 'DepartmentName',
            flex: 1,
            name: 'DepartmentName'
        }, {
            header: 'CreatedDate'.l('SC32000'),
            dataIndex: 'CreatedDate',
            flex: 1, align: 'center',
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

        me.tbar = [
			'->', {
			    xtype: 'button',
			    iconCls: 'filter',
			    disabled: true
			}, {
			    xtype: 'searchfield',
			    store: Ext.getStore('usermanage.UserlistStore'),
			    iconCls: 'filter',
			    paramName: 'searchString'
			}
		];
        me.layout = 'fit';
        me.autoScroll = true;

        //me.autoExpandColumn = 'PropertyName';
        me.height = 500;
        me.viewConfig = {
            forceFit: true
        };

        me.bbar = {
            xtype: 'pagingtoolbar',
            // store: Ext.getStore('usermanage.UserlistStore'),
            store: me.store,
            //pageSize: 5,
            displayInfo: true,
           // displayMsg: 'Displaying topics {0} - {1} of {2}',
            emptyMsg: "No topics to display"
        };

        me.callParent();
    },
    editUser: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Update User".l('SC32000');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-edit';
    },
    deteleUser: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Delete User".l('SC32000');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-delete';
    },
    dateRenderer: function (value, metadata, record, rowIndex, colIndex, store) {
        var d = Ext.Date.parse(value, 'c');
        return Ext.util.Format.date(d, usr_dateformat);
    }
});