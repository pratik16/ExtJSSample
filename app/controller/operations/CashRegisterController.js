Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.ux.grid.Printer'
]);

Ext.define('Regardz.controller.operations.CashRegisterController', {
    extend: 'Ext.app.Controller',
    views: ['operations.CashRegister', 'operations.windows.cashregister.CashRegisterList'],
    stores: ['operations.OperationCashRegisterItemsStore', 'property.PropertyListByUserIdStore', 'property.CashRegisterStore', 'operations.OperationCashRegisterItemsTotalStore'],
    thisController: false,
    init: function () {
        var me = this;
        me.isClosedStatus = false;

        this.control(
        {
            'cashregister': {
                afterrender: function () {
                    this.BindControls(false, false);
                }
            },
            'combo[action="CashRegisterChange"]': {
                select: function (combo, records, Opts) {
                    var date = Ext.ComponentQuery.query('[itemid="cashRegisterDate"]')[0].value;
                    var propertyId = Ext.ComponentQuery.query('[itemid="referenceCombo"]')[0].value;
                    this.cashRegisterDetail(combo.getValue(), propertyId, date, me.isClosedStatus);
                    //                    Ext.getStore('operations.OperationCashRegisterItemsStore').load({
                    //                        params: { 'cashRegisterId': combo.getValue(), 'propertyId': propertyId, isClosed: me.isClosedStatus, isTotal: false, date: date == null ? null : date, 'languageId': user_language }
                    //                    });
                    //                    Ext.getStore('operations.OperationCashRegisterItemsTotalStore').load({
                    //                        params: { 'cashRegisterId': combo.getValue(), 'propertyId': propertyId, isClosed: me.isClosedStatus, isTotal: true, date: date == null ? null : date, 'languageId': user_language }
                    //                    });
                }
            },
            'combo[action="PropertyChange"]': {
                select: function (combo, records, Opts) {
                    var c = Ext.ComponentQuery.query('[itemid="CashRegisterCombo"]')[0];
                    c.getStore().proxy.setExtraParam('id', combo.getValue());
                    c.getStore().proxy.setExtraParam('limit', 500);
                    c.getStore().load({
                        callback: function () {
                            c.setValue(null);
                            Ext.getStore('operations.OperationCashRegisterItemsStore').loadData([], false);
                            Ext.getStore('operations.OperationCashRegisterItemsTotalStore').load({
                                params: { 'cashRegisterId': 0, 'propertyId': 0, isClosed: false, isTotal: true, date: null, 'languageId': user_language }
                            });
                        }
                    });

                    //Ext.getStore('property.CashRegisterStore').load({});
                    //////////////////////////////////////////////////
                    //Ext.ComponentQuery.query('[itemid="CashRegisterCombo"]')[0].setValue('');

                    //                    var date = Ext.ComponentQuery.query('[itemid="cashRegisterDate"]')[0].value;

                    //                    Ext.getStore('operations.OperationCashRegisterItemsStore').load({
                    //                        params: { 'cashRegisterId': -1, 'propertyId': combo.getValue(), isClosed: me.isClosedStatus, isTotal: false, date: date == null ? null : date, 'languageId': user_language }
                    //                    });
                    //                    Ext.getStore('operations.OperationCashRegisterItemsTotalStore').load({
                    //                        params: { 'cashRegisterId': -1, 'propertyId': combo.getValue(), isClosed: me.isClosedStatus, isTotal: true, date: date == null ? null : date, 'languageId': user_language }
                    //                    });
                }
            },
            'radiogroup [action="statusChange"]': {
                change: function (a, newValue, oldValue, eOpts) {
                    var date = Ext.ComponentQuery.query('[itemid="cashRegisterDate"]')[0].value;
                    var propertyId = Ext.ComponentQuery.query('[itemid="referenceCombo"]')[0].value;
                    var cashRegisterId = Ext.ComponentQuery.query('[itemid="CashRegisterCombo"]')[0].value;
                    me.isClosedStatus = !newValue;

                    if (me.isClosedStatus)
                        Ext.ComponentQuery.query('[itemid="closeDirectSales"]')[0].disable();
                    else
                        Ext.ComponentQuery.query('[itemid="closeDirectSales"]')[0].enable();
                    this.cashRegisterDetail(cashRegisterId, propertyId, date, me.isClosedStatus);
                    //                    Ext.getStore('operations.OperationCashRegisterItemsStore').load({
                    //                        params: { 'cashRegisterId': cashRegisterId == null ? -1 : cashRegisterId, 'propertyId': propertyId == null ? -1 : propertyId, isClosed: me.isClosedStatus, isTotal: false, date: date == null ? null : date, 'languageId': user_language }
                    //                    });
                    //                    Ext.getStore('operations.OperationCashRegisterItemsTotalStore').load({
                    //                        params: { 'cashRegisterId': cashRegisterId == null ? -1 : cashRegisterId, 'propertyId': propertyId == null ? -1 : propertyId, isClosed: me.isClosedStatus, isTotal: true, date: date == null ? null : date, 'languageId': user_language }
                    //                    });
                }
            },
            'datefield[action="cashRegisterDateChange"]': {
                change: function (a, newValue, oldValue, eOpts) {
                    var date = newValue;
                    var propertyId = Ext.ComponentQuery.query('[itemid="referenceCombo"]')[0].value;
                    var cashRegisterId = Ext.ComponentQuery.query('[itemid="CashRegisterCombo"]')[0].value;
                    this.cashRegisterDetail(cashRegisterId, propertyId, date, me.isClosedStatus);
                    //                    Ext.getStore('operations.OperationCashRegisterItemsStore').load({
                    //                        params: { 'cashRegisterId': cashRegisterId == null ? -1 : cashRegisterId, 'propertyId': propertyId == null ? -1 : propertyId, isClosed: me.isClosedStatus, isTotal: false, date: date == null ? null : date, 'languageId': user_language }
                    //                    });
                    //                    Ext.getStore('operations.OperationCashRegisterItemsTotalStore').load({
                    //                        params: { 'cashRegisterId': cashRegisterId == null ? -1 : cashRegisterId, 'propertyId': propertyId == null ? -1 : propertyId, isClosed: me.isClosedStatus, isTotal: true, date: date == null ? null : date, 'languageId': user_language }
                    //                    });
                }
            },
            'button[action="PrintDirectSales"]': {
                click: function (t, e, o) {
                    var grid = Ext.ComponentQuery.query('[itemid="cashregisteritemlist"]')[0];
                    Ext.ux.grid.Printer.printAutomatically = false;
                    Ext.ux.grid.Printer.print(grid);
                }
            },
            'button[action="CloseDirectSales"]': {
                click: function (t, e, o) {
                    var salesObj = new Object();
                    salesObj.CreatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
                    salesObj.CreatedBy = CurrentSessionUserId;
                    //get selected items - comma seperated
                    var ids = ''; var summaryRecord = null;
                    var obj = Ext.ComponentQuery.query('[itemid="cashregisteritemlist"]')[0];
                    var store = obj.getStore();

                    if (store != null && store.data.items.length > 0) {
                        for (var i = 0; i < store.data.items.length; i++) {
                            summaryRecord = store.getAt(i);
                            ids += summaryRecord.data.OperationDirectSalesId + ",";
                        }
                    }
                    salesObj.OperationDirectSalesIds = ids;

                    if (ids == '') {
                        Ext.Msg.alert('Error'.l('g'), 'Please select any item'.l('SC75000'));
                        return;
                    }
                    //check total grid items - whether prices are equal or not
                    var obj = Ext.ComponentQuery.query('[itemid="totalGrid"]')[0];
                    var store = obj.getStore();

                    if (store != null && store.data.items.length > 0) {
                        for (var i = 0; i < store.data.items.length; i++) {
                            if ((i + 1) != store.data.items.length) {
                                summaryRecord = store.getAt(i);
                                if (parseFloat(summaryRecord.data.EnteredPrice.replace(",", ".")) != summaryRecord.data.TotalPrice) {
                                    Ext.Msg.alert('Error'.l('g'), "Entered prices does not match with original".l('SC75000'));
                                    return;
                                }
                            }
                        }
                    }
                    //////////////////////////////////////////////
                    Ext.Ajax.request({
                        url: webAPI_path + 'api/OperationDirectSales/CloseDirectSalesItems',
                        type: 'POST',
                        params: salesObj,
                        success: function (response) {
                            var r = Ext.decode(response.responseText);
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {
                                me.BindControls(me.isClosedStatus, true);
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                        },
                        failure: function (form, response) {
                            r = response.result;
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == false) {
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                            }
                        }
                    });
                }
            }
            //////////////////
        })
    },
    cashRegisterDetail: function (cashRegisterId, propertyId, date, isClosedStatus) {
        if (cashRegisterId != null && propertyId != null && date != null && cashRegisterId > 0 && propertyId > 0) {
            Ext.getStore('operations.OperationCashRegisterItemsStore').load({
                params: { 'cashRegisterId': cashRegisterId, 'propertyId': propertyId, isClosed: isClosedStatus, isTotal: false, date: date, 'languageId': user_language }
            });
            Ext.getStore('operations.OperationCashRegisterItemsTotalStore').load({
                params: { 'cashRegisterId': cashRegisterId, 'propertyId': propertyId, isClosed: isClosedStatus, isTotal: true, date: date, 'languageId': user_language }
            });
        }
    },
    BindControls: function (isClosedStatus, reload) {
        if (reload) {
            Ext.ComponentQuery.query('[itemid="referenceCombo"]')[0].setValue(0);

            Ext.getStore('property.CashRegisterStore').proxy.setExtraParam('id', -1);
            Ext.getStore('property.CashRegisterStore').proxy.setExtraParam('limit', 500);
            Ext.getStore('property.CashRegisterStore').load();

            Ext.ComponentQuery.query('[itemid="cashRegisterDate"]')[0].setValue(new Date());
            return;
        }

        var referenceCombo = Ext.ComponentQuery.query('[itemid="referenceCombo"]')[0];
        var propertyStore = Ext.getStore('property.PropertyListByUserIdStore');
        var date = Ext.ComponentQuery.query('[itemid="cashRegisterDate"]')[0].value;

        propertyStore.on('load', function (store) {
            var propertyId = store.getAt(0).get('PropertyId');
        });

        propertyStore.load({ params: { 'userId': CurrentSessionUserId, 'languageId': user_language, 'activityCode': 'OPER005'} });
        //Bind item grid
        Ext.getStore('operations.OperationCashRegisterItemsStore').load({
            params: { 'cashRegisterId': -2, 'propertyId': -2, isClosed: isClosedStatus, isTotal: false, date: null, 'languageId': user_language }
        });
        //Bind total grid
        Ext.getStore('operations.OperationCashRegisterItemsTotalStore').load({
            params: { 'cashRegisterId': -2, 'propertyId': -2, isClosed: isClosedStatus, isTotal: true, date: null, 'languageId': user_language }
        });
    }
});