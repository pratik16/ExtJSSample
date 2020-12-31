Ext.define('Regardz.store.configuration.SubDepartmentManageStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.configuration.SubDepartmentManage',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/SubDepartment/GetSubDepartmentPaging',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            //languageId: user_language
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});
 