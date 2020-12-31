Ext.define('Regardz.store.bookingwizard.InfoLeftPanelStore', {
    extend: 'Ext.data.Store',
    //fields: ["DateString", "Status", "Date"],
    fields: ["Day", "Date", "EventName", "IsRoomSelected", "BookingEventID", "BookingEventTrackingID", "EventDateName", "lastClickedEvent"],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        // url: webAPI_path + 'api/Booking/ProcessMultipleDates',/*This API is not used from now as step2 leftpanel logic is changed*/
        url: webAPI_path + 'api/Booking/WizardStep2LeftSectionDayDisplay',
//        reader: {
//            type: 'json',
//            root: 'data'
        //        },
        reader: {
            type: 'json',
            root: 'result'
        },
        extraParams: {
            id: 0   
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});