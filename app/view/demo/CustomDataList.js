Ext.define('Regardz.view.demo.CustomDataList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.customList',
    store: 'demo.CustomDataStore',
    loadMask: true,
    initComponent: function () {

        var me = this;
        me.autoHeight = true;
        me.title = 'Custom data list';
        me.columns = [{
            header: 'Event Name',
            dataIndex: 'EventName',
            flex: 1
        }, {
            header: 'Company name',
            dataIndex: 'CompanyName',
            align: 'center',
            hideable: false
        }, {
            header: 'Contact name',
            dataIndex: 'ContactName',
            align: 'center',
            hideable: false
        }
        ];
        me.callParent();
    }

    
});