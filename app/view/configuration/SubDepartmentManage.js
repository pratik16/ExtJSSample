Ext.define('Regardz.view.configuration.SubDepartmentManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.subdepartmentmanage',
    modal: true,
    width: 400,
    closable: true,
    border: false,
    //title: 'Add Fixed Price'.l('RAP-A05-06'),
    title: 'Add SubDepartment_Title'.l('SC23110'),
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('addSubDepartment'))
            Ext.getCmp('addSubDepartment').destroy();

        var me = this;

        me.disableitems = true;
        if (me.SubDepartmentId > 0) {
            me.disableitems = false;
        }

        me.items = [{
            xtype: 'form',
            id: 'addSubDepartment',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:10px;",
            fileUpload: true,
            items: [{
                xtype: 'hidden',
                name: 'SubDepartmentId',
                value: me.SubDepartmentId
            }, {
                xtype: 'hidden',
                name: 'DepartmentId',
                value: me.DepartmentId
            }, {
                xtype: 'textfield',
                fieldLabel: 'Sub Department'.l('SC23110'),
                name: 'SubDepartmentName',
                maxLength: 100,
                allowBlank: false,
                selectOnFocus: true,
                anchor: '100%'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Code'.l('SC23110'),
                name: 'Code',
                maxLength: 100,
                allowBlank: false,
                selectOnFocus: true,
                anchor: '100%'
            }, {
                xtype: 'textarea',
                fieldLabel: 'Description'.l('SC23110'),
                name: 'Description',
                maxLength: 512,
                selectOnFocus: true,
                anchor: '100%'
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
            }],
            buttons: [{
                text: 'Cancel'.l('w'),
                scope: me,
                handler: function () {
                    me.destroy();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveSubDepartment'

            }]
        }];
        me.callParent(arguments);
    }
});