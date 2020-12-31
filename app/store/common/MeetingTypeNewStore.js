Ext.define('Regardz.store.common.MeetingTypeNewStore', {
    extend: 'Ext.data.Store',
    fields: ['PropertyFeatureId', 'PropertyFeatureName', 'PropertyFeatureDescription'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/booking/GetMeetingTypeListForProperty',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language, //languageId,
            propertyId: 0
        }
    }
});