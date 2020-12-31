Ext.define('Regardz.store.configuration.ItemGroupStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.ItemGroup',
    autoLoad: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/ConfigItemGroup/ItemGroupPaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
           languageId: user_language
        }
   },
   baseParams: {
       limit: page_size, start: 0
   },
   pageSize: page_size
});	