Ext.define('Regardz.view.configuration.BusinessAlertTriggerManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.businessalerttriggermanage',
    modal: true,
    title: "Business Alert Trigger Edit_Title".l('SC21010'),
    initComponent: function () {
        var me = this;

        me.height = parseInt(Ext.getBody().getViewSize().height * (0.70));
        me.width = parseInt(Ext.getBody().getViewSize().width * (0.75));

        me.disableitems = true;
        me.allowBlank = false;
        me.langClass = 'languagebutton-disable';

        if (me.AlertId > 0) {
            me.disableitems = false;
            me.allowBlank = true;
            me.langClass = 'languagebutton';
        }
        //SC21010
        me.autoShow = true;
        me.propertytypedata = new Ext.data.SimpleStore({
            fields: ['propertytype', 'propertyid'],
            data: [['Event'.l('SC21010'), '1'], ['Meeting'.l('SC21010'), '2']]
        });
        me.layout = 'fit';
        me.minHeight = parseInt(me.height * (0.9));
        me.items = {
            xtype: 'form',
            defaultType: 'textfield',
            itemid: 'businessalerttriggermanage',
            layout: 'hbox',
            defaults: {
                width: '45%',
                height: parseInt(me.height * (0.7))
            },
            items: [{
                xtype: 'fieldset',
                margin: '15 0 0 15',
                title: 'General'.l('SC21010'),
                defaultType: 'textfield',
                defaults: {
                    anchor: '100%',
                    padding: '10px 0 0 0'
                },
                items: [{
                    hidden: true,
                    name: 'AlertId'
                }, {
                    hidden: true,
                    name: 'LanguageId',
                    value: user_language
                }, {
                    name: 'CreatedDate',
                    hidden: true
                }, {
                    name: 'CreatedBy',
                    hidden: true
                }, {
                    name: 'UpdatedDate',
                    hidden: true
                }, {
                    name: 'UpdatedBy',
                    hidden: true
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Name'.l('SC21010')+'*',
                    name: 'AlertName',
                    labelWidth: 90,
                    anchor: '100%',
                    allowBlank: false,
                    maxLength: 500
                }, {
                    xtype: 'textfield',
                    fieldLabel: 'Message'.l('SC21010'),
                    name: 'AlertMessage',
                    labelWidth: 90,
                    anchor: '100%',
                    allowBlank: false,
                    maxLength: 500
                }, {
                    xtype: 'radiofield',
                    fieldLabel: 'Applies to'.l('SC21010'),
                    name: 'ApplyTo',
                    itemid: 'ApplyToROPcontact',
                    boxLabel: 'ROP (Contact)'.l('SC21010'),
                    inputValue: '1'
                }, {
                    xtype: 'radiofield',
                    boxLabel: 'RAP Wizard actions'.l('SC21010'),
                    name: 'ApplyTo',
                    itemid: 'ApplyToRAPaction',
                    fieldLabel: '',
                    hideEmptyLabel: false,
                    inputValue: '2'
                }, {
                    xtype: 'radiofield',
                    boxLabel: 'RAP Role'.l('SC21010'),
                    name: 'ApplyTo',
                    itemid: 'ApplyToRAProle',
                    fieldLabel: '',
                    hideEmptyLabel: false,
                    inputValue: '3'
                }, {
                    xtype: 'combo',
                    name: 'RoleId',
                    itemid: 'BusinessAlertRAPRole',
                    fieldLabel: '',
                    hideEmptyLabel: false,
                    store: Ext.getStore('configuration.BusinessAlertRAPRoleStore'),
                    valueField: 'RoleId',
                    displayField: 'RoleName',
                    allowBlank: false,
                    disabled: true
                }, {
                    xtype: 'radiofield',
                    boxLabel: 'RAP Department'.l('SC21010'),
                    itemid: 'ApplyToRAPdepartment',
                    name: 'ApplyTo',
                    fieldLabel: '',
                    hideEmptyLabel: false,
                    inputValue: '4'
                }, {
                    xtype: 'combo',
                    name: 'SubDepartmentId',
                    itemid: 'BusinessAlertDepartment',
                    fieldLabel: '',
                    hideEmptyLabel: false,
                    store: Ext.getStore('configuration.BusinessAlertDepartmentStore'),
                    valueField: 'SubDepartmentId',
                    displayField: 'SubDepartmentName',
                    allowBlank: false,
                    disabled: true
                }, {
                    xtype: 'combo',
                    name: 'ROPActionId',
                    fieldLabel: 'ROP Action'.l('SC21010'),
                    itemid: 'BusinessAlertActionROP',
                    store: Ext.create('Regardz.store.configuration.BusinessAlertActionStore'),
                    valueField: 'AlertActionId',
                    displayField: 'ActionName',
                    allowBlank: false,
                    disabled: true
                }, {
                    xtype: 'combo',
                    name: 'RAPActionId',
                    fieldLabel: 'RAP Action'.l('SC21010'),
                    itemid: 'BusinessAlertActionRAP',
                    store: Ext.create('Regardz.store.configuration.BusinessAlertActionStore'),
                    valueField: 'AlertActionId',
                    displayField: 'ActionName',
                    allowBlank: false,
                    disabled: true
                }]
            }, {
                xtype: 'panel',
                title: 'SQL Statement'.l('SC21010'),
                margin: '15 0 15 15',
                width: '50%',
                layout: 'fit',
                /* tbar: [
                {
                xtype: 'button',
                iconCls: 'edit',
                action: 'add_room'
                }
                ], */
                items: [{
                    xtype: 'textarea',
                    name: 'SQLStatement',
                    anchor: '100%',
                    labelWidth: 90,
                    //height : parseInt(me.height * (0.70)),
                    width: '100%',
                    allowBlank: false,
                    maxLength: 2000
                }]
            }],
            buttons: [{
                text: 'Cancel'.l('w'),
                scope: me,
                handler: function () {
                    this.close()
                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveBusinessAlert'
            }],
            tbar: ['->', {
                xtype: 'button',
                action: 'saveBusinessAlertLang',
                tooltip: 'Update multilingual contents'.l('g'),
                disabled: me.disableitems,
                iconCls: me.langClass
            }]
        };

        me.callParent();
    }
});
