Ext.define('Regardz.store.dashboard.AlertStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.dashboard.Alert',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Alert/GetBusinessAlertForDashboard',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: CurrentSessionUserId, languageId: user_language, searchString: ''
        }
    }
});