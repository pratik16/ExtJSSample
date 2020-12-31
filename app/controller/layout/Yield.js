Ext.define("Regardz.controller.layout.Yield", {
    extend: "Ext.app.Controller",
    views: ["layout.Yield"],
    CalendarControl: false,
    init: function () {
        var me = this;
        this.control({
            "treepanel[name=yieldManagement]": {
                itemclick: function (t, r, i) {
                    try {

                        if (r.raw.itemId == 'yieldCalender') {
                            var cc = me.getController('yield.Calendar');
                            if (me.CalendarControl == false) {
                                cc.init();
                                me.CalendarControl = true
                            }
                            var cv = me.getView('yield.Calendar');
                            /*var i = me.c;
                            var s = Ext.ComponentQuery.query('calendar combo[name="PropertyId"]')[0];
                            if (s.getValue() > 0) {
                            var i = Ext.ComponentQuery.query("calendarpanel")[0];
                            i.eventStore.removeAll();
                            i.eventStore.reload()
                            }*/
                        }
                        else if (r.raw.itemId == 'importdata') {
                            var cc = me.getController('yield.ImportYieldData');
                            if (cc.ThisControl == false) {
                                cc.init();
                                cc.ThisControl = true
                            }
                            var cv = me.getView('yield.ImportCalander');
                        }
                        else if (r.raw.itemId == 'listexception') {
                            var cc = me.getController('yield.ListException');
                            if (cc.ThisControl == false) {
                                cc.init();
                                cc.ThisControl = true
                            }
                            var cv = me.getView('yield.ExceptionList');
                        }

                        var ws = Ext.getCmp('right_regionYield');
                        ws.removeAll();
                        ws.add(cv);
                        ws.doLayout()

                    } catch (o) {

                        throw new Error("[" + Ext.getDisplayName(o.callee) + "]\n" + o)
                    }
                }
            }
        })
    }
});
