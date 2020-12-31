Ext.define('Regardz.controller.configuration.AutomatedTrace', {
    extend: 'Ext.app.Controller',
    views: ['configuration.AutomatedTraceList', 'configuration.AutomatedTraceManage', 'configuration.AutomatedTraceLang', 'configuration.ItemwithGroupList'],
    stores: ['common.PropertyForNamesStore', 'configuration.PropertywiseSubDepartmentStore', 'configuration.AutomatedTraceListStore', 'common.LanguageListStore',
    'configuration.ItemswithGroupStore', 'configuration.ItemCategoryStore'],
    thisController: false,
    refs: [{
        ref: 'TraceProeprty',
        selector: '[itemid=TraceProeprty]'
    }, {
        ref: 'automatedTracemanage',
        selector: 'automatedTracemanage'
    }, {
        ref: 'itemwithgrouplist',
        selector: 'itemwithgrouplist'
    }],
    init: function () {
        var me = this;
        this.control({
            'automatedtracelist': {
                afterrender: function (t, e, eo) {//t => this, e => event, eo => Eoptional                      
                    var AutomatedTraceList = Ext.ComponentQuery.query('grid[itemid="automatedTracegrid"]')[0];
                    AutomatedTraceList.getStore().proxy.setExtraParam('searchParam', null);
                    // AutomatedTraceList.getStore().load();
                },
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    //var fieldName = iView.getGridColumns()[iColIdx].dataIndex;
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'TraceDelete')
                        me.deleteTrace(zRec.data);
                    else if (fieldName == 'TraceEdit')
                        me.editTrace(zRec.data);
                }
            },
            'automatedtracelist button[action=addTrace]': {
                click: function () {
                    Ext.create('widget.automatedTracemanage');
                }
            },
            'automatedTracemanage': {
                beforerender: function (t, e, eo) {
                    Ext.getStore('common.PropertyForNamesStore').proxy.setExtraParam('activityCode', 'CONF005');                    
                },
                afterrender: function (t, e, eo) {//t => this, e => event, eo => Eoptional                    

                    //Ext.getStore('common.PropertyForNamesStore').proxy.setExtraParam('id', user_language);
                    //Ext.getStore('common.PropertyForNamesStore').load({});

                    var form = Ext.ComponentQuery.query('automatedTracemanage [itemid=automatedTraceform]')[0];
                    var AutomatedTraceId = form.getForm().findField('AutomatedTraceId').getValue();

                    if (AutomatedTraceId > 0) {
                        form.getForm().load({
                            method: 'GET',
                            url: webAPI_path + 'api/AutomatedTrace/GetAutomatedTracebyId',
                            params: {
                                id: AutomatedTraceId,
                                languageId: user_language
                            },
                            success: function (form, action) {
                                var form = Ext.ComponentQuery.query('automatedTracemanage [itemid=automatedTraceform]')[0];
                                var resp = Ext.decode(action.response.responseText);

                                var propertyGrid = Ext.ComponentQuery.query('automatedTracemanage grid[itemid="TraceProeprty"]')[0];
                                var propertyData = propertyGrid.getStore().getRange();
                                var propIds = '';
                                if (propertyData != null && propertyData.length > 0) {
                                    var propertyIds = resp.data.PropertyId.split(',');
                                    for (var i = 0; i < propertyData.length; i++) {
                                        for (var j = 0; j < propertyIds.length; j++) {
                                            if (propertyData[i].data.PropertyId == parseInt(propertyIds[j])) {
                                                propertyData[i].set('checked', true);
                                                propIds += propertyData[i].data.PropertyId + ",";
                                            }
                                        }
                                    }
                                }
                                propIds = propIds.replace(/\,$/, '');

                                var TraceDepartmentGrid = Ext.ComponentQuery.query('automatedTracemanage grid[itemid="TraceDepartment"]')[0];
                                TraceDepartmentGrid.getStore().proxy.setExtraParam('id', resp.data.PropertyId);
                                TraceDepartmentGrid.getStore().proxy.setExtraParam('languageId', user_language);
                                TraceDepartmentGrid.getStore().load({
                                    callback: function () {
                                        var s = TraceDepartmentGrid.getStore();
                                        var subDeptIds = resp.data.PropertyIdSubDepartmentId.split(',');

                                        for (var i = 0; i < subDeptIds.length; i++) {
                                            var index = s.findExact('PropertyIdSubDepartmentId', subDeptIds[i]);
                                            var selected = s.getAt(index);
                                            selected.set('checked', true);
                                        }
                                    }
                                });
                            }
                        });
                    }
                    else {
                        Ext.getStore('configuration.PropertywiseSubDepartmentStore').clearFilter();
                        var subDeptGrid = Ext.ComponentQuery.query('automatedTracemanage grid[itemid=TraceDepartment]')[0];
                        subDeptGrid.getStore().removeAll();
                    }
                }
            },
            'automatedTracemanage button[action="searchItem"]': {
                click: function () {
                    Ext.create('widget.itemwithgrouplist').center();
                }
            },
            'itemwithgrouplist': {
                afterrender: function (t, e, eo) {
                    var ItemList = Ext.ComponentQuery.query('itemwithgrouplist grid[itemid="itemwithgroupgrid"]')[0];
                    ItemList.getStore().proxy.setExtraParam('searchParam', 0);
                    //ItemList.getStore().load();
                }
            },
            'itemwithgrouplist combo[itemid=itemcategorycombo]': {
                select: function (combo, records, eOpt) {
                    var ItemCategoryId = records[0].data.ItemCategoryId;

                    var ItemList = Ext.ComponentQuery.query('itemwithgrouplist grid[itemid="itemwithgroupgrid"]')[0];
                    ItemList.getStore().proxy.setExtraParam('searchParam', ItemCategoryId);
                    ItemList.getStore().load();
                }
            },
            'itemwithgrouplist grid[itemid="itemwithgroupgrid"]': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    //var fieldName = iView.getGridColumns()[iColIdx].dataIndex;
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'selectItem')
                        me.selectItemwithGroup(zRec.data);
                }
            },
            'automatedTracemanage grid[itemid="TraceProeprty"]  [xtype="checkboxrow"]': {
                checkchange: function (t, rowIndex, eo) {//t => this, e => event, eo => Eoptional

                    var propertyGrid = Ext.ComponentQuery.query('automatedTracemanage grid[itemid="TraceProeprty"]')[0];
                    var propertyData = me.getTraceProeprty().store.data;

                    var propIds = '';
                    if (propertyData != null && propertyData.length > 0) {
                        for (var i = 0; i < propertyData.length; i++) {
                            if (propertyData.items[i].data.checked)
                                propIds += propertyData.items[i].data.PropertyId + ",";
                        }
                    }

                    propIds = propIds.replace(/\,$/, '');
                    ////////////////////////
                    var propertyIdSubDepartmentIds = '';
                    var deptGrid = Ext.ComponentQuery.query('automatedTracemanage grid[itemid="TraceDepartment"]')[0];
                    var deptData = deptGrid.getStore().getRange();

                    if (deptData != null && deptData.length > 0) {
                        for (var i = 0; i < deptData.length; i++) {
                            if (deptData[i].data.checked)
                                propertyIdSubDepartmentIds += deptData[i].data.PropertyIdSubDepartmentId + ',';
                        }
                    }
                    propertyIdSubDepartmentIds = propertyIdSubDepartmentIds.replace(/\,$/, '');
                    ////////////////////////
                    if (propIds == '') {
                        Ext.getStore('configuration.PropertywiseSubDepartmentStore').clearFilter();
                        var subDeptGrid = Ext.ComponentQuery.query('automatedTracemanage grid[itemid=TraceDepartment]')[0];
                        subDeptGrid.getStore().removeAll();
                    }
                    else {
                        var TraceDepartmentGrid = Ext.ComponentQuery.query('automatedTracemanage grid[itemid="TraceDepartment"]')[0];
                        TraceDepartmentGrid.getStore().proxy.setExtraParam('id', propIds);
                        TraceDepartmentGrid.getStore().proxy.setExtraParam('languageId', user_language);
                        TraceDepartmentGrid.getStore().load({
                            callback: function () {
                                var s = TraceDepartmentGrid.getStore();
                                var subDeptIds = propertyIdSubDepartmentIds.split(',');

                                for (var i = 0; i < subDeptIds.length; i++) {
                                    var index = s.findExact('PropertyIdSubDepartmentId', subDeptIds[i]);
                                    var selected = s.getAt(index);
                                    if (selected)
                                        selected.set('checked', true);
                                }
                            }
                        });
                    }
                }
            },
            'automatedTracemanage grid[itemid="TraceDepartment"]  [xtype="radiorow"]': {
                checkchange: function (t, rowIndex, eo) {//t => this, e => event, eo => Eoptional  

                    var deptGrid = Ext.ComponentQuery.query('automatedTracemanage grid[itemid="TraceDepartment"]')[0];

                    var deptData = deptGrid.getStore().getRange();
                    if (deptData != null && deptData.length > 0) {
                        for (var i = 0; i < deptData.length; i++) {
                            if (deptData[i].data.PropertyId == deptData[rowIndex].data.PropertyId)
                                deptData[i].set('checked', false);
                        }
                    }
                    deptData[rowIndex].set('checked', true);

                    var propSubDept = '';
                    if (deptData != null && deptData.length > 0) {
                        for (var i = 0; i < deptData.length; i++) {
                            if (deptData[i].data.checked)
                                propSubDept = propSubDept + deptData[i].data.PropertyId + ':' + deptData[i].data.SubDepartmentId + ',';
                        }
                    }
                    propSubDept = propSubDept.replace(/\,$/, '');
                    Ext.ComponentQuery.query('automatedTracemanage hidden[itemid="PropSubDeptIds"]')[0].setValue(propSubDept);
                }
            },
            'automatedTracemanage textfield[itemid=searchProperty]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        var r = Ext.getCmp('searchProperty').getValue();

                        Ext.getStore('common.PropertyForNamesStore').clearFilter();
                        var regex = new RegExp(".*" + r + ".*", "i");
                        Ext.getStore('common.PropertyForNamesStore').filter("PropertyName", regex, true, true);

                        if (r.length > 0) {
                            var clearIcon = Ext.ComponentQuery.query('[action="clearProperties"]')[0];
                            clearIcon.show();
                        }
                    }
                }
            },
            'automatedTracemanage button[action=searchProperties]': {
                click: function () {
                    var r = Ext.getCmp('searchProperty').getValue();

                    Ext.getStore('common.PropertyForNamesStore').clearFilter();
                    var regex = new RegExp(".*" + r + ".*", "i");
                    Ext.getStore('common.PropertyForNamesStore').filter("PropertyName", regex, true, true);

                    if (r.length > 0) {
                        var clearIcon = Ext.ComponentQuery.query('[action="clearProperties"]')[0];
                        clearIcon.show();
                    }
                }
            },
            'automatedTracemanage button[action="clearProperties"]': {
                click: function () {

                    Ext.getCmp('searchProperty').setValue('');
                    Ext.getStore('common.PropertyForNamesStore').clearFilter();
                    var clearIcon = Ext.ComponentQuery.query('[action="clearProperties"]')[0];
                    clearIcon.hide();
                }
            },
            'automatedTracemanage radiogroup[itemid="triggerlist"]': {
                change: function (t, n, o, eo) {
                    var lblItem = Ext.ComponentQuery.query('automatedTracemanage displayfield[itemid="itemName"]')[0];
                    var btnItem = Ext.ComponentQuery.query('automatedTracemanage button[itemid="searchItem"]')[0];
                    if (n.TriggerAction != 3) {
                        lblItem.disable();
                        btnItem.disable();
                        //                        lblItem.setValue(null);
                    } else {
                        lblItem.enable();
                        btnItem.enable();
                    }
                }
            },
            'automatedTracemanage button[action=traceSave]': {
                click: function (t, e, eo) {
                    var form = Ext.ComponentQuery.query('automatedTracemanage [itemid="automatedTraceform"]')[0];
                    form.getForm().findField('CreatedDate').setValue(Ext.Date.format(new Date(), 'Y-m-d H:i:s'));
                    form.getForm().findField('CreatedBy').setValue(CurrentSessionUserId);
                    form.getForm().findField('LanguageId').setValue(user_language);

                    var propSubDept = ''; //form.getForm().findField('PropSubDeptIds').getValue();
                    var subdeptProperty = new Array();

                    //if (propSubDept == '') {
                    var deptGrid = Ext.ComponentQuery.query('automatedTracemanage grid[itemid="TraceDepartment"]')[0];
                    var deptData = deptGrid.getStore().getRange();
                    var cnt = 0;
                    if (deptData != null && deptData.length > 0) {
                        for (var i = 0; i < deptData.length; i++) {
                            if (deptData[i].data.checked) {
                                subdeptProperty[cnt] = deptData[i].data.PropertyId;
                                propSubDept = propSubDept + deptData[i].data.PropertyId + ':' + deptData[i].data.SubDepartmentId + ',';
                                cnt++;
                            }
                        }
                    }
                    propSubDept = propSubDept.replace(/\,$/, '');
                    form.getForm().findField('PropSubDeptIds').setValue(propSubDept);
                    //}

                    if (form.getForm().isValid()) {
                        var propertyData = me.getTraceProeprty().store.data;
                        var propIds = ''; var allSubDeptSelected = false; var isNotValidPropertySubdeptCombination = false;

                        if (propertyData != null && propertyData.length > 0) {
                            for (var i = 0; i < propertyData.length; i++) {
                                if (propertyData.items[i].data.checked) {
                                    propIds += propertyData.items[i].data.PropertyId + ",";

                                    allSubDeptSelected = false;
                                    if (subdeptProperty != null && subdeptProperty.length > 0) {
                                        for (var j = 0; j < subdeptProperty.length; j++) {
                                            if (propertyData.items[i].data.PropertyId == subdeptProperty[j]) {
                                                allSubDeptSelected = true;
                                            }
                                        }
                                    }

                                    if (!allSubDeptSelected) isNotValidPropertySubdeptCombination = true;
                                }
                            }
                        }

                        propIds = propIds.replace(/\,$/, '');
                        if (!isNotValidPropertySubdeptCombination) { //propIds != '' || 
                            var deptGrid = Ext.ComponentQuery.query('automatedTracemanage grid[itemid="TraceDepartment"]')[0];
                            var deptData = deptGrid.getStore().getRange();
                            var deptId = '';
                            if (deptData != null && deptData.length > 0) {
                                for (var i = 0; i < deptData.length; i++) {
                                    if (deptData[i].data.checked)
                                        deptId += deptData[i].data.SubDepartmentId + ',';
                                }
                            }
                            deptId = deptId.replace(/\,$/, '');

                            if (deptId != '') {
                                form.getForm().submit({
                                    url: webAPI_path + "api/AutomatedTrace/ManageAutomatedTrace",
                                    method: 'POST',
                                    success: function (form, response) {
                                        var r = response.response.responseText;
                                        var r = Ext.decode(r);

                                        /*Commented as response text not came from API*/
                                        if (r.success == true) {
                                            me.getAutomatedTracemanage().close();
                                            var AutomatedTraceList = Ext.ComponentQuery.query('grid[itemid="automatedTracegrid"]')[0];
                                            AutomatedTraceList.getStore().proxy.setExtraParam('searchParam', null);
                                            AutomatedTraceList.getStore().load();
                                        }
                                    },
                                    failure: function (form, response) {
                                    }
                                })
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), 'Selection of Department or User is mandatory.'.l('g'));
                            }
                        }
                        else {
                            Ext.Msg.alert('Error'.l('g'), 'Property selection is mandatory.'.l('g'));
                        }
                    }
                    else {
                        Ext.Msg.alert('Error'.l('g'), 'Some fields are requred, check all fields.'.l('g'));
                    }
                }
            },
            'automatedTracemanage button[action=automatedTraceLang]': {
                click: function () {
                    var AutomatedTraceId = Ext.ComponentQuery.query('automatedTracemanage hidden[itemid="AutomatedTraceId"]')[0].getValue();
                    Ext.create('widget.automatedtracelang', { AutomatedTraceId: AutomatedTraceId });
                }
            },
            'automatedtracelang combobox[name=LanguageId]': {
                select: function (combo, records, eOpt) {
                    var AutomatedTraceId = Ext.ComponentQuery.query('automatedtracelang hidden[itemid="AutomatedTraceId"]')[0].getValue();
                    var form = Ext.ComponentQuery.query('automatedtracelang [itemid=automatedTraceLangForm]')[0];
                    form.getForm().load({
                        method: 'GET',
                        url: webAPI_path + 'api/AutomatedTrace/GetAutomatedTraceLang',
                        params: {
                            id: AutomatedTraceId,
                            languageId: records[0].data.LanguageId
                        }
                    });
                }
            },
            'automatedtracelang button[action=saveAutomatedTraceLang]': {
                click: function () {
                    var form = Ext.ComponentQuery.query('automatedtracelang [itemid=automatedTraceLangForm]')[0];
                    if (form.getForm().isValid()) {
                        form.getForm().submit({
                            url: webAPI_path + 'api/AutomatedTrace/ManageAutomatedTraceLang',
                            type: 'POST',
                            success: function (form, response) {
                                var r = response.result;
                                ////Get Active Window and close It first
                                var win = Ext.WindowManager.getActive();
                                if (win) {
                                    win.close();
                                }
                            },
                            failure: function (form, response) {
                            }
                        });
                    }
                }
            }
        });
    },
    deleteTrace: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {
            if (btn === 'yes') {
                if (rec.AutomatedTraceId > 0) {
                    Ext.data.JsonP.request({
                        url: webAPI_path + 'api/AutomatedTrace/RemoveAutomatedTrace',
                        type: "GET",
                        params: { id: rec.AutomatedTraceId },
                        success: function (response) {
                            var r = response;
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                ResultText = ResultText.l("SP_DynamicCode");
                            if (r.success == true) {
                                //display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Room deleted successfully.');
                                //                                var AutomatedTraceList = Ext.ComponentQuery.query('grid[itemid="automatedTracegrid"]')[0];
                                //                                AutomatedTraceList.getStore().proxy.setExtraParam('searchParam', null);
                                //                                AutomatedTraceList.getStore().load();
                                var grid = Ext.ComponentQuery.query('[itemid="automatedTracegrid"]')[0];
                                Utils.RefreshGridonDelete(grid, grid.getStore());
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                        },
                        failure: function () { }
                    })
                }
            }
        })
    },
    editTrace: function (rec) {
        Ext.create('widget.automatedTracemanage', { AutomatedTraceId: rec.AutomatedTraceId });
    },
    selectItemwithGroup: function (rec) {
        var ItemId = Ext.ComponentQuery.query('automatedTracemanage hidden[itemid="ItemId"]')[0];
        ItemId.setValue(rec.ItemId);

        var ItemGroupId = Ext.ComponentQuery.query('automatedTracemanage hidden[itemid="ItemGroupId"]')[0];
        ItemGroupId.setValue(rec.ItemGroupId);

        var ItemName = Ext.ComponentQuery.query('automatedTracemanage displayfield[itemid=itemName]')[0];
        ItemName.setValue(rec.Name);

        this.getItemwithgrouplist().close();

    }
});