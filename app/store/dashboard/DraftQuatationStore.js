Ext.define('Regardz.store.dashboard.DraftQuatationStore', {
    extend: 'Ext.data.Store',
    fields: ['CreatedDate', 'ReservationId', 'Status', 'Client', 'Initial'],
    autoLoad: false,
    remoteSort: true,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/DraftQuatation/GetDrafsQuatations',
        reader: {
            type: 'json',
            root: 'data'
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    sorters: { property: 'CreatedDate', direction: 'ASC' },
    pageSize: page_size
});