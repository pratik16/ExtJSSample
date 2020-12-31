Ext.define('Regardz.store.common.AllLanguageListStore', {
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
    }
});	