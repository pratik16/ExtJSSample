Ext.define('Regardz.controller.property.RoomPriceandRevenue', {
    extend: 'Ext.app.Controller',
    views: ['property.RoomPriceandRevenueList', 'property.RoomPriceManage', 'property.RoomPriceManageBarA',
                'property.RoomPriceManageBarB', 'property.RoomPriceManageBarC', 'property.RoomPriceManageBarD', 'property.MinimumRevenueManage'],
    stores: ['property.RoomPriceStore', 'property.PropertyRoomPriceManageStore', 'property.MinimumRevenueStore', 'property.MinimumRevenuManageStore'],
    thisController: false,

    refs: [{
        ref: 'minimumrevenuemanage',
        selector: 'minimumrevenuemanage'
    },
    {
        ref: 'roompricemanage',
        selector: 'roompricemanage'
    }],
    init: function () {
        var me = this;
        this.control({
            'roompriceandrevenuelist': {
                afterrender: function (t) {
                    var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
                    Ext.getStore('property.RoomPriceStore').load({
                        params: {
                            'id': PropertyId
                        }
                    });
                    Ext.getStore('property.MinimumRevenueStore').load({
                        params: {
                            'id': PropertyId
                        }
                    });
                },
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    //var fieldName = iView.getGridColumns()[iColIdx].dataIndex;
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'PropertyName')
                        this.PropertyName(zRec);
                }
            },
            'roompriceandrevenuelist grid[itemid="roompricelist"]': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'RoomPriceEdit') {
                        me.RoomPriceManageWindow(zRec);
                    }
                }
            },
            'roompriceandrevenuelist grid[itemid="minimumrevenuelist"]': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'MinimumRevenueEdit') {
                        me.RoomMinimumRevenueWindow(zRec);
                    }
                }
            },
            'roompriceandrevenuelist button[action="addRoomPrice"]': {
                click: function () {
                    me.RoomPriceManageWindow(null);
                }
            },
            'roompriceandrevenuelist button[action="addMinimumRevenue"]': {
                click: function () {
                    me.RoomMinimumRevenueWindow(null);
                }
            },
            'minimumrevenuemanage grid': {
                afterrender: function (t) {
                    //var startDate = Ext.util.Format.date(new Date(), 'Y-m-d');
                    //var endDate = null;

                    //me.getResultForMinimumRevenue(null, startDate, endDate);
                },
                edit: function (editor, e) {
                    // e.newValues.StartingSlotId = e.newValues.TimeSlotId;
                    return;
                    var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
                    var StartDate = Ext.ComponentQuery.query('minimumrevenuemanage [itemid="StartDate"]')[0];

                    startDate = Ext.util.Format.date(StartDate.getValue(), 'Y-m-d');

                    var passedParameters = e.newValues;
                    passedParameters.A = "1:" + passedParameters.A;
                    passedParameters.B = "2:" + passedParameters.B;
                    passedParameters.C = "3:" + passedParameters.C;
                    passedParameters.D = "4:" + passedParameters.D;
                    passedParameters.StartDate = startDate;
                    passedParameters.EndDate = null;
                    passedParameters.PropertyId = PropertyId;

                    Ext.Ajax.request({
                        url: webAPI_path + 'api/RoomPrice/ManageRevenueBreakdown',
                        type: 'POST',
                        params: passedParameters, //obj.originalValues
                        success: function (response) {
                            var r = Ext.decode(response.responseText);
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {
                                Ext.getStore('property.MinimumRevenuManageStore').reload();
                                Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                            }
                            else {
                                Ext.getStore('property.MinimumRevenuManageStore').reload();
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                        },
                        failure: function () {
                            Ext.getStore('property.MinimumRevenuManageStore').reload();
                            Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                        }
                    });
                },

                beforeedit: function (editor, e, eOpts) {
                },

                canceledit: function () {
                    //  Ext.getStore('property.MinimumRevenuManageStore').reload();
                }
            },
            'minimumrevenuemanage grid button[action="saveMinimumRevenueManage"]': {
                click: function (t) {
                    var grid = Ext.ComponentQuery.query('minimumrevenuemanage grid[itemid="minimumrevenumanagegrid"]')[0];

                    //  var updatedData = grid.getStore().getUpdatedRecords();
                    var isFlag = false;
                    var alldata = grid.getStore().getRange();
                    var recordsToSend = [];
                    //if (alldata.length > 0 && isFlag == false) { 
                    //    Ext.each(alldata, function (rec) {
                    //        recordsToSend.push(rec.data);
                    //    });
                    //}

                    if (alldata.length > 0 && isFlag == false) {
                        Ext.each(alldata, function (rec) {
                            recordsToSend.push(rec.data);
                            if (rec.data.A < 0 || rec.data.B < 0 || rec.data.C < 0 || rec.data.D < 0) {
                                isFlag = true;
                                return false;
                            }
                        });
                    }

                    if (isFlag == true) {
                        display_alert('MG31076');
                        return false;
                    }

                    var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
                    var dateObject = Ext.ComponentQuery.query('datefield[itemid="StartDate"]')[0];
                    var dateField = dateObject.getValue();
                    var startDate = Ext.util.Format.date(dateField, 'Y-m-d');
                    var encodedData = Ext.encode(recordsToSend);
                    var saveType = Ext.ComponentQuery.query('hidden[itemid="saveType"]')[0].getValue();

                    if (saveType == "Add") {
                        Ext.Ajax.request({
                            url: webAPI_path + 'api/RoomPrice/SetEndDateNull',
                            method: 'GET',
                            params: { id: PropertyId, id1: 0, date1: startDate, date2: null },
                            success: function (response) {
                                var OldDate = null;
                                me.MinimumRevenue(encodedData, OldDate, startDate);
                            },
                            failure: function () {
                            }
                        });
                    }
                    else {
                        me.MinimumRevenue(encodedData, dateObject.originalValue, startDate);
                    }
                }
            },
            'roompricemanage button[action="room_price_save"]': {
                click: function (t) {
                    var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
                    var dateObject = Ext.ComponentQuery.query('datefield[itemid="StartDate"]')[0];
                    var dateField = dateObject.getValue();
                    var startDate = Ext.util.Format.date(dateField, 'Y-m-d');
                    // var encodedData = Ext.encode(recordsToSend);
                    var saveType = Ext.ComponentQuery.query('[itemid="saveTypePrice"]')[0].getValue();

                    if (saveType == "Add") {
                        Ext.Ajax.request({
                            url: webAPI_path + 'api/RoomPrice/SetEndDateNull',
                            method: 'GET',
                            params: { id: PropertyId, id1: 1, date1: startDate, date2: null },
                            success: function (response) {
                                var OldDate = null;
                                me.PropertyRoomPriceManage(OldDate, startDate);
                            },
                            failure: function () {
                            }
                        });
                    }
                    else {
                        me.PropertyRoomPriceManage(dateObject.originalValue, startDate);
                    }
                }
            },

            'roompricemanage datefield[itemid="StartDate"]': {
                change: function (t, n, v, opt) {
                    var startDate = Ext.util.Format.date(n, usr_dateformat);

                    var gridA = Ext.ComponentQuery.query('grid[itemid="roompricemanagebarA"]')[0];
                    var gridB = Ext.ComponentQuery.query('grid[itemid="roompricemanagebarB"]')[0];
                    var gridC = Ext.ComponentQuery.query('grid[itemid="roompricemanagebarC"]')[0];
                    var gridD = Ext.ComponentQuery.query('grid[itemid="roompricemanagebarD"]')[0];

                    gridA.getView().getHeaderAtIndex(3).setText(startDate);
                    gridA.getView().getHeaderAtIndex(7).setText(startDate);
                    gridA.getView().getHeaderAtIndex(11).setText(startDate);

                    gridB.getView().getHeaderAtIndex(3).setText(startDate);
                    gridB.getView().getHeaderAtIndex(7).setText(startDate);
                    gridB.getView().getHeaderAtIndex(11).setText(startDate);

                    gridC.getView().getHeaderAtIndex(3).setText(startDate);
                    gridC.getView().getHeaderAtIndex(7).setText(startDate);
                    gridC.getView().getHeaderAtIndex(11).setText(startDate);

                    gridD.getView().getHeaderAtIndex(3).setText(startDate);
                    gridD.getView().getHeaderAtIndex(7).setText(startDate);
                    gridD.getView().getHeaderAtIndex(11).setText(startDate);

                }
            }
        })
    },

    PropertyRoomPriceManage: function (OldDate, startDate) {
        var local = this;
        var isFlag = false;

        /*Bar A grid*/
        var grid = Ext.ComponentQuery.query('[itemid="roompricemanagebarA"]')[0];
        var alldata = grid.getStore().getRange();
        var recordsToSend = [];
        if (alldata.length > 0 && isFlag == false) {
            Ext.each(alldata, function (rec) {
                recordsToSend.push(rec.data);
                if (rec.data.TS1 < 0 || rec.data.TS2 < 0 || rec.data.TS3 < 0) {
                    isFlag = true;
                    return false;
                }
            });
        }
        var encodedDataA = Ext.encode(recordsToSend);
        /*End Bar A grid*/

        /*Bar B grid*/
        var grid = Ext.ComponentQuery.query('[itemid="roompricemanagebarB"]')[0];
        var alldata = grid.getStore().getRange();
        var recordsToSend = [];
        if (alldata.length > 0 && isFlag == false) {
            Ext.each(alldata, function (rec) {
                recordsToSend.push(rec.data);
                if (rec.data.TS1 < 0 || rec.data.TS2 < 0 || rec.data.TS3 < 0) {
                    isFlag = true;
                    return false;
                }
            });
        }
        var encodedDataB = Ext.encode(recordsToSend);
        /*End Bar B grid*/

        /*Bar C grid*/
        var grid = Ext.ComponentQuery.query('[itemid="roompricemanagebarC"]')[0];
        var alldata = grid.getStore().getRange();
        var recordsToSend = [];
        if (alldata.length > 0 && isFlag == false) {
            Ext.each(alldata, function (rec) {
                recordsToSend.push(rec.data);
                if (rec.data.TS1 < 0 || rec.data.TS2 < 0 || rec.data.TS3 < 0) {
                    isFlag = true;
                    return false;
                }
            });
        }
        var encodedDataC = Ext.encode(recordsToSend);
        /*End Bar C grid*/

        /*Bar D grid*/
        var grid = Ext.ComponentQuery.query('[itemid="roompricemanagebarD"]')[0];
        var alldata = grid.getStore().getRange();
        var recordsToSend = [];
        if (alldata.length > 0 && isFlag == false) {
            Ext.each(alldata, function (rec) {
                recordsToSend.push(rec.data);
                if (rec.data.TS1 < 0 || rec.data.TS2 < 0 || rec.data.TS3 < 0) {
                    isFlag = true;
                    return false;
                }
            });
        }
        var encodedDataD = Ext.encode(recordsToSend);
        /*End Bar D grid*/

        var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
        if (isFlag == false) {
            this.callAjaxRoomPrice(PropertyId, startDate, OldDate, encodedDataA, encodedDataB, encodedDataC, encodedDataD);
        }
        else {
            display_alert('MG31071');
        }

    },

    callAjaxRoomPrice: function (PropertyId, startDate, OldDate, encodedDataA, encodedDataB, encodedDataC, encodedDataD) {
        //var encodedData = Ext.decode(encodedData);
        //console.log(encodedData);
        var local = this;
        var newObj = new Object();

        newObj.id = PropertyId;
        newObj.date1 = startDate;
        newObj.date2 = OldDate;
        newObj.managePropertyBreakdownA = encodedDataA;
        newObj.managePropertyBreakdownB = encodedDataB;
        newObj.managePropertyBreakdownC = encodedDataC;
        newObj.managePropertyBreakdownD = encodedDataD;

        Ext.Ajax.request({
            url: webAPI_path + 'api/RoomPrice/ManagePropertyBreakdown',
            actionMethod: 'POST',
            params: newObj,
            success: function (response) {

                var d = jsonDecode(response.responseText);
                var ResultText = d.result;
                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                    ResultText = ResultText.l("SP_DynamicCode");
                if (d.success == true) {
                    //display_alert('MG00000');
                    local.getRoompricemanage().close();
                    Ext.getStore('property.RoomPriceStore').reload();
                }
                else if (d.success == false) {
                    Ext.Msg.alert('Error'.l('g'), ResultText);
                }

            },
            failure: function () {
                display_alert('MG00070');
            }
        })
    },

    MinimumRevenue: function (encodedData, OldDate, startDate) {
        var local = this;
        var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();

        var newObj = new Object();
        newObj.id = PropertyId;
        newObj.date1 = startDate;
        newObj.date2 = OldDate;
        newObj.manageRevenueBreakdown = encodedData;

        Ext.Ajax.request({
            url: webAPI_path + 'api/RoomPrice/ManageRevenueBreakdown',
            method: 'POST',
            //params: { id: PropertyId, date1: startDate, date2: OldDate, manageRevenueBreakdown: encodedData }, //obj.originalValues
            params: newObj,
            success: function (response) {
                var d = jsonDecode(response.responseText)
                var ResultText = d.result;
                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                    ResultText = ResultText.l("SP_DynamicCode");
                if (d.success == true) {
                    display_alert('MG31075');
                    local.getMinimumrevenuemanage().close();
                    Ext.getStore('property.MinimumRevenueStore').reload();
                }
                else {
                    Ext.Msg.alert('Error'.l('g'), ResultText);
                }
            },
            failure: function () {
                display_alert('MG00070');
            }
        })
    },

    RoomPriceManageWindow: function (rec) {
     
        if (rec == null) {
            var startDate = Ext.util.Format.date(new Date(), 'Y-m-d');
            var endDate = null;
            Ext.create('widget.roompricemanage', { record: null }).show();
        }
        else {
            var startDate = Ext.util.Format.date(rec.data.StartDate, 'Y-m-d');
            if (rec.data.EndDate != null)
                var endDate = Ext.util.Format.date(rec.data.EndDate, 'Y-m-d');
            else
                var endDate = null;
            Ext.create('widget.roompricemanage', { record: startDate }).show();
        }

        var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
        var gridA = Ext.ComponentQuery.query('grid[itemid="roompricemanagebarA"]')[0];
        var gridB = Ext.ComponentQuery.query('grid[itemid="roompricemanagebarB"]')[0];
        var gridC = Ext.ComponentQuery.query('grid[itemid="roompricemanagebarC"]')[0];
        var gridD = Ext.ComponentQuery.query('grid[itemid="roompricemanagebarD"]')[0];


        this.loadPropertyRoomPriceStore(gridA, PropertyId, startDate, "1", endDate);
        this.loadPropertyRoomPriceStore(gridB, PropertyId, startDate, "2", endDate);
        this.loadPropertyRoomPriceStore(gridC, PropertyId, startDate, "3", endDate);
        this.loadPropertyRoomPriceStore(gridD, PropertyId, startDate, "4", endDate);
    },

    loadPropertyRoomPriceStore: function (grid, PropertyId, startDate, barId, endDate) {
        // var startDate = '2013-05-23';

        grid.getStore().load({
            params: {
                'id': PropertyId,
                'id1': barId,
                'date1': startDate, //new date('Y-m-d'), //'2013-05-01',
                'date2': endDate
            }
        })
    },

    RoomMinimumRevenueWindow: function (rec) {
        if (rec == null) {
            var startDate = Ext.util.Format.date(new Date(), 'Y-m-d');
            //var startDate = '2013-05-23';
            var endDate = null;

            var win = Ext.create('widget.minimumrevenuemanage', { record: null });
            win.show();
            //this.getResultForMinimumRevenue(null, startDate, endDate);
        }
        else {
            var startDate = Ext.util.Format.date(rec.data.StartDate, 'Y-m-d');
            var endDate = Ext.util.Format.date(rec.data.EndDate, 'Y-m-d');
            //this.getResultForMinimumRevenue(rec, startDate, endDate);

            var win = Ext.create('widget.minimumrevenuemanage', { record: startDate });
            win.show();
        }

        var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();

        //d = currentDate.getFullYear() + '-' + parseInt(currentDate.getMonth() + 1) + '-' + currentDate.getdate();
        var grid = Ext.ComponentQuery.query('minimumrevenuemanage grid[itemid="minimumrevenumanagegrid"]')[0];
        grid.getStore().load({
            params: {
                'id': PropertyId,
                'id1': 0,
                'date1': startDate, //new date('Y-m-d'), //'2013-05-01',
                'date2': endDate
            }
        })
    }
});