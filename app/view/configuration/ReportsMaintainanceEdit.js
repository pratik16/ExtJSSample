Ext.define('Regardz.view.configuration.ReportsMaintainanceEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.reportsmaintainanceedit',
    title: 'Report edit',
    width: '60%',
    itemid: 'windowReportEdit',
    reportObj: {},
    initComponent: function () {

        var me = this;
        var SSRS = false;
        if (me.reportObj.ReportType != 1) {
            SSRS = true;
        }

        me.leftSide = {
            xtype: 'form',
            itemid: 'formEditReport',
            border: false,
            items: [{
                xtype: 'fieldset',
                title: 'General',
                defaultType: 'checkbox',
                defaults: {
                    anchor: '100%',
                },
                items: [
                    {
                        xtype: 'hidden',
                        name: 'ReportId',
                        value: me.reportObj.ReportId
                    },
                   {
                       xtype: 'textfield',
                       name: 'ReportName',
                       fieldLabel: 'Name*',
                       labelWidth: 90,
                       anchor: '100%',
                       allowBlank: false,
                       value: me.reportObj.ReportName
                   },
                   {
                       xtype: 'radiofield',
                       fieldLabel: 'Type*',
                       allowBlank: false,
                       boxLabel: 'SSRS',
                       name: 'ReportType',
                       inputValue: '0',
                       checked: SSRS
                   },
                   {
                       xtype: 'radiofield',
                       name: 'ReportType',
                       fieldLabel: '',
                       inputValue: '1',
                       hideEmptyLabel: false,
                       boxLabel: 'AFAS',
                       checked: !SSRS
                   },
                   {
                       xtype: 'checkbox',
                       fieldLabel: 'HTML Link',
                       name: 'IsHtml',
                       checked: me.reportObj.IsHtml
                   },
                   {
                       xtype: 'checkbox',
                       fieldLabel: 'Excel Link',
                       name: 'IsExcel',
                       checked: me.reportObj.IsExcel
                   },
                   {
                       xtype: 'checkbox',
                       fieldLabel: 'Word Link',
                       name: 'IsWord',
                       checked: me.reportObj.IsWord
                   },
                   {
                       xtype: 'checkbox',
                       fieldLabel: 'CSV Link',
                       name: 'IsCSV',
                       checked: me.reportObj.IsCSV
                   },
                   {
                       xtype: 'checkbox',
                       fieldLabel: 'PDF Link',
                       name: 'IsPDF',
                       checked: me.reportObj.IsPDF
                   },

                ]
            }]

        };
        me.rightSide = {
            xtype: 'gridpanel',
            title: 'Parameters',
            itemid: 'parameterGridPanel',
            store: Ext.getStore('configuration.ReportParameterListStore'),
            viewConfig: {
                emptyText: "No data to display".l("g")
            },
            columns: [
                {
                    header: 'Name',
                    dataIndex: 'Name',
                    flex: 2
                },
                {
                    header: 'Code',
                    dataIndex: 'Code',
                    flex: 1
                },
                {
                    header: 'Type',
                    dataIndex: 'TypeName',
                    flex: 1
                },
                {
                    width: 25,
                    tdCls: 'icon-delete-item',
                    hideable: false
                },
                {
                    width: 25,
                    tdCls: 'icon-edit',
                    hideable: false
                }
            ],
            tbar: [{
                xtype: 'button',
                iconCls: 'new',
                action: 'reportsAddParamAction'
            }]
        };
        var bigPanel = Ext.create('Ext.panel.Panel', {
            border: false,
            layout: 'column',
            items: [{
                columnWidth: .50,
                margin: 10,
                border: false,
                items: [me.leftSide]
            }, {
                columnWidth: .50,
                margin: '18 10 0 0',
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
                action: 'actionSaveReport'
            }],
        });
        me.items = [bigPanel];
        me.disableitems = false;
        me.langClass = 'languagebutton';
        me.tbar = ['->', {
            xtype: 'button',
            action: 'showReportEditLang',
            tooltip: 'Update multilingual contents'.l('g'),
            disabled: me.disableitems,
            iconCls: me.langClass
        }
        ]
        me.callParent();
    }
});