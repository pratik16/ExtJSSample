Ext.define("Regardz.controller.yield.Calendar", {
    extend: "Ext.app.Controller",
    views: ["yield.Calendar", "yield.UpdateYieldDetail"],
    //stores : ["yield.YieldCalendarStore", "common.PropertyForNamesStore"],//removed as file was not loaded
    stores: ["common.PropertyForNamesStore"],
    uses: ["Ext.layout.container.Border", "Ext.calendar.util.Date", "Ext.calendar.CalendarPanel", "Ext.calendar.data.MemoryCalendarStore", "Ext.calendar.data.MemoryEventStore", "Ext.calendar.data.Events", "Ext.calendar.data.Calendars", "Ext.calendar.form.EventWindow"],
    init: function () {
        var e = this;
        this.control({
            'calendar': {
                afterrender: function (e, t, n, r) {
                    var i = Ext.ComponentQuery.query("calendarpanel")[0];
                    i.eventStore.removeAll();

                    Ext.getStore("common.PropertyForNamesStore").load();
                }
            },
            'calendar combo[action="propertyToCalendar"]': {
                select: function (t, n, r) {
                    e.calendarPropertyId = n[0].data.PropertyId;
                    var i = Ext.ComponentQuery.query("calendarpanel")[0];
                    i.eventStore.removeAll();
                    i.eventStore.load({
                        params: {
                            id: n[0].data.PropertyId
                        },
                        callback: function (e, t, n) { }

                    })
                }
            },
            'calendar calendarpanel[action="eventClicked"]': {
                eventclick: function (e, t, n, r) {
                    Ext.create("widget.updateyielddetail").show();
                    Ext.getCmp("updateyielddataform").getForm().load({
                        method: "GET",
                        url: webAPI_path + "api/yield/GetYieldDetailById",
                        params: {
                            id: t.data.EventId
                        },
                        success: function (e, t) { }

                    })
                }
            },
            'updateyielddetail': {
                afterrender: function (e, t, n, r) {
                    return true
                }
            },
            'updateyielddetail button[action="yieldupdate_save"]': {
                click: function (e, t, n, r) {
                    if (Ext.getCmp("updateyielddataform").getForm().isValid()) {
                        var i = Ext.getCmp("updateyielddataform").getForm().getValues();
                        var s = new Object;
                        s.id = i.YieldId;
                        s.languageId = i.BarId;
                        Ext.data.JsonP.request({
                            url: webAPI_path + "api/yield/UpdateYieldDetail",
                            type: "GET",
                            params: s,
                            success: function (e) {
                                var ResultText = e.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (e.success == true) {
                                    var t = Ext.WindowManager.getActive();
                                    if (t) {
                                        t.close()
                                    }
                                    display_alert("MG00000");
                                    var n = Ext.ComponentQuery.query("calendarpanel")[0];
                                    n.eventStore.removeAll();
                                    n.eventStore.reload()
                                } else {
                                    Ext.Msg.alert("Error".l("g"), ResultText);
                                }
                            },
                            failure: function () {
                                Ext.Msg.alert("Error".l("g"), "Information not saved.".l("g"))
                            }
                        })
                    }
                }
            }
        })
    }
});