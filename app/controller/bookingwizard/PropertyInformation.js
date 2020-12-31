Ext.define('Regardz.controller.bookingwizard.PropertyInformation', {
    extend: 'Ext.app.Controller',
    views: ['bookingwizard.PropertyInformation'],
    stores: ['property.BWPropertyMeetingTypeStore', 'property.PropertyAtmosphereListStore', 'Operations.OperationsPropertyFloorPlanStore','property.PhotoGalleryListStore', 'property.BWPropertyFacilityIcons', 'property.RoomPhotoListStore', 'property.VideoLibraryListStore'],
    propertyController: false,

    init: function (el) {
        var me = this;
        if (this.propertyController == false) {
            this.loadData();
        }
        this.control({
            'propertyinformation': {
                activate: function (el, el1) {
                    this.loadData();
                }
            },
            '[itemid="tabPanel"]': {
                tabchange: function (tabPanel, newCard, oldCard, eOpts) {
                    if (Utils.isValid(newCard)) {
                        switch (newCard.name) {
                            case 'featuresContentTab':
                                me.loadFeaturesTab();
                                break;
                            case 'photosContentTab':
                                me.loadPhotosTab();
                                break;
                            case 'videosContentTab':
                                me.loadVideosTab();
                                break;
                            case 'floorsContentTab':
                                me.loadFloorsTab();
                                break;
                            default:
                                break;

                        }
                    }
                }
            },
            'propertyinformation textfield[itemid="fieldFilterFacilities"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.applyFilter(t.getValue(), 'property.BWPropertyFacilityIcons', 'FacilityName');
                        if (t.getValue().length > 0) {
                            var clearIcon = Ext.ComponentQuery.query('[action="clearFacilities"]')[0];
                            clearIcon.show();
                        }
                    }
                }
            },
            'propertyinformation button[action="filterPropertyFeaturesFacilities"]': {
                click: function () {
                    var value = Ext.ComponentQuery.query('textfield[name="filterFacilities"]');
                    var comp = Utils.getFirstComp(value);
                    this.applyFilter(comp.value, 'property.BWPropertyFacilityIcons', 'FacilityName');
                    if (value.length > 0) {
                        var clearIcon = Ext.ComponentQuery.query('[action="clearFacilities"]')[0];
                        clearIcon.show();
                    }
                }
            },
            'propertyinformation button[action="clearFacilities"]': {
                click: function () {
                    var value = Ext.ComponentQuery.query('[itemid="fieldFilterFacilities"]')[0];
                    value.setValue('');
                    Ext.getStore('property.BWPropertyFacilityIcons').clearFilter();
                    var clearIcon = Ext.ComponentQuery.query('[action="clearFacilities"]')[0];
                    clearIcon.hide();
                }
            },
            'propertyinformation textfield[itemid="fieldFilterAthmosphere"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.applyFilter(t.getValue(), 'property.PropertyAtmosphereListStore', 'PropertyFeatureName');
                        if (t.getValue().length > 0) {
                            var clearIcon = Ext.ComponentQuery.query('[action="clearAthmosphere"]')[0];
                            clearIcon.show();
                        }
                    }
                }
            },
            'propertyinformation button[action="filterPropertyFeaturesAthmosphere"]': {
                click: function () {

                    try {
                        var value = Ext.ComponentQuery.query('textfield[name="filterAthmosphere"]');
                        var comp = Utils.getFirstComp(value);
                        this.applyFilter(comp.value, 'property.PropertyAtmosphereListStore', 'PropertyFeatureName');
                        if (value.length > 0) {
                            var clearIcon = Ext.ComponentQuery.query('[action="clearAthmosphere"]')[0];
                            clearIcon.show();
                        }
                    } catch (e) {

                    }
                }
            },
            'propertyinformation button[action="clearAthmosphere"]': {
                click: function () {
                    var value = Ext.ComponentQuery.query('[itemid="fieldFilterAthmosphere"]')[0];
                    value.setValue('');
                    Ext.getStore('property.PropertyAtmosphereListStore').clearFilter();
                    var clearIcon = Ext.ComponentQuery.query('[action="clearAthmosphere"]')[0];
                    clearIcon.hide();
                }
            },
            'propertyinformation textfield[itemid="fieldFilterMeetingType"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        this.applyFilter(t.getValue(), 'property.BWPropertyMeetingTypeStore', 'PropertyFeatureName');
                        if (t.getValue().length > 0) {
                            var clearIcon = Ext.ComponentQuery.query('[action="clearMeetingTypes"]')[0];
                            clearIcon.show();
                        }
                    }
                }
            },
            'propertyinformation button[action="filterPropertyFeaturesMeetingType"]': {
                click: function () {
                    var value = Ext.ComponentQuery.query('textfield[name="filterMeetingType"]');
                    var comp = Utils.getFirstComp(value);
                    this.applyFilter(comp.value, 'property.BWPropertyMeetingTypeStore', 'PropertyFeatureName');
                    if (value.length > 0) {
                        var clearIcon = Ext.ComponentQuery.query('[action="clearMeetingTypes"]')[0];
                        clearIcon.show();
                    }
                }

            },
            'propertyinformation button[action="clearMeetingTypes"]': {
                click: function () {
                    var value = Ext.ComponentQuery.query('[itemid="fieldFilterMeetingType"]')[0];
                    value.setValue('');
                    Ext.getStore('property.BWPropertyMeetingTypeStore').clearFilter();
                    var clearIcon = Ext.ComponentQuery.query('[action="clearMeetingTypes"]')[0];
                    clearIcon.hide();
                }
            }

        });
    },
    loadData: function () {
        this.propertyController = true;
        var propertyId = Utils.GlobalPropertyID;
        var propertyStore = Ext.getStore('property.PropertyDetails');
        propertyStore.removeAll();
        propertyStore.proxy.setExtraParam('languageId', user_language);
        propertyStore.proxy.setExtraParam('id', propertyId);
        propertyStore.on('load', function () {
            //alert("second load");
            var property = propertyStore.getRange()[0];
            var description = Ext.ComponentQuery.query('[itemid="propertyDescriptionPanel"]')[0];
            //Solved here
            description.setValue(Ext.util.Format.htmlDecode(property.get("PropertyContent")));
            description.setAutoScroll(true);
            description.doComponentLayout();

            var name = Ext.ComponentQuery.query('[itemid="propertynameid"]')[0];
            name.setValue(property.get("PropertyName"));

            var abr = Ext.ComponentQuery.query('[itemid="abbriviationid"]')[0];
            abr.setValue(property.get("Abbreviation"));

            //Type is missing from response
            var type = Ext.ComponentQuery.query('[itemid="propertytypeid"]')[0];
            if (type == 1)
                type.setValue("Event");
            else
                type.setValue("Meeting");

            var adr = Ext.ComponentQuery.query('[itemid="propertyaddressid"]')[0];
            adr.setValue(property.get("Address"));

            var phone = Ext.ComponentQuery.query('[itemid="propertyphoneid"]')[0];
            phone.setValue(property.get("Phone"));

            var fax = Ext.ComponentQuery.query('[itemid="propertyfaxid"]')[0];
            fax.setValue(property.get("Fax"));

            var website = Ext.ComponentQuery.query('[itemid="propertywebsiteid"]')[0];
            website.setValue(property.get("Website"));

            var rooms = Ext.ComponentQuery.query('[itemid="propertyroomsid"]')[0];

            //Rooms is missing
            //rooms.setValue(property.get("Rooms"));
            rooms.setValue(property.get("RoomsCount"));

            var floors = Ext.ComponentQuery.query('[itemid="propertyfloorsid"]')[0];
            //Floors is missing
            //floors.setValue(property.get("Floors"));
            floors.setValue(property.get("FloorsCount"));

            var abp = Ext.ComponentQuery.query('[itemid="propertyabpid"]')[0];
            var isPartener = property.get("isPartner");
            if (isPartener) {
                abp.setValue("Yes".l("g"));
            }
            else {
                abp.setValue("No".l("g"));
            }
            var descr = Ext.ComponentQuery.query('[itemid="propertydescriptionshortid"]')[0];
            descr.setText(property.get("Description"));

        });
        propertyStore.load();

        /**************************************************************/

        //property.VideoLibraryListStore






    },
    //filterMeetingType: function (value) {
    //    var r = value;
    //    log("filter value", r);
    //    var regex = new RegExp(".*" + r + ".*", "i");
    //    var meetingTypeStore = Ext.getStore('property.BWPropertyMeetingTypeStore');
    //    meetingTypeStore.clearFilter();
    //    meetingTypeStore.filter("PropertyFeatureName", regex, true, true);

    //},
    applyFilter: function (value, store, fieldToBeFiltered) {
        var regex = new RegExp(".*" + value + ".*", "i");
        var localStore = Ext.getStore(store);
        localStore.clearFilter();
        localStore.filter(fieldToBeFiltered, regex, true, true);
    },
    loadFeaturesTab: function () {
        var propertyId = Utils.GlobalPropertyID;
        var meetingTypeStore = Ext.getStore('property.BWPropertyMeetingTypeStore');
        meetingTypeStore.proxy.setExtraParam('id', propertyId);
        meetingTypeStore.proxy.setExtraParam('id1', user_language);
        meetingTypeStore.proxy.setExtraParam('id2', 2);
        meetingTypeStore.proxy.setExtraParam('languageId', '');
        //meetingTypeStore.on('load', function () {
        //    log("meeting type", meetingTypeStore);
        //});
        meetingTypeStore.load();


        //Sergiu 14-jun-2013
        //This is missing from the project so I've created a test one
        //Please replace with needed
        var atmStore = Ext.getStore('property.PropertyAtmosphereListStore');
        atmStore.proxy.setExtraParam('id', propertyId);
        atmStore.proxy.setExtraParam('id1', user_language);
        atmStore.proxy.setExtraParam('id2', 1);
        atmStore.proxy.setExtraParam('languageId', '');
        //atmStore.on('load', function () { log("atmosphere store", atmStore); });
        atmStore.load();


        var facilityStore = Ext.getStore('property.BWPropertyFacilityIcons');
        facilityStore.proxy.setExtraParam('id', propertyId);
        facilityStore.proxy.setExtraParam('id1', '');
        facilityStore.proxy.setExtraParam('languageId', user_language);

        //facilityStore.on('load', function () {
        //    log("facility icons", facilityStore);
        //});
        facilityStore.load();
    },
    loadPhotosTab: function () {
        var propertyId = Utils.GlobalPropertyID;
        var photos = Ext.getStore('property.PhotoGalleryListStore');
        photos.removeAll();
        photos.proxy.setExtraParam('id', propertyId);
        photos.load();
    },
    loadVideosTab: function () {
        var propertyId = Utils.GlobalPropertyID;
        var videos = Ext.getStore('property.VideoLibraryListStore');
        videos.removeAll();
        videos.proxy.setExtraParam('id', propertyId);
        videos.proxy.setExtraParam('languageId', user_language);
        videos.proxy.setExtraParam('searchParam', '');
        videos.load();
    },
    loadFloorsTab: function () {
        var propertyId = Utils.GlobalPropertyID;
        //var floors = Ext.getStore('property.FloorPlanStore');
        var floors = Ext.getStore('Operations.OperationsPropertyFloorPlanStore');
        floors.removeAll();
        floors.proxy.setExtraParam('id', propertyId);
        floors.proxy.setExtraParam('languageId', user_language);
        floors.proxy.setExtraParam('searchParam', '');
        floors.load();
    }
});
