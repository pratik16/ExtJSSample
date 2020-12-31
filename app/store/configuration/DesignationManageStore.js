Ext.define('Regardz.store.configuration.DesignationManageStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.DesignationManage',
    autoLoad: false,
    remoteSort: true,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Designation/DesignationPaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            languageId: user_language, searchString: ''
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    sorters: { property: 'DesignationName', direction: 'ASC' },
    pageSize: page_size
});	