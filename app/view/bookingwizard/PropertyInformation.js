Ext.define('Regardz.view.bookingwizard.PropertyInformation', {
    extend: 'Ext.window.Window',
    alias: 'widget.propertyinformation',
    modal: true,
    border: false,
    title: 'Property Information_Title'.l('SC52200'),
    requires: ['Ext.grid.*', 'Ext.data.*', 'Ext.ux.grid.FiltersFeature', 'Ext.toolbar.Paging', 'Ext.ux.ajax.JsonSimlet', 'Ext.ux.ajax.SimManager'],
    //autoShow: true,
    width: parseInt(Ext.getBody().getViewSize().width * (0.8)),
    height: parseInt(Ext.getBody().getViewSize().height * (0.95)),
    id: 'propertyInformationWindow',
    y: 0,
    initComponent: function () {

        var me = this;
        me.itemid = 'propertyinformation';
        // configure whether filter query is encoded or not (initially)
        var encode = false;

        // configure whether filtering is performed locally or remotely (initially)
        var local = true;

        me.filters = {
            ftype: 'filters',
            // encode and local configuration options defined previously for easier reuse
            encode: encode, // json encode the filter query
            local: local   // defaults to false (remote filtering)

        };

        var buttonSearchMeetingType = Ext.create('Ext.Button', {
            scale: 'small',
            action: 'filterPropertyFeaturesMeetingType',
            itemid: 'buttonPropertyFeaturesMeeetingType',
            iconCls: 'search-icon',
            width: 20,
            iconAlign: 'left'
        });
        var filterFieldMeetingType = Ext.create('Ext.form.TextField', {
            xtype: 'textfield',
            name: 'filterMeetingType',
            itemid: 'fieldFilterMeetingType',
            emptyText: 'Filter'.l("g"),
            selectOnFocus: true
        });

        me.propertyMeetingType = Ext.create('Ext.grid.Panel', {
            store: 'property.BWPropertyMeetingTypeStore',
            itemid: "meetingTypes",
            title: "Meeting types".l("SC52200"),
            height: parseInt(me.height * 0.8),
            width: '33%',
            margin: '10',
            frame: true,
            noResize: true,
            features: [me.filters],
            //bbar: [{ xtype: 'tbfill' }, {
            //    text: 'Clear Filter Data',
            //    handler: function () {
            //        me.facilitiesList.filters.clearFilters();
            //    }
            //}],
            tbar: [{ xtype: 'tbfill' }, filterFieldMeetingType, {
                xtype: 'button',
                iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
                action: 'clearMeetingTypes',
                hidden: true
            }, buttonSearchMeetingType],
            columns: [
                {
                    baseCls: '', width: 150, header: 'Description', dataIndex: 'PropertyFeatureName', flex: 1,
                    filterable: true
                    //filter: {
                    //    type: 'string'
                    //}
                },
                { hidden: true, dataIndex: 'PropertyFeatureId', hideable: false }
            ]
        });

        var buttonSearchAthmosphere = Ext.create('Ext.Button', {
            scale: 'small',
            action: 'filterPropertyFeaturesAthmosphere',
            itemid: 'buttonPropertyFeaturesAthmosphere',
            iconCls: 'search-icon',
            width: 20,
            iconAlign: 'left'
        });
        var filterFieldAthmosphere = Ext.create('Ext.form.TextField', {
            xtype: 'textfield',
            name: 'filterAthmosphere',
            itemid: 'fieldFilterAthmosphere',
            emptyText: 'Filter'.l("g"),
            selectOnFocus: true
        });

        me.atmosphereList = Ext.create('Ext.grid.Panel', {
            store: 'property.PropertyAtmosphereListStore',
            itemid: "atmosphereListId",
            title: "Atmosphere".l("SC52200"),
            height: parseInt(me.height * 0.8),
            width: '33%',
            noResize: true,
            frame: true,
            margin: '10',
            features: [me.filters],
            tbar: [{ xtype: 'tbfill' }, filterFieldAthmosphere, {
                xtype: 'button',
                iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
                action: 'clearAthmosphere',
                hidden: true
            }, buttonSearchAthmosphere],
            columns: [
               {
                   baseCls: '', width: 150, header: 'Description', dataIndex: 'PropertyFeatureName', flex: 1, filter: {
                       type: 'string'
                   }
               },
               { hidden: true, dataIndex: 'PropertyFeatureId', hideable: false }
            ]
        });

        var buttonSearchFacilities = Ext.create('Ext.Button', {
            scale: 'small',
            action: 'filterPropertyFeaturesFacilities',
            itemid: 'buttonPropertyFeaturesFacilities',
            listeners: {
                click: function (a, b, c, d) {
                    var grid = Ext.ComponentQuery.query('[itemid="facilityListId"]')[0];
                    var filterText = Ext.ComponentQuery.query('[itemid="fieldFilterFacilities"]')[0].getValue();
                }
            },
            iconCls: 'search-icon',
            width: 20,
            iconAlign: 'left'
        });
        var filterFieldFacilities = Ext.create('Ext.form.TextField', {
            xtype: 'textfield',
            name: 'filterFacilities',
            itemid: 'fieldFilterFacilities',
            emptyText: 'Filter'.l("g"),
            selectOnFocus: true
        });


        me.facilitiesList = Ext.create('Ext.grid.Panel', {
            store: 'property.BWPropertyFacilityIcons',
            itemid: "facilityListId",
            title: "Facilities".l("SC52200"),
            height: parseInt(me.height * 0.8),
            width: '33%',
            noResize: true,
            frame: true,
            margin: '10',
            tbar: [{ xtype: 'tbfill' }, filterFieldFacilities, {
                xtype: 'button',
                iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
                action: 'clearFacilities',
                hidden: true
            }, buttonSearchFacilities],
            //bbar: [{ xtype: 'tbfill' }, {
            //    text: 'Clear Filter Data',
            //    handler: function () {
            //        me.facilitiesList.filters.clearFilters();
            //    }
            //}],
            features: [me.filters],
            emptyText: 'No Matching Records',
            columns: [
                {
                    baseCls: '', width: 150, header: 'Description', dataIndex: 'FacilityName', flex: 1,
                    filter: {
                        type: 'string',
                        itemId: 'filterFacilityName'
                    }
                },
                { baseCls: '', width: 80, header: '', renderer: this.renderIcon, dataIndex: 'IconPath', flex: 1 },
                { hidden: true, dataIndex: 'FacilityIconId', hideable: false }
            ]
        });

        me.photosList = Ext.create('Ext.grid.Panel', {
            store: 'property.PhotoGalleryListStore',
            itemid: "photosList",
            title: "Photos".l("SC52200"),
            hideHeaders: true,
            border: true,
            autoscroll: false,
            scroll: false,
            height: parseInt(me.height * 0.8),
            width: '20%',
            margin: '10',
            noResize: true,
            tbar: [{
                xtype: 'button',
                //iconCls: 'scroll-up-arrow',
                cls: 'image-button-up',
                action: 'actionPropertyScrollUp',
                width: '100%',
                listeners: {
                    click: function () {
                        var row = me.photosList.getView().getNode(0);
                        if (Utils.isValid(row)) {
                            var height = Ext.get(row).getHeight()
                            me.photosList.scrollByDeltaY(-height);
                        }
                    }
                }
            }],
            bbar: [{
                xtype: 'button',
                //  iconCls: 'scroll-down-arrow',
                cls: 'image-button-down',
                action: 'actionPropertyScrollDown',
                width: '100%',
                listeners: {
                    click: function () {
                        var row = me.photosList.getView().getNode(0);
                        if (Utils.isValid(row)) {
                            var height = Ext.get(row).getHeight()
                            me.photosList.scrollByDeltaY(height);
                        }
                    }
                }
            }],
            columns: [
                { baseCls: '', width: 80, header: '', renderer: this.renderPhoto, dataIndex: 'OriginalThumbImagePath', flex: 1 }, //OriginalThumbImagePath
                {hidden: true, dataIndex: 'PhotoGalleryId', hideable: false }
            ]
        });
        me.photoView = {
            xtype: 'panel',
            itemid: "propertyImageHolder",
            title: "View".l("SC52200"),
            width: '60%',
            margin: '10',
            border: true,
            frame: true,
            height: parseInt(me.height * 0.8),
            items: [{
                xtype: 'image',
                itemid: "propertyImageHolder"
            }]
        }



        me.photoDescription = {
            xtype: 'panel',
            title: "Description".l("SC52200"),
            height: parseInt(me.height * 0.8),
            width: '20%',
            margin: '10',
            items: [{
                xtype: 'label',
                margin: '10',
                itemid: "propertyPhotoDescription"
            }]

        }

        me.videosList = Ext.create('Ext.grid.Panel', {
            store: 'property.VideoLibraryListStore',
            itemid: "videoList",
            title: "Videos".l("SC52200"),
            hideHeaders: true,
            border: true,
            height: parseInt(me.height * 0.8),
            width: '25%',
            margin: 10,
            noResize: true,
            frame: true,
            columns: [
                { baseCls: '', width: 80, header: '', dataIndex: 'VideoName', flex: 1 }, //youtubeIFramURL
                {hidden: true, dataIndex: 'VideoDetailId', hideable: false }
            ]
        });

        me.videoView = {
            xtype: 'panel',
            //            title: "View".l("SC52200"),
            height: parseInt(me.height * 0.8),
            width: '75%',
            margin: '10',
            itemid: 'mainVideo'

        }



        me.floorMapList = Ext.create('Ext.grid.Panel', {
            store: 'Operations.OperationsPropertyFloorPlanStore',
            itemid: "propertyFloorPlanList",
            title: "Floor maps".l("SC52200"),
            height: parseInt(me.height * 0.8),
            width: '25%',
            margin: '10',
            noResize: true,
            frame: true,
            columns: [
                { baseCls: '', width: 80, header: '', dataIndex: 'DisplayName', flex: 1 },
                { width: 60, header: 'Category'.l("SC52200"), align: 'center', dataIndex: 'Category'/*, renderer: this.renderFloorCategory */ },
                { hidden: true, dataIndex: 'PropertyFloorPlanId', hideable: false }
            ]
        });
        me.floorMapView = {
            xtype: 'panel',
            itemid: "propertyMainFloor",
            height: parseInt(me.height * 0.8),
            width: '75%',
            margin: '10'
        };

        me.items = {
            xtype: 'tabpanel',
            activeTab: 0,
            plain: false,
            border: false,
            frame: false,
            itemid: "tabPanel",
            layout: 'fit',
            items: [
                {
                    title: 'General Information'.l('SC52200'),
                    name: 'generalInfoContentTab',
                    border: false,
                    items: [{
                        layout: "hbox",
                        frame: false,
                        border: false,
                        width: '100%',
                        defaults: {
                            margin: 10
                        },
                        items: [
                                  {
                                      xtype: "fieldset",
                                      title: "Information".l('SC52200'),
                                      frame: false,
                                      width: '47%',
                                      height: parseInt(me.height * 0.8),
                                      autoScroll: true,
                                      items: [{
                                          layout: 'vbox',
                                          frame: false,
                                          border: false,
                                          items: [{
                                              xtype: 'displayfield',
                                              fieldLabel: 'Name'.l('SC52200') + ":",
                                              itemid: 'propertynameid'
                                          }, {
                                              xtype: 'displayfield',
                                              fieldLabel: 'Abbriviation'.l('SC52200') + ":",
                                              itemid: 'abbriviationid'
                                          }, {
                                              xtype: 'displayfield',
                                              fieldLabel: 'Type'.l('SC52200') + ":",
                                              itemid: 'propertytypeid'
                                          }, {
                                              xtype: 'displayfield',
                                              fieldLabel: 'Address'.l('SC52200') + ":",
                                              itemid: 'propertyaddressid'
                                          }, {
                                              xtype: 'displayfield',
                                              fieldLabel: 'Phone'.l('SC52200') + ":",
                                              itemid: 'propertyphoneid'
                                          }, {
                                              xtype: 'displayfield',
                                              fieldLabel: 'Fax'.l('SC52200') + ":",
                                              itemid: 'propertyfaxid'
                                          }, {
                                              xtype: 'displayfield',
                                              fieldLabel: 'Website'.l('SC52200') + ":",
                                              itemid: 'propertywebsiteid'
                                          }, {
                                              xtype: 'displayfield',
                                              fieldLabel: 'Rooms'.l('SC52200') + ":",
                                              itemid: 'propertyroomsid'
                                          }, {
                                              xtype: 'displayfield',
                                              fieldLabel: 'Floors'.l('SC52200') + ":",
                                              itemid: 'propertyfloorsid'
                                          }, {
                                              xtype: 'displayfield',
                                              fieldLabel: 'ABP'.l('SC52200') + ":",
                                              itemid: 'propertyabpid'
                                          }

  									        ]
                                      }
  							        ]
                                  }, //Here need to add second right panel
  						        {
  						        xtype: "fieldset",
  						        title: "Description".l('SC52200'),
  						        width: '50%',
  						        height: parseInt(me.height * 0.8),
  						        autoScroll: true,
  						        items: [{
  						            xtype: 'label',
  						            itemid: 'propertydescriptionshortid',
  						            width: '100%',
  						            //text: 'Welkom bij Eenhoorn Amersfoort! Mijn buitengewoon bijzonder team regelt alles als het gaat om onbezorgd ontmoeten. Wij geloven dat we, samen, met elkaar, dat kunnen bereiken.'
  						            text: "Welcome to Unicorn Amersfoort! My extraordinarily special team handles everything when it comes to meeting carefree. We believe that, together, together, can achieve that.".l('SC52200')
  						        }
  							        ]
  						    }
  					        ]

                    }
  			        ]
                }, //end tab 1
  		        {
  		        title: 'General Content'.l('SC52200'),
  		        name: 'generalContentTab',
  		        height: parseInt(me.height * 0.85),
  		        autoScroll: true,
  		        width: '100%',
  		        items: [{
  		            xtype: 'displayfield',
  		            itemid: "propertyDescriptionPanel",
  		            autoRender: true,
  		            margin: 10
  		            //html: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean in dolor mauris, ac molestie augue. Nam vehicula accumsan nibh id bibendum. Curabitur vel mi lorem, id auctor tortor. Proin aliquet sapien id lacus rhoncus nec dictum tellus elementum. Nunc aliquam posuere ligula, nec egestas turpis placerat eu. Sed auctor porttitor vulputate. Vivamus ac orci velit. Sed bibendum pharetra vestibulum. Aliquam erat volutpat. Curabitur at nisl non mauris feugiat sagittis. Etiam placerat ante eget nibh imperdiet sit amet hendrerit enim mollis.  Aenean suscipit velit et orci aliquet lacinia. Vivamus vel purus lacus. Sed sollicitudin magna nec enim lobortis aliquet. Nulla facilisis, urna et mollis viverra, orci massa euismod quam, non euismod eros risus eget nisl. Quisque erat sem, luctus id consectetur sed, laoreet ut lorem. Maecenas pulvinar blandit pulvinar. Praesent vulputate pharetra imperdiet. Nunc mauris purus, imperdiet et dignissim sed, blandit sed sapien. Sed mattis turpis eget nunc egestas blandit et vel nunc. Sed fringilla dui ut ligula ultrices ut faucibus eros semper. Ut eros ante, auctor et suscipit a, dignissim vitae odio. Nulla facilisi. Aenean iaculis luctus sem. Cras nec nunc in mi adipiscing euismod id ut mi. Praesent vel libero ut tortor euismod porttitor nec vitae mauris. Vestibulum egestas massa id purus bibendum in lacinia sapien ultrices.  Duis varius lobortis diam ut vulputate. Quisque vel neque id neque elementum tempus. Ut interdum dolor eu ante mollis accumsan. Sed egestas tortor orci. Quisque tincidunt condimentum nibh in pulvinar. Proin condimentum elit ac lorem consectetur ornare. Proin ut ante felis, elementum sagittis nibh. Nullam in dolor dui, vitae eleifend erat. Nulla facilisi. Morbi fermentum, sapien non tempor pulvinar, nulla neque tincidunt justo, quis elementum dolor turpis convallis mi. Donec est nulla, feugiat in lacinia ac, porta eu elit. Nullam nec magna justo. Sed gravida pellentesque ipsum, sed mattis eros tincidunt adipiscing. Etiam rhoncus lectus in urna interdum vulputate. Quisque auctor elementum scelerisque. Pellentesque quis laoreet purus.  Nulla ut eros sem. In libero sapien, molestie non commodo eget, lobortis sed libero. Mauris ultricies ipsum quis diam volutpat ultricies. Nulla rutrum justo justo. Pellentesque urna tortor, viverra sed mollis non, viverra ut felis. Pellentesque nulla turpis, gravida eu ullamcorper ac, molestie eget sapien. Fusce faucibus posuere varius. Nulla mattis massa eu risus mollis ultricies. Fusce eget diam bibendum ipsum faucibus consectetur at vel dolor. Vestibulum laoreet pretium turpis vel consequat. Sed imperdiet metus non nulla sagittis volutpat. Fusce luctus fermentum vulputate. Sed nisi nibh, iaculis nec facilisis ut, sodales sed augue. Curabitur iaculis vestibulum risus id pretium. Donec vitae quam purus, ac venenatis metus.  Vestibulum pharetra condimentum luctus. Nam fringilla aliquam bibendum. Sed in dolor nibh, sed egestas diam. In hac habitasse platea dictumst. Integer aliquet, nisi id lobortis luctus, purus metus semper nisi, eu viverra'
  		        }
  			        ]
  		    }, //end tab 2
  		        {
  		        title: 'Features'.l('SC52200'),
  		        name: 'featuresContentTab',
  		        frame: false,
  		        border: false,
  		        items: [{
  		            layout: 'hbox',
  		            //width: '100%',
  		            items: [
  						        me.propertyMeetingType, me.atmosphereList, me.facilitiesList]
  		        }
  			        ]

  		    }, //end tab 3
  		        {
  		        title: 'Photos'.l('SC52200'),
  		        name: 'photosContentTab',
  		        frame: false,
  		        border: false,
  		        items: [{
  		            layout: 'hbox',
  		            //width: '100%',
  		            items: [
  						        me.photosList, me.photoView, me.photoDescription]
  		        }
  			        ]
  		    }, //end tab 4
  		        {
  		        title: 'Videos'.l('SC52200'),
  		        name: 'videosContentTab',
  		        frame: false,
  		        border: false,
  		        items: [{
  		            layout: 'hbox',
  		            //width: '100%',
  		            items: [

  						        me.videosList, me.videoView]
  		        }
  			        ]
  		    }, //end tab 5
  		        {
  		        title: 'Floor maps'.l('SC52200'),
  		        name: 'floorsContentTab',
  		        frame: false,
  		        border: false,
  		        items: [{
  		            layout: 'hbox',
  		            items: [me.floorMapList, me.floorMapView]
  		        }]
  		    } //end tab 6

  	        ]

        }

        me.dockedItems = {
            dock: 'bottom',
            layout: 'hbox',
            items: [
               {
                   xtype: 'tbspacer',
                   width: '92%'
               },
            {
                width: 50,
                align: 'right',
                xtype: 'button',
                text: 'Close'.l('g'),
                handler: function () {
                    me.close();
                }
            }]
        }

        //me.items = me.PropertyTabs;

        me.callParent(arguments);
    },
    renderIcon: function (value, metadata, record, rowIndex, colIndex, store) {

        metadata.style = "background-color:white!important;text-align:center;";
        return '<img src="' + image_path + record.raw.IconPath + '">';
    },
    renderPhoto: function (value, metadata, record, rowIndex, colIndex, store) {

        metadata.style = "background-color:white!important;text-align:center;";
        return '<img src="' + image_path + record.raw.OriginalThumbImagePath + '">';
    },
    //    renderFloorCategory: function (value, metadata, record, rowIndex, colIndex, store) {
    //        if (record.raw.Category == 'ROP') {
    //            metadata.css = metadata.css + ' icon-checked';
    //        }

    //    },
    renderVideo: function (val) {
        return '<div></div>';
    }
});