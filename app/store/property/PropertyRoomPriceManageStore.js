Ext.define('Regardz.store.property.PropertyRoomPriceManageStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.PropertyRoomPriceManage',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/roomprice/GetPropertyBreakdownDetails',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            languageId: user_language
        }
    }
});