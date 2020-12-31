Ext.define('Regardz.store.common.CompanyStatusComboStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.common.CompanyStatusCombo',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/MasterValue/GetCompanyStatusForCombo',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: user_language
        }
    }
});