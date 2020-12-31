Ext.define('Regardz.view.configuration.SubDepartmentManageList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.subdepartmentmanagelist',
    store: 'configuration.SubDepartmentManageStore',
    loadMask: true,

    initComponent: function () {

        var me = this;
        me.autoHeight = true;
        me.columns = [{
            header: 'Sub Departments'.l('SC23100'),
            dataIndex: 'SubDepartmentName',
            flex: 1
        }, {
            header: 'Code'.l('SC23100'),
            dataIndex: 'Code',
            flex: 1
        }, {
            header: 'Description'.l('SC23100'),
            dataIndex: 'Description',
            flex: 1
        }, /*{ header: 'Active',
            dataIndex: 'IsActive',
            renderer: this.EncryptDepartment,
            align: 'center',
            flex: 1
        }, { header: 'CRO',
            dataIndex: 'IsdefiniteAllowed',
            renderer: this.EncryptAdvancePayment,
            align: 'center',
            flex: 1
        }, */{
            dataIndex: 'DepartmentId',
            align: 'center',
            width: 25,
            renderer: this.SubDepartmentEdit,
            name: 'SubDepartmentEdit',
            hideable: false
        }, {
            dataIndex: 'DepartmentId',
            align: 'center',
            width: 25,
            renderer: this.SubDepartmentDelete,
            name: 'SubDepartmentDelete',
            hideable: false
        },
        //{ dataIndex: 'IsActive', renderer: this.SubDepartmentStatus, align: 'center', width: 25, name: 'SubDepartmentStatus', hideable: false },
			{
			hidden: true,
			dataIndex: 'DepartmentId',
			align: 'center',
			hideable: false
        }];

        me.tbar = [{
            xtype: 'button',
            action: 'addSubDepartment',
            iconCls: 'new',
            text: 'Add New'.l('SC23100'),
            tooltip: 'Add New Sub Department'.l('SC23100') //.l('RAP-A05-06')
        }];

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            displayInfo: true,
            emptyMsg: "No data to display".l('g')
        };

        me.callParent();
    },
    //    EncryptDepartment: function (value, metadata, record, rowIndex, colIndex, store) {
    //        if (value == true)
    //            return "Yes";
    //        else
    //            return "No";
    //    },
    SubDepartmentEdit: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Update Sub Department".l('SC23110'); //.l('RAP-A05-06');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-edit';
    },

    SubDepartmentDelete: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Delete Sub Department".l('SC23110'); //.l('RAP-A05-06');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-delete';
    }
});