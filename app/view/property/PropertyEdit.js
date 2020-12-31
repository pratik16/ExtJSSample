Ext.define('Regardz.view.property.PropertyEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.propertyedit',
    id: 'propertyEditWindow',
    modal: true,
    // store: 'property.PropertyFacilityIconsStore',
    stores: ['property.PropertyFacilityIconsStore'],
    requires: ['Regardz.view.common.CheckboxRow', 'Regardz.view.common.ExtendedCheckboxRow'],

    initComponent: function () {
        var me = this;

        Ext.require(['Ext.ux.form.HtmlEditor.Image', 'Ext.ux.form.HtmlEditor.TargetLink']);

        Ext.onReady(function () {
            Ext.override(Ext.ux.form.HtmlEditor.Image, {
                insertimageone: function (text) {
                    if (!this.activated) {
                        return;
                    }
                    if (Ext.isIE) {
                        this.win.focus();
                        var doc = this.getDoc(),
				r = doc.selection.createRange();
                        if (r) {
                            r.pasteHTML(text);
                            this.syncValue();
                            this.deferFocus();
                        }
                    } else {
                        this.win.focus();
                        this.execCmd('InsertImage', text);
                        this.deferFocus();
                    }
                }
            })
        });

        me.tabDisabled = true;
        me.disableitems = true;
        me.langClass = 'languagebutton-disable';

        if (me.propertyId > 0) {
            me.tabDisabled = false;
            me.disableitems = false;
            me.langClass = 'languagebutton';
        }

        me.minHeight = parseInt(Ext.getBody().getViewSize().height * (0.5));
        me.autoScroll = false;
        me.height = parseInt(Ext.getBody().getViewSize().height * (1));
        me.width = parseInt(Ext.getBody().getViewSize().width * (0.80));

        me.gridHeight = parseInt(me.height * (0.40));

        me.propertytypedata = new Ext.data.SimpleStore({
            fields: ['propertytype', 'propertyid'],
            data: [['Event'.l('SC31100'), '1'], ['Meeting'.l('SC31100'), '2']]
        });

        me.Outlets = {
            xtype: 'grid',
            title: 'Outlets'.l('SC31100'),
            store: Ext.getStore('property.OutletGlobalListPropertyStore'),
            itemid: 'ProeprtyOutlets',
            cls: 'gridwhitebackground',
            height: me.gridHeight,
            frame: false,
            autoScroll: true,
            columns: [{
                flex: 1,
                dataIndex: 'OutletName'
            }, {
                width: 30,
                dataIndex: 'Checked',
                xtype: 'checkboxrow'
            }
	        ]
        };

        me.RoomType = {
            xtype: 'grid',
            title: 'Room Types'.l('SC31100'),
            store: Ext.getStore('property.RoomTypePropertyStore'),
            itemid: 'ProeprtyRoomType',
            cls: 'gridwhitebackground',
            height: me.gridHeight,
            frame: false,
            autoScroll: true,
            columns: [{
                flex: 1,
                dataIndex: 'RoomTypeName'
            }, {
                width: 30,
                dataIndex: 'Checked',
                xtype: 'extendedcheckboxrow'
            }
	        ]
        };

        me.Department = {
            xtype: 'grid',
            title: 'Departments'.l('SC31100'),
            store: Ext.getStore('property.DepartmentPropertyStore'),
            itemid: 'ProeprtyDepartment',
            cls: 'gridwhitebackground',
            height: me.gridHeight,
            frame: false,
            autoScroll: true,
            columns: [{
                flex: 1,
                dataIndex: 'SubDepartmentName'
            }, {
                width: 30,
                dataIndex: 'Checked',
                xtype: 'checkboxrow'
            }
	        ]
        };

        me.FloorPlanGrid = {
            xtype: 'grid',
            title: 'Floor Plan'.l('SC31100'),
            store: Ext.getStore('property.FloorPropertyStore'),
            itemid: 'PropertyFloors',
            cls: 'gridwhitebackground',
            height: me.gridHeight,
            frame: false,
            autoScroll: true,
            columns: [{
                flex: 1,
                dataIndex: 'FloorName'
            }, {
                width: 30,
                dataIndex: 'Checked',
                xtype: 'checkboxrow'
            }
	        ]
        };

        me.propertyContent = {
            xtype: 'form',
            title: 'Property Content'.l('SC31100'),
            id: 'propertyContent',
            itemid: 'propertyContent',

            layout: 'form',
            items: {
                xtype: 'htmleditor',
                name: 'PropertyContent',
                itemid: 'propertycontenteditor',
                styleHtmlContent: true,
                fieldBodyCls: 'contentCls',
                enableLinks: true,
                margin: 10,
                width: 580,
                height: parseInt(Ext.getBody().getViewSize().height * (0.78)),
                plugins: [
					Ext.create("Ext.ux.form.HtmlEditor.Image", { section: 'PropertyEdit' }),
					Ext.create("Ext.ux.form.HtmlEditor.TargetLink")
				]
            }
        };

        if (Ext.getCmp('propertytype'))
            Ext.getCmp('propertytype').destroy();

        if (Ext.getCmp('propertyBasicInfoEdit'))
            Ext.getCmp('propertyBasicInfoEdit').destroy();

        if (Ext.getCmp('propertyContent'))
            Ext.getCmp('propertyContent').destroy();

        if (Ext.getCmp('PropertyFeature'))
            Ext.getCmp('PropertyFeature').destroy();

        if (Ext.getCmp('PropertyFacilities'))
            Ext.getCmp('PropertyFacilities').destroy();

        if (Ext.getCmp('propertyEditWindow'))
            Ext.getCmp('propertyEditWindow').destroy();

        if (Ext.getCmp('IsPartner'))
            Ext.getCmp('IsPartner').destroy();

        me.border = false;
        me.propertyBasic = {
            xtype: 'form',
            layout: 'form',
            border: false,
            padding: 5,
            frame: true,
            plain: true,
            border: '0px',
            //bodyPadding :'5px',
            defaultType: 'textfield',
            id: 'propertyBasicInfoEdit',
            //  buttonAlign: 'end',
            //style : 'background:none; color:#DFE8F6',
            //tbar: ,
            items: [
					{
					    name: 'PropertyId',
					    hidden: true,
					    value: 0
					},
					{
					    name: 'PropertyName',
					    fieldLabel: 'Property Name'.l('SC31100') + '*',
					    allowBlank: false,
					    maxLength: 256,
					    flex: 1
					},
                    {
                        name: 'Abbreviation',
                        fieldLabel: 'Abbreviation'.l('SC31100') + '*',
                        maxLength: 50,
                        allowBlank: false
                    },
					{
					    xtype: 'combo',
					    id: 'propertytype',
					    fieldLabel: 'Property Type'.l('SC31100') + '*',
					    hiddenName: 'PropertyType',
					    name: 'PropertyType',
					    store: me.propertytypedata,
					    forceSelection: true,
					    typeAhead: false,
					    triggerAction: 'all',
					    valueField: 'propertyid',
					    displayField: 'propertytype',
					    mode: 'local',
					    minChars: 0,
					    allowBlank: false,
					    editable: false
					},
					{
					    xtype: 'textarea',
					    name: 'Description',
					    height: 55, //ie						
					    fieldLabel: 'Description'.l('SC31100') + '*',
					    allowBlank: false,
					    maxLength: 512
					},
					{
					    name: 'Address',
					    fieldLabel: 'Address'.l('SC31100') + '*',
					    allowBlank: false,
					    maxLength: 512
					},
					{
					    name: 'Postalcode',
					    width: 250,
					    maxLength: 10,
					    fieldLabel: 'Postal Code'.l('SC31100') + '*',
					    allowBlank: false,
					    vtype: 'alphanum'
					},
                    {
                        name: 'City',
                        fieldLabel: 'City'.l('SC31100') + '*',
                        maxLength: 50,
                        allowBlank: false
                    },
					{
					    name: 'Phone',
					    fieldLabel: 'Phone'.l('SC31100') + '*',
					    allowBlank: false,
					    vtype: 'customPhoneNumber',
					    maxLength: 16
					},
					{
					    name: 'Fax',
					    fieldLabel: 'Fax'.l('SC31100'),
					    vtype: 'customPhoneNumber',
					    maxLength: 20
					},
					{
					    name: 'Email',
					    fieldLabel: 'Email'.l('SC31100') + '*',
					    allowBlank: false,
					    vtype: 'email',
					    maxLength: 50
					},
                    {
                        name: 'Website',
                        fieldLabel: 'Website'.l('SC31100'),
                        vtype: 'urlValue',
                        maxLength: 100
                    },
					{
					    xtype: 'checkbox',
					    boxLabel: 'Yes, this is an Associated Business Partner'.l('SC31100'),
					    name: 'IsPartner',
					    action: 'isPartnere',
					    fieldLabel: 'ABP'.l('SC31100'),
					    inputValue: true
					},

            	    {
            	        name: 'PartnerLevel',
            	        fieldLabel: 'Partner Level'.l('SC31100'),
            	        hidden: true
            	    },
                    {
                        name: 'AFASId',
                        fieldLabel: 'AFAS ID'.l('SC31100'),
                        maxLength: 20
                    },
                    {
                        name: 'AFASWarehouseId',
                        fieldLabel: 'AFAS Warehouse ID'.l('SC31100') + '*',
                        maxLength: 20,
                        allowBlank: false
                    },
                     {
                         name: 'ABPEmail',
                         fieldLabel: 'ABP e-mail'.l('SC31100'),
                         disabled: true,
                         maxLength: 50
                     },
                      {
                          name: 'ABPcommission',
                          fieldLabel: 'ABP commission'.l('SC31100') + '*',
                          vtype: 'decimalValue',
                          disabled: true,
                          maxLength: 9
                      },
                      {
                          name: 'DebtorId',
                          fieldLabel: 'ABP Debtor Id'.l('SC31100') + '*',
                          disabled: true,
                          maxLength: 34
                      },
                 {
                     name: 'LoveCustomerPropertyId',
                     fieldLabel: 'Love my guest ID'.l('SC31100'),
                     vtype: 'numeric',
                     maxLength: 9
                 },
					{
					    xtype: 'checkbox',
					    //boxLabel: 'Is Active'.l('SC31100'),
					    name: 'IsActive',
					    fieldLabel: 'Is Active'.l('SC31100'),
					    allowBlank: false,
					    inputValue: 'true'
					},
                    {
                        xtype: 'checkbox',
                        name: 'IsDisable',
                        fieldLabel: 'Is Disable in ROP?'.l('SC31100'),
                        inputValue: 'true'
                    },
					{
					    name: 'CreatedDate',
					    hidden: true
					},
					{
					    name: 'CreatedBy',
					    hidden: true
					},
					{
					    name: 'UpdatedDate',
					    hidden: true
					},
					{
					    name: 'UpdatedBy',
					    hidden: true
					},
					{
					    name: 'LanguageId',
					    hidden: true,
					    value: 1033
					},
                    {
                        name: 'Latitude',
                        hidden: true
                    },
                    {
                        name: 'Longitude',
                        hidden: true
                    },
                    {
                        name: 'ReviewScore',
                        hidden: true
                    },
                    {
                        name: 'PropertyContent',
                        hidden: true
                    },
                    {
                        name: 'featureIds',
                        hidden: true
                    },
                    {
                        name: 'facilityIconIds',
                        hidden: true
                    }, {
                        name: 'DepartmentIds',
                        hidden: true
                    }, {
                        name: 'RoomTypeIds',
                        hidden: true
                    }, {
                        name: 'OutletIds',
                        hidden: true
                    },
                    {
                        name: 'FloorIds',
                        hidden: true
                    },
                    {
                        name: 'RotateIds',
                        hidden: true
                    },
                    {
                        name: 'CoverId',
                        hidden: true
                    }
				],
            listeners: {
                actioncomplete: {
                    fn: function (t, a) {
                        if (a && a.result && a.result.data && a.result.data.PropertyContent) {
                            Ext.getCmp('propertyContent').getForm().findField('PropertyContent').setValue(Ext.util.Format.htmlDecode(a.result.data.PropertyContent))
                        }
                    }
                }
            }
        };

        me.floorPlan = "";
        me.videoLibrary = "";
        me.photoGalleryList = "";
        me.outletGlobleList = "";
        me.itemGloballist = "";
        me.propertyRoomTypeList = "";
        me.roomList = "";
        me.roomPriceRevenue = "";
        me.yieldCalendar = "";
        me.yieldTemplate = "";
        me.cashRegister = "";
        me.meetingTypesList = Ext.create('widget.meetingtypeslist'); me.meetingTypesList.height = me.height - 150;
        me.atmosphereList = Ext.create('widget.atmospherelist'); me.atmosphereList.height = me.height - 150;
        me.facilitiesList = Ext.create('widget.facilitieslist'); me.facilitiesList.height = me.height - 150;

        me.checkboxconfigs = [];
        me.windowWidth = me.width;
        //alert(me.propertyId);
        me.layout = 'fit';
        Ext.apply(me, {
            title: 'Manage Property_Title'.l('SC31100'),
            autoShow: true,
            y: 0,
            // modal : true,
            closable: true,
            resizable: true,
            width: me.windowWidth,
            border: false,
            buttonAlign: 'end',
            items: {
                xtype: 'tabpanel',
                activeTab: 0,
                width: me.windowWidth - 25,
                plain: false,
                border: false,
                //frame: true,
                //bodyPadding: 1,
                // padding: 5,
                cls: 'propertyEdit',
                layout: 'form',
                style: 'background:none; border:0px;',
                defaults: {
                    layout: 'fit'
                },
                items: [
                    {
                        layout: 'hbox',
                        title: 'Basic Information'.l('SC31100'),
                        itemid: 'basicinformation',
                        padding: '0px 10px 0 0',
                        items: [{
                            items: me.propertyBasic,
                            width: '50%'
                        },
                        {
                            xtype: 'container',
                            width: '50%',
                            items: [
                                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    width: '100%',
                                    items: [
                                        {
                                            xtype: "container",
                                            items: [me.RoomType],
                                            padding: '10px 10px 0 10px',
                                            width: '45%'
                                        },
                                        {
                                            xtype: "container",
                                            items: [me.Outlets],
                                            padding: '10px 10px 0 10px',
                                            width: '45%'
                                        }
                                    ]
                                }, {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    width: '100%',
                                    items: [
                                        {
                                            xtype: "container",
                                            items: [me.Department],
                                            padding: '10px 10px 0 10px',
                                            width: '45%'
                                        },
                                        {
                                            xtype: "container",
                                            items: [me.FloorPlanGrid],
                                            padding: '10px 10px 0 10px',
                                            width: '45%'
                                        }
                                    ]
                                }
                            ]
                        }
				        ],
                        tbar: ['->',
                                {
                                    xtype: 'button',
                                    // text: 'Language',                                    
                                    itemid: 'basicPropertyLanguage',
                                    action: 'basicPropertyLanguage',
                                    disabled: me.disableitems,
                                    iconCls: me.langClass,
                                    tooltip: 'Update multilingual contents'.l('g')
                                }
				            ]
                    },
                    me.propertyContent,
                    {
                        title: 'Property Feature'.l('SC31100'),
                        layout: 'hbox',
                        padding: 5,
                        border: false,
                        itemid: 'propertyfeature',
                        items: [
                                { xtype: 'panel', width: '33%', border: true, title: "Meeting Types".l('SC31100'), items: me.meetingTypesList },
                                { xtype: 'panel', width: '33%', title: "Atmosphere".l('SC31100'), items: me.atmosphereList },
                                { xtype: 'panel', width: '33%', title: "Facilities".l('SC31100'), items: me.facilitiesList }
                            ]
                    },
					{
					    title: 'Floor Plan'.l('SC31100'),
					    name: 'floorPlan',
					    itemid: 'floorPlan',
					    items: me.floorPlan,
					    disabled: me.tabDisabled
					},
					{
					    title: 'Video Library'.l('SC31100'),
					    name: 'videoLibrary',
					    itemid: 'videolibrary',
					    items: me.videoLibrary,
					    disabled: me.tabDisabled
					},
					{
					    title: 'Photo Gallery'.l('SC31100'),
					    name: 'photoGallery',
					    itemid: 'photogallery',
					    items: me.photoGalleryList,
					    disabled: me.tabDisabled
					},
                    {
                        title: 'Item'.l('SC31100'),
                        name: 'item',
                        itemid: 'item',
                        items: me.itemGloballist,
                        disabled: me.tabDisabled
                    },
                //                    {
                //                        title: 'Outlet'.l('SC31100'),
                //                        name: 'outLet',
                //                        itemid: 'outlet',
                //                        items: me.outletGlobleList,
                //                        disabled: me.tabDisabled
                //                    },
                //                    {
                //                        title: "Room Type".l('SC31100'),
                //                        name: "roomtype",
                //                        itemid: "roomtype",
                //                        items: me.propertyRoomTypeList,
                //                        disabled: me.tabDisabled
                //                    },
                     {
                     title: 'Rooms'.l('SC31100'),
                     name: 'roomInventory',
                     itemid: 'roominventory',
                     items: me.roomList,
                     disabled: me.tabDisabled
                 }, {
                     title: 'Room Prices and Revenu'.l('SC31100'),
                     name: 'roomPriceRevenue',
                     itemid: 'roomPriceRevenue',
                     items: me.roomPriceRevenue,
                     disabled: me.tabDisabled
                 }, {
                     title: 'Yield calendar'.l('SC31100'),
                     name: 'yieldCalendar',
                     itemid: 'yieldCalendar',
                     items: me.yieldCalendar,
                     disabled: me.tabDisabled
                 }, {
                     title: 'Yield template'.l('SC31100'),
                     name: 'yieldTemplate',
                     itemid: 'yieldTemplate',
                     items: me.yieldTemplate,
                     disabled: me.tabDisabled
                 }, {
                     title: 'Cash Registers'.l('SC31100'),
                     name: 'cashRegister',
                     itemid: 'cashRegister',
                     items: me.cashRegister,
                     disabled: me.tabDisabled
                 }
				]
            }
        });

        // me.propertyBasic.tbar = ['->', { xtype: 'button', text: 'Language'.l('g'), action: 'basicPropertyLanguage', disabled: me.disableitems}];
        me.propertyContent.tbar = ['->', { xtype: 'button',
            //text: 'Language'.l('g'), 
            action: 'basicPropertyContentLanguage', itemid: 'basicPropertyContentLanguage', disabled: me.disableitems,
            iconCls: me.langClass,
            tooltip: 'Update multilingual contents'.l('g')
        }];

        me.dockedItems = [{
            dock: 'bottom',
            align: 'right',
            buttonAlign: 'right',
            style: 'margin-right: 15px',
            buttons: [
				{
				    text: 'Cancel'.l('w'),
				    action: 'cancel',
				    handler: function () {
				        me.destroy();
				    }
				},
                {
                    text: 'Save and Close'.l('w'),
                    action: 'propertyEdit',
                    itemid: 'saveandclose',
                    formBind: true//, //only enabled once the form is valid
                    //disabled : true
                },
                {
                    text: 'Save'.l('w'),
                    action: 'propertyEdit',
                    itemid: 'save',
                    formBind: true, //only enabled once the form is valid
                    //disabled : true
                    disabled: me.tabDisabled
                }
			]
        }];

        me.callParent();
    }
}
);