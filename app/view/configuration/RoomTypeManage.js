Ext.define('Regardz.view.configuration.RoomTypeManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.roomtypemanage',
    modal: true,
    width: 500,
    border: false,
    title: 'Add Room Type_Title'.l('SC20110'),
    autoShow: true,

    initComponent: function () {
        var me = this;
        if (Ext.getCmp('manageRoomType'))
            Ext.getCmp('manageRoomType').destroy();
        var me = this;
        me.disableitems = true;
        me.allowBlank = false;
        me.langClass = 'languagebutton-disable';

        if (me.roomTypeId > 0) {
            me.disableitems = false;
            me.allowBlank = true;
            me.langClass = 'languagebutton';
        }
        me.items = [{
            xtype: 'form',
            id: 'manageRoomType',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:10px;",
            //	            tbar: ['->', {
            //	                xtype: 'button',
            //	                text: 'Language'.l('g'),
            //	                action: 'LanguageContent',
            //	                disabled: me.disableitems
            //	            }
            //				],
            //fileUpload: true,
            items: [{
                xtype: 'hidden',
                name: 'RoomTypeId',
                value: me.roomTypeId
            }, {
                xtype: 'hidden',
                name: 'IsActive',
                value: true
            }, {
                xtype: 'hidden',
                name: 'LanguageId',
                value: user_language
            }, {
                xtype: 'textfield',
                fieldLabel: 'Room Type Name'.l('SC20110') + '*',
                name: 'RoomTypeName',
                allowBlank: false,
                selectOnFocus: true,
                maxLength: 200,
                anchor: '100%',
                regex: /[a-zA-Z0-9]+/
            }, {
                xtype: 'textareafield',
                fieldLabel: 'Description'.l('SC20110'),
                name: 'Description',
                selectOnFocus: true,
                anchor: '100%',
                maxLength: 1000
            }, {
                xtype: 'textfield',
                fieldLabel: 'Minimal Size'.l('SC20110'),
                allowBlank: true,
                maxLength: 6,
                vtype: 'numeric',
                name: 'MinSize'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Maximal Size'.l('SC20110'),
                allowBlank: true,
                maxLength: 6,
                vtype: 'numeric',
                name: 'MaxSize'
            }, {
                xtype: 'textfield',
                fieldLabel: 'Maximal Pax'.l('SC20110'),
                allowBlank: true,
                maxLength: 6,
                vtype: 'numeric',
                name: 'MaxPax'
            }

            //            , {
            //                xtype: 'combo',
            //                name: 'PropertyID',
            //                fieldLabel: 'Property'.l('SC20100'),
            //                forceSelection: true,
            //                allowBlank: false,
            //                queryMode: 'local',
            //                displayField: 'PropertyName',
            //                valueField: 'PropertyId',
            //                emptyText: "Select Property".l('SC20100'),
            //                store: myStore,
            //                anchor: '100%'
            //            }
				],
            buttons: [{
                text: 'Cancel'.l('w'),
                scope: me,
                handler: function () {
                    this.close();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveRoomType'
            }
				], tbar: ['->', {
				    xtype: 'button',
				    itemid: 'roomTypeLanguage',
				    action: 'saveRoomTypeLang',
				    tooltip: 'Update multilingual contents'.l('g'),
				    disabled: me.disableitems,
				    iconCls: me.langClass
				}]
        }
		];
        //console.log('end form');
        me.callParent(arguments);
    }
});