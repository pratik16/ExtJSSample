//Used at assign role and activities
Ext.define('Regardz.store.usermanage.AllpropertyListComboStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.usermanage.AllpropertyListCombo',
    autoLoad: false, //load from combo
    mode: 'local',
    proxy: {
        type: 'jsonp',
        // url: PHPPATHTEMP+'PropertyListComboStore.php', 
        url: webAPI_path + 'api/property/PropertyPaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            languageId: user_language, limit: 0, searchString: '', id: 0
        },
        baseParams: {
            start: 0
        },
        exception: function () {
           
        }
    }
});