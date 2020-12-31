Ext.apply(Ext.form.field.VTypes, {
    //  vtype validation function
    imgFile: function (val, field) {
        var fileName = /^.*\.((j|J)(p|P)(e|E)?(g|G)|(g|G)(i|I)(f|F)|(p|P)(n|N)(g|G)|([bB][mM][pP­])|([wW][mM][fF]))$/i;
        return fileName.test(val);
    },
    // vtype Text property to display error Text
    // when the validation function returns false
    fileText: "Not valid file type",
    // vtype Mask property for keystroke filter mask
    fileMask: /[a-z_\.]/i
});

Ext.define('Regardz.view.property.PhotoGalleryManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.photogallerymanage',
    modal: true,
    width: 400,
    border: false,
    title: 'Add Photo_Title'.l('SC31510'),
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('managePhotoGal'))
            Ext.getCmp('managePhotoGal').destroy();

        var me = this;
        var photoUploadSection;
        //        var photoUploadSection = {
        //            xtype: 'hidden'
        //        };
        me.disableitems = true;
        me.allowBlank = false;
        me.langClass = 'languagebutton-disable';
        me.uploadtitle = 'Upload Photos'.l('SC31500');

        if (me.photoGalleryId > 0) {
            me.disableitems = false;
            me.allowBlank = true;
            me.langClass = 'languagebutton';
        } else { me.uploadtitle += '*'; } //else {
        photoUploadSection = {
            xtype: 'filefield',
            name: 'postedFile',
            labelAlign: 'left',
            fieldLabel: me.uploadtitle,
            vtype: 'imgFile',
            allowBlank: me.allowBlank,
            blankText: 'Select the file for upload!'.l('SC31500'),
            typeAhead: true,
            selectOnFocus: true,
            anchor: '100%',
            buttonText: 'Browse'.l('SC31510') + '...'
        }
        //}

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
            border: false,
            id: 'managePhotoGal',
            bodyStyle: 'background: none',
            style: "padding:10px;",
            fileUpload: true,
            items: [{
                xtype: 'hidden',
                name: 'PropertyId',
                value: me.propertyId
            }, {
                xtype: 'hidden',
                name: 'PhotoGalleryId',
                value: me.photoGalleryId
            }, {
                xtype: 'hidden',
                name: 'LanguageId',
                value: user_language
            }, {
                xtype: 'textfield',
                fieldLabel: 'Photo Title'.l('SC31500') + '*',
                name: 'PhotoTitle',
                allowBlank: false,
                selectOnFocus: true,
                anchor: '100%',
                maxLength: 100
            },
					photoUploadSection, {
					    xtype: 'textareafield',
					    //grow: true,
					    fieldLabel: 'Description'.l('SC31500') + '*',
					    name: 'Description',
					    selectOnFocus: true,
					    allowBlank: false,
					    anchor: '100%',
					    maxLength: 500
					}, {
					    xtype: 'checkboxfield',
					    name: 'IsCoverPhoto',
					    // padding: '0 0 0 105px',
					    fieldLabel: 'Cover Photo'.l('SC31500'),
					    boxLabel: 'Make it cover photo'.l('SC31500'),
                        itemid: 'coverphoto',
					    inputValue: 'true',
					    uncheckedValue: 'false'
					}, {
					    xtype: 'checkboxfield',
					    //hiddenLabel: true
					    //  padding: '0 0 0 105px',
					    fieldLabel: 'Rotating'.l('SC31500'),
					    name: 'IsRotate',
					    boxLabel: 'Make it rotate'.l('SC31500'),
					    inputValue: 'true',
					    uncheckedValue: 'false'
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
                action: 'savePhotoGal'

            }
				]
        }
		];
        me.callParent(arguments);
    }
});