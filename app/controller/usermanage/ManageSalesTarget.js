Ext.define('Regardz.controller.usermanage.ManageSalesTarget', {
    extend: 'Ext.app.Controller',
    views: ['usermanage.SalesTargetList', 'usermanage.SalesTargetManage'],
    stores: ['usermanage.SalesTargetStore', 'usermanage.SalesTargetYearComboStore', 'usermanage.SalesTargetManageStore'],
    init: function (rec) {
        var me = this;
        this.control({
            'salestargetlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    //me.roomData = zRec;
                    if (fieldName == 'editSalesTarget')
                        this.editSalesTarget(zRec);
                },
                afterrender: function (t, eOpt) {
                    var scope = this;
                    Ext.getStore('usermanage.SalesTargetStore').proxy.setExtraParam('id', null);
                    Ext.getStore('usermanage.SalesTargetStore').proxy.setExtraParam('languageId', user_language);
                    Ext.getStore('usermanage.SalesTargetStore').proxy.setExtraParam('searchParam', null);
                    Ext.getStore('usermanage.SalesTargetStore').load({});
                    //Ext.getStore('usermanage.SalesTargetStore').load({});
                    var year = Ext.ComponentQuery.query('combo[itemid=year]')[0];
                    year.getStore().load({
                        callback: function (records, o, success) {
                            year.getStore().insert(0, { "Year": "All".l('SC32300') }, true);

                            // year.setValue(parseInt(Ext.Date.format(new Date(), 'Y')));
                            //Ext.getStore('usermanage.SalesTargetStore').proxy.setExtraParam('id', year.getValue());
                            //Ext.getStore('usermanage.SalesTargetStore').proxy.setExtraParam('languageId', user_language);

                            //Ext.getStore('usermanage.SalesTargetStore').load({});

                        }
                    });
                }
            },
            'salestargetlist combo[itemid=year]': {
                select: function (t, n, o, eOpts) {
                    Ext.getStore('usermanage.SalesTargetStore').proxy.setExtraParam('id', n);
                    Ext.getStore('usermanage.SalesTargetStore').proxy.setExtraParam('languageId', user_language);
                    Ext.getStore('usermanage.SalesTargetStore').proxy.setExtraParam('searchParam', null);
                    Ext.getStore('usermanage.SalesTargetStore').load({});
                }
            },
            'salestargetmanage button[action="addSalesTarget"]': {
                click: function () {
                    var r = Ext.create('Regardz.model.usermanage.SalesTargetManage', {
                        Year: 'Enter Year'.l('SC32310'),
                        NewBusiness: 0,
                        Deepening: 0,
                        SalesTargetId: 0,
                        UserId: Ext.getCmp('salestargetmanage').getForm().findField('userid').getValue(),
                        CreatedBy: CurrentSessionUserId,
                        CreatedDate: Ext.Date.format(new Date(), 'Y-m-d H:i:s')
                    });

                    editor = Ext.ComponentQuery.query('grid[itemid=salestargetmanagelist]')[0].editingPlugin;
                    editor.cancelEdit();
                    Ext.ComponentQuery.query('grid[itemid=salestargetmanagelist]')[0].getStore().insert(0, r);
                    editor.startEdit(0, 0);
                }
            },

            'salestargetmanage grid[itemid=salestargetmanagelist]': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    //me.roomData = zRec;
                    if (fieldName == 'SalesTargetDelete')
                        this.deleteSalesTarget(zRec);
                },
                edit: function (editor, e) {
                    e.newValues.SalesTargetId = e.originalValues.SalesTargetId;

                    if (e.newValues.SalesTargetId > 0) {
                        e.newValues.UpdatedDate = Ext.Date.format(new Date(), 'Y-m-d H:i:s');
                        e.newValues.UpdatedBy = CurrentSessionUserId;
                    }

                    Ext.Ajax.request({
                        url: webAPI_path + 'api/User/ManageSalesTarget',
                        type: 'POST',
                        params: e.newValues, //obj.originalValues
                        success: function (response) {
                            var r = Ext.decode(response.responseText);
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {
                                Ext.getStore('usermanage.SalesTargetManageStore').reload();
                                var year = Ext.ComponentQuery.query('combo[itemid=year]')[0];
                                year.getStore().reload();
                                Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                            }
                            else {
                                Ext.getStore('usermanage.SalesTargetManageStore').reload();
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                        },
                        failure: function () {
                            Ext.getStore('usermanage.SalesTargetManageStore').reload();
                            Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
                        }
                    });
                },
                canceledit: function () {
                    Ext.getStore('usermanage.SalesTargetManageStore').reload();
                }
            },

            'salestargetmanage': {
                afterrender: function (t, eOpt) {
                    //alert(Ext.Date.format(new Date(), 'Y'));
                    var UserId = Ext.getCmp('salestargetmanage').getForm().findField('userid').getValue();
                    Ext.getStore('usermanage.SalesTargetManageStore').proxy.setExtraParam('id', UserId);
                    Ext.getStore('usermanage.SalesTargetManageStore').load({});
                },
                resize: function (window, adjWidth, adjHeight, eOpts) {

                    var grid = Ext.ComponentQuery.query('salestargetmanage grid[itemid=salestargetmanagelist]')[0];
                    //console.log(grid);
                    var newHeight = adjHeight - gridHeaderHeight;

                    grid.setHeight(newHeight);
                    //resizeWindow(v, newHeight);
                }
            }
        });
    },
    editSalesTarget: function (rec) {
        if (rec == null) {
            salestarget = Ext.create('widget.salestargetmanage').show();
        }
        else {
            salestarget = Ext.create('widget.salestargetmanage', { UserId: rec.data.UserId }).show();
            //roomedit.settitle('update room_title'.l('sc33100'));
        }

    },
    deleteSalesTarget: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/User/RemoveSalesTarget',
                    type: "GET",
                    params: { id: rec.data.SalesTargetId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
                        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                            ResultText = ResultText.l("SP_DynamicCode");
                        if (r.success == true) {
                            //display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Room deleted successfully.');
                            Ext.getStore('usermanage.SalesTargetManageStore').loadPage(1);
                            var year = Ext.ComponentQuery.query('combo[itemid=year]')[0];
                            year.getStore().reload();
                        }
                        else {
                            Ext.Msg.alert('Error'.l('g'), ResultText);
                        }
                    },
                    failure: function () { }
                })
            }
        })
    }
});