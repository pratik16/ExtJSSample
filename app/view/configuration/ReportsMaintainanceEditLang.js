Ext.define('Regardz.view.configuration.ReportsMaintainanceEditLang', {
    extend: 'Ext.window.Window',
    alias: 'widget.reportsmaintainanceeditlang',
    reportId: 0,
    initComponent: function () {
        var me = this;

        me.autoScroll = true;
        me.height = 150;
        me.autoShow = true;

        if (Ext.getCmp('reportsmaintainanceeditlang'))
            Ext.getCmp('reportsmaintainanceeditlang').destroy();

        me.propertyBasic = {
            xtype: 'form',
            layout: 'form',
            border: false,
            padding: 5,
            frame: true,
            plain: true,
            // modal: true,
            border: '0px',
            itemid: 'reportsEditLangForm',
            cls: 'propertyEdit',
            //bodyPadding :'5px',
            defaultType: 'textfield',
            buttonAlign: 'center',
            items: [{
                xtype: 'combo',
                name: 'languageId',
                fieldLabel: 'Lang. for content',
                itemid: 'reportsEditLangCombo',
                displayField: 'Name',
                valueField: 'LanguageId',
                emptyText: "Language for content",
                anchor: '100%',
                allowBlank: false,
                store: Ext.getStore('common.LanguageListStore')
            }, {
                name: 'ReportName',
                fieldLabel: 'Report name',
                itemid: 'txtReportName',
                allowBlank: false,
                flex: 1,
                maxLength: 256
            }, {
                name: 'ReportId',
                hidden: true,
                value: me.reportId
            },{
                name: 'LangReportId',
                hidden: true,
                value: me.reportId
            },
            {
                name: 'createdBy',
                value: CurrentSessionUserId,
                hidden: true
            }
            ]
        };

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
                action: 'reportsEditLangAction',
                formBind: true //, //only enabled once the form is valid
                //disabled : true
            }
            ]

        }
        ];

        me.windowWidth = 400;
        Ext.apply(me, {
            title: 'Report edit language',
            autoShow: true,
            closable: true,
            resizable: true,
            border: false,
            width: me.windowWidth,
            items: me.propertyBasic
        });

        me.callParent();
    }
});