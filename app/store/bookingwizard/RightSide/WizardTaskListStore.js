Ext.define('Regardz.store.bookingwizard.RightSide.WizardTaskListStore', {
    extend: 'Ext.data.Store',
    model: 'Regardz.model.dashboard.Task',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/WizardRightPanel/GetTaskListForWizard',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});