//Used at assign role and activities
Ext.define('Regardz.store.property.AllpropertyListComboStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.property.AllpropertyListCombo',
    autoLoad: true,
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
            //languageId: user_language, limit: 0, searchString: '', id: 0
            languageId: user_language, userId: CurrentSessionUserId, searchParam: ''
        },
        baseParams: {
            limit: page_size, start: 0
        },
        sorters: { property: 'PropertyName', direction: 'ASC' },
        exception: function () {

        }
    }
});