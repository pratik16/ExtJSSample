Ext.define('Regardz.controller.layout.Operations', {
    extend: 'Ext.app.Controller',
    views: ['layout.Operations'],
    OperationsControl: false,
    SearchBookingControl: false,
    InhouseControl: false,
    DirectSalesControl: false,
    CashRegisterControl: false,
    init: function () {
        var me = this;
        this.control({
            'treepanel[name=Operations]': {
                itemclick: function (t, r, i) {
                    try {
                        //if (r.raw.itemId == 'planboard') {
                        //    var c = me.getController('operations.Planboard');
                        //    var cv = c.getView('operations.Planboard');

                        //    if (this.OperationsControl == false) {
                        //        c.init();
                        //        this.OperationsControl = true;
                        //    }
                        //}
                        //else if (r.raw.itemId == 'searchbooking') {
                        //    var c = me.getController('bookingwizard.ManageBookingSearch');
                        //    var cv = c.getView('bookingwizard.BookingSearch');

                        //    if (this.SearchBookingControl == false) {
                        //        c.init();
                        //        this.SearchBookingControl = true;
                        //    }
                        //}

                        switch (r.raw.itemId) {
                            case 'planboard': //Planboard leaf
                                var planRights = new Object();
                                planRights.moduleName = 'OPER001';

                                if (Utils.ValidateUserAccess(planRights)) {
                                    var c = me.getController('operations.Planboard');
                                    var cv = c.getView('operations.Planboard');
                                    if (this.OperationsControl == false) {
                                        c.init();
                                        this.OperationsControl = true;
                                    }
                                }
                                else {
                                    Ext.Msg.alert('Error'.l('g'), "You dont have rights to access this module.".l('g'))
                                }

                                break;

                            case 'searchbooking': //Search booking leaf
                                var searchBookRights = new Object();
                                searchBookRights.moduleName = 'OPER002';

                                if (Utils.ValidateUserAccess(searchBookRights)) {
                                    var c = me.getController('bookingwizard.ManageBookingSearch');
                                    var cv = c.getView('bookingwizard.BookingSearch');

                                    if (this.SearchBookingControl == false) {
                                        c.init();
                                        this.SearchBookingControl = true;
                                    }
                                }
                                else {
                                    Ext.Msg.alert('Error'.l('g'), "You dont have rights to access this module.".l('g'))
                                }
                                break;

                            case 'operationInhouse': // Inhouase leaf
                                var inhousRights = new Object();
                                inhousRights.moduleName = 'OPER003';
                                if (Utils.ValidateUserAccess(inhousRights)) {
                                    var c = me.getController('operations.InhouseController');
                                    var cv = c.getView('operations.Inhouse');
                                    if (c.thisController == false) {
                                        c.init();
                                        c.thisController = true;
                                    }
                                }
                                else {
                                    Ext.Msg.alert('Error'.l('g'), "You dont have rights to access this module.".l('g'))
                                }

                                break;

                            case 'directsales': //Search booking leaf
                                var directSalesRights = new Object();
                                directSalesRights.moduleName = 'OPER004';

                                if (Utils.ValidateUserAccess(directSalesRights)) {
                                    var c = me.getController('operations.DirectSalesController');
                                    var cv = c.getView('operations.DirectSales');
                                    if (this.DirectSalesControl == false) {
                                        c.init();
                                        this.DirectSalesControl = true;
                                    }
                                }
                                else {
                                    Ext.Msg.alert('Error'.l('g'), "You dont have rights to access this module.".l('g'))
                                }
                                break;

                            case 'dayclosure': //Search booking leaf

                                var directSalesRights = new Object();
                                directSalesRights.moduleName = 'OPER006';

                                if (Utils.ValidateUserAccess(directSalesRights)) {
                                    var c = me.getController('operations.InhouseController');
                                    var cv = c.getView('operations.DayClosure');
                                    if (c.thisController == false) {
                                        c.init();
                                        c.thisController = true;
                                    }
                                }
                                else {
                                    Ext.Msg.alert('Error'.l('g'), "You dont have rights to access this module.".l('g'))
                                }

                                break;
                            case 'cashregister': //Search booking leaf
                                var cashRegisterRights = new Object();
                                cashRegisterRights.moduleName = 'OPER005';

                                if (Utils.ValidateUserAccess(cashRegisterRights)) {
                                    var c = me.getController('operations.CashRegisterController');
                                    var cv = c.getView('operations.CashRegister');

                                    if (c.thisController == false) {
                                        c.init();
                                        c.thisController = true;
                                    }
                                }
                                else {
                                    Ext.Msg.alert('Error'.l('g'), "You dont have rights to access this module.".l('g'))
                                }
                                break;

                            default:

                        }

                        var ws = Ext.getCmp('right_regionOperations');
                        ws.removeAll();
                        ws.add(cv);
                        ws.doLayout();

                    } catch (e) {
                        throw new Error('[' + Ext.getDisplayName(e.callee) + ']\n' + e);
                    }
                }
            }

        });
    }
});