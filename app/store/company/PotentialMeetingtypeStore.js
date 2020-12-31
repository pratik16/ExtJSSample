Ext.define('Regardz.store.company.PotentialMeetingtypeStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.company.PotentialMeetingtype',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/company/CompanyPotentialMeetingtypePaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: 0, languageId: user_language, searchString: ''
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});