Ext.define("Regardz.controller.yield.ListException", {
    extend: "Ext.app.Controller",
    views: ["yield.ExceptionList", "yield.AddException"],
    stores: ["common.PropertyForNamesStore", "yield.RoomTypeStore", "yield.RoomStore", "yield.YieldExceptionStore"],
    ThisControl: false,
    init: function () {
        var e = this;
        this.control({

            'addexception combo[action="roomtype"]': {
                select: function (e, t, n) {
                    Ext.getStore("yield.RoomStore").load({
                        params: {
                            id: t[0].data.RoomTypeId
                        },
                        callback: function (e, t, n) { }

                    })
                }
            },
            'addexception button[action="exception_save"]': {
                click: function (e, t, n) {
                    if (Ext.getCmp("addExeptiondataform").getForm().isValid()) {
                        var r = this;
                        var i = Ext.getCmp("addExeptiondataform").getForm().getValues();
                        Ext.getCmp("addExeptiondataform").getForm().submit({
                            url: webAPI_path + "api/yield/AddYieldException",
                            method: "POST",
                            success: function (e, t) {
                                var n = t.response.responseText;
                                var n = Ext.decode(n);
                                var ResultText = n.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (n.success == true) {
                                    var r = Ext.WindowManager.getActive();
                                    if (r) {
                                        r.close()
                                    }
                                    display_alert("MG00000")
                                } else {
                                    Ext.Msg.alert("Error".l("g"), ResultText);
                                }
                            },
                            failure: function (e, t) {
                                var e = t.response.responseText;
                                var e = Ext.decode(e);
                                var ResultText = e.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                Ext.Msg.alert("Error".l("g"), ResultText);
                            }
                        })
                    }
                }
            },
            'exceptionlist': {

                cellclick: function (e, t, n, r, i, s, o) {
                    var u = e.getGridColumns()[n].name;
                    var a = e.getRecord(i);
                    if (u == "deleteException")
                        this.deleteRoomException(a, null)
                },
                afterrender: function (e, t) {
                    Ext.getStore("common.PropertyForNamesStore").load();
                    Ext.getStore("yield.YieldExceptionStore").removeAll()
                }
            },
            'exceptionlist combo[action="getNewExceptionList"]': {
                select: function (t, n, r) {
                    e.exceptionlistPropertyId = n[0].data.PropertyId;
                    Ext.getStore("yield.YieldExceptionStore").proxy.setExtraParam("id", n[0].data.PropertyId);
                    Ext.getStore("yield.YieldExceptionStore").proxy.setExtraParam("languageId", user_language);
                    Ext.getStore("yield.YieldExceptionStore").load()
                }
            },
            'exceptionlist button[action="addNewException"]': {
                click: function (e, t, n) {
                    this.addExceptionForm(0)
                }
            }
        })
    },
    addExceptionForm: function (e) {
        Ext.create("widget.addexception").show();
        Ext.getStore("yield.RoomTypeStore").load({
            callback: function (e, t, n) { }

        })
    },
    deleteRoomException: function (e) {
        display_alert("MG00020", "", "C", function (t) {
            if (t === "yes") {
                Ext.data.JsonP.request({
                    url: webAPI_path + "api/yield/DeleteYieldException",
                    type: "GET",
                    params: {
                        id: e.data.ExemptionId
                    },
                    success: function (e) {
                        display_alert("MG00040");
                        Ext.getStore("yield.YieldExceptionStore").loadPage(1)
                    }
                })
            }
        })
    }
});