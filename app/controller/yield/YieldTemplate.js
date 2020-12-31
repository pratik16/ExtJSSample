///*Minified by P*/
Ext.define('Regardz.controller.yield.YieldTemplate', {
    extend: 'Ext.app.Controller',
    views: ['yield.YieldTemplate'],
    stores: ['yield.YieldTemplateStore', 'common.PropertyForNamesStore'],
    init: function () {
        var me = this;
        this.control({
            'button[action="searchYieldTemp"]': {
                click: function () {
                    var PropertyId = Ext.getCmp('drpPropertyId').value;
                    var WeekNo = Ext.getCmp('drpWeekNo').value;
                    if (WeekNo == null)
                        WeekNo = 0;
                    Ext.getStore('yield.YieldTemplateStore').proxy.setExtraParam('id', PropertyId);
                    Ext.getStore('yield.YieldTemplateStore').proxy.setExtraParam('searchParam', WeekNo);
                    Ext.getStore('yield.YieldTemplateStore').proxy.setExtraParam('languageId', user_language);
                    Ext.getStore('yield.YieldTemplateStore').load()
                }
            },

            'yieldtemplate': {
                afterrender: function (t, eOpt) {
                    Ext.getStore('common.PropertyForNamesStore').load()
                }
            }
        })
    },
    loadStore: function () {
        var PropertyId = Ext.getCmp('drpPropertyId').value;
        var WeekNo = Ext.getCmp('drpWeekNo').value;
        Ext.getStore('yield.YieldTemplateStore').proxy.setExtraParam('id', PropertyId);
        Ext.getStore('yield.YieldTemplateStore').proxy.setExtraParam('searchParam', WeekNo);
        Ext.getStore('yield.YieldTemplateStore').proxy.setExtraParam('languageId', user_language);
        Ext.getStore('yield.YieldTemplateStore').load()
    }
});