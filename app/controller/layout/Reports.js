Ext.define('Regardz.controller.layout.Reports', {
    extend: 'Ext.app.Controller',
    views: ['layout.Reports', 'reports.ReportsList'],
    init: function () {

        var me = this;

        this.control({
            'gridpanel[name=reportcategories]': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var zRec = iView.getRecord(iRowEl);
                    var betObj = new Array();
                    betObj.reportCategoryId = zRec.data.ReportCategoryId;
                    betObj.languageId = user_language;

                    var cv = me.getView('reports.ReportsList');
                    log("cv", cv);
                    var c = me.getController('reports.ReportsList');
                    if (c.thisController == false) {
                        c.init();
                        c.thisController = true;
                    }

                    var localStore = Ext.getStore('reports.ReportsListStore');
                    localStore.proxy.setExtraParam('id', zRec.data.ReportCategoryId);
                    localStore.proxy.setExtraParam('languageId', user_language);
                    localStore.load();

                    var ws = Ext.getCmp('right_regionReports');
                    ws.removeAll();
                    ws.add(cv);
                    ws.doLayout();

                    //var url = webAPI_path + 'api/Reports/GetReportCategory';
                    //Ext.data.JsonP.request({
                    //    url: url,
                    //    params: betObj,
                    //    type: 'GET',
                    //    success: function (response) {
                    //        log('response', response);
                    //        var r = response;


                    //    },
                    //    failure: function (response) {
                    //        log('response', response);
                    //    }
                    //});




                }

            }
        });
    }
});