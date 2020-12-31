Ext.define('Regardz.controller.configuration.ReportsManage', {
    extend: 'Ext.app.Controller',
    views: ['configuration.ReportsMainCategoriesList', 'configuration.ReportMainCategoryManage', 'configuration.ReportsMainCategoriesEditLang', 'configuration.ReportsCategoryStructure', 'configuration.ReportsCategoryStructureItemManage', 'configuration.ReportsMaintainanceEdit', 'configuration.ReportsMaintainance', 'configuration.ReportsMaintainanceParameterAdd', 'configuration.ReportsMaintainanceAdd', 'configuration.ReportsCategoryStructureEditLang', 'configuration.ReportsMaintainanceEditLang', 'configuration.ReportsMaintainanceParameterEditLang'],
    stores: ['configuration.ReportsMainCategoriesStore', 'common.LanguageListStore', 'configuration.ReportsCategoryStructureStore', 'configuration.ReportsMaintenanceListStore', 'configuration.ReportParameterListStore', 'configuration.ReportParametersTypeListStore', 'configuration.ReportsListStore'],

    init: function () {
        var me = this;
        this.control(
        {
            'reportsmaincategorieslist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].ReportCategoryName;

                    var zRec = iView.getRecord(iRowEl);
                    if (iColIdx == 1)
                        this.deleteCategory(zRec);
                    else if (iColIdx == 2)
                        this.editCategory(zRec);

                }
            },
            '[itemid="categoryStructurePanelId"]': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var zRec = iView.getRecord(iRowEl);
                    switch (iColIdx) {
                        case 0:
                            Utils.SelectedReportCategoryId = zRec.data.ReportCategoryId;
                            var gridPanel = Ext.ComponentQuery.query('[itemid="reportscategorylistid"]')[0];
                            //var store = Ext.data.StoreManager.lookup('configuration.ReportsMaintenanceListStore');
                            //store.removeAll();
                            //store.reload();
                            var store = Ext.getStore('configuration.ReportsListStore');
                            store.removeAll();
                            store.reload();
                            //Ext.getStore('configuration.ReportsListStore').reload();
                            //localStore.load();
                            //gridPanel.store = localStore;
                            //gridPanel.reconfigure(localStore);
                            break;
                        case 1:
                            this.deleteCategoryStructure(zRec);
                            break;
                        case 2:
                            this.editCategoryStructure(zRec);
                            break;
                        case 3:
                            this.addCategoryStructure(zRec);
                            break;
                        default:
                            break;

                    }

                    //if (iColIdx == 1)
                    //    this.deleteCategoryStructure(zRec);
                    //else if (iColIdx == 2)
                    //    this.editCategoryStructure(zRec);
                    //else if (iColIdx == 3)
                    //    this.addCategoryStructure(zRec);

                }
            },
            'combo[itemid="languageListComboId"]': {
                change: function (t, e, o) {
                    var form = Ext.ComponentQuery.query('[itemid="reportsmainCatEditLng"]')[0].getForm();
                    log("form", form);
                    var values = form.getValues();
                    var betObj = values;
                    if (!Utils.isValid(betObj.reportCategoryId)) {
                        betObj.reportCategoryId = 0;
                    }
                    log(betObj);
                    if (betObj.reportCategoryId > 0) {
                        var url = webAPI_path + 'api/Reports/GetReportCategory';
                        Ext.data.JsonP.request({
                            url: url,
                            params: betObj,
                            type: 'GET',
                            success: function (response) {
                                log('response', response);
                                var r = response;
                                form.findField('name').setValue(r.data.ReportCategoryName);
                                //form.findField('reportCategoryId').setValue(r.data.ReportCategoryId);
                            },
                            failure: function (response) {
                                log('response', response);
                            }
                        });
                    }

                }
            },
            'combo[itemid="languageListCategoryStructureComboId"]': {
                change: function (t, e, o) {
                    var form = Ext.ComponentQuery.query('[itemid="reportscatstructureEditLng"]')[0].getForm();
                    log("form", form);
                    var values = form.getValues();
                    var betObj = values;
                    if (!Utils.isValid(betObj.reportCategoryId)) {
                        betObj.reportCategoryId = 0;
                    }
                    log(betObj);
                    if (betObj.reportCategoryId > 0) {
                        var url = webAPI_path + 'api/Reports/GetReportCategory';
                        Ext.data.JsonP.request({
                            url: url,
                            params: betObj,
                            type: 'GET',
                            success: function (response) {
                                log('response', response);
                                var r = response;
                                if (r.data != null) {
                                    form.findField('name').setValue(r.data.ReportCategoryName);
                                }
                                //form.findField('reportCategoryId').setValue(r.data.ReportCategoryId);
                            },
                            failure: function (response) {
                                log('response', response);
                            }
                        });
                    }

                }
            },
            'combo[itemid="mainCategoryID"]': {
                change: function (t, e, o) {

                    var localStore = Ext.getStore('configuration.ReportsCategoryStructureStore');
                    localStore.proxy.setExtraParam('id', t.value);
                    localStore.proxy.setExtraParam('languageId', user_language);
                    localStore.load();
                    var grid = Ext.ComponentQuery.query('[itemid="categoryStructurePanelId"]')[0];
                    grid.store = localStore;
                    //grid.root(localStore.getAt(0));
                    //localStore.load({
                    //    callback: function (records, o, success) {
                    //        Ext.ComponentQuery.query('[itemid="categoryStructurePanelId"]')[0].reconfigure(localStore);
                    //    }
                    //});

                }
            },
            'reportsmaincategorieslist button[action="addmaincategoryaction"]': {
                click: function () {
                    //var designationID = Ext.getCmp('DesignationID').value;
                    Utils.ShowWindow('widget.reportmaincategorymanage', { editMode: false });
                }
            },
            'button[action="saveReportMainCategory"]': {
                click: function () {
                    var betObj = {};
                    betObj.reportCategoryId = 0;
                    var reportCategoryId = Ext.ComponentQuery.query('[itemid="reportCategoryId"]')[0].getValue();
                    if (Utils.isValid(reportCategoryId)) {
                        if (reportCategoryId > 0) {
                            betObj.reportCategoryId = reportCategoryId;
                        }
                    }

                    betObj.name = Ext.ComponentQuery.query('[itemid="categoryTextFieldId"]')[0].getValue();;
                    betObj.languageId = user_language;
                    betObj.createdBy = CurrentSessionUserId;
                    var url = webAPI_path + 'api/Reports/AddNewCategory';
                    Ext.data.JsonP.request({
                        url: url,
                        type: 'GET',
                        params: betObj,
                        success: function (response) {
                            log('response', response);
                            //var r = response.response.responseText;
                            //r = Ext.decode(r);
                            var r = response;
                           var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
	                        ResultText = ResultText.l("SP_DynamicCode");
                            if (r.data == "SUCCESS") {
                                var win = Ext.WindowManager.getActive();
                                if (win) {
                                    win.close();
                                }

                                var store = Ext.data.StoreManager.lookup('configuration.ReportsMainCategoriesStore');
                                store.removeAll();
                                store.reload();
                                /* To uncomment this */
                                //display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully');
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                        },
                        failure: function (form, response) {
                            var r = response.response.responseText;
                            r = Ext.decode(r);
                            var ResultText = r.result;
                            if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
	                        ResultText = ResultText.l("SP_DynamicCode");
                            Ext.Msg.alert('Error'.l('g'), ResultText); // 'Information not saved.');
                        }
                    });
                }
            },
            'button[action="mainCategoryEditLanguageAction"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                    
                    var window = Ext.create('widget.reprotsmaincategorieseditlang');
                    var btnCmp = Ext.ComponentQuery.query('[itemid="mainCategoryEditLanguageButtonId"]')[0];
                    window.alignTo(btnCmp, "br?", [-5, -5]);
                    window.show();
                    var form = Ext.ComponentQuery.query('[itemid="reportsmainCatEditLng"]')[0].getForm();
                    form.findField('reportCategoryId').setValue(t.categoryId);
                }
            },
            'button[action="categoryStructureEditLanguageAction"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                    
                    var window = Ext.create('widget.reprotscategorystructureeditlang');
                    var btnCmp = Ext.ComponentQuery.query('[itemid="categoryStructureEditLanguageButtonId"]')[0];
                    window.alignTo(btnCmp, "br?", [-5, -5]);
                    window.show();
                    var form = Ext.ComponentQuery.query('[itemid="reportscatstructureEditLng"]')[0].getForm();
                    form.findField('reportCategoryId').setValue(t.categoryId);
                }
            },
            'button[action="reportsMainCategoriesEditLangAction"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                                        

                    var form = Ext.ComponentQuery.query('[itemid="reportsmainCatEditLng"]')[0].getForm();
                    if (form.isValid()) {
                        var values = form.getValues();
                        var betObj = values;
                        if (!Utils.isValid(betObj.reportCategoryId)) {
                            betObj.reportCategoryId = 0;
                        }
                        var url = webAPI_path + 'api/Reports/AddNewCategory';
                        Ext.data.JsonP.request({
                            url: url,
                            params: betObj,
                            type: 'GET',
                            success: function (response) {
                                log('response', response);
                                //var r = response.response.responseText;
                                //r = Ext.decode(r);
                                var r = response;
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                                    ResultText = ResultText.l("SP_DynamicCode");
                                if (r.data == "SUCCESS") {
                                    var win = Ext.WindowManager.getActive();
                                    if (win) {
                                        win.close();
                                    }
                                    var store = Ext.data.StoreManager.lookup('configuration.ReportsMainCategoriesStore');
                                    store.removeAll();
                                    store.reload();
                                    /* To uncomment this */
                                    //display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully');
                                }
                                else {
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                }
                            },
                            failure: function (form, response) {
                                var r = response.response.responseText;
                                r = Ext.decode(r);
                                var ResultText = r.result;
                                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
	                                ResultText = ResultText.l("SP_DynamicCode");
                                Ext.Msg.alert('Error'.l('g'), ResultText); // 'Information not saved.');
                            }
                        });
                    }
                }
            },
            'button[action="reportsCategoryStructureEditLangAction"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                                        
                    var form = Ext.ComponentQuery.query('[itemid="reportscatstructureEditLng"]')[0].getForm();
                    if (form.isValid()) {
                        var values = form.getValues();
                        var betObj = values;
                        if (!Utils.isValid(betObj.reportCategoryId)) {
                            betObj.reportCategoryId = 0;
                        }
                        var url = webAPI_path + 'api/Reports/AddCategoryStructureTranslation';
                        Ext.data.JsonP.request({
                            url: url,
                            params: betObj,
                            type: 'GET',
                            success: function (response) {
                                log('response', response);
                                //var r = response.response.responseText;
                                //r = Ext.decode(r);
                                var r = response;
                                var ResultText = r.result;
    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
	ResultText = ResultText.l("SP_DynamicCode");
                                if (r.data == "SUCCESS") {
                                    var win = Ext.WindowManager.getActive();
                                    if (win) {
                                        win.close();
                                    }
                                }
                                else {
                                    Ext.Msg.alert('Error'.l('g'),ResultText);
                                }
                            },
                            failure: function (form, response) {
                                var r = response.response.responseText;
                                r = Ext.decode(r);
                                var ResultText = r.result;
    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
	ResultText = ResultText.l("SP_DynamicCode");
                                Ext.Msg.alert('Error'.l('g'), ResultText); // 'Information not saved.');
                            }
                        });
                    }
                }
            },

            'button[action="saveReportCategoryStructure"]': {
                click: function () {
                    var betObj = {};
                    betObj.langReportCategoryId = 0;
                    var langReportCategoryId = Ext.ComponentQuery.query('[itemid="langReportCategoryId"]')[0].getValue();
                    if (Utils.isValid(langReportCategoryId)) {
                        if (langReportCategoryId > 0) {
                            betObj.langReportCategoryId = langReportCategoryId;
                        }
                    }

                    betObj.reportCategoryId = 0;
                    var reportCategoryId = Ext.ComponentQuery.query('[itemid="reportCategoryId"]')[0].getValue();
                    if (Utils.isValid(reportCategoryId)) {
                        if (reportCategoryId > 0) {
                            betObj.reportCategoryId = reportCategoryId;
                        }
                    }

                    betObj.name = Ext.ComponentQuery.query('[itemid="categoryStructureTextFieldId"]')[0].getValue();
                    betObj.languageId = user_language;
                    betObj.createdBy = CurrentSessionUserId;
                    betObj.parentCategoryId = Ext.ComponentQuery.query('[itemid="parentCategoryId"]')[0].getValue();
                    betObj.childType = Ext.ComponentQuery.query('[itemid="itemRadioGroupCategoryStructure"]')[0].getValue().itemType;
                    betObj.editMode = Ext.ComponentQuery.query('[itemid="editModeId"]')[0].getValue();
                    log("betObj", betObj);
                    var url = webAPI_path + 'api/Reports/AddNewCategoryStructure';
                    Ext.data.JsonP.request({
                        url: url,
                        type: 'GET',
                        params: betObj,
                        success: function (response) {
                            log('response', response);
                            //var r = response.response.responseText;
                            //r = Ext.decode(r);
                            var r = response;
                            var ResultText = r.result;
    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
	ResultText = ResultText.l("SP_DynamicCode");
                            if (r.data == "SUCCESS") {
                                var win = Ext.WindowManager.getActive();
                                if (win) {
                                    win.close();
                                }

                                var localStore = Ext.getStore('configuration.ReportsCategoryStructureStore');
                                localStore.proxy.setExtraParam('id', Ext.ComponentQuery.query('[itemid="mainCategoryID"]')[0].getValue());
                                localStore.proxy.setExtraParam('languageId', user_language);
                                localStore.load();
                                var grid = Ext.ComponentQuery.query('[itemid="categoryStructurePanelId"]')[0];
                                grid.store = localStore;
                                /* To uncomment this */
                                //display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully');
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), ResultText);
                            }
                        },
                        failure: function (form, response) {
                            var r = response.response.responseText;
                            r = Ext.decode(r);
                            var ResultText = r.result;
    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
	ResultText = ResultText.l("SP_DynamicCode");
                            Ext.Msg.alert('Error'.l('g'),ResultText); // 'Information not saved.');
                        }
                    });
                }
            },
            'button[action="mainCategoryEditLanguageAction"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                    
                    var window = Ext.create('widget.reprotsmaincategorieseditlang');
                    var btnCmp = Ext.ComponentQuery.query('[itemid="mainCategoryEditLanguageButtonId"]')[0];
                    window.alignTo(btnCmp, "br?", [-5, -5]);
                    window.show();
                    var form = Ext.ComponentQuery.query('[itemid="reportsmainCatEditLng"]')[0].getForm();
                    form.findField('reportCategoryId').setValue(t.categoryId);
                }
            },
            'button[action="reportsMainCategoriesEditLangAction"]': {
                click: function (t, e, eo) {//t => this, e => event, eo => Eoptional                                        

                    var form = Ext.ComponentQuery.query('[itemid="reportsmainCatEditLng"]')[0].getForm();
                    if (form.isValid()) {
                        var values = form.getValues();
                        var betObj = values;
                        if (!Utils.isValid(betObj.reportCategoryId)) {
                            betObj.reportCategoryId = 0;
                        }
                        var url = webAPI_path + 'api/Reports/AddNewCategory';
                        Ext.data.JsonP.request({
                            url: url,
                            params: betObj,
                            type: 'GET',
                            success: function (response) {
                                log('response', response);
                                //var r = response.response.responseText;
                                //r = Ext.decode(r);
                                var r = response;
                                var ResultText = r.result;
    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
	ResultText = ResultText.l("SP_DynamicCode");
                                if (r.data == "SUCCESS") {
                                    var win = Ext.WindowManager.getActive();
                                    if (win) {
                                        win.close();
                                    }
                                    var store = Ext.data.StoreManager.lookup('configuration.ReportsMainCategoriesStore');
                                    store.removeAll();
                                    store.reload();
                                    /* To uncomment this */
                                    //display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Information saved successfully');
                                }
                                else {
                                    Ext.Msg.alert('Error'.l('g'), ResultText);
                                }
                            },
                            failure: function (form, response) {
                                var r = response.response.responseText;
                                r = Ext.decode(r);
                                var ResultText = r.result;
    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
	ResultText = ResultText.l("SP_DynamicCode");
                                Ext.Msg.alert('Error'.l('g'), ResultText); // 'Information not saved.');
                            }
                        });
                    }
                }
            },
            'button[action="searchReport"]': {
                click: function () {

                    var r = Ext.getCmp('searchString2').getValue();

                    Ext.getStore('configuration.ReportsListStore').clearFilter();
                    var regex = new RegExp(".*" + r + ".*", "i");
                    Ext.getStore('configuration.ReportsListStore').filter("ReportName", regex, true, true);

                    if (r.length > 0) {
                        var clearIcon = Ext.ComponentQuery.query('[action="clearReportFilter"]')[0];
                        clearIcon.show();
                    }
                }
            },
            'textfield[itemid="searchString2"]': {
                specialkey: function (t, eventObject) {
                    if (parseInt(eventObject.getCharCode()) == parseInt(Ext.EventObject.ENTER)) {
                        var r = Ext.getCmp('searchString2').getValue();
                        Ext.getStore('configuration.ReportsListStore').clearFilter();
                        var regex = new RegExp(".*" + r + ".*", "i");
                        Ext.getStore('configuration.ReportsListStore').filter("ReportName", regex, true, true);
                        if (r.length > 0) {
                            var clearIcon = Ext.ComponentQuery.query('[action="clearReportFilter"]')[0];
                            clearIcon.show();
                        }
                    }
                }
            },
            'button[action="clearReportFilter"]': {
                click: function () {
                    Ext.getCmp('searchString2').setValue('');
                    Ext.getStore('configuration.ReportsListStore').clearFilter();
                    var clearIcon = Ext.ComponentQuery.query('[action="clearReportFilter"]')[0];
                    clearIcon.hide();
                }
            },
            'button[action="maintananceAddReport"]': {
                click: function () {
                    Utils.ShowWindow('widget.reportsmaintainanceadd', null);

                }
            },
            'button[action="reportsAddParamAction"]': {
                click: function () {
                    Utils.ShowWindow('widget.reportsmaintainanceparameteradd', { reportId: Ext.ComponentQuery.query('[itemid="formEditReport"]')[0].getForm().findField('ReportId').getValue(), isDisabled: true });
                }
            },
            'button[action="addParameterAction"]': {
                click: function () {
                    this.updateParameter(0);
                }
            },
            'textfield[itemid="rMTextfieldFilter"]': { // Change action for filtering reports maintanance
                change: function (field, newVal, oldVal) {
                    if (newVal.length == 0) this.filterReportsMaintanance('');
                    if (newVal.length > 2) {
                        this.filterReportsMaintanance(newVal);
                    }
                }
            },
            'button[action="rMFilterAction"]': { // Button action for filtering reports maintanance
                click: function () {
                    this.filterReportsMaintanance(Ext.ComponentQuery.query('[itemid="rMTextfieldFilter]')[0].getValue());
                }
            },
            '[itemid="reportsMaintananceGrid"]': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    if (iColIdx == 3) { // Delete Report
                        Ext.MessageBox.confirm('Delete'.l('g'), 'Are you sure ?'.l('g'), function (btn) {
                            if (btn === 'yes') {
                                me.deleteReport(iRecord.data.ReportId);
                            }
                        }
                        );
                    }
                    if (iColIdx == 4) { // Edit Report
                        Ext.getStore('configuration.ReportParameterListStore').proxy.setExtraParam('reportId', iRecord.data.ReportId);
                        Ext.getStore('configuration.ReportParameterListStore').load();
                        Utils.ShowWindow('widget.reportsmaintainanceedit', { reportObj: iRecord.data });
                    }
                }
            },
            'button[action="actionAddReport"]': { // Button action for filtering reports maintanance
                click: function () {
                    this.updateReport(0);
                }
            },
            'button[action="actionSaveReport"]': { // Button action for filtering reports maintanance
                click: function () {
                    this.updateReport(1);
                }
            },
            '[itemid="parameterGridPanel"]': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    if (iColIdx == 3) { // Delete Parameter
                        Ext.MessageBox.confirm('Delete'.l('g'), 'Are you sure ?'.l('g'), function (btn) {
                            if (btn === 'yes') {
                                me.deleteParameter(iRecord.data.ReportParameterId);
                            }
                        }
                        );
                    }
                    if (iColIdx == 4) { // Edit Parameter
                        log('ReportParameter is', iRecord.data);
                        Utils.ShowWindow('widget.reportsmaintainanceparameteradd', { reportId: iRecord.data.ReportId, paramObj: iRecord.data, isDisabled: false });
                    }
                }
            },
            'button[action="saveReportsCategories"]': { // Button action for filtering reports maintanance
                click: function () {
                    //this.updateReport(1);
                    var itemIds = new Array();
                    var items = $('[id^="rdReports_"]');
                    items.each(function (i) {
                        var el = $(items[i]);
                        if (el.is(':checked')) {
                            var selectedItemId = el.attr('report-id');
                            Utils.push(itemIds, selectedItemId);
                        }
                    });

                    log("items ", itemIds);
                    log("utils category", Utils.SelectedReportCategoryId);
                    var selectedCategory = Utils.SelectedReportCategoryId;
                    if (!Utils.isValid(selectedCategory)) {
                        Ext.Msg.alert('Error'.l('g'), 'No category selected.'.l('g'));
                        return false;
                    }
                    if (selectedCategory < 1) {
                        Ext.Msg.alert('Error'.l('g'), 'Invalid category selected.'.l('g'));
                        return false;
                    }

                    Ext.data.JsonP.request({
                        url: webAPI_path + 'api/Reports/AssignReportCategory',
                        type: "GET",
                        params: { reportCategoryId: selectedCategory, reportIds: itemIds },
                        success: function (response) {
                            var r = response;
                            var ResultText = r.result;
    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
	ResultText = ResultText.l("SP_DynamicCode");
                            if (r.data == "SUCCESS") {
                                display_alert('MG00000'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted Successfully.'.l('g'));
                                //var store = Ext.data.StoreManager.lookup('configuration.ReportsMainCategoriesStore');
                                //store.removeAll();
                                //store.reload();
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
            },


            'button[action="showReportEditLang"]': {
                click: function () {
                    Utils.ShowWindow('widget.reportsmaintainanceeditlang', { reportId: Ext.ComponentQuery.query('[itemid="formEditReport"]')[0].getForm().findField('ReportId').getValue() });
                }
            },
            'combo[itemid="reportsEditLangCombo"]': {
                change: function (t, e, o) {
                    this.reportEditLangChangeAction(e);
                }
            },
            'button[action="reportsEditLangAction"]': {
                click: function () {
                    this.reportEditLangSave();
                }
            },

            'button[action="showReportParameterEditLang"]': {
                click: function () {
                    Utils.ShowWindow('widget.reportsmaintainanceparametereditlang', { reportParameterId: Ext.ComponentQuery.query('[itemid="parameterAddForm"]')[0].getForm().findField('ReportParameterId').getValue() });
                }
            },
            'combo[itemid="reportsParameterEditLangCombo"]': {
                change: function (t, e, o) {
                    this.reportEditParameterLangChangeAction(e);
                }
            },
            'button[action="reportsParameterEditLangAction"]': {
                click: function () {
                    this.reportEditParameterLangSave();
                }
            },
        })
    },
    deleteCategory: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {

            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/Reports/RemoveMainCategory',
                    type: "GET",
                    params: { id: rec.data.ReportCategoryId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
	ResultText = ResultText.l("SP_DynamicCode");
                        if (r.data == "SUCCESS") {
                            display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted Successfully.'.l('g'));
                            var store = Ext.data.StoreManager.lookup('configuration.ReportsMainCategoriesStore');
                            store.removeAll();
                            store.reload();
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
    editCategory: function (rec) {
        //Ext.create('widget.designationmanagelist', { designationId: rec.data.designationId });
        //var designationID = Ext.getCmp('DesignationID').value;        
        log("rec", rec);
        Utils.ShowWindow('widget.reportmaincategorymanage', { categoryName: rec.data.ReportCategoryName, categoryId: rec.data.ReportCategoryId, editMode: true });
    },
    deleteCategoryStructure: function (rec) {
        display_alert("MG00020", '', 'C', function (btn) {

            if (btn === 'yes') {
                Ext.data.JsonP.request({
                    url: webAPI_path + 'api/Reports/RemoveCategoryStructure',
                    type: "GET",
                    params: { id: rec.data.LangReportCategoryId },
                    success: function (response) {
                        var r = response;
                        var ResultText = r.result;
    if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
	ResultText = ResultText.l("SP_DynamicCode");
                        if (r.data == "SUCCESS") {
                            display_alert('MG00040'); // Ext.Msg.alert('Success'.l('g'), 'Record Deleted Successfully.'.l('g'));
                            var localStore = Ext.getStore('configuration.ReportsCategoryStructureStore');
                            localStore.proxy.setExtraParam('id', Ext.ComponentQuery.query('[itemid="mainCategoryID"]')[0].getValue());
                            localStore.proxy.setExtraParam('languageId', user_language);
                            localStore.load();                            
                            var grid = Ext.ComponentQuery.query('[itemid="categoryStructurePanelId"]')[0];
                            grid.store = localStore;
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
    editCategoryStructure: function (rec) {
        //Ext.create('widget.designationmanagelist', { designationId: rec.data.designationId });
        //var designationID = Ext.getCmp('DesignationID').value;        
        log("rec", rec);
        Utils.ShowWindow('widget.reportscategorystructureitemmanage', { categoryName: rec.data.ReportCategoryName, categoryId: rec.data.ReportCategoryId, editMode: true, parentCategoryId: rec.data.ParentCategoryId, langCategoryId: rec.data.LangReportCategoryId });
    },
    addCategoryStructure: function (rec) {
        //Ext.create('widget.designationmanagelist', { designationId: rec.data.designationId });
        //var designationID = Ext.getCmp('DesignationID').value;        
        log("rec", rec);
        var hide = false;
        if (rec.data.isFirst && rec.data.parentId == 'root')
            hide = true;
        Utils.ShowWindow('widget.reportscategorystructureitemmanage', { categoryName: "", categoryId: rec.data.ReportCategoryId, editMode: false, parentCategoryId: rec.data.ParentCategoryId, hideSibling: hide });
    },
    filterReportsMaintanance: function (filter) {

        Ext.getStore('configuration.ReportsMaintenanceListStore').proxy.setExtraParam('filter', filter);
        Ext.getStore('configuration.ReportsMaintenanceListStore').load();
    },
    updateReport: function (type) {
        var serverObj = {};
        var formItem = {};
        if (type == 0) { // Add
            formItem = Ext.ComponentQuery.query('[itemid="formAddReport"]')[0];
        } else { // Edit
            formItem = Ext.ComponentQuery.query('[itemid="formEditReport"]')[0];
        }
        var form = formItem.getForm();
        if (form.isValid()) {
            serverObj = form.getFieldValues();

            if (Utils.isEmpty(serverObj.ReportType)) {
                Ext.Msg.alert('Error'.l('g'), 'Selected report type');
                return;
            }
            serverObj.LanguageId = user_language;
            serverObj.CreatedBy = CurrentSessionUserId;
            var urlItem = webAPI_path + 'api/Reports/UpdateReport';
            $.post(urlItem, serverObj,
                   function (response) {
                   var ResultText = response.result;
        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
        ResultText = ResultText.l("SP_DynamicCode");
                       if (response.success) {
                           var win = Ext.WindowManager.getActive();
                           if (win) {
                               win.destroy();
                           }
                           Ext.getStore('configuration.ReportsMaintenanceListStore').reload();
                       } else {
                           Ext.Msg.alert('Error'.l('g'), ResultText);
                       }
                   }
             );
        }
    },
    deleteReport: function (reportId) {
        var urlItem = webAPI_path + 'api/Reports/MarkInactive';
        $.get(urlItem, { reportId: reportId, updatedBy: CurrentSessionUserId },
               function (response) {
               var ResultText = response.result;
        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
        ResultText = ResultText.l("SP_DynamicCode");
                   if (response.success) {
                       Ext.getStore('configuration.ReportsMaintenanceListStore').reload();
                   } else {
                       Ext.Msg.alert('Error'.l('g'), ResultText);
                   }
               }
        );
    },
    updateParameter: function (type) {
        var serverObj = {};
        var formItem = {};
        if (type == 0) { // Add
            formItem = Ext.ComponentQuery.query('[itemid="parameterAddForm"]')[0];
        }
        var form = formItem.getForm();
        if (form.isValid()) {
            serverObj = form.getFieldValues();
            serverObj.LanguageId = user_language;
            log('For sending', serverObj);
            var urlItem = webAPI_path + 'api/Reports/UpdateParameter';
            $.post(urlItem, serverObj,
                   function (response) {
                   var ResultText = response.result;
        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
        ResultText = ResultText.l("SP_DynamicCode");
                       if (response.success) {
                           var win = Ext.WindowManager.getActive();
                           if (win) {
                               win.destroy();
                           }
                           Ext.getStore('configuration.ReportParameterListStore').reload();
                       } else {
                           Ext.Msg.alert('Error'.l('g'), ResultText);
                       }
                   }
             );
        }
    },
    deleteParameter: function (parameterId) {
        var urlItem = webAPI_path + 'api/Reports/DeleteParameter';
        $.get(urlItem, { parameterId: parameterId },
               function (response) {
               var ResultText = response.result;
        if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
        ResultText = ResultText.l("SP_DynamicCode");
                   if (response.success) {
                       Ext.getStore('configuration.ReportParameterListStore').reload();
                   } else {
                       Ext.Msg.alert('Error'.l('g'), ResultText);
                   }
               }
        );
    },
    reportEditLangChangeAction: function (langId) {
        var form = Ext.ComponentQuery.query('[itemid="reportsEditLangForm"]')[0].getForm();
        var serverObj = form.getValues();
        log('For server', serverObj);
        if (serverObj.ReportId > 0) {

            var urlItem = webAPI_path + 'api/Reports/GetLangReportName';
            $.get(urlItem, { languageId: langId, reportId: serverObj.ReportId },
                   function (response) {
                       log('Reponse is ', response);
                       if (response.success) {
                           form.findField('LangReportId').setValue(response.result.LangReportId);
                           var txtReportName = Ext.ComponentQuery.query('[itemid="txtReportName"]')[0];
                           txtReportName.setValue(response.result.ReportName);
                       } else {
                           form.findField('LangReportId').setValue(0);
                       }
                   }
            );
        }
    },
    reportEditLangSave: function () {
        var form = Ext.ComponentQuery.query('[itemid="reportsEditLangForm"]')[0].getForm();
        var serverObj = form.getValues();
        log('For server', serverObj);
        if (serverObj.ReportId > 0) {
            var urlItem = webAPI_path + 'api/Reports/AddReportTranslation';
            $.get(urlItem, serverObj,
                   function (response) {
                       log('Reponse is ', response);
                       if (response.success) {
                           var win = Ext.WindowManager.getActive();
                           if (win) {
                               win.destroy();
                           }
                       }
                   }
            );
        }
    },
    reportEditParameterLangChangeAction: function (langId) {
        var form = Ext.ComponentQuery.query('[itemid="reportsParameterEditLangForm"]')[0].getForm();
        var serverObj = form.getValues();
        log('For server', serverObj);
        if (serverObj.ReportParameterId > 0) {

            var urlItem = webAPI_path + 'api/Reports/GetLangReportParameter';
            $.get(urlItem, { languageId: langId, reportParameterId: serverObj.ReportParameterId },
                   function (response) {
                       log('Reponse is ', response);
                       if (response.success) {
                           form.findField('LangReportParameterId').setValue(response.result.LangReportParameterId);
                           form.findField('ParameterName').setValue(response.result.ParameterName);
                           form.findField('Description').setValue(response.result.Description);
                       } else {
                           form.findField('LangReportParameterId').setValue(0);
                       }
                   }
            );
        }
    },
    reportEditParameterLangSave: function () {
        var form = Ext.ComponentQuery.query('[itemid="reportsParameterEditLangForm"]')[0].getForm();
        var serverObj = form.getValues();
        log('For server', serverObj);
        if (serverObj.ReportParameterId > 0) {
            var urlItem = webAPI_path + 'api/Reports/AddReportParameterTranslation';
            $.get(urlItem, serverObj,
                   function (response) {
                       log('Reponse is ', response);
                       if (response.success) {
                           var win = Ext.WindowManager.getActive();
                           if (win) {
                               win.destroy();
                           }
                       }
                   }
            );
        }
    },
});
