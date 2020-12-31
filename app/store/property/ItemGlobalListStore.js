Ext.define('Regardz.store.property.ItemGlobalListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.ItemGlobalList',
    autoLoad: false,
    // Load data from server
    remoteSort: true,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ItemExemption/GetItemDetailExceptionForProperty',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    baseParams: {
        limit: page_size,
        start: 0
    },
    sorters: {
        property: 'ItemName',
        direction: 'ASC'
    },
    pageSize: page_size
});