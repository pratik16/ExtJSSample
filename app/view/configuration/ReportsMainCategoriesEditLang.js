Ext.define('Regardz.view.configuration.ReportsMainCategoriesEditLang', {
    extend: 'Ext.window.Window',
    alias: 'widget.reprotsmaincategorieseditlang',

    initComponent: function () {
        var me = this;

        me.autoScroll = true;
        me.height = 150;
        me.autoShow = true;

        if (Ext.getCmp('reportsmainCatEditLng'))
            Ext.getCmp('reportsmainCatEditLng').destroy();

        me.propertyBasic = {
            xtype: 'form',
            layout: 'form',
            border: false,
            padding: 5,
            frame: true,
            plain: true,
            // modal: true,
            border: '0px',
            itemid: 'reportsmainCatEditLng',
            cls: 'propertyEdit',
            //bodyPadding :'5px',
            defaultType: 'textfield',
            buttonAlign: 'center',
            items: [{
                xtype: 'combo',
                name: 'languageId',
                fieldLabel: 'Lang. for content'.l('SC20131'),
                itemid: 'languageListComboId',
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
                action: 'reportsMainCategoriesEditLangAction',
                formBind: true //, //only enabled once the form is valid
                //disabled : true
            }
            ]

        }
        ];

        me.windowWidth = 400;
        Ext.apply(me, {
            title: 'Reports Main Categories Edit Language_Title'.l('SC20131'),
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