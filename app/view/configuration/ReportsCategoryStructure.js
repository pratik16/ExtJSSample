Ext.define('Regardz.view.configuration.ReportsCategoryStructure', {
    extend: 'Ext.panel.Panel',
    layout: 'column',
    margin: 10,
    alias: 'widget.reportscategorystructure',
    viewConfig: {
        forceFit: true
    },
    title: 'Reports Category Structure',
    initComponent: function () {

        var me = this;

        if (Ext.getCmp('searchString2')) {
            Ext.getCmp('searchString2').destroy();
        }

        Ext.data.StoreManager.lookup('configuration.ReportsMainCategoriesStore').reload();
        me.mainCategoryCombo = {
            xtype: 'combo',
            width: 185,
            name: 'maincategory',
            action: 'mainCategoryChange',
            itemid: 'mainCategoryID',
            queryMode: 'local',
            displayField: 'ReportCategoryName',
            valueField: 'ReportCategoryId',
            store: 'configuration.ReportsMainCategoriesStore'
        };
        var categoryStructurePanel = Ext.create(
            'Ext.tree.Panel', {
                border: true,
                frame: false,
                rootVisible: false,
                autoScroll: true,
                store: 'configuration.ReportsCategoryStructureStore',
                itemid: 'categoryStructurePanelId',
                title: 'Category Structure',
                tbar: [me.mainCategoryCombo],
                //root: new Ext.tree.AsyncTreeNode({ text: "root" }),
                columns: [{
                    xtype: 'treecolumn', //this is so we know which column will show the tree
                    header: 'Name',
                    width: 200,
                    flex: 2,
                    sortable: true,
                    dataIndex: 'ReportCategoryName'
                },
                { align: 'center', width: 25, renderer: this.iconsRenderer },
                { align: 'center', width: 25, renderer: this.iconsRenderer },
                { align: 'center', width: 25, renderer: this.iconsRenderer }],
                viewConfig: {
                    plugins: {
                        ptype: 'treeviewdragdrop',
                        itemid: 'categoryStructureDragDrop',
                        ddGroup: 'catStr',
                        allowParentInserts: true,
                        allowParentInsert: true,
                        enableDrag: true,
                        enableDrop: true,
                        appendOnly: true
                    },
                    listeners: {
                        // node, data, overModel, dropPosition, dropFunction, eOpt
                        beforedrop: function (node, data, dropRec, dropPosition, dropFunction, eOpt) {
                            console.log(data.records[0].data);
                            console.log(data.records[0].raw);
                            console.log(dropRec);

                            //if (dropRec.childNodes == null && dropRec.childNodes.length <= 0) {
                            //    Ext.Msg.alert('Error'.l('g'), 'Please select Role for add Rights.');
                            //    return false;
                            //}

                            /////Need to revised as validation use IconCls - MM
                            //if (data.records[0].raw.iconCls == dropRec.data.iconCls) {
                            //    Ext.Msg.alert('Error'.l('g'), 'Rights-Code can not add under other Rights-Code');
                            //    return false;
                            //}



                            //var rightsList = dropRec.data.children;
                            //if (rightsList != null && rightsList.length > 0) {
                            //    for (var i = 0; i < rightsList.length; i++) {
                            //        if (data.records[0].data.text == rightsList[i].text) {
                            //            Ext.Msg.alert('Error'.l('g'), 'Rights already available.');
                            //            return false;
                            //        }
                            //    }
                            //}

                            /////Need to revised as validation use IconCls - MM
                            //if (data.records[0].data.parentId != 'root') {
                            //    if (data.records[0].raw.text != dropRec.data.text && data.records[0].raw.iconCls != "icon-rights") {
                            //        Ext.Msg.alert('Error'.l('g'), 'Rights is not belongs to this Rights-Code. Add new rights to top most Root Node');
                            //        return false;
                            //    }
                            //}
                            //else {
                            //    //console.log('root: ' + data.records[0].data.parentId);
                            //    var rootList = dropRec.childNodes;
                            //    //console.log(rootList);
                            //    if (rootList != null && rootList.length > 0) {
                            //        for (var i = 0; i < rootList.length; i++) {
                            //            //alert(data.records[0].data.text + '=' + rootList[i].data.text);
                            //            if (data.records[0].data.text == rootList[i].data.text) {
                            //                Ext.Msg.alert('Error'.l('g'), 'Rights-Code already available.You can add seprate Rights for under this Rights-Code.');
                            //                return false;
                            //            }
                            //        }
                            //    }
                            //}

                        },
                        ////node, data, overModel, dropPosition, eOpts
                        drop: function (node, data, dropRec, dropPosition, eOpts) {
                            //Ext.getStore('usermanage.UserPropertyRoleListStore').reload();
                            log("node", node);
                            log("data", data);
                            log("dropRec", dropRec);
                            log("dropPosition", dropPosition);
                            log("eOpts", eOpts);

                            var newParentCategoryId = dropRec.data.ReportCategoryId;
                            var currentCategoryId = data.records[0].data.ReportCategoryId;

                            if (data.records[0].data.parentId == 'root') {
                                console.log("IF ROOT");
                                newParentCategoryId = 0;
                            }
                            else {
                                console.log("ELSE ROOT");
                                //rightsIds = data.records[0].raw.ActivityId;
                            }


                            log("newParent", newParentCategoryId);
                            log("currentCategoryId", currentCategoryId);
                            Ext.data.JsonP.request({
                                url: webAPI_path + 'api/Reports/AssignCategoryStructureParent',
                                type: "GET",
                                params: {
                                    reportCategoryId: currentCategoryId,
                                    newParentCategoryId: newParentCategoryId,
                                    userId: CurrentSessionUserId,
                                    languageId: user_language

                                },
                                success: function (response) {

                                },
                                failure: function () {
                                    Ext.Msg.alert('Error'.l('g'), 'Server error.Please try again')
                                    var localStore = Ext.getStore('configuration.ReportsCategoryStructureStore');
                                    localStore.proxy.setExtraParam('id', Ext.ComponentQuery.query('[itemid="mainCategoryID"]')[0].getValue());
                                    localStore.proxy.setExtraParam('languageId', user_language);


                                    localStore.load();
                                    var grid = Ext.ComponentQuery.query('[itemid="categoryStructurePanelId"]')[0];
                                    grid.store = localStore;


                                }
                            });
                        }
                    }
                }

            });
        var reportsRightPanle = Ext.create('Ext.grid.Panel', {
            border: true,
            frame: false,
            title: 'Reports',
            autoScroll: true,
            //width: '100%',
            itemid: 'reportscategorylistid',
            store: Ext.getStore('configuration.ReportsListStore'),
            columns: [{
                text: 'Name',
                dataIndex: 'ReportName',
                flex: 1
            },
            {
                renderer: this.checkboxRender
            }],
            tbar: [{
                xtype: 'button',
                iconCls: 'icon-save',
                tooltip: 'Save',
                action: 'saveReportsCategories'
            }, '->', {
                xtype: 'textfield',
                id: 'searchString2',
                itemid: 'searchString2',
                name: 'searchString2',
                enableKeyEvents: false
            }, {
                xtype: 'button',
                iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
                action: 'clearReportFilter',
                tooltip: 'Clear filter'.l('RS'),
                hidden: true
            },
                    {
                        xtype: 'button',
                        action: 'searchReport',
                        tooltip: 'Search'.l('RS'),
                        iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
                    }
            ]
        });
        me.items = [{
            columnWidth: .70,
            margin: 10,
            border: false,
            items: [categoryStructurePanel]
        }, {
            columnWidth: .30,
            margin: 10,
            border: false,
            items: [reportsRightPanle]
        }];

        me.callParent();
    },

    iconsRenderer: function (value, metaData, record, row, col, store, gridView) {
        if (record.data.ParentCategoryId != 0) {
            if (col == 1) { // Delete
                metaData.css = metaData.css + ' icon-delete-item ';
                var tooltipText = "Delete item".l('SC54300');
                metaData.tdAttr = 'data-qtip="' + tooltipText + '"';
            }
            if (col == 2) { //Edit
                metaData.css = metaData.css + ' icon-edit ';
                var tooltipText = "Add/Edit item remark".l('SC54300');
                metaData.tdAttr = 'data-qtip="' + tooltipText + '"';
            }
        }
        if (col == 3) { // Add
            metaData.css = metaData.css + ' newItem ';
            var tooltipText = "Add/Edit item remark".l('SC54300');
            metaData.tdAttr = 'data-qtip="' + tooltipText + '"';
        }
    },
    checkboxRender: function (value, metadata, record, rowIdx, colIndex, store) {
        var currentDataCategoryIds = record.data.ReportCategoryIds;
        var checked = "";
        for (var i = 0; i < currentDataCategoryIds.length; i++) {
            if (currentDataCategoryIds[i] === Utils.SelectedReportCategoryId) {
                checked = "checked=checked";
            }
        }
        return '<input report-id=' + record.data.ReportId + ' id="rdReports_' + record.data.ReportId + '" ' + checked + '  type=checkbox>';
    },
});