Ext.define('Regardz.view.configuration.ReportsMaintainanceAdd', {
    extend: 'Ext.window.Window',
    alias: 'widget.reportsmaintainanceadd',
    title: 'Report add',
    width: '40%',
    
    initComponent: function () {
        var me = this;
        me.leftSide = {
            xtype: 'form',
            itemid: 'formAddReport',
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
                       xtype: 'textfield',
                       name: 'ReportName',
                       fieldLabel: 'Name*',
                       labelWidth: 90,
                       anchor: '100%',
                       allowBlank: false
                   },
                   {
                       xtype: 'radiofield',
                       fieldLabel: 'Type*',
                       boxLabel: 'SSRS',
                       name: 'ReportType',
                       inputValue: '0'
                   },
                   {
                       xtype: 'radiofield',
                       name: 'ReportType',
                       fieldLabel: '',
                       inputValue: '1',
                       hideEmptyLabel: false,
                       boxLabel: 'AFAS'
                   },
                   {
                       xtype: 'checkbox',
                       fieldLabel: 'HTML Link',
                       name: 'IsHtml'
                   },
                   {
                       xtype: 'checkbox',
                       fieldLabel: 'Excel Link',
                       name: 'IsExcel'
                   },
                   {
                       xtype: 'checkbox',
                       fieldLabel: 'Word Link',
                       name: 'IsWord'
                   },
                   {
                       xtype: 'checkbox',
                       fieldLabel: 'CSV Link',
                       name: 'IsCSV'
                   },
                   {
                       xtype: 'checkbox',
                       fieldLabel: 'PDF Link',
                       name: 'IsPDF'
                   },

                ]
            }]

        };
        var bigPanel = Ext.create('Ext.panel.Panel', {
            border: false,
            layout: 'fit',
            margin: 10,
            items: [
                me.leftSide
            ],
            buttons: [{
                text: 'Cancel'.l('w'),
                scope: me,
                handler: function () {
                    this.close()
                }
            }, {
                text: 'Save'.l('w'),
                action: 'actionAddReport'
            }],

        });
        me.items = [bigPanel];
        me.disableitems = true;
        me.langClass = 'languagebutton-disable';
        me.tbar = ['->', {
            xtype: 'button',
            tooltip: 'Update multilingual contents'.l('g'),
            disabled: me.disableitems,
            iconCls: me.langClass
        }
        ]
        me.callParent();
    }
});