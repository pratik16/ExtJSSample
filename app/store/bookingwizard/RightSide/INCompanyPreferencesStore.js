Ext.define('Regardz.store.bookingwizard.RightSide.INCompanyPreferencesStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.RightSide.INCompanyPreferences',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/WizardRightPanel/GetCompanyPreffForInNt',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: 0, languageId: user_language
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});