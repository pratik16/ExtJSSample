Ext.define('Regardz.view.extraz.WebshopProductLang', {
    extend: 'Ext.window.Window',
    alias: 'widget.webshopproductlang',
    modal: false,
    width: parseInt(Ext.getBody().getViewSize().width * (0.50)),
    height: parseInt(Ext.getBody().getViewSize().height * (0.8)),
    border: false,
    title: 'Lang Extraz Product_Title'.l('SC37112'),
    autoShow: true,
    autoScroll:true,

    initComponent: function () {

        if (Ext.getCmp('addWebshopProductLang'))
            Ext.getCmp('addWebshopProductLang').destroy();

        var me = this;
        //        me.disableitems = true;
        //        me.langClass = 'languagebutton-disable';
        //        if (me.webShopId > 0) {
        //            me.disableitems = false;
        //            me.langClass = 'languagebutton';
        //        }

        me.webshopProductBasic = {
            xtype: 'form',
            layout: 'form',
            border: false,
            //padding: '0 10px 0 10px',
            frame: true,
            //height: 500,
            style: 'background:none; border:0px;',
            defaultType: 'textfield',
            itemid: 'addWebshopProductLang',
            id: 'addWebshopProductLang',
            items: [{
                xtype: 'hidden',
                name: 'WebShopId',
                value: me.webShopId
            }, {
                xtype: 'hidden',
                name: 'LangWebshopId',
                value: 0
            }, {
                xtype: 'combo',
                name: 'LanguageId',
                allowBlank: false,
                fieldLabel: 'Language'.l('SC37112') + '*',
                displayField: 'Name',
                valueField: 'LanguageId',
                emptyText: "Select language for content".l('SC37112'),
                //anchor: '100%',
                store: Ext.getStore('common.LanguageListStore')
            }, {
                xtype: 'textfield',
                fieldLabel: 'Name'.l('SC37112') + '*',
                name: 'Item',
                allowBlank: false,
                selectOnFocus: true,
                anchor: '100%',
                maxLength: 200
            }, {
                xtype: 'textareafield',
                name: 'Intro',
                fieldLabel: 'Intro'.l('SC37112'),
                anchor: '100%',
                maxLength: 500
            }, {
                xtype: 'hidden',
                name: 'Description'
                //hidden: true
            }],
            listeners: {
                actioncomplete: {
                    fn: function (t, a) {
                        Ext.getCmp('WebshopDescriptionLang').getForm().findField('Description').setValue(Ext.util.Format.htmlDecode(a.result.data.Description))
                    }
                }
            }
        };

        me.webshopDescriptionLang = {
            xtype: 'form',
            title: 'Description'.l('SC37112'),
            itemid: 'WebshopDescriptionLang',
            id: 'WebshopDescriptionLang',
            padding: '0 5px 0 5px',
            layout: 'form',
            items: {
                xtype: 'htmleditor',
                name: 'Description',
                itemid: 'webshoplangdescriptioneditor',
                title: 'Description'.l('SC37112'),
                styleHtmlContent: true,
                fieldBodyCls: 'contentCls',
                enableLinks: true,
                margin: 10,
                width: '100%',
                height: 350
                //plugins: [Ext.create("Ext.ux.form.HtmlEditor.Image", { section: 'WebshopProductLang' })]
            }
        };

        me.items = [{
            xtype: 'panel',
            layout: 'form',
            fileUpload: true,
            frame: true,
            anchor:'100%',
            border: false,
            style: 'background:none; border:0px;',
            frame: true,
            items: [{
                frame: true,
                border: false,
                style: 'background:none; border:0px;',
                items: me.webshopProductBasic,
                height: '38%'
            }, {
                frame: true,
                border: false,
                style: 'background:none; border:0px;',
                items: me.webshopDescriptionLang,                
                height: '58%'
            }],
            buttons: [{
                text: 'Cancel'.l('w'),
                scope: me,
                handler: function () {
                    this.close()
                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveWebshopProductLang'
            }]
        }];
        me.callParent(arguments);
    }
});