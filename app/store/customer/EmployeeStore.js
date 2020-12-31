Ext.define('Regardz.store.customer.EmployeeStore', {
    extend: 'Ext.data.Store',
    fields: ['UserId', 'FirstName', 'LastName', 'Initial', 'Email'],
    autoLoad: true,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Employee/GetEmployeeList',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});