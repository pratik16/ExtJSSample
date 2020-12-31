Ext.define('Regardz.controller.property.YieldCalendar', {
    extend: 'Ext.app.Controller',
    views: ['property.PropertyYieldCalendar', 'property.SetBarForYieldCalendar', 'property.ReasonYieldChange',
    'property.ExceptionDetailsForYieldBar'],
    stores: ['property.RoomTypeComboStore', 'property.RoomListComboStore', 'property.YieldCalendarStore', 'property.YieldCalendarExemptionStore', 'common.RoomTypeComboSetBarStore', 'common.RoomListComboSetBarStore'],
    thisController: false,

    //    refs: [{
    //        ref: 'minimumrevenuemanage',
    //        selector: 'minimumrevenuemanage'
    //    }],

    init: function () {
        var me = this;
        var propertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
        var currentYear = Ext.util.Format.date(new Date(), 'Y');
        //        var roomListCombo = Ext.ComponentQuery.query('combo[itemId="roomList"]')[0];
        //        var roomTypeCombo = Ext.ComponentQuery.query('combo[itemId=roomType]')[0];
        //        var yearCombo = Ext.ComponentQuery.query('combo[itemId=yearCombo]')[0];
        //        var monthCombo = Ext.ComponentQuery.query('combo[itemId=monthCombo]')[0];

        this.control({
            'propertyyieldcalendar': {
                afterrender: function (t) {
                    propertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
                    Ext.getStore('property.RoomTypeComboStore').proxy.setExtraParam('id', propertyId);
                    Ext.getStore('property.RoomTypeComboStore').proxy.setExtraParam('languageId', user_language);
                    var roomTypeCombo = Ext.ComponentQuery.query('combo[itemId=roomType]')[0];
                    roomTypeCombo.getStore().load({
                        callback: function (records, o, success) {
                            roomTypeCombo.getStore().insert(0, { "RoomTypeId": 0, "RoomTypeName": "All types" }, true);
                            roomTypeCombo.setValue(0);
                        }
                    });
                    me.loadYieldGrid();
                    var seleYear = currentYear;
                    var PrevYear = seleYear - 1;
                    var SecPrevYear = seleYear - 2;
                    var yieldGrid = Ext.ComponentQuery.query('grid[itemId=propertyyieldcalendar]')[0];
                    yieldGrid.getView().getHeaderAtIndex(1).setText(SecPrevYear);
                    yieldGrid.getView().getHeaderAtIndex(2).setText(PrevYear);
                    yieldGrid.getView().getHeaderAtIndex(3).setText(seleYear);

                    yieldGrid.getView().getHeaderAtIndex(5).setText(SecPrevYear);
                    yieldGrid.getView().getHeaderAtIndex(6).setText(PrevYear);
                    yieldGrid.getView().getHeaderAtIndex(7).setText(seleYear);

                    yieldGrid.getView().getHeaderAtIndex(9).setText(SecPrevYear);
                    yieldGrid.getView().getHeaderAtIndex(10).setText(PrevYear);
                    yieldGrid.getView().getHeaderAtIndex(11).setText(seleYear);

                    yieldGrid.getView().getHeaderAtIndex(13).setText(SecPrevYear);
                    yieldGrid.getView().getHeaderAtIndex(14).setText(PrevYear);
                    yieldGrid.getView().getHeaderAtIndex(15).setText(seleYear);
                },
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);

                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    //                    if (fieldName == 'OpenException')
                    //this.OpenException(zRec, propertyId);
                }
            },
            'propertyyieldcalendar combo[itemId=yearCombo]': {
                afterrender: function (combo, eOpts) {
                    var year = Ext.util.Format.date(new Date(), 'Y');
                    combo.setValue(parseInt(currentYear))
                    me.loadYieldGrid();
                },
                select: function (combo, record, eOpts) {
                    propertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
                    var seleYear = combo.getValue();
                    var PrevYear = seleYear - 1;
                    var SecPrevYear = seleYear - 2;
                    var yieldGrid = Ext.ComponentQuery.query('grid[itemId=propertyyieldcalendar]')[0];

                    yieldGrid.getView().getHeaderAtIndex(1).setText(SecPrevYear);
                    yieldGrid.getView().getHeaderAtIndex(2).setText(PrevYear);
                    yieldGrid.getView().getHeaderAtIndex(3).setText(seleYear);

                    yieldGrid.getView().getHeaderAtIndex(5).setText(SecPrevYear);
                    yieldGrid.getView().getHeaderAtIndex(6).setText(PrevYear);
                    yieldGrid.getView().getHeaderAtIndex(7).setText(seleYear);

                    yieldGrid.getView().getHeaderAtIndex(9).setText(SecPrevYear);
                    yieldGrid.getView().getHeaderAtIndex(10).setText(PrevYear);
                    yieldGrid.getView().getHeaderAtIndex(11).setText(seleYear);

                    yieldGrid.getView().getHeaderAtIndex(13).setText(SecPrevYear);
                    yieldGrid.getView().getHeaderAtIndex(14).setText(PrevYear);
                    yieldGrid.getView().getHeaderAtIndex(15).setText(seleYear);


                    var roomListCombo = Ext.ComponentQuery.query('combo[itemId="roomList"]')[0];
                    var roomTypeCombo = Ext.ComponentQuery.query('combo[itemId=roomType]')[0];

                    if (roomTypeCombo.getValue() != null && roomTypeCombo.getValue() != 0 || roomListCombo.getValue() != null && roomListCombo.getValue() != 0) {
                        me.loadYieldGridWithExemption();
                    }
                    else
                        me.loadYieldGrid();
                }
            },
            'propertyyieldcalendar combo[itemId=monthCombo]': {
                afterrender: function (combo, eOpts) {
                    var month = Ext.util.Format.date(new Date(), 'm');
                    combo.setValue(parseInt(month));
                },
                select: function (combo, record, eOpts) {
                    var roomListCombo = Ext.ComponentQuery.query('combo[itemId="roomList"]')[0];
                    var roomTypeCombo = Ext.ComponentQuery.query('combo[itemId=roomType]')[0];
                    if (roomTypeCombo.getValue() != null && roomTypeCombo.getValue() != 0 || roomListCombo.getValue() != null && roomListCombo.getValue() != 0) {
                        me.loadYieldGridWithExemption();
                    }
                    else
                        me.loadYieldGrid();
                }
            },
            'propertyyieldcalendar combo[itemId=roomType]': {
                select: function (combo, record, eOpts) {
                    var roomListCombo = Ext.ComponentQuery.query('combo[itemId="roomList"]')[0];
                    var propertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
                    if (record[0].data.RoomTypeId != 0) {
                        roomListCombo.enable(1);
                        Ext.getStore('property.RoomListComboStore').proxy.setExtraParam('id', propertyId);
                        Ext.getStore('property.RoomListComboStore').proxy.setExtraParam('id1', record[0].data.RoomTypeId);
                        Ext.getStore('property.RoomListComboStore').proxy.setExtraParam('isChecked', user_language);
                        Ext.getStore('property.RoomListComboStore').load();
                        me.loadYieldGridWithExemption();
                    }
                    else {
                        roomListCombo.setValue(0);
                        roomListCombo.disable(1);
                        me.loadYieldGrid();
                    }
                }
            },
            'propertyyieldcalendar combo[itemId=roomList]': {
                select: function (combo, record, eOpts) {
                    me.loadYieldGridWithExemption();
                }
            },
            'combo[itemId=barCombo]': {
                select: function (combo, record, eOpts) {
                    propertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
                    var barID = 0;
                    if (record[0].data.BarId == 'A') {
                        barID = 1;
                    }
                    else if (record[0].data.BarId == 'B') {
                        barID = 2;
                    }
                    else if (record[0].data.BarId == 'C') {
                        barID = 3;
                    }
                    else if (record[0].data.BarId == 'D') {
                        barID = 4;
                    }
                    else if (record[0].data.BarId == 'X') {
                        barID = 5;
                    }

                    Ext.create('widget.reasonyieldchange', { PropertyId: propertyId, userId: CurrentSessionUserId, changeBarId: barID }).center();
                }
            },
            'button[action=addBarForYield]': {
                click: function () {
                    propertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
                    Ext.create('widget.setbarforyieldcalendar', { PropertyId: propertyId, userId: CurrentSessionUserId }).center();
                }
            },
            'reasonyieldchange': {
                beforeclose: function (panel, eOpts) {
                    var roomListCombo = Ext.ComponentQuery.query('combo[itemId="roomList"]')[0];
                    var roomTypeCombo = Ext.ComponentQuery.query('combo[itemId=roomType]')[0];

                    if (roomTypeCombo.getValue() != null && roomTypeCombo.getValue() != 0 || roomListCombo.getValue() != null && roomListCombo.getValue() != 0) {
                        me.loadYieldGridWithExemption();
                    }
                    else
                        me.loadYieldGrid();
                }
            },
            'reasonyieldchange button[action=cancelYieldBarChange]': {
                click: function () {
                    var win = Ext.WindowManager.getActive();
                    if (win) {
                        win.close();
                    }
                }
            },
            'reasonyieldchange button[action=saveYieldBarChange]': {
                click: function () {
                    if (Ext.getCmp('reasonYieldChange').getForm().isValid()) {
                        var formYieldChange = Ext.ComponentQuery.query('[itemId="reasonYieldChange"]')[0];
                        var roomListCombo = Ext.ComponentQuery.query('combo[itemId="roomList"]')[0];
                        var roomTypeCombo = Ext.ComponentQuery.query('combo[itemId=roomType]')[0];

                        var yieldGrid = Ext.ComponentQuery.query('grid[itemId=propertyyieldcalendar]')[0];

                        var dirtyRecord = null;
                        var dirtySlotArry = null;
                        var dirtySlotId = null;

                        for (var i = 0; i < yieldGrid.getStore().data.items.length; i++) {
                            var record = yieldGrid.getStore().data.items[i];

                            if (record.dirty == true) {
                                dirtySlotArry = record.modified;
                                dirtyRecord = record.data;
                            }
                        }
                        for (var key in dirtySlotArry) {
                            var dirtySlot = key;
                            if (dirtySlot == 'CurrentYearSlot1Bar') {
                                dirtySlotId = 1;
                            }
                            else if (dirtySlot == 'CurrentYearSlot2Bar') {
                                dirtySlotId = 2;
                            }
                            else if (dirtySlot == 'CurrentYearSlot3Bar') {
                                dirtySlotId = 3;
                            }
                        }
                        formYieldChange.getForm().findField('Date').setValue(Ext.Date.format(new Date(dirtyRecord.CurrentFullDate), 'Y-m-d H:i:s'));
                        formYieldChange.getForm().findField('TimeSlotId').setValue(dirtySlotId);
                        formYieldChange.getForm().findField('WeekNo').setValue(dirtyRecord.WeekNo);
                        formYieldChange.getForm().findField('Day').setValue(dirtyRecord.WeekDayNo);

                        if (roomTypeCombo.getValue() != null && roomTypeCombo.getValue() != 0) {
                            formYieldChange.getForm().findField('RoomTypeId').setValue(roomTypeCombo.getValue());
                        }
                        else {
                            formYieldChange.getForm().findField('RoomTypeId').setValue(null);
                        }

                        if (roomListCombo.getValue() != null && roomListCombo.getValue() != 0) {
                            formYieldChange.getForm().findField('RoomId').setValue(roomListCombo.getValue());
                        }
                        else {
                            formYieldChange.getForm().findField('RoomId').setValue(null);
                        }

                        Ext.getCmp('reasonYieldChange').getForm().submit({
                            url: webAPI_path + 'api/yield/saveyieldbarchange',
                            type: 'POST',
                            success: function (form, response) {

                                var r = response.result;
                                var win = Ext.WindowManager.getActive();
                                if (win) {
                                    win.close();
                                }

                                if (roomTypeCombo.getValue() != null && roomTypeCombo.getValue() != 0 || roomListCombo.getValue() != null && roomListCombo.getValue() != 0) {
                                    formYieldChange.getForm().findField('RoomTypeId').setValue(roomTypeCombo.getValue());
                                    me.loadYieldGridWithExemption();
                                }
                                else
                                    me.loadYieldGrid();

                                if (r.success == true) {

                                } else {

                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {
                                            var ResultText = r.result;
                                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                                ResultText = ResultText.l("SP_DynamicCode");
                                            Ext.Msg.alert('Error'.l('g'), ResultText);
                                        }
                                    });

                                }
                            },
                            failure: function (form, response) {
                                var r = response.result;
                                var win = Ext.WindowManager.getActive();
                                if (win) {
                                    win.close();
                                }
                                if (roomTypeCombo.getValue() != null && roomTypeCombo.getValue() != 0 || roomListCombo.getValue() != null && roomListCombo.getValue() != 0) {
                                    formYieldChange.getForm().findField('RoomTypeId').setValue(roomTypeCombo.getValue());
                                    me.loadYieldGridWithExemption();
                                }
                                else
                                    me.loadYieldGrid();

                                if (r.success == false) {

                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {
                                            var ResultText = r.result;
                                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                                ResultText = ResultText.l("SP_DynamicCode");
                                            Ext.Msg.alert('Error'.l('g'), ResultText);
                                        }
                                    });
                                } else {
                                    Ext.data.JsonP.request({
                                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                        success: function () {
                                            Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                        }
                                    });
                                }
                            }
                        });
                    }
                }
            },
            'button[action=ImportYearlyYeildDetailData]': {
                click: function () {
                    var nextYear = parseInt(currentYear) + 1;
                    display_alert("MG31100", { 'Y': nextYear }, 'C', function (btn) {
                        if (btn === 'yes') {
                            propertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
                            Ext.data.JsonP.request({
                                url: webAPI_path + 'api/yield/ImportYearlyYeildDetailData',
                                type: "GET",
                                params: { id: propertyId, id1: nextYear, languageId: user_language },
                                success: function (response) {
                                    var r = response;
                                    var ResultText = r.result;
                                    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                        ResultText = ResultText.l("SP_DynamicCode");
                                    if (r.success == true) {
                                        display_alert('MG31101', { 'Y': nextYear });
                                    }
                                    else {
                                        Ext.Msg.alert('Error'.l('g'), ResultText);
                                    }
                                }
                            });
                        }
                    })
                }
            },
            'setbarforyieldcalendar': {
                afterrender: function (t) {
                    propertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
                    Ext.getStore('common.RoomTypeComboSetBarStore').proxy.setExtraParam('id', propertyId);
                    Ext.getStore('common.RoomTypeComboSetBarStore').proxy.setExtraParam('languageId', user_language);
                    Ext.getStore('common.RoomTypeComboSetBarStore').load();
                }
            },
            'setbarforyieldcalendar combo[itemId=setBarRoomType]': {
                change: function (combo, newValue, oldValue, eOpts) {
                    var roomListCombo = Ext.ComponentQuery.query('combo[itemId="setBarRoomList"]')[0];
                    var propertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
                    if (newValue != 0) {
                        roomListCombo.enable(1);
                        Ext.getStore('common.RoomListComboSetBarStore').proxy.setExtraParam('id', propertyId);
                        Ext.getStore('common.RoomListComboSetBarStore').proxy.setExtraParam('id1', newValue);
                        Ext.getStore('common.RoomListComboSetBarStore').proxy.setExtraParam('isChecked', user_language);
                        Ext.getStore('common.RoomListComboSetBarStore').load();
                    }
                    else {
                        roomListCombo.setValue(0);
                        roomListCombo.disable(1);
                    }
                }
            },
            'setbarforyieldcalendar button[action=exeBarForYieldCalendar]': {
                click: function () {

                    if (Ext.getCmp('setBarForYieldCalendar').getForm().isValid()) {
                        var formSetBar = Ext.ComponentQuery.query('[itemId="setBarForYieldCalendar"]')[0];
                        var slot1Bar = formSetBar.getForm().findField('Slot1Bar').getValue();
                        var slot2Bar = formSetBar.getForm().findField('Slot2Bar').getValue();
                        var slot3Bar = formSetBar.getForm().findField('Slot3Bar').getValue();
                        //                        console.log(slot1Bar);
                        //                        console.log(slot2Bar);
                        //                        console.log(slot3Bar);
                        if (slot1Bar != null || slot2Bar != null || slot3Bar != null) {
                            var dayList = Ext.getCmp('dayList').getForm().getValues();
                            var daysIds = '';
                            Ext.each(dayList, function (r) {
                                if (daysIds == '') {
                                    daysIds = r.day;
                                }
                                else {
                                    daysIds += ',' + r.day;
                                }
                            });

                            daysIds.toString();
                            //daysIds = daysIds.replace(/\,$/, '');                            
                            formSetBar.getForm().findField('WeekDays').setValue(daysIds);

                            Ext.getCmp('setBarForYieldCalendar').getForm().submit({
                                url: webAPI_path + 'api/yield/SetBarForYieldCalendar',
                                type: 'POST',
                                success: function (form, response) {
                                    var r = response.result;
                                    if (r.success == true) {
                                        var win = Ext.WindowManager.getActive();
                                        if (win) {
                                            win.close();
                                        }
                                        me.loadYieldGrid();
                                    } else {
                                        var ResultText = r.result;
                                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                            ResultText = ResultText.l("SP_DynamicCode");
                                        Ext.Msg.alert('Error'.l('g'), ResultText);
                                    }
                                },
                                failure: function (form, response) {
                                    var r = response.result;
                                    if (r.success == false) {
                                        var ResultText = r.result;
                                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                            ResultText = ResultText.l("SP_DynamicCode");
                                        Ext.Msg.alert('Error'.l('g'), ResultText);
                                    } else {
                                        Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                                    }
                                }
                            })
                        }
                        else {
                            Ext.Msg.alert('Error'.l('g'), 'Select atleast one Slot.'.l('SC31100')); 
                        }
                    }
                }
            }
        });
    },
    loadYieldGrid: function () {
        propertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
        console.log('loadYieldGrid ' + propertyId);
        var yearCombo = Ext.ComponentQuery.query('combo[itemId=yearCombo]')[0];
        var monthCombo = Ext.ComponentQuery.query('combo[itemId=monthCombo]')[0];

        var yieldGrid = Ext.ComponentQuery.query('grid[itemId=propertyyieldcalendar]')[0];
        var exemStore = Ext.getStore('property.YieldCalendarStore');
        yieldGrid.bindStore(exemStore);

        if (propertyId != null && yearCombo.getValue() != null && monthCombo.getValue() != null) {
            Ext.getStore('property.YieldCalendarStore').proxy.setExtraParam('id', propertyId); //PropertyID
            Ext.getStore('property.YieldCalendarStore').proxy.setExtraParam('id1', yearCombo.getValue()); //Year
            Ext.getStore('property.YieldCalendarStore').proxy.setExtraParam('id2', monthCombo.getValue()); //Month
            Ext.getStore('property.YieldCalendarStore').proxy.setExtraParam('languageId', user_language); //language
            Ext.getStore('property.YieldCalendarStore').load();
        }
    },
    loadYieldGridWithExemption: function () {
        propertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
        console.log('loadYieldGridWithExemption ' + propertyId);
        var yearCombo = Ext.ComponentQuery.query('combo[itemId=yearCombo]')[0];
        var monthCombo = Ext.ComponentQuery.query('combo[itemId=monthCombo]')[0];
        var roomTypeCombo = Ext.ComponentQuery.query('combo[itemId=roomType]')[0];
        var roomListCombo = Ext.ComponentQuery.query('combo[itemId=roomList]')[0];

        if (propertyId != null && yearCombo.getValue() != null && monthCombo.getValue() != null && roomTypeCombo.getValue() != null) {

            var roomListComboValue = null;
            if (roomListCombo.getValue() != null)
                roomListComboValue = roomListCombo.getValue();

            obj = new Object();
            obj.PropertyId = propertyId;
            obj.Year = yearCombo.getValue();
            obj.Month = monthCombo.getValue();
            obj.LanguageId = user_language;
            obj.RoomTypeId = roomTypeCombo.getValue();
            obj.RoomId = roomListComboValue;
            obj = Ext.encode(obj);

            var yieldGrid = Ext.ComponentQuery.query('grid[itemId=propertyyieldcalendar]')[0];
            var exemStore = Ext.getStore('property.YieldCalendarExemptionStore');
            yieldGrid.bindStore(exemStore);
            exemStore.proxy.setExtraParam('param', obj);
            exemStore.load();

        }
    }
});