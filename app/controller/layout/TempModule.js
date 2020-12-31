Ext.define('Regardz.controller.layout.TempModule', {
    extend: 'Ext.app.Controller',
    views: ['layout.TempModule'],
    OperationsControl: false,
    BookingListControl: false,
    BookingTrackingListControl: false,
    step2list: false,
    step3list: false,
    step4list: false,
    step5list: false,
    step6list: false,
    RoomAvailabilityBlock: false,
    init: function () {

        var me = this;

        this.control({
            'treepanel[name=TempModule]': {
                itemclick: function (t, r, i) {

                    if (r.raw.itemId == 'roomAvailabilityBlock') {
                        try {

                            var c = me.getController('tempmodule.RoomAvailabilityBlock');
                            var cv = c.getView('tempmodule.RoomAvailabilityBlockList');

                            if (this.RoomAvailabilityBlock == false) {
                                c.init();
                                this.RoomAvailabilityBlock = true;
                            }

                            var ws = Ext.getCmp('right_regionTempmodule');

                            ws.removeAll();

                            ws.add(cv);

                            ws.doLayout();

                        } catch (e) {

                            throw new Error('[' + Ext.getDisplayName(e.callee) + ']\n' + e);
                        }
                    }

                    if (r.raw.itemId == 'boolinglist') {

                        try {

                            var c = me.getController('tempmodule.BookingList');
                            var cv = c.getView('tempmodule.BookingList');

                            if (this.BookingListControl == false) {
                                c.init();
                                this.BookingListControl = true;
                            }

                            var ws = Ext.getCmp('right_regionTempmodule');

                            ws.removeAll();

                            ws.add(cv);

                            ws.doLayout();

                        } catch (e) {

                            throw new Error('[' + Ext.getDisplayName(e.callee) + ']\n' + e);
                        }

                        return true;
                    }
                    if (r.raw.itemId == 'bookingtrackinglist') {

                        try {

                            var c = me.getController('tempmodule.BookingTrackingList');
                            var cv = c.getView('tempmodule.BookingtrackingList');

                            if (this.BookingTrackingListControl == false) {
                                c.init();

                                this.BookingTrackingListControl = true;
                            }

                            var ws = Ext.getCmp('right_regionTempmodule');


                            log('Cv is', cv);

                            ws.removeAll();

                            ws.add(cv);

                            ws.doLayout();

                        } catch (e) {

                            throw new Error('[' + Ext.getDisplayName(e.callee) + ']\n' + e);
                        }

                        return true;
                    }
                    if (r.raw.itemId == 'step2list') {

                        try {

                            var c = me.getController('tempmodule.Step2list');
                            var cv = c.getView('tempmodule.Step2list');

                            if (this.step2list == false) {
                                c.init();

                                this.step2list = true;
                            }

                            var ws = Ext.getCmp('right_regionTempmodule');


                            log('Cv is', cv);

                            ws.removeAll();

                            ws.add(cv);

                            ws.doLayout();

                        } catch (e) {

                            throw new Error('[' + Ext.getDisplayName(e.callee) + ']\n' + e);
                        }

                        return true;
                    }

                    if (r.raw.itemId == 'step3list') {

                        try {

                            var c = me.getController('tempmodule.Step3list');
                            var cv = c.getView('tempmodule.Step3list');

                            if (this.step3list == false) {
                                c.init();

                                this.step3list = true;
                            }

                            var ws = Ext.getCmp('right_regionTempmodule');


                            log('Cv is', cv);

                            ws.removeAll();

                            ws.add(cv);

                            ws.doLayout();

                        } catch (e) {

                            throw new Error('[' + Ext.getDisplayName(e.callee) + ']\n' + e);
                        }

                        return true;
                    }

                    if (r.raw.itemId == 'step4list') {
                        try {

                            var c = me.getController('tempmodule.Step4list');
                            var cv = c.getView('tempmodule.Step4list');

                            if (this.step4list == false) {
                                c.init();
                                this.step4list = true;
                            }

                            var ws = Ext.getCmp('right_regionTempmodule');

                            ws.removeAll();

                            ws.add(cv);

                            ws.doLayout();

                        } catch (e) {

                            throw new Error('[' + Ext.getDisplayName(e.callee) + ']\n' + e);
                        }

                        return true;
                    }

                    if (r.raw.itemId == 'step5list') {
                        try {

                            var c = me.getController('tempmodule.Step5list');
                            var cv = c.getView('tempmodule.Step5list');

                            if (this.step5list == false) {
                                c.init();
                                this.step5list = true;
                            }

                            var ws = Ext.getCmp('right_regionTempmodule');

                            ws.removeAll();

                            ws.add(cv);

                            ws.doLayout();

                        } catch (e) {

                            throw new Error('[' + Ext.getDisplayName(e.callee) + ']\n' + e);
                        }

                        return true;
                    }


                    if (r.raw.itemId == 'step6list') {
                        try {

                            var c = me.getController('tempmodule.Step6list');
                            var cv = c.getView('tempmodule.Step6list');

                            if (this.step6list == false) {
                                c.init();
                                this.step6list = true;
                            }

                            var ws = Ext.getCmp('right_regionTempmodule');

                            ws.removeAll();

                            ws.add(cv);

                            ws.doLayout();

                        } catch (e) {

                            throw new Error('[' + Ext.getDisplayName(e.callee) + ']\n' + e);
                        }

                        return true;
                    }

                }

            }

        });
    }
});