Ext.define('Regardz.store.configuration.RoleCodeStore', {
    extend: 'Ext.data.Store',
    fields: ['RoleCodeId', 'RoleCodeName'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/RoleRight/GetRoleCodes',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});