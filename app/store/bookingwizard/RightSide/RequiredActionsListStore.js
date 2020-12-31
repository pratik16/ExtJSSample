Ext.define('Regardz.store.bookingwizard.RightSide.RequiredActionsListStore', {
    extend: 'Ext.data.TreeStore',
    fields: ['BookingId', 'BookingTrackingId', 'text', 'itemid', 'AlertId', 'BookingEventId', 'BookingEventTrackingId', 'EventName', 'StepNumber', 'BookingDate', ''],
    autoLoad: true,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/WizardRightPanel/GetBookingWizardRequiredActions',
        defaultRootId: 'data',
        extraParams: { languageId: user_language, id: 0 }
    },
    root: {
        text: 'Reqired Actions',
        expanded: true
    },
    listeners: {
        load: {
            fn: function (store, records, options) {
                //  log("P Store", store);
                var newObj = store.tree.root.childNodes;
                // var childNodes = records.childNodes;
                if (newObj.length > 0) {
                    for (i = 0; i < newObj.length; i++) {                        
                        var BookingDate = store.tree.root.childNodes[i].raw.BookingDate;
                        var BookingName = store.tree.root.childNodes[i].raw.BookingName;
                        BookingDate = Ext.Date.format(new Date(BookingDate), usr_dateformat);
                        store.tree.root.childNodes[i].set("text", BookingDate + ' - ' + BookingName);
                    }

                }
            }
        }
    }
});