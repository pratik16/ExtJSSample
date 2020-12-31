Ext.define('Regardz.controller.property.OutletGlobal', {
    extend: 'Ext.app.Controller',
    views: ['property.OutletGlobalList'],
    stores: ['property.OutletGlobalListStore'],

    init: function () {
        var me = this;


        this.control(
        {
            'outletgloballist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'ApproveReject')
                        this.ApproveReject(zRec);
                }
            }
        })

    },
    ApproveReject: function (rec) {
        var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();        
        Ext.MessageBox.confirm('Change'.l('g'), 'Are you sure ?'.l('g'), function (btn) {
            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/ConfigOutlet/AddOutletPropertyAssociation',
                    type: "GET",
                    params: { id: PropertyId, id1: rec.data.OutletId },
                    success: function (r) {
                        // var r = jsonDecode(response);
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            //display_alert('MG00000');//Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                            Ext.getStore('property.OutletGlobalListStore').reload()
                        }
                        else {
                            Ext.Msg.alert('Error'.l('g'), ResultText);
                        }
                    },
                    failure: function () {
                        Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                    }
                })
            }
        })
    }
});