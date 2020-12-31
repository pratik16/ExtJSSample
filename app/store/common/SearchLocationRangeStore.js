Ext.define('Regardz.store.common.SearchLocationRangeStore', {
    extend: 'Ext.data.Store',
    fields: ["value", "range"],
    autoLoad: true,
    data: [
    [10, 15],
    [15, 15],
    [20, 20],
    [25, 25],
    [30, 30],
    [40, 40],
    [50, 50]]
});