Ext.define('Regardz.controller.layout.AfasLog', {
    extend: 'Ext.app.Controller',
    views: ['layout.AfasLog'],
    init: function () {
        var me = this;
        this.control({
            'treepanel[name=administrationManagement]': {
                itemclick: function (t, r, i) {
                    try {                                                                  
                        if (r.raw.itemId == 'afaslog') {
							var c = me.getController('afas.AfasLogList');
							var cv = me.getView('afas.AfasLogList');
							if (c.thisController == false) {
								c.init();
								c.thisController = true;
							}
                        }
                        var ws = Ext.getCmp('right_regionAdministration');
                        ws.removeAll();
                        ws.add(cv);
                        ws.doLayout();

                    } catch (e) {
                        throw new Error('[' + Ext.getDisplayName(e.callee) + '] controller');
                    }
                }
            }
        });
    }
});