Ext.define('Regardz.controller.tempmodule.RoomAvailabilityBlock', {
    extend: 'Ext.app.Controller',
    stores: ['tempmodule.RoomAvailabilityBlockStore', 'configuration.RoomsByPropertyAndTypeStore', 'configuration.RoomTypesByPropertyStore', 'configuration.FixedPricePropertyFeatureStore',
    'tempmodule.SlotStore'],
    views: ['tempmodule.RoomAvailabilityBlockList', 'tempmodule.RoomAvailabilityBlock'],

    init: function () {
        var me = this;

        this.control(
		{
		    'roomavailabilityblocklist': {
		        afterrender: function () {
		            Ext.getStore('tempmodule.RoomAvailabilityBlockStore').load();
		        },
		        cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
		            var fieldName = iView.getGridColumns()[iColIdx].name;

		            var zRec = iView.getRecord(iRowEl);

		            if (fieldName == 'RoomAvailabilityBlockDelete')
		                this.RoomAvailabilityBlockDelete(zRec);
		        }
		        //                , resize: function (grid, adjWidth, adjHeight, eOpts) {
		        //                    var headerHeight = 100;
		        //                    var rowHeight = 21;
		        //                    var contentHeight = Math.max(rowHeight + headerHeight, grid.getHeight()) - headerHeight;
		        //                    var maxRowsPerGrid = Math.floor(contentHeight / rowHeight);
		        //                    grid.getStore().reload({
		        //                        params: {
		        //                            start: 0,
		        //                            limit: maxRowsPerGrid
		        //                        }
		        //                    });
		        //                    grid.getStore().pageSize = maxRowsPerGrid;
		        //                    var bbar = grid.getDockedItems()[3];
		        //                    if (bbar.pageSize != maxRowsPerGrid) {
		        //                        bbar.pageSize = maxRowsPerGrid;
		        //                        bbar.doRefresh()
		        //                    }
		        //                }
		    },
		    'button[action="RoomAvailabilityBlock"]': {
		        click: function () {
		            Ext.create('widget.roomavailabilityblock', { RoomAvailabilityBlockId: 0 });
		            this.getSlotList(0);
		        }
		    },
		    'roomavailabilityblock combo[name="RoomTypeId"]': {
		        change: function (oldVal, newVal) {
		            Ext.getStore('configuration.RoomsByPropertyAndTypeStore').proxy.setExtraParam('roomTypeId', newVal);
		            propertyId = Ext.getCmp('roomAvailabilityBlock').getForm().findField('PropertyId').getValue();
		            Ext.getStore('configuration.RoomsByPropertyAndTypeStore').proxy.setExtraParam('propertyId', propertyId);
		            Ext.getStore('configuration.RoomsByPropertyAndTypeStore').load();
		        }
		    },
		    'roomavailabilityblock combo[name="PropertyId"]': {
		        change: function (oldVal, newVal) {
		            Ext.getStore('configuration.RoomTypesByPropertyStore').proxy.setExtraParam('propertyId', newVal);
		            Ext.getStore('configuration.RoomTypesByPropertyStore').load();
		        }
		    },
		    'button[action="saveRoomAvailabilityBlock"]': {
		        click: function () {
		            if (Ext.getCmp('roomAvailabilityBlock').getForm().isValid()) {


		                var propertyFeatureIds = Ext.getCmp('slot').getForm().getValues();
		                var selectedPropertyFeatureIds = '';

		                Ext.each(propertyFeatureIds, function (r) {
		                    if (selectedPropertyFeatureIds == '') {
		                        selectedPropertyFeatureIds = r.propertyids;
		                    }
		                    else {
		                        selectedPropertyFeatureIds += ',' + r.propertyids;
		                    }
		                });
		                if (selectedPropertyFeatureIds == undefined) { selectedPropertyFeatureIds = ''; }
		                Ext.getCmp('roomAvailabilityBlock').getForm().findField('SlotIds').setValue(selectedPropertyFeatureIds);
		                //--

		                Ext.getCmp('roomAvailabilityBlock').getForm().submit({
		                    url: webAPI_path + 'api/RoomAvailabilityBlock/AddRoomAvailabilityBlock',
		                    actionMethods: 'POST',
		                    params: Ext.getCmp('roomAvailabilityBlock').getForm().getValues(),
		                    success: function (form, response) {		                     
		                        var r = response.result;
		                        //r = Ext.decode(r);
		                        if (r.success == true) {
		                            var win = Ext.WindowManager.getActive();
		                            if (win) {
		                                win.close();
		                            }
		                            display_alert('MG00000');
		                            Ext.getStore('tempmodule.RoomAvailabilityBlockStore').reload();
		                        }
		                        else {
		                            var ResultText = r.result;
		                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
		                                ResultText = ResultText.l("SP_DynamicCode");
		                            Ext.Msg.alert('Error'.l('g'), ResultText);
		                        }
		                    },
		                    failure: function (form, response) {		                       
		                        var r = response.result;
		                        if (r.success == false) {		                         
		                            var ResultText = r.result;
		                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
		                                ResultText = ResultText.l("SP_DynamicCode");
		                            Ext.Msg.alert('Error'.l('g'), ResultText);
		                        }
		                        else {
		                            Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
		                        }
		                    }
		                });

		            }
		        }
		    }

		})
    }, RoomAvailabilityBlockDelete: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {

            if (btn === 'yes') {

                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/RoomAvailabilityBlock/RemoveRoomAvailabilityBlock',
                    type: "GET",
                    params: { id: rec.data.RoomAvailabilityBlockId },
                    success: function (response) {

                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {

                            display_alert('MG00040');
                            Ext.getStore('tempmodule.RoomAvailabilityBlockStore').loadPage(1);
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
    },

    getSlotList: function (fixedPriceId) {

        if (typeof fixedPriceId == 'undefined')
            fixedPriceId = 0;

        Ext.getStore('tempmodule.SlotStore').load({
            params: {
                'id': fixedPriceId
            },
            callback: function (records, o, success) {
                var items = [];
                Ext.each(records, function (r) {
                    if (r.data.Checked == 1)
                        checked = true;
                    else
                        checked = false;

                    items.push({ name: 'propertyids', style: 'white-space:nowrap', inputValue: r.data.TimeSlotId, padding: 5, width: 120,
                        checked: checked,
                        boxLabel: r.data.TimeSlotCode
                    })

                });

                var checkboxes = new Ext.form.CheckboxGroup({
                    padding: 5,
                    border: false,
                    columns: 2,
                    items: items
                });
                Ext.getCmp('slot').removeAll(true);
                Ext.getCmp('slot').add(checkboxes);
                Ext.getCmp('slot').doLayout();
            }
        })
    }
});