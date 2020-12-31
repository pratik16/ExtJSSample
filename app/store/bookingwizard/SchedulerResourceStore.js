Ext.define('Regardz.store.bookingwizard.SchedulerResourceStore', {
    extend: 'Sch.data.ResourceTreeStore',
    model: 'Regardz.model.bookingwizard.SchedulerResourceModel',
    autoLoad: false,
    proxy: {
        type: 'jsonp',
        url: webAPI_path + 'api/Planboard/GetResourcesForScheduler',
        method: 'POST'
    }
});

