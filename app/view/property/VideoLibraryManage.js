Ext.define('Regardz.view.property.VideoLibraryManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.videolibrarymanage',
    modal: true,
    width: 400,
    border: false,
    title: 'Add Video_Title'.l('SC31310'),
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('addvideolibform'))
            Ext.getCmp('addvideolibform').destroy();

        var me = this;

        me.disableitems = true;
        me.langClass = 'languagebutton-disable';
        if (me.videoDetailId > 0) {
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

        me.items = [{
            xtype: 'form',
            id: 'addvideolibform',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:10px;",
            fileUpload: true,
            items: [{
                xtype: 'hidden',
                name: 'LanguageId',
                value: user_language //default lang Id
            }, {
                xtype: 'hidden',
                name: 'PropertyId',
                value: me.propertyId
            }, {
                xtype: 'hidden',
                name: 'VideoDetailId',
                value: me.videoDetailId
            }, {
                xtype: 'textfield',
                fieldLabel: 'Video Name'.l('SC31300') + '*',
                name: 'VideoName',
                allowBlank: false,
                selectOnFocus: true,
                anchor: '100%'
            }, {
                xtype: 'textareafield',
                fieldLabel: 'Description'.l('SC31300') + '*',
                name: 'Description',
                selectOnFocus: true,
                allowBlank: false,
                anchor: '100%'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Youtube URL'.l('SC31300') + '*',
                allowBlank: false,
                vtype: 'url',
                name: 'youtubeIFramURL',
                selectOnFocus: true,
                anchor: '100%'
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
            }
				],
            buttons: [{
                text: 'Cancel'.l('w'),
                scope: me,
                handler: function () {
                    this.close();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveVideoLibrary'
            }
				]
        }
		];
        //console.log('end form');
        me.callParent(arguments);
    }
});