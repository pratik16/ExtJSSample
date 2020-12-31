Ext.define('Regardz.controller.property.CashRegister', {
    extend: 'Ext.app.Controller',
    views: ['property.CashRegisterList'],
    stores: ['property.CashRegisterStore'],
    thisController: false,
    refs: [{
         ref: 'cashregisterlist',
         selector: 'cashregisterlist'
    }],
    init: function () {
        var me = this;
       // var propertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();

        this.control({
            'cashregisterlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'deleteCashRegister')
                        this.deleteCashRegister(zRec);
                },
                afterrender: function () {
                    var propertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
                    Ext.getStore('property.CashRegisterStore').proxy.setExtraParam('id', propertyId);
                    Ext.getStore('property.CashRegisterStore').load();
                },
                edit: function (editor, e) {
                    var propertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
                    e.newValues.CreatedBy = CurrentSessionUserId;
                    e.newValues.UpdatedBy = CurrentSessionUserId;
                    e.newValues.PropertyId = propertyId;

                    Ext.Ajax.request({
                        url: webAPI_path + 'api/CashRegister/ManageCashRegister',
                        type: 'POST',
                        params: e.newValues,
                        success: function (response) {
                            var r = Ext.decode(response.responseText);
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            Ext.getStore('property.CashRegisterStore').reload();

                            if (r.success == false) {
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                        },
                        failure: function () {
                            Ext.getStore('property.CashRegisterStore').reload();
                            Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                        }
                    });
                },
                canceledit: function () {
                    Ext.getStore('property.CashRegisterStore').reload();
                }
            },
            'cashregisterlist button[action="addCashRegister"]': {
                click: function () {
                    var propertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
                    var r = Ext.create('Regardz.model.property.CashRegister', {
                        CashRegisterId: 0,
                        CashRegisterName: '',
                        PropertyId: propertyId
                    });

                    editor = Ext.getCmp('cashregisterlist').editingPlugin;
                    editor.cancelEdit();
                    Ext.getCmp('cashregisterlist').getStore().insert(0, r);
                    editor.startEdit(0, 0);
                }
            }
        });
    },
    deleteCashRegister: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/CashRegister/RemoveCashRegister',
                    type: "GET",
                    params: { id: rec.data.CashRegisterId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            var grid = me.getCashregisterlist();
                            var store = Ext.getStore('property.CashRegisterStore');
                            Utils.RefreshGridonDelete(grid, store);
                           // Ext.getStore('property.CashRegisterStore').reload();
                        }
                        else {
                            Ext.Msg.alert('Error'.l('g'), ResultText);
                        }
                    },
                    failure: function () {
                        Ext.Msg.alert('Error'.l('g'), 'Record not deleted.'.l('g'));
                    }
                });
            }
        });
    }
});