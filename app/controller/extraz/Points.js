Ext.define('Regardz.controller.extraz.Points', {
    extend: 'Ext.app.Controller',
    views: ['extraz.WebshopPoints', 'extraz.ExtrazPointsList', 'extraz.ExtrazPointsIndividualList', 'extraz.ExtrazPointsManage',
    'extraz.ExtrazPointsManage'],

    stores: ['extraz.ExtrazIndividualListStore', 'extraz.ExtrazPointsListStore'],

    refs: [{
        ref: 'WebshopPoints',
        selector: 'WebshopPoints'
    }],

    init: function () {
        var me = this;
        var varIndividualId = 0;
        this.control({
            'webshoppoints': {
                resize: function (panel, adjWidth, adjHeight, eOpts) {

                    var gridHeaderHeight = 30;

                    var newHeight = adjHeight - gridHeaderHeight;

                    var v = panel.items.items[0];
                    var v1 = panel.items.items[1];


                    if (v.viewType == 'gridview') {
                        v.setHeight(newHeight);
                    }

                    if (v1.viewType == 'gridview') {
                        v1.setHeight(newHeight);
                    }
                }
            },
            'extrazpointsindividualList': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    varIndividualId = iRecord.data.IndividualId;
                    Ext.getStore('extraz.ExtrazPointsListStore').proxy.setExtraParam('languageId', varIndividualId);
                    Ext.getStore('extraz.ExtrazPointsListStore').load();
                },
                beforerender: function () {
                    var arrySearchString = '[{"searchString1":"' + '' + '","searchString2":"' + '' + '","searchString3":"' + '' + '"}]';
                    Ext.getStore('extraz.ExtrazIndividualListStore').proxy.setExtraParam('searchString', arrySearchString);
                    Ext.getStore('extraz.ExtrazIndividualListStore').clearFilter();
                    Ext.getStore('extraz.ExtrazIndividualListStore').removeAll();
                    varIndividualId = null;
                    Ext.getStore('extraz.ExtrazPointsListStore').clearFilter();
                    Ext.getStore('extraz.ExtrazPointsListStore').proxy.setExtraParam('languageId', 0);
                    Ext.getStore('extraz.ExtrazPointsListStore').removeAll();
                }
            },
            'extrazpointslist': {
                afterrender: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    //Ext.getStore('extraz.ExtrazIndividualListStore').load();
                    //Ext.getStore('extraz.ExtrazPointsListStore').load();
                }
            },
            'extrazpointslist button[action="mangeWebshopPoints"]': {
                click: function () {
                    if (varIndividualId > 0)
                        Ext.create('widget.extrazpointsmanage', { individualId: varIndividualId }).center();
                    else
                        Ext.Msg.alert('Error'.l('g'), 'Please select individual first'.l('g'));
                }
            },
            'extrazpointsindividualList textfield[action="actionCity"]': {
                //                blur: function () {
                //                    me.ApplyFilterOnIndividual();
                //                },
                specialkey: function (f, e) {
                    if (e.getKey() == e.ENTER) {
                        me.ApplyFilterOnIndividual();
                    }
                }
            },
            'extrazpointsindividualList textfield[action="actionEmail"]': {
                //                blur: function () {
                //                    me.ApplyFilterOnIndividual();
                //                }
                specialkey: function (f, e) {
                    if (e.getKey() == e.ENTER) {
                        me.ApplyFilterOnIndividual();
                    }
                }
            },
            'extrazpointsindividualList textfield[action="actionContact"]': {
                //                blur: function () {
                //                    me.ApplyFilterOnIndividual();
                //                }
                specialkey: function (f, e) {
                    if (e.getKey() == e.ENTER) {
                        me.ApplyFilterOnIndividual();
                    }
                }
            },
            'extrazpointsmanage button[action="saveExtraazPointsInOut"]': {
                click: function () {
                    if (Ext.getCmp('addExtraazPointsInOut').getForm().isValid()) {
                        var individualId = Ext.getCmp('addExtraazPointsInOut').getForm().findField('IndividualId').getValue();
                        var urlItemType = webAPI_path + 'api/ExtrazPoints/ManageExtraazPointsInOut';
                        //                        if (webshopCategotyId == 0) {
                        //                            urlItemType = webAPI_path + 'api/ExtrazWebshop/AddWebshopCategory';
                        //                            //Ext.getCmp('addwebshopcategroy').getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                        //                            //Ext.getCmp('addwebshopcategroy').getForm().findField('CreatedBy').setValue(CurrentSessionUserId)
                        //                        } else {
                        //                            urlItemType = webAPI_path + 'api/ExtrazWebshop/UpdateWebshopCategory';
                        //                            //Ext.getCmp('addwebshopcategroy').getForm().findField('UpdatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                        //                            //Ext.getCmp('addwebshopcategroy').getForm().findField('UpdatedBy').setValue(CurrentSessionUserId)
                        //                        }
                        Ext.getCmp('addExtraazPointsInOut').getForm().findField('CreatedBy').setValue(CurrentSessionUserId)
                        Ext.getCmp('addExtraazPointsInOut').getForm().submit({
                            url: urlItemType,
                            type: 'POST',
                            params: Ext.getCmp('addExtraazPointsInOut').getForm().getValues(),
                            success: function (form, response) {
                                var r = response.result;
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                var win = Ext.WindowManager.getActive();
                                if (win) {
                                    win.close()
                                }
                                if (r.success == true) {
                                    Ext.getStore('extraz.ExtrazPointsListStore').reload();
                                    Ext.getStore('extraz.ExtrazIndividualListStore').reload();
                                } else {
                                    Ext.Msg.alert('Error'.l('g'), ResultText)
                                }
                            },
                            failure: function (form, response) {
                                var r = response.result;
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.success == false) {
                                    Ext.Msg.alert('Error'.l('g'), ResultText)
                                } else {
                                    Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'))
                                }
                            }
                        })
                    }
                }
            }
        })
    },
    ApplyFilterOnIndividual: function () {
        var varSearchString1 = Ext.getCmp('Contact').value;
        var varSearchString2 = Ext.getCmp('E-mail').value;
        var varSearchString3 = Ext.getCmp('City').value;


        //        console.log(varSearchString1);
        //        console.log(varSearchString2);
        //        console.log(varSearchString3);

        if (typeof varSearchString1 == 'undefined')
            varSearchString1 = "";
        if (typeof varSearchString2 == 'undefined')
            varSearchString2 = "";
        if (typeof varSearchString3 == 'undefined')
            varSearchString3 = "";

        var arrySearchString = '[{"searchString1":"' + varSearchString1 + '","searchString2":"' + varSearchString2 + '","searchString3":"' + varSearchString3 + '"}]';

        Ext.getStore('extraz.ExtrazIndividualListStore').proxy.setExtraParam('searchString', arrySearchString);
        Ext.getStore('extraz.ExtrazIndividualListStore').load();

        Ext.getStore('extraz.ExtrazPointsListStore').proxy.setExtraParam('languageId', 0);
        Ext.getStore('extraz.ExtrazPointsListStore').load();

    }
});