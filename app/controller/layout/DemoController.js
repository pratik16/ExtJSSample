Ext.define('Regardz.controller.layout.DemoController', {
    extend: 'Ext.app.Controller',
    views: ['layout.DemoLayout'],
    PropertyList: false,
    EventsList: false,
    CustomList:false,
    
    init: function () {
        var me = this;
        this.control({
            'treepanel[name=DummyModule]': {
                itemclick: function (t, r, i) {
                    switch (r.raw.itemId) {
                        case 'propertyList':
                            try {
                                var c = me.getController('property.PropertyList');
                                var cv = c.getView('property.PropertyList');
                                if (this.PropertyList == false) {
                                    c.init();
                                    this.PropertyList = true;
                                }
                                var ws = Ext.getCmp('right_regionDemoModule');

                                ws.removeAll();

                                ws.add(cv);

                                ws.doLayout();

                            } catch (e) {

                                throw new Error('[' + Ext.getDisplayName(e.callee) + ']\n' + e);
                            }
                            break;
                        case 'eventsList':
                            try {
                                var c = me.getController('configuration.Events');
                                var cv = c.getView('configuration.EventsList');
                                if (this.EventsList == false) {
                                    c.init();
                                    this.EventsList = true;
                                }
                                var ws = Ext.getCmp('right_regionDemoModule');

                                ws.removeAll();

                                ws.add(cv);

                                ws.doLayout();

                            } catch (e) {

                                throw new Error('[' + Ext.getDisplayName(e.callee) + ']\n' + e);
                            }
                            break;
                        case 'customList':
                            try {
                                var c = me.getController('demo.CustomDataController');
                          
                                var cv = c.getView('demo.CustomDataList');
                                if (this.CustomList == false) {
                                    c.init();
                                    this.CustomList = true;
                                }
                                var ws = Ext.getCmp('right_regionDemoModule');
                               
                                ws.removeAll();

                                ws.add(cv);

                                ws.doLayout();

                            } catch (e) {

                                throw new Error('[' + Ext.getDisplayName(e.callee) + ']\n' + e);
                            }
                            break;
                    }
                }
            }

        });
    }
});