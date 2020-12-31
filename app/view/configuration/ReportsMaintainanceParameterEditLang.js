Ext.define('Regardz.view.configuration.ReportsMaintainanceParameterEditLang', {
    extend: 'Ext.window.Window',
    alias: 'widget.reportsmaintainanceparametereditlang',
    reportParameterId: 0,
    initComponent: function () {
        var me = this;

        me.autoScroll = true;
        me.height = 200;
        me.autoShow = true;

        if (Ext.getCmp('reportsmaintainanceparametereditlang'))
            Ext.getCmp('reportsmaintainanceparametereditlang').destroy();

        me.propertyBasic = {
            xtype: 'form',
            layout: 'form',
            border: false,
            padding: 5,
            frame: true,
            plain: true,

            // modal: true,
            border: '0px',
            itemid: 'reportsParameterEditLangForm',
            cls: 'propertyEdit',
            //bodyPadding :'5px',
            defaultType: 'textfield',
            buttonAlign: 'center',
            items: [{
                xtype: 'combo',
                name: 'languageId',
                fieldLabel: 'Lang. for content',
                itemid: 'reportsParameterEditLangCombo',
                displayField: 'Name',
                valueField: 'LanguageId',
                emptyText: "Language for content",
                anchor: '100%',
                allowBlank: false,
                store: Ext.getStore('common.LanguageListStore')
            }, {
                name: 'ParameterName',
                fieldLabel: 'Parameter name',   
                itemid: 'txtParameterName',
                allowBlank: false,
                flex: 1,
                maxLength: 256
            },
             {
                name: 'Description',
                fieldLabel: 'Description',
                itemid: 'txtDescriptionField',
                allowBlank: false,
                flex: 1,
                maxLength: 256
            }, {
                name: 'ReportParameterId',
                hidden: true,
                value: me.reportParameterId
            },{
                name: 'LangReportParameterId',
                hidden: true
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
                action: 'reportsParameterEditLangAction',
                formBind: true //, //only enabled once the form is valid
                //disabled : true
            }
            ]

        }
        ];

        me.windowWidth = 400;
        Ext.apply(me, {
            title: 'Report parameter edit language',
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