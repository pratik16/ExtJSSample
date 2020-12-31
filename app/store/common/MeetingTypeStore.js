Ext.define('Regardz.store.common.MeetingTypeStore', {
    extend: 'Ext.data.Store',
    fields: ['PropertyFeatureId', 'PropertyFeatureName', 'PropertyFeatureDescription'],

    autoLoad: true,

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