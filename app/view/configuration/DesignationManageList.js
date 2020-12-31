Ext.namespace("Ext.ux");

Ext.require(['Ext.ux.CheckColumn']);
//loadStore(r[0].data.Duration);

Ext.define('Regardz.view.configuration.DesignationManageList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.designationmanagelist',
    store: 'configuration.DesignationManageStore',
    id: 'designationmanagelist',
    itemid: 'designationmanagelist',
    loadMask: true,
    columnLines: false,
    selType: 'rowmodel',
    viewConfig: {
        forceFit: true
    },
    requires: [
		'Ext.ux.form.SearchField'
	],
    plugins: [
		Ext.create('Ext.grid.plugin.RowEditing', {
		    clicksToEdit: 1
		})
	],
    title: 'Designation List_Title'.l('SC23300'),

    initComponent: function () {

        var me = this;
        
        if (Ext.getCmp('designationmanagelist')) {
            Ext.getCmp('designationmanagelist').destroy();
        }

        if (Ext.getCmp('subdeptComboid')) {
            Ext.getCmp('subdeptComboid').destroy();
        }

        //        me.deptCombo = new Ext.form.ComboBox({
        //            store: Ext.getStore('configuration.DepartmentStore'),
        //            valueField: "DepartmentId",
        //            displayField: "DepartmentName",
        //            allowBlank: false,
        //            emptyText: 'Select Department'.l('SC23300'),
        //            listeners: {
        //                select: function (combo, newValue, oldValue) {
        //                    if (combo.getValue() > 0) {
        //                        me.subdeptCombo.getStore().load({
        //                            params: {
        //                                id: combo.getValue()
        //                            }
        //                        });
        //                    }
        //                }
        //            }
        //        });

        me.subdeptCombo = new Ext.form.ComboBox({
            // store: Ext.getStore('configuration.SubDepartmentStore'),
            store: Ext.getStore('configuration.SubDepartmentAllStore'),
            valueField: "SubDepartmentId",
            id: 'subdeptComboid',
            displayField: "SubDepartmentName",
            allowBlank: false,
            forceSelection: true,
            emptyText: 'Select Sub-Department'.l('SC23300')
        });

        me.roleCombo = new Ext.form.ComboBox({
            store: Ext.getStore('configuration.RoleStore'),
            valueField: "RoleId",
            id: 'roleComboid',
            displayField: "RoleName",
            allowBlank: false,
            forceSelection: true,
            emptyText: 'Select Role'.l('SC23300')
        });

        me.autoHeight = true;
        me.columns = [
        /*Departement commented and subdepartment added as per Trello showstopper*/
                   {
                   header: 'Sub-Department Name'.l('SC23300'),
                   dataIndex: 'SubDepartmentId',
                   flex: 1,
                   editor: me.subdeptCombo,
                   renderer: this.renderSubDepartment
               },
        //        {
        //            header: 'Department Name'.l('SC23300'),
        //            dataIndex: 'DepartmentId',
        //            flex: 1,
        //            editor: me.deptCombo,
        //            renderer: this.renderDepartment
        //        }, 
        {
        header: 'Role'.l('SC23300'),
        dataIndex: 'RoleId',
        flex: 1,
        editor: me.roleCombo,
        renderer: this.renderRole
    }, {
        header: 'Designation'.l('SC23300'),
        dataIndex: 'DesignationName',
        flex: 1,
        editor: {
            allowBlank: false,
            maxLength: 80,
            emptyText: 'Select Designation'.l('SC23300')
        }
    },

    //           {
    //            header: 'Sub-Department Name'.l('SC23300'),
    //            dataIndex: 'SubDepartmentId',
    //            flex: 1,
    //            editor: me.subdeptCombo,
    //            renderer: this.renderSubDepartment
    //        }, 

        {
        header: 'Active'.l('SC23300'),
        dataIndex: 'IsActive',
        renderer: this.IsChecked,
        width: 60,
        editor: {
            xtype: 'checkbox',
            cls: 'x-grid-checkheader-editor'
        }
    }, {
        dataIndex: 'DesignationId',
        width: 25,
        renderer: this.deleteDesignation,
        name: 'deleteDesignation',
        hideable: false
    }, {
        hidden: true,
        dataIndex: 'DesignationId',
        hideable: false
    }];


    me.tbar = [{
        xtype: 'button',
        action: 'adddesignationaction',
        iconCls: 'new',
        text: 'Add New'.l('SC23300'),
        tooltip: 'Add Designation'.l('SC23300')
    },
			'->', {
			    xtype: 'button',
			    iconCls: 'filter',
			    disabled: true
			}, {
			    xtype: 'searchfield',
			    store: Ext.getStore('configuration.DesignationManageStore'),
			    iconCls: 'filter',
			    paramName: 'searchString'
			}
		];

    me.bbar = {
        xtype: 'pagingtoolbar',
        store: me.store,
        displayInfo: true,
        emptyMsg: "No data to display".l("g")
    };

    me.callParent();
},
deleteDesignation: function (value, metadata, record, rowIndex, colIndex, store) {
    var tooltipText = "Delete Designation".l('SC23300');
    metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
    metadata.tdCls = 'icon-dele';
},
manageDesignation: function (value, metadata, record, rowIndex, colIndex, store) {
    var tooltipText = "Manage Event for Designation".l('SC23300');
    metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
    metadata.tdCls = 'icon-documentadd';
},
renderSubDepartment: function (value, metadata, record, rowIndex, colIndex, store) {
    return record.data.SubDepartmentName;
},
renderRole: function (value, metadata, record, rowIndex, colIndex, store) {
    return record.data.RoleName;
},
IsChecked: function (value, metadata, record, rowIndex, colIndex, store) {
    if (value == true) {
        metadata.tdCls = 'icon-active-indication';
    } else {
        metadata.tdCls = 'icon-deactive-indication';
    }
},

renderDepartment: function (value, metadata, record, rowIndex, colIndex, store) {
    return record.data.DepartmentName;
}
});