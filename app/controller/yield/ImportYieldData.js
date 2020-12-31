Ext.define("Regardz.controller.yield.ImportYieldData", {
    extend: "Ext.app.Controller",
    views: ["yield.ImportCalander"],
    stores: ["common.PropertyForNamesStore"],
    ThisControl: false,
    init: function () {
        var e = this;
        this.control({
            'importcalander': {
                afterrender: function (t, n, o, eo) {
                    Ext.getStore("common.PropertyForNamesStore").load();
                }
            },

            'importcalander button[action="import_yield_data"]': {
                click: function (e, t, n) {
                    if (Ext.getCmp("importyielddataform").getForm().isValid()) {
                        var r = Ext.getCmp("importyielddataform").getForm().getValues();
                        var i = new Object;
                        i.id = r.PropertyId;
                        i.start = r.year;
                        i.limit = r.fromMonth;
                        i.languageId = CurrentSessionUserId; //languageid is routing to the userby id  "ChangeSet #17450 yieldController.cs file at comment"
                        Ext.data.JsonP.request({
                            url: webAPI_path + "api/yield/GetYieldTemplateData",
                            type: "GET",
                            params: i,
                            success: function (e) {
                                var ResultText = e.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (e.success == true) {
                                    display_alert("MG00000");
                                } else {
                                    Ext.Msg.alert("Error".l("g"), ResultText);
                                }
                            },
                            failure: function () {
                                Ext.Msg.alert("Error".l("g"), "Information not saved.".l("g"));
                            }
                        })
                    }
                }
            }
        })
    }
});