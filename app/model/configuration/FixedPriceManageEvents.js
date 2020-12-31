Ext.define('Regardz.model.configuration.FixedPriceManageEvents', {
    extend: 'Ext.data.Model',
    fields: [
     'FixedPriceEventId',
      'FixedPriceId',
      { name: 'StartTime', type: 'time', format: 'H:i' },
      'EndTime',
      'EventId',
      'EventName']
});
 