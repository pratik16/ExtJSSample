
Ext.define('Regardz.store.configuration.DepartmentManageStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.DepartmentManage',
    autoLoad: true,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Department/GetDepartmentPaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            languageId: user_language
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});
 