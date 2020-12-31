Ext.define('Regardz.store.bookingwizard.RightSide.CommunicationNoteListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.RightSide.CommunicationNoteList',
    autoLoad: false,

    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/WizardRightPanel/GetCommunicationNoteList',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            id: 0, languageId: 0
        }
    },
    baseParams: {
        limit: page_size, start: 0
    },
    pageSize: page_size
});