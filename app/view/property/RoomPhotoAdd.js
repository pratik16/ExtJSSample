Ext.define('Regardz.view.property.RoomPhotoAdd', {
    extend: 'Ext.window.Window',
    alias: 'widget.roomphotoadd',
    modal: true,
    width: 350,
    border: false,
    title: 'Add Room Photo_Title'.l('SC33151'),
    initComponent: function () {
        var me = this;
        var uploadPhoto;

        me.disableitems = true;
        var uploadFile = true;
        me.langClass = 'languagebutton-disable';

        var fileUploadFlag = false;
        if (me.RoomPhotosId > 0) {
            uploadPhoto = {
                xtype: 'hidden'
            }
            me.langClass = 'languagebutton';
            me.disableitems = false;
        }
        else {
            fileUploadFlag = true;
            uploadPhoto = {
                xtype: 'filefield',
                name: 'postedFile',
                labelAlign: 'left',
                fieldLabel: 'Upload Photos'.l('SC33151') + '*',
                vtype: 'imgFile',
                allowBlank: false,
                blankText: 'Select the file for upload!'.l('SC33151'),
                typeAhead: true,
                selectOnFocus: true,
                anchor: '100%',
                width: 260,
                buttonText: 'Browse'.l('SC33151')+'...'
            }
        }

        me.items = [{
            xtype: 'form',
            margin: '0 0 10 0',
            border: false,
            bodyStyle: 'background: none',
            itemid: 'roomphotomanage',
            fileUpload: fileUploadFlag,
            tbar: ['->',
                {
                    xtype: 'button',
                    // text: 'Language',                                    
                    itemid: 'addRoomPhotoLanguage',
                    action: 'addRoomPhotoLanguage',
                    disabled: me.disableitems,
                    iconCls: me.langClass,
                    tooltip: 'Update multilingual contents'.l('g')
                    //margin: '0 0 10 0'
                }
		    ],
            items: [
            {
            layout: 'vbox',
            margin: '0 10 10 10',
            border: 0,
            items: [
            {
                xtype: 'hidden',
                name: 'RoomId',
                value: me.roomId
            }, {
                xtype: 'hidden',
                name: 'RoomPhotosId',
                value: 0
            },
            {
                xtype: 'displayfield',
                height: 15
            },
            {
                xtype: 'textfield',
                fieldLabel: 'Photo Title'.l('SC33151') + '*',
                name: 'PhotoTitle',
                allowBlank: false,
                width: 260,
                selectOnFocus: true,
                anchor: '100%'
            }, uploadPhoto,
					{
					    xtype: 'hidden',
					    name: 'CreatedBy'
					},
					{
					    xtype: 'hidden',
					    name: 'CreatedDate'
					},
					{
					    xtype: 'hidden',
					    name: 'UpdatedBy'
					},
					{
					    xtype: 'hidden',
					    name: 'UpdatedDate'
					},
                    {
                        xtype: 'hidden',
                        name: 'LanguageId'
                    }

				]
                }],
            buttons: [{
                text: 'Cancel'.l('w'),
                scope: me,
                handler: function () {
                    this.close();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'roomPhotoAdd'
            }
				]
        }
		];
        //console.log('end form');
        me.callParent(arguments);
    }
});