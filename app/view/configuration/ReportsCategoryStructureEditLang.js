Ext.define('Regardz.view.configuration.ReportsCategoryStructureEditLang', {
    extend: 'Ext.window.Window',
    alias: 'widget.reprotscategorystructureeditlang',

    initComponent: function () {
        var me = this;

        me.autoScroll = true;
        me.height = 150;
        me.autoShow = true;

        if (Ext.getCmp('reportscatstructureEditLng'))
            Ext.getCmp('reportscatstructureEditLng').destroy();

        me.propertyBasic = {
            xtype: 'form',
            layout: 'form',
            border: false,
            padding: 5,
            frame: true,
            plain: true,
            // modal: true,
            border: '0px',
            itemid: 'reportscatstructureEditLng',
            cls: 'propertyEdit',
            //bodyPadding :'5px',
            defaultType: 'textfield',
            buttonAlign: 'center',
            items: [{
                xtype: 'combo',
                name: 'languageId',
                fieldLabel: 'Lang. for content'.l('SC20131'),
                itemid: 'languageListCategoryStructureComboId',
                displayField: 'Name',
                valueField: 'LanguageId',
                emptyText: "Language for content",
                anchor: '100%',
                allowBlank: false,
                store: Ext.getStore('common.LanguageListStore')
            }, {
                name: 'name',
                fieldLabel: 'Category Name'.l('SC20131'),
                allowBlank: false,
                flex: 1,
                maxLength: 256
            }, {
                name: 'reportCategoryId',
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
                action: 'reportsCategoryStructureEditLangAction',
                formBind: true //, //only enabled once the form is valid
                //disabled : true
            }
            ]

        }
        ];

        me.windowWidth = 400;
        Ext.apply(me, {
            title: 'Reports Category Structure Edit Language_Title',
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