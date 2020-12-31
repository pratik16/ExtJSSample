Ext.define('Regardz.store.property.PropertyListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.Property',
    id: 'propertyListStore',
    autoLoad: false,
    remoteSort: true,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/property/PropertyPaging',

        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: { languageId: user_language, userId: CurrentSessionUserId,searchParam:''}
    },
    baseParams: {
        limit: page_size, start: 0
    },
    sorters: { property: 'PropertyName', direction: 'ASC' },
    pageSize: page_size
});