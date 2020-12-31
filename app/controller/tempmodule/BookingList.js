///*Minified by P*/
Ext.define('Regardz.controller.tempmodule.BookingList', {
    extend: 'Ext.app.Controller',
    stores: ['tempmodule.BookingListStore'],
    views: ['tempmodule.BookingList'],
    planboardController: false,
    bookingwizardController: false,
    init: function () {
        var me = this;
        this.control({
            'bookinglist': {
                afterrender: function () {
                    Ext.getStore('tempmodule.BookingListStore').load();
                },
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'cancelbooking')
                        this.cancelbooking(zRec)
                }
//                , resize: function (grid, adjWidth, adjHeight, eOpts) {
//                    var headerHeight = 100;
//                    var rowHeight = 21;
//                    var contentHeight = Math.max(rowHeight + headerHeight, grid.getHeight()) - headerHeight;
//                    var maxRowsPerGrid = Math.floor(contentHeight / rowHeight);
//                    grid.getStore().reload({
//                        params: {
//                            start: 0,
//                            limit: maxRowsPerGrid
//                        }
//                    });
//                    grid.getStore().pageSize = maxRowsPerGrid;
//                    var bbar = grid.getDockedItems()[3];
//                    if (bbar.pageSize != maxRowsPerGrid) {
//                        bbar.pageSize = maxRowsPerGrid;
//                        bbar.doRefresh()
//                    }
//                }
            }
        })
    },
    cancelbooking: function (rec) {
        if (rec.data.StatusId != 7) {
            display_alert("MG00050", '', 'C', function (btn) {
                if (btn === 'yes') {
                    Ext.data.JsonP.request({
                        url: webAPI_path + 'api/booking/CancelBooking',
                        type: "GET",
                        params: {
                            id: rec.data.BookingId
                        },
                        success: function (response) {
                            var r = response;
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {
                                display_alert('MG00060');
                                Ext.getStore('tempmodule.BookingListStore').loadPage(1)
                            } else {
                                Ext.Msg.alert('Error'.l('g'), ResultText)
                            }
                        },
                        failure: function () {
                            Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'))
                        }
                    })
                }
            })
        }
    }
});