Ext.define('Regardz.view.configuration.ReportsMaintainanceParameterAdd', {
    extend: 'Ext.window.Window',
    alias: 'widget.reportsmaintainanceparameteradd',
    title: 'Parameter Add',
    width: '45%',
    reportId: 0,
    paramObj: {},
    isDisabled: false,
    initComponent: function () {

        var me = this;
        if (Utils.isValid(me.paramObj.ReportParameterId) && me.paramObj.ReportParameterId > 0) {
            me.title = 'Parameter edit';
        }
        me.leftSide = {
            xtype: 'fieldset',
            title: 'General',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%',
            },
            items: [
                {
                    xtype: 'hidden',
                    name: 'ReportId',
                    value: me.reportId
                },
                {
                    xtype: 'hidden',
                    name: 'ReportParameterId',
                    value: me.paramObj.ReportParameterId
                },
               {

                   fieldLabel: 'Name*',
                   anchor: '100%',
                   allowBlank: false,
                   name: 'Name',
                   value: me.paramObj.Name
               },
               {

                   fieldLabel: 'Code*',
                   allowBlank: false,
                   name: 'Code',
                   value: me.paramObj.Code
               },
               {
                   xtype: 'combo',
                   fieldLabel: 'Type*',
                   valueField: 'ReportParameterTypeId',
                   value: me.paramObj.ReportParameterTypeId,
                   allowBlank: false,
                   displayField: 'TypeName',
                   name: 'ReportParameterTypeId',
                   store: Ext.getStore('configuration.ReportParametersTypeListStore')
               },
               {
                   xtype: 'textarea',
                   fieldLabel: 'Description',
                   name: 'Description',
                   value: me.paramObj.Description
               },
            ]

        };
        me.rightSide = {
            xtype: 'fieldset',
            title: 'Settings',
            defaultType: 'textfield',
            defaults: {
                anchor: '100%',
            },
            items: [
               {
                   xtype: 'numberfield',
                   minValue: 0,
                   fieldLabel: 'Length*',
                   anchor: '100%',
                   allowBlank: false,
                   name: 'Length',
                   value: me.paramObj.Length
               },
               {
                   xtype: 'checkbox',
                   fieldLabel: 'Mandatory',
                   name: 'IsMandatory',
                   checked: me.paramObj.IsMandatory
               },
               {
                   fieldLabel: 'Default',
                   name: 'DefaultValue',
                   value: me.paramObj.DefaultValue
               }
            ]

        };
        var bigPanel = Ext.create('Ext.form.FormPanel', {
            border: false,
            layout: 'column',
            itemid: 'parameterAddForm',
            items: [{
                columnWidth: .50,
                margin: 10,
                border: false,
                items: [me.leftSide]
            }, {
                columnWidth: .50,
                margin: '10 10 0 0',
                border: false,
                items: [me.rightSide]
            }],
            buttons: [{
                text: 'Cancel'.l('w'),
                scope: me,
                handler: function () {
                    this.close()
                }
            }, {
                text: 'Save'.l('w'),
                margin: '0 10 10 0',
                action: 'addParameterAction'
            }],
        });
        me.items = [bigPanel];
        if (me.isDisabled) {
            me.langClass = 'languagebutton-disable';
        } else {
            me.langClass = 'languagebutton';
        }
        me.tbar = ['->', {
            xtype: 'button',
            tooltip: 'Update multilingual contents'.l('g'),
            disabled: me.isDisabled,
            iconCls: me.langClass,
            action: 'showReportParameterEditLang'
        }
        ]
        me.callParent();
    }
});