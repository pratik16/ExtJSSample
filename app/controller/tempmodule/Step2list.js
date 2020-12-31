///*Minified by P*/
Ext.define('Regardz.controller.tempmodule.Step2list', {
    extend: 'Ext.app.Controller',
    stores: ['tempmodule.BookingTrackingListStore'],
    views: ['tempmodule.Step2list'],
    planboardController: false,
    bookingwizardController: false,
    init: function () {
        var me = this;
        this.control({
            'step2list': {
                afterrender: function () {

                },
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {    
                    
                    var zRec = iView.getRecord(iRowEl);
                    var data = zRec.data;
                   
                    
                     
                    Utils.loadWizardStepsFromOutSide(me, data, 'step2');
                    ///

                    return;                
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    var myWindow = _myDesktopApp.getModule('bookingWiz-win');
                    var createdWindow = myWindow.createWindow();                    
                    createdWindow.stepObject = { Number: 2, BookingTrackingId: zRec.data.BookingTrackingId };
                    createdWindow.show();                    

                    //var cardLayout = Ext.ComponentQuery.query('panel [itemid="wizardpanel"]')[0];
                    //cardLayout.add({
                    //    layout: 'fit',
                    //    itemid: 'steptwo',
                    //    items: {
                    //        xtype: 'bookingwizardstep2'
                    //    }
                    //});
                    //cardLayout.doLayout();

                    //var panelSteps = Ext.ComponentQuery.query('bookingwizardpanel')[0];

                    //var layout = panelSteps.getLayout();

                    //layout['next']();

                    //alert("dupa show");
                }
            }
        })
    },

});