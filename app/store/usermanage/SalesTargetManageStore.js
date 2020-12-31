Ext.define('Regardz.store.usermanage.SalesTargetManageStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.usermanage.SalesTargetManage',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        //url: PHPPATHTEMP+'roleslist.php',
        url: webAPI_path + 'api/User/GetSalesTargetDeail',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: { }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});