Ext.define('Regardz.view.property.PropertyContentLang', {
    extend: 'Ext.window.Window',
    alias: 'widget.propertycontentlang',

    initComponent: function () {
        var me = this;
        me.autoScroll = true;
        me.height = 500;
      //  me.width = parseInt(Ext.getBody().getViewSize().width * (0.80));
        if (Ext.getCmp('propertyEditContentLng'))
            Ext.getCmp('propertyEditContentLng').destroy();
        me.layout = 'fit';
        me.propertyContent = {
            xtype: 'form',
            layout: 'form',
            border: false,
            id: 'propertyEditContentLng',
            padding: 5,
            frame: true,
            plain: true,
            border: '0px',
            cls: 'propertyEdit',
            //bodyPadding :'5px',
            defaultType: 'textfield',
            buttonAlign: 'center',
            items: [{
                xtype: 'combo',
                name: 'LanguageId',
                fieldLabel: 'Lang. for content'.l('SC31140'),
                displayField: 'Name',
                valueField: 'LanguageId',
                emptyText: "Language for content".l('SC31140'),
                anchor: '100%',
                width: '100%',
                allowBlank: false,
                store: Ext.getStore('common.LanguageListStore'),
                value: user_language
            }, {
                xtype: 'htmleditor',
                name: 'PropertyContent',
                width: '100%',
                itemid: 'propertycontenteditorlang',
                styleHtmlContent: true,
                fieldBodyCls: 'contentCls',
                enableLinks: true,
                margin: 10,
                height: 350,
                padding: 5,
                plugins: [
					Ext.create("Ext.ux.form.HtmlEditor.Image", { section: 'PropertyEditLang' }),
					Ext.create("Ext.ux.form.HtmlEditor.TargetLink")
				]
            }, {
                name: 'PropertyId',
                hidden: true
            }, {
                name: 'PropertyName',
                hidden: true
            }, {
                name: 'Description',
                hidden: true
            }, {
                name: 'Address',
                hidden: true
            }, {
                name: 'LangPropertyId',
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
                action: 'propertyContentEditLang',
                formBind: true //, //only enabled once the form is valid
                //disabled : true
            }
				]
        }
		];

        me.windowWidth = parseInt(Ext.getBody().getViewSize().width * (0.60)); ;
        Ext.apply(me, {
            title: 'Property Content Language_Title'.l('SC31140'),
            autoShow: true,
            closable: true,
            resizable: true,
            border: false,
            width: me.windowWidth,
            items: me.propertyContent
        });

        me.callParent();
    }
});