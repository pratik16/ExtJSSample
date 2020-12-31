Ext.define('Regardz.store.usermanage.SalesTargetYearComboStore', {
    extend: 'Ext.data.Store',
    //model: 'Regardz.model.usermanage.SalesTargetList',
    fields: ['Year'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        //url: PHPPATHTEMP+'roleslist.php',
        url: webAPI_path + 'api/User/GetSalesTargetYear',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});