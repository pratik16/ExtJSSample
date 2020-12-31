Ext.define('Regardz.view.common.WebshopImageUploadEditor', {
    extend: 'Ext.window.Window',
    alias: 'widget.webshopimageuploadeditor',
    modal: false,
    width: parseInt(Ext.getBody().getViewSize().width / 3),
    border: false,
    title: 'Insert Image_Title'.l('SC31120'),

    initComponent: function () {
        if (Ext.getCmp('webshopimageuploadhtmleditor')) {
            Ext.getCmp('webshopimageuploadhtmleditor').destroy();
        }
        var me = this;
        me.items = [{
            xtype: 'form',
            border: false,
            id: 'webshopimageuploadhtmleditor',
            itemid: 'webshopimageuploadhtmleditor',
            bodyStyle: 'background: none',
            style: "padding:10px;",
            fileUpload: true,
            items: [
				{
				    xtype: 'filefield',
				    name: 'postedFile',
				    labelAlign: 'left',
				    fieldLabel: 'Upload Photos'.l('SC31120'),
				    vtype: 'imgFile',
				    allowBlank: false,
				    blankText: 'Select the file for upload!'.l('SC31120'),
				    typeAhead: true,
				    selectOnFocus: true,
				    anchor: '100%',
				    buttonText: 'Browse...'.l('SC31120')
				},
                {
                    xtype: 'hidden',
                    name: 'newFileName'
                }
			],
            buttons: [{
                text: 'Cancel'.l('w'),
                action: 'cancel',
                handler: function () {
                    me.destroy();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'htmleditor_imginsert'
            }
            ]
        }];
        //console.log('end form');
        me.callParent(arguments);
    }
});