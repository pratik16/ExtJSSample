Ext.define("Regardz.store.operations.InhouseBarListStore", {
    extend: 'Ext.data.Store',
    autoLoad: false,
    fields: ["BarId", "BarName", "Description", {
        name: 'FormattedName',
        mapping: 'Description',
        convert: function (v, record) {
            return v + ' - ' + record.data.BarName
        }
    }],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/InHouse/GetBarList',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});
