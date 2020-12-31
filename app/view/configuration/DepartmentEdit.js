Ext.define('Regardz.view.configuration.DepartmentEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.departmentEdit',
    id: 'departmentEditWindow',
    stores: ['configuration.DepartmentManageStore'],

    initComponent: function () {
        var me = this;

        me.tabDisabled = true;
        me.disableitems = true;

        if (me.departmentId > 0) {
            me.tabDisabled = false;
            me.disableitems = false;
        }
        //me.autoScroll = true;
        me.height = 550;
        me.width = 700;

        if (typeof me.departmentId == 'undefined') {
            SubDepartmentList = '';
        } else {
            me.SubDepartmentList = Ext.create('widget.subdepartmentmanagelist');
            me.SubDepartmentList.height = me.height - 100;
        }

        if (Ext.getCmp('departmentEditWindow'))
            Ext.getCmp('departmentEditWindow').destroy();

        me.border = false;
        me.departmentBasic = {
            xtype: 'form',
            layout: 'form',
            border: false,
            padding: 5,
            frame: true,
            plain: true,
            border: '0px',
            defaultType: 'textfield',
            id: 'departmentEdit',
            buttonAlign: 'center',
            items: [{
                xtype: 'hidden',
                name: 'DepartmentId',
                value: me.DepartmentId
            }, {
                xtype: 'textfield',
                //fieldLabel: 'Fixed Price Package Name'.l('RAP-A05-06'),
                fieldLabel: 'Department'.l('SC23100'),
                name: 'DepartmentName',
                maxLength: 80,
                allowBlank: false,
                selectOnFocus: true,
                anchor: '100%'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Code'.l('SC23100'),
                name: 'DeptCode',
                maxLength: 16,
                allowBlank: false,
                selectOnFocus: true,
                anchor: '100%'
            }, {
                xtype: 'textarea',
                //fieldLabel: 'Fixed Price Package Name'.l('RAP-A05-06'),
                fieldLabel: 'Description'.l('SC23100'),
                name: 'Description',
                maxLength: 256,
                //allowBlank: false,
                selectOnFocus: true,
                anchor: '100%'
            }, {
                xtype: 'checkboxfield',
                fieldLabel: 'Status'.l('SC23100'),
                name: 'IsActive',
                inputValue: 'true',
                uncheckedValue: 'false'
            }, {
                xtype: 'checkboxfield',
                fieldLabel: 'CRO'.l('SC23100'),
                name: 'IsCRO',
                inputValue: 'true',
                uncheckedValue: 'false'
            }, {
                xtype: 'hidden',
                name: 'CreatedDate'
            }, {
                xtype: 'hidden',
                name: 'CreatedBy'
            }, {
                xtype: 'hidden',
                name: 'UpdatedDate'

            }, {
                xtype: 'hidden',
                name: 'UpdatedBy'
            }]
        };

        me.checkboxconfigs = [];
        me.windowWidth = 900;
        Ext.apply(me, {
            title: 'Add Department_Title'.l('SC23100'),
            autoShow: true,
            y: 0,
            // modal : true,
            closable: true,
            resizable: true,
            buttonAlign: 'right',
            width: me.windowWidth,
            border: false,
            items: {
                xtype: 'tabpanel',
                activeTab: 0,
                width: me.windowWidth - 20,
                plain: false,
                border: false,
                //frame: true,
                bodyPadding: 1,
                padding: 5,
                //cls: 'departmentEdit',
                layout: 'form',
                style: 'background:none; border:0px;',
                items: [{
                    title: 'Department Information'.l('SC23100'),
                    items: me.departmentBasic
                }, {
                    title: 'Sub Departments'.l('SC23100'),
                    name: 'SubDepartments',
                    items: me.SubDepartmentList,
                    disabled: me.tabDisabled
                }]
            }
        });
        me.dockedItems = [{
            dock: 'bottom',
            align: 'right',
            buttonAlign: 'right',
            buttons: [{
                text: 'Cancel'.l('w'),
                action: 'cancel',
                handler: function () {
                    me.destroy();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveDepartment',
                formBind: true
            }]
        }];

        me.callParent();
    }
});