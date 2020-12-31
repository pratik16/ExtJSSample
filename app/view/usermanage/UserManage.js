Ext.define('Regardz.view.usermanage.UserManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.usermanage',
    modal: true,
    width: 750,
    y: 0,
    border: false,
    title: "User Edit_Title".l('SC32210'),
    autoShow: false,

    initComponent: function () {
        var me = this;
        //me.frame = true;
        me.items = [{
            xtype: 'form',
            itemid: 'usermanageform',
            border: false,
            bodyStyle: 'padding:5px 5px 0',
            fieldDefaults: { msgTarget: 'side', labelWidth: 100 },
            defaults: { anchor: '100%' },
            layout: { type: 'table', columns: 3 },
            fileUpload: true,
            items: [
            {
                xtype: 'panel',
                border: false,
                width: parseInt(me.width * (0.30)),
                items: [
                    {
                        xtype: 'fieldset',
                        title: 'User information'.l('SC32210'),
                        width: '100%',
                        layout: 'anchor',
                        defaults: { anchor: '100%' },
                        items:
                            [{
                                xtype: 'textfield',
                                name: 'FirstName',
                                padding: 5,
                                fieldLabel: 'First name'.l('SC32210') + '*',
                                allowBlank: false
                            }, {
                                xtype: 'textfield',
                                name: 'LastName',
                                padding: 5,
                                fieldLabel: 'Surname'.l('SC32210') + '*',
                                allowBlank: false
                            }, {
                                xtype: 'radiogroup',
                                fieldLabel: 'Gender'.l('SC32210') + '*',
                                columns: 1,
                                allowBlank: false,
                                vertical: true,
                                items: [
                                    { boxLabel: 'Male'.l('SC32210'), name: 'Gender', inputValue: '1' },
                                    { boxLabel: 'Female'.l('SC32210'), name: 'Gender', inputValue: '2'}]
                            }, {
                                xtype: 'textfield',
                                name: 'LastName',
                                padding: 5,
                                fieldLabel: 'Abbriviation'.l('SC32210') + '*',
                                allowBlank: false
                            }, {
                                xtype: 'textfield',
                                name: 'LastName',
                                padding: 5,
                                fieldLabel: 'E-mail address'.l('SC32210') + '*',
                                allowBlank: false
                            }, {
                                xtype: 'textfield',
                                name: 'LastName',
                                padding: 5,
                                fieldLabel: 'Booking address'.l('SC32210'),
                                allowBlank: false
                            }, {
                                xtype: 'combo',
                                name: 'Department',
                                padding: 5,
                                fieldLabel: 'Department'.l('SC61000') + ':',
                                emptyText: 'Select Quality rating'.l('SC32210'),
                                allowBlank: true,
                                store: 'configuration.DepartmentStore',
                                queryMode: 'local',
                                displayField: 'DepartmentName',
                                valueField: 'DepartmentId'
                            }, {
                                xtype: 'combo',
                                name: 'QualityRating',
                                padding: 5,
                                fieldLabel: 'Department'.l('SC32210') + ':',
                                emptyText: 'Designation'.l('SC32210'),
                                allowBlank: true,
                                store: 'configuration.DesignationManageStore',
                                queryMode: 'local',
                                displayField: 'DesignationName',
                                valueField: 'DesignationId'
                            }, {
                                xtype: 'checkbox',
                                name: 'CompanyNameSrc',
                                inputValue: 'true'
                            }]
                    },
                    {
                        xtype: 'userlist',
                        itemid: 'userlist1',
                        width: parseInt(me.width),
                        width: parseInt(me.windowHeight),
                        padding: '0 5 5 5',
                        iconCls: "user_view",
                        autoScroll: true
                    }]
            },
            {
                xtype: 'userlist',
                itemid: 'userlist2',
                width: parseInt(me.width),
                width: parseInt(me.windowHeight),
                padding: '0 5 5 5',
                iconCls: "user_view",
                autoScroll: true
            },
            {
                xtype: 'userlist',
                itemid: 'userlist3',
                width: parseInt(me.width),
                width: parseInt(me.windowHeight),
                padding: '0 5 5 5',
                iconCls: "user_view",
                autoScroll: true
            }],
            buttons: [{
                text: 'Cancel'.l('w'),
                handler: function () {
                    me.dispose();
                }
            }, {
                text: 'Next'.l('w'),
                action: 'saveCompany',
                itemid: 'saveCompany'
            }]
        }];

        me.callParent(arguments);
    }
});