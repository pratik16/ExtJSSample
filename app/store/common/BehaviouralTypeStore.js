Ext.define('Regardz.store.common.BehaviouralTypeStore', {
    extend: 'Ext.data.Store',
    fields: [{ name: 'BehaviouralTypeId', type: 'int' }, 'TypeName'],

    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/MasterValue/GetBehaviouralType',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language //languageId
        }
    }
});