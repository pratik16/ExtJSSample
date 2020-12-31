Ext.define('Regardz.store.common.LanguageListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.common.Language',
    autoLoad: true,
    mode: 'local',
    // Load data from server

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/property/GetLanguages',
        reader: {
            type: 'json'
        }
    },
    listeners: {
        load: function (store, records, options) {            
            var index = store.find('LanguageId', user_language);
            store.removeAt(index);
        }
    }
});	