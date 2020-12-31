Ext.define('Regardz.store.tempmodule.RoomAvailabilityBlockStore', {
    extend: 'Ext.data.Store',
    fields: ['LanguageId',
      'PropertyName',
      'RoomTypeName',
      'RoomName',
      'RoomAvailabilityBlockId',
      'PropertyId',
      'RoomTypeId',
      'RoomId',
      'Comment',
      'StartDate',
      'EndDate'],
    autoLoad: false,
    remoteSort: true,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/RoomAvailabilityBlock/RoomAvailabilityBlockPaging',
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
    sorters: { property: 'PropertyName', direction: 'ASC' },
    pageSize: page_size
});	