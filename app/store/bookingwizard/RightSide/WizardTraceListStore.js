Ext.define('Regardz.store.bookingwizard.RightSide.WizardTraceListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.bookingwizard.RightSide.WizardTraceList',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/WizardRightPanel/GetTraceListForWizard',
        reader: {
            type: 'json',
            root: 'data'
        }       
    }
});