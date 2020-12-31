Ext.define('Regardz.controller.property.ManageRoomsType', {
    extend: 'Ext.app.Controller',
    views: ['property.PropertyRoomTypeList', 'property.PropertyRoomTypePrice'],
    stores: ['property.PropertyRoomTypeListStore'],
	thisController: false,
    init: function () {
        var me = this;
        this.control({
			 'propertyroomtypelist': {
                afterrender: function () {
					var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();
					Ext.getStore('property.PropertyRoomTypeListStore').proxy.setExtraParam('id', PropertyId);
					Ext.getStore('property.PropertyRoomTypeListStore').proxy.setExtraParam('searchParam', '');
				//	Ext.getStore('property.PropertyRoomTypeListStore').loadPage(1); // loaded from resize event
				},
				
				cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'ApproveReject')
                        this.ApproveReject(zRec);
					else if (fieldName == 'AddItemExemption')
						this.AddItemExemption(zRec);
                }
			},
			
			'propertyroomtypeprice': {
                afterrender: function () {
                    var RoomTypeId = Ext.getCmp('addRoomTypePrice').getForm().findField('RoomTypeId').getValue();
                    var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue(); 
					 
					 Ext.getCmp('addRoomTypePrice').getForm().load({
						method: 'GET',
						url: webAPI_path + 'api/ConfigRoomType/GetRoomTypePrice',
						params: {
						    id: RoomTypeId, id1: PropertyId
						},
						success: function (response) {
						    Ext.getCmp('addRoomTypePrice').getForm().findField('PropertyId').setValue(PropertyId);
						    Ext.getCmp('addRoomTypePrice').getForm().findField('RoomTypeId').setValue(RoomTypeId);
						},
						failure: function (err) {

						  //  Ext.Msg.alert('Error'.l('g'), 'Information loading error'.l('g'));
						}
					})
				}
			},
			
			'propertyroomtypeprice button[action="saveRoomTypePrice"]': {
				click: function () {
				
					if (Ext.getCmp('addRoomTypePrice').getForm().isValid()) {

						//Ext.getCmp('addRoomTypePrice').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
					//	Ext.getCmp('addRoomTypePrice').getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
						
						//Ext.getCmp('addRoomTypePrice').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
						
						Ext.getCmp('addRoomTypePrice').getForm().submit({
							url: webAPI_path + 'api/ConfigRoomType/ManageRoomTypePrice',
							method: 'POST',
							success: function (form, response) {
								var r = response.response.responseText;
								var r = Ext.decode(r);
								var ResultText = r.result;
								if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
								    ResultText = ResultText.l("SP_DynamicCode");
								/*Commented as response text not came from API*/
								if (r.success == true) {
								    var win = Ext.WindowManager.getActive();
								    if (win) {
								        win.close();
								    }
//								    Ext.data.JsonP.request({
//								        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
//								        success: function () {
//								            display_alert('MG00000'); 
//								        }
//								    });
								   
								}
								else {
								    Ext.Msg.alert('Error'.l('g'), ResultText);
								}
							},
							failure: function (form, response) {
								var r = response.response.responseText;
								var r = jsonDecode(r);
								var ResultText = r.result;
								if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
								    ResultText = ResultText.l("SP_DynamicCode");
								Ext.Msg.alert('Error'.l('g'), ResultText); // 'Information not saved.');
							}
						})
					}
				}
			}
		});
    },
	
	AddItemExemption: function (rec) {
        var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();        
        if (rec.data.Checked == true) {
            Ext.create('widget.propertyroomtypeprice', { RoomTypeId: rec.data.RoomTypeId, PropertyId: PropertyId });
		}
    },
	
	ApproveReject: function (rec) {
        var PropertyId = Ext.getCmp('propertyBasicInfoEdit').getForm().findField('PropertyId').getValue();     
        Ext.MessageBox.confirm('Change'.l('g'), 'Are you sure ?'.l('g'), function (btn) {
            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/ConfigRoomType/AddRoomTypePropertyAssociation',
                    type: "GET",
                    params: { id: PropertyId, id1: rec.data.RoomTypeId },
                    success: function (r) {
                        // var r = jsonDecode(response);
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            display_alert('MG00000');// Ext.Msg.alert('Success', 'Information updated successfully.');
                            Ext.getStore('property.PropertyRoomTypeListStore').reload()
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