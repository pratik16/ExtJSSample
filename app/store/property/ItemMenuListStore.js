Ext.define('Regardz.store.property.ItemMenuListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.ItemMenuList',
    autoLoad: false,
    // Load data from server
    remoteSort: true,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ItemMenu/GetMenuItemsList',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
//    ,
//    baseParams: {
//        limit: page_size,
//        start: 0
//    },
//    pageSize: page_size
});