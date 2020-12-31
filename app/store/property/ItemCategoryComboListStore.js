Ext.define('Regardz.store.property.ItemCategoryComboListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.ItemCategoryComboList',
    autoLoad: false,
    // Load data from server

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ItemExemption/GetItemCategoryForFilter',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language
        }
    }
});