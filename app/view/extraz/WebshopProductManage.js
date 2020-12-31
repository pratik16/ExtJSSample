//Ext.require(['Ext.ux.form.HtmlEditor.Image']);

Ext.define('Regardz.view.extraz.WebshopProductManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.webshopproductmanage',
    requires: ['Regardz.view.common.CheckboxRow'],
    modal: true,
    layout: 'fit',
    width: parseInt(Ext.getBody().getViewSize().width * (0.85)),
    height: parseInt(Ext.getBody().getViewSize().height * (0.9)),
    y: 0,
    border: false,
    title: 'Add Extraaz Product_Title'.l('SC37120'),
    autoShow: true,
    initComponent: function () {

        if (Ext.getCmp('addWebshopProduct'))
            Ext.getCmp('addWebshopProduct').destroy();

        var me = this;
        me.disableitems = true;
        me.langClass = 'languagebutton-disable';
        if (me.webShopId > 0) {
            me.disableitems = false;
            me.langClass = 'languagebutton';
        }

        me.tbar = ['->', {
            xtype: 'button',
            itemid: 'langButton',
            tooltip: 'Update multilingual contents'.l('g'),
            cls: me.langClass,
            action: 'LanguageContent',
            disabled: me.disableitems
        }];

        me.WebshopCategories = {
            xtype: 'grid',
            title: 'Categories'.l('SC37120'),
            store: Ext.getStore('extraz.WebshopCategoriesListProductStore'),
            itemid: 'WebshopCategories',
            cls: 'gridwhitebackground',
            noResize: true,
            width: '100%',
            height: parseInt(Ext.getBody().getViewSize().height * (0.9)) - 430,
            frame: false,
            autoScroll: true,
            columns: [{
                flex: 1,
                dataIndex: 'Name'
            }, {
                width: 30,
                dataIndex: 'Checked',
                xtype: 'checkboxrow'
            }],
            tbar: ['->', {
                xtype: 'button',
                iconCls: 'filter',
                disabled: true
            }, {
                xtype: 'textfield',
                itemid: 'searchStringCategory',
                name: 'searchStringCategory',
                enableKeyEvents: false
            }, {
                xtype: 'button',
                iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
                action: 'clearCategory',
                hidden: true
            }, {
                xtype: 'button',
                action: 'searchCategory',
                iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
            }]
        };

        me.webshopProductBasic = {
            xtype: 'form',
            fileUpload: true,
            border: false,
            padding: '0 10px 0 10px',
            frame: true,
            height: parseInt(Ext.getBody().getViewSize().height * (0.9)) - 125,
            style: 'background:none; border:0px;',
            layout: 'form',
            itemid: 'addWebshopProduct',
            id: 'addWebshopProduct',
            defaultType: 'textfield',
            items: [{
                xtype: 'hidden',
                name: 'LanguageId',
                value: user_language
            }, {
                xtype: 'hidden',
                name: 'WebShopId',
                value: me.webShopId
            }, {
                xtype: 'textfield',
                fieldLabel: 'Name'.l('SC37120') + '*',
                name: 'Item',
                allowBlank: false,
                selectOnFocus: true,
                anchor: '100%',
                maxLength: 200
            }, {
                xtype: 'textareafield',
                //grow: true,
                name: 'Intro',
                fieldLabel: 'Intro'.l('SC37120'),
                maxLength: 500,
                anchor: '100%'
            }, {
                xtype: 'label',
                text: 'Image:'.l('SC37120')
            }, {
                xtype: 'image',
                height: 130,
                widht: 220,
                itemid: 'ImageDisplay',
                padding: '5px 0 5px 105px',
                name: 'ImageDisplay',
                src: ''
            }, {
                xtype: 'filefield',
                name: 'postedFile',
                //labelAlign: 'top',
                fieldLabel: 'Upload'.l('SC37120') + '*',
                vtype: 'imgFile',
                allowBlank: false,
                blankText: 'Select the file for upload'.l('SC31400'),
                typeAhead: true,
                selectOnFocus: true,
                anchor: '100%',
                buttonText: '',
                buttonConfig: { iconCls: 'file_upload' }
            }, {
                xtype: 'textfield',
                fieldLabel: 'Extraaz'.l('SC37120') + '*',
                name: 'Point',
                allowBlank: false,
                selectOnFocus: true,
                anchor: '100%',
                vtype: 'numeric',
                maxLength: 4
            }, {
                xtype: 'hidden',
                name: 'webshopCatIds'
            }, {
                xtype: 'hidden',
                name: 'Description'
                //hidden: true
            }, {
                xtype: "panel",
                border: false,
                style: 'background:none; border:0px;',
                items: [me.WebshopCategories],
                padding: '10px 0 0 0',
                width: '100%'
            }, {
                xtype: 'hidden',
                name: 'CreatedDate'
            }, {
                xtype: 'hidden',
                name: 'CreatedBy'
            }, {
                xtype: 'hidden',
                name: 'UpdatedDate'
            }, {
                xtype: 'hidden',
                name: 'UpdatedBy'
            }],
            listeners: {
                actioncomplete: {
                    fn: function (t, a) {                        
                        //Ext.util.Format
                        Ext.getCmp('WebshopDescription').getForm().findField('Description').setValue(Ext.util.Format.htmlDecode(a.result.data.Description))
                    }
                }
            }
        };

        me.webshopDescription = {
            xtype: 'form',
            title: 'Description'.l('SC37120'),
            itemid: 'WebshopDescription',
            id: 'WebshopDescription',
            height: parseInt(Ext.getBody().getViewSize().height * (0.9)) - 125,
            layout: 'form',
            items: {
                xtype: 'htmleditor',
                name: 'Description',
                itemid: 'webshopdescriptioneditor',
                title: 'Description'.l('SC37120'),
                styleHtmlContent: true,
                fieldBodyCls: 'contentCls',
                enableLinks: true,
                margin: 10,
                width: '100%',
                height: parseInt(Ext.getBody().getViewSize().height * (0.9)) - 150
                //plugins: [Ext.create("Ext.ux.form.HtmlEditor.Image", { section: 'WebshopProductManage' })]
            }
        };

        me.items = [{
            xtype: 'panel',
            layout: 'form',
            fileUpload: true,
            frame: true,
            border: false,
            style: 'background:none; border:0px;',
            frame: true,
            items: [{
                layout: 'hbox',
                frame: true,
                border: false,
                style: 'background:none; border:0px;',
                items: [{
                    frame: true,
                    border: false,
                    style: 'background:none; border:0px;',
                    items: me.webshopProductBasic,
                    width: '40%'
                }, {
                    frame: true,
                    border: false,
                    style: 'background:none; border:0px;',
                    items: me.webshopDescription,
                    width: '60%'
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
                action: 'saveWebshopProduct'
            }
				]
        }
		];
        me.callParent(arguments);
    }
});