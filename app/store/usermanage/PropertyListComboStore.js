//Used at assign role and activities
Ext.define('Regardz.store.usermanage.PropertyListComboStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.usermanage.PropertyListCombo',
    autoLoad: true,
    mode: 'local',
    proxy: {
        type: 'jsonp',
        // url: webAPI_path + 'api/user/GetPropertyToAssignUser',
        url: webAPI_path + 'api/user/GetAvailabePropertiesForUser',
        // user/GetAvailabePropertiesForUser/1/1033
        reader: {
            type: 'json',
            root: 'data'
        }, baseParams: {
            languageId: 0, id: 0
        },
        exception: function () {
           
        }
    }
});