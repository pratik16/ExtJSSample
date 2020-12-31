Ext.define('Regardz.view.property.AddFloorPlan', {
    extend: 'Ext.window.Window',
    alias: 'widget.addfloorplan',
    modal: true,
    width: parseInt(Ext.getBody().getViewSize().width * (0.45)),
    border: false,
    title: 'Add floor plan_Title'.l('SC31410'),

    initComponent: function () {
        var me = this;

        if (Ext.getCmp('addFloorPlanform')) {
            Ext.getCmp('addFloorPlanform').destroy();
        }

        me.disableitems = true;
        var uploadFile = true;
        me.langClass = 'languagebutton-disable';
        me.uploadtitle = 'Upload File'.l('SC31410');
        me.allowBlank = false;
        var fileUploadSection = null;

        if (me.propertyFloorPlanId > 0) {
            uploadFile = false;
            me.disableitems = false;
            me.langClass = 'languagebutton';
            me.allowBlank = true;
            //            fileUploadSection = {
            //                xtype: 'hidden'
            //            }
        } else { me.uploadtitle += '*'; }
        //else {
        fileUploadSection = {
            xtype: 'filefield',
            name: 'postedFile',
            //labelAlign : 'top',
            fieldLabel: me.uploadtitle,
            vtype: 'pdffile',
            allowBlank: me.allowBlank,
            blankText: 'Select the file for upload'.l('SC31410'),
            typeAhead: true,
            selectOnFocus: true,
            //   msgTarget: 'side',
            anchor: '100%'
        }
        //}

        me.tbar = ['->',
            {
                xtype: 'button',
                // text: 'Language',                                    
                itemid: 'addFloorPlanLanguage',
                action: 'addFloorPlanLanguage',
                disabled: me.disableitems,
                iconCls: me.langClass,
                tooltip: 'Update multilingual contents'.l('g')
            }
		];

        me.items = [{
            xtype: 'form',
            border: false,
            id: 'addFloorPlanform',
            bodyStyle: 'background: none',
            style: "padding:10px;",
            // fileUpload: uploadFile,
            buttonAlign: 'end',
            items: [{
                xtype: 'hidden',
                name: 'PropertyId',
                value: me.propertyId
            }, {
                xtype: 'hidden',
                name: 'PropertyFloorPlanId',
                value: me.propertyFloorPlanId
            },
                    {
                        xtype: 'textfield',
                        name: 'Description',
                        anchor: '100%',
                        fieldLabel: 'Description'.l('SC31410') + '*',
                        allowBlank: false
                    },
                   fileUploadSection,
                   {
                       xtype: 'combo',
                       name: 'FloorId',
                       fieldLabel: 'Floor'.l('SC31410') + '*',
                       displayField: 'FloorName',
                       valueField: 'FloorId',
                       emptyText: "Select Floor".l('SC31410'),
                       anchor: '100%',
                       store: Ext.getStore('property.PropertyFloorComboStore'),
                       allowBlank: false
                   },

                   {
                       xtype: 'radiogroup',
                       fieldLabel: 'Category'.l('SC31410') + '*',
                       width: 250,
                       columns: 1,
                       vertical: false,
                       allowBlank: false,
                       items: [{
                           boxLabel: 'ROP'.l('SC31410'),
                           name: 'Category',
                           inputValue: 'ROP'
                       }, {
                           boxLabel: 'RAP'.l('SC31410'),
                           name: 'Category',
                           inputValue: 'RAP',
                           checked: true
                       },
                            {
                                boxLabel: 'Both'.l('SC31410'),
                                name: 'Category',
                                inputValue: 'BOTH'
                            }
						]
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
                   },
                    {
                        name: 'LanguageId',
                        value: user_language,
                        xtype: 'hidden'
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
                action: 'saveFloorPlan'
            }
				]
        }
		];

        me.callParent(arguments);
    }
});