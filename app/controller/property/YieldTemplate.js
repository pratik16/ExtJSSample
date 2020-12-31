Ext.define('Regardz.controller.property.YieldTemplate', {
    extend: 'Ext.app.Controller',
    views: ['property.PropertyYieldTemplate'],
    stores: ['property.YieldTemplateStore1', 'property.YieldTemplateStore2', 'property.YieldTemplateStore3'],
    thisController: false,

    //    refs: [{
    //        ref: 'minimumrevenuemanage',
    //        selector: 'minimumrevenuemanage'
    //    }],

    init: function () {
        var me = this;
        var barId = 0;
        this.control({
            'propertyyieldtemplate': {
                afterrender: function (t) {
                    me.loadYieldTemplateGrid();
                    var propertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
                    Ext.data.JsonP.request({
                        url: webAPI_path + 'api/yield/CheckYieldTemplateForProperty',
                        type: "GET",
                        params: { id: propertyId },
                        success: function (response) {
                            var r = response;
                            if (r.success == true && r.result == 'SUCCESS') {
                            }
                            else {
                                Ext.data.JsonP.request({
                                    url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                                    success: function () {
                                        Ext.Msg.alert('Error'.l('g'), 'There is NO YIELD TEMPLATE defined for this property.'.l('g'));
                                    }
                                });
                            }
                        }
                    });

                },
                resize: function (panel, adjWidth, adjHeight, eOpts) {

                    var gridHeaderHeight = 100;

                    var newHeight = adjHeight - gridHeaderHeight;

                    var v = panel.items.items[0];
                    var v1 = panel.items.items[1];
                    var v2 = panel.items.items[2];

                    if (v.viewType == 'gridview') {
                        v.setHeight(newHeight);
                    }

                    if (v1.viewType == 'gridview') {
                        v1.setHeight(newHeight);
                    }

                    if (v2.viewType == 'gridview') {
                        v2.setHeight(newHeight);
                    }
                }
            },
            'propertyyieldtemplate grid[itemId="YieldTemplateWeek1to18"]': {
                edit: function (editor, e, eOpts) {
                    var weekId = '1-18';
                    me.saveBarChange(weekId, barId);
                }
            },
            'propertyyieldtemplate grid[itemId="YieldTemplateWeek19to36"]': {
                edit: function (editor, e, eOpts) {
                    var weekId = '19-36';
                    me.saveBarChange(weekId, barId);
                }
            },
            'propertyyieldtemplate grid[itemId="YieldTemplateWeek37to53"]': {
                edit: function (editor, e, eOpts) {
                    var weekId = '37-53';
                    me.saveBarChange(weekId, barId);
                }
            },
            'combo[itemId=barTempCombo]': {
                select: function (combo, record, eOpts) {
                    if (record[0].data.BarId == 'A') {
                        barId = 1;
                    }
                    else if (record[0].data.BarId == 'B') {
                        barId = 2;
                    }
                    else if (record[0].data.BarId == 'C') {
                        barId = 3;
                    }
                    else if (record[0].data.BarId == 'D') {
                        barId = 4;
                    }
                    else if (record[0].data.BarId == 'X') {
                        barId = 5;
                    }
                }
            }
        });
    },
    loadYieldTemplateGrid: function () {
        var propertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();


        Ext.getStore('property.YieldTemplateStore1').proxy.setExtraParam('id', propertyId); //PropertyID
        Ext.getStore('property.YieldTemplateStore1').proxy.setExtraParam('id1', 1); //start week
        Ext.getStore('property.YieldTemplateStore1').proxy.setExtraParam('id2', 18); //end week
        Ext.getStore('property.YieldTemplateStore1').proxy.setExtraParam('languageId', user_language); //language
        Ext.getStore('property.YieldTemplateStore1').load();

        Ext.getStore('property.YieldTemplateStore2').proxy.setExtraParam('id', propertyId); //PropertyID
        Ext.getStore('property.YieldTemplateStore2').proxy.setExtraParam('id1', 19); //start week
        Ext.getStore('property.YieldTemplateStore2').proxy.setExtraParam('id2', 36); //end week
        Ext.getStore('property.YieldTemplateStore2').proxy.setExtraParam('languageId', user_language); //language
        Ext.getStore('property.YieldTemplateStore2').load();

        Ext.getStore('property.YieldTemplateStore3').proxy.setExtraParam('id', propertyId); //PropertyID
        Ext.getStore('property.YieldTemplateStore3').proxy.setExtraParam('id1', 37); //start week
        Ext.getStore('property.YieldTemplateStore3').proxy.setExtraParam('id2', 53); //end week
        Ext.getStore('property.YieldTemplateStore3').proxy.setExtraParam('languageId', user_language); //language
        Ext.getStore('property.YieldTemplateStore3').load();
    },
    saveBarChange: function (weekId, barId) {

        if (weekId == '1-18') {
            var ytGrid = Ext.ComponentQuery.query('grid[itemId=YieldTemplateWeek1to18]')[0];
        }
        else if (weekId == '19-36') {
            var ytGrid = Ext.ComponentQuery.query('grid[itemId=YieldTemplateWeek19to36]')[0];
        }
        else if (weekId == '37-53') {
            var ytGrid = Ext.ComponentQuery.query('grid[itemId=YieldTemplateWeek37to53]')[0];
        }

        var dirtyRecord = null;
        var dirtySlotArry = null;
        var dirtySlotId = null;

        for (var i = 0; i < ytGrid.getStore().data.items.length; i++) {
            var record = ytGrid.getStore().data.items[i];
            if (record.dirty == true) {
                dirtySlotArry = record.modified;
                dirtyRecord = record.data;
            }
        }

        for (var key in dirtySlotArry) {
            var dirtySlot = key;
            if (dirtySlot == 'Slot1Bar') {
                dirtySlotId = 1;
            }
            else if (dirtySlot == 'Slot2Bar') {
                dirtySlotId = 2;
            }
            else if (dirtySlot == 'Slot3Bar') {
                dirtySlotId = 3;
            }
        }
        ///////PARAM DETAILS///////////////////
        //   id = ProperytID                 //            
        //   id1 = Week No                   //
        //   id2 = Day No                    //
        //   languageId = Updated Bar Id     //
        ///////////////////////////////////////

        var weekNo = dirtyRecord.WeekOrder;
        var dayNo = dirtyRecord.Day;
        var propertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();


        obj = new Object();
        obj.PropertyId = propertyId;
        obj.WeekNo = weekNo;
        obj.DayNo = dayNo;
        obj.TimeslotId = dirtySlotId;
        obj.BarId = barId;
        obj.UserId = CurrentSessionUserId;
        obj = Ext.encode(obj);

        Ext.data.JsonP.request({
            url: webAPI_path + 'api/configyieldTemplate/UpdateYieldTemplate',
            type: "GET",
            params: { param: obj },
            success: function (response) {
                var r = response;
                var ResultText = r.result;
                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                    ResultText = ResultText.l("SP_DynamicCode");
                if (r.success == true) {
                    if (weekId == '1-18') {
                        Ext.getStore('property.YieldTemplateStore1').reload();
                    }
                    else if (weekId == '19-36') {
                        Ext.getStore('property.YieldTemplateStore2').reload();
                    }
                    else if (weekId == '37-53') {
                        Ext.getStore('property.YieldTemplateStore3').reload();
                    }
                }
                else {
                    Ext.Msg.alert('Error'.l('g'), ResultText);
                }
            }
        });

    }
});