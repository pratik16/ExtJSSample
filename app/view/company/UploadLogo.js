Ext.define('Regardz.view.company.UploadLogo', {
    extend: 'Ext.window.Window',
    alias: 'widget.uploadlogo',
    modal: true,
    width: 400,
    border: false,
    title: 'Logo Upload_Title'.l('SC61160'),
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('uploadLogo'))
            Ext.getCmp('uploadLogo').destroy();

        var me = this;
        me.items = [{
            xtype: 'form',
            id: 'uploadLogo',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:20px;",
            fileUpload: true,
            items: [{
                xtype: 'panel',
                frame: true,
                border: false,
                width: 385,
                style: 'background:none; border:0px;',
                layout: 'hbox',
                padding: '0 0 5 0',
                items: [{
                    xtype: 'hidden',
                    name: 'CompanyId',
                    value: me.CompanyId
                }, {
                    xtype: 'label',
                    text: 'Logo'.l('SC61160'),
                    width: 125
                }, {
                    xtype: 'image',
                    itemid: 'previewLogo',
                    name: 'previewLogo',
                    id: 'previewLogo',
                    padding: '25',
                    src: '', //'http://www.sencha.com/img/20110215-feat-html5.png',
                    height: 200,
                    width: 200
                    //                    listeners: {
                    //                        render: function (c) {
                    //                            c.getEl().on('click', function (e) {
                    //                                //alert('User clicked image');
                    //                            }, c);
                    //                        }
                    //                    }
                }]
            }, {
                xtype: 'filefield',
                name: 'postedFile',
                fieldLabel: 'Upload'.l('SC61160'),
                vtype: 'imgFile',
                allowBlank: false,
                blankText: 'Select the file for upload!'.l('SC61160'),
                typeAhead: true,
                selectOnFocus: true,
                anchor: '100%',
                buttonText: '',
                buttonConfig: { iconCls: 'file_upload' }
            }],
            buttons: [{
                text: 'Cancel'.l('w'),
                scope: me,
                handler: function () {
                    this.close();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveLogo'
            }]
        }];
        me.callParent(arguments);
    }
});