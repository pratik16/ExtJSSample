Ext.define('Regardz.store.bookingwizard.RightSide.Windows.CompanyContract.FixedRoomPriceStore', {
    extend: 'Ext.data.Store',
    fields: ['RoomTypeId', 'RoomTypeName', 'PriceSlot1', 'PriceSlot2', 'PriceSlot3'],
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/WizardRightPanel/GetGetContractFixedRoomPriceDetails',
        reader: {
            type: 'json',
            root: 'data'
        },
        extraParams: {
            languageId: user_language
        }
    }
});