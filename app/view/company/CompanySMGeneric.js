Ext.namespace("Ext.ux");

Ext.require([
    'Ext.ux.RowExpander',
    'Ext.selection.CheckboxModel'
]);

Ext.define('Regardz.view.company.CompanySMGeneric', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.companysmgeneric',
    width: '100%',
    border: false,
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('Sales_Generic'))
            Ext.getCmp('Sales_Generic').destroy();

        if (Ext.getCmp('BuyingReasonOther'))
            Ext.getCmp('BuyingReasonOther').destroy();

        if (Ext.getCmp('searchString'))
            Ext.getCmp('searchString').destroy();

        if (Ext.getCmp('searchString1'))
            Ext.getCmp('searchString1').destroy();

        if (Ext.getCmp('searchString2'))
            Ext.getCmp('searchString2').destroy();

        var me = this;

        me.PaymentStore = new Ext.data.SimpleStore({
            fields: ["PaymentModeId", "Mode"],
            data: [
			[1, "Per booking".l('SC61100')],
            //[2, "Per reservation".l('SC61100')],
			[3, "Per month".l('SC61100')],
            //[4, "Per week".l('SC61100')]
            [5, "ABP".l('SC61100')]
		]
        });

        me.sm1 = Ext.create('Ext.selection.CheckboxModel', {
            checkOnly: false,
            itemid: 'buyingreasonselectionmodel',
            injectCheckbox: "last",
            listeners: {
                deselect: function (model, record, index) {
                    record.data.Checked = false;
                    Ext.getStore('company.BuyingReasonListStore').commitChanges();
                },
                select: function (model, record, index) {
                    record.data.Checked = true;
                    Ext.getStore('company.BuyingReasonListStore').commitChanges();
                }
            }
        });

        me.BuyingReasonList = {
            xtype: 'grid',
            title: 'BuyingReason'.l('SC61100'),
            store: Ext.getStore('company.BuyingReasonListStore'),
           // store: Ext.create('Regardz.store.company.BuyingReasonListStore'),
            selModel: me.sm1,
            itemid: 'BuyingReasonList',
            cls: 'gridwhitebackground',
            height: parseInt(me.height * (0.4)),
            width: '100%',
            noResize: true,
            frame: false,
            autoScroll: true,
            columns: [{
                flex: 1,
                header: 'Description'.l('SC61100'),
                renderer: this.BuyingReasons,
                dataIndex: 'Name'
            }
//            , {
//                width: 30,
//                dataIndex: 'Checked',
//                xtype: 'checkboxrow'
//            }
            ]
        };

        me.sm2 = Ext.create('Ext.selection.CheckboxModel', {
            checkOnly: false,
            injectCheckbox: "last",
            listeners: {
                deselect: function (model, record, index) {
                    record.data.Checked = false;
                    Ext.getStore('company.CompetitorListStore').commitChanges();
                },
                select: function (model, record, index) {
                    record.data.Checked = true;
                    Ext.getStore('company.CompetitorListStore').commitChanges();
                }
            }
        });

        me.CompetitorsList = {
            xtype: 'grid',
            title: 'Competitors'.l('SC61100'),
            store: Ext.getStore('company.CompetitorListStore'),
           // store: Ext.create('Regardz.store.company.CompetitorListStore'),           
            selModel: me.sm2,
            itemid: 'CompetitorsList',
            cls: 'gridwhitebackground',
            height: parseInt(me.height * (0.4)),
            noResize: true,
            width: '100%',
            frame: false,
            autoScroll: true,
            columns: [{
                flex: 1,
                header: 'Name'.l('SC61100'),
                renderer: this.Competitors,
                dataIndex: 'Name'
            }
            //            , {
            //                width: 30,
            //                dataIndex: 'Checked',
            //                xtype: 'checkboxrow'
            //            }
            ],
            tbar: ['->', {
                xtype: 'button',
                iconCls: 'filter',
                disabled: true
            }, {
                xtype: 'textfield',
                id: 'searchString2',
                itemid: 'searchString2',
                name: 'searchString2',
                enableKeyEvents: false
            }, {
                xtype: 'button',
                iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
                action: 'clearCompetitors',
                hidden: true
            },
                 {
                     xtype: 'button',
                     action: 'searchCompetitors',
                     iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
                 }
            ]

        };

        me.sm3 = Ext.create('Ext.selection.CheckboxModel', {
            checkOnly: false,
            injectCheckbox: "last",
            listeners: {
                deselect: function (model, record, index) {
                    record.data.Checked = false;
                    Ext.getStore('company.PotentialPropertyStore').commitChanges();
                },
                select: function (model, record, index) {
                    record.data.Checked = true;
                    Ext.getStore('company.PotentialPropertyStore').commitChanges();
                }
            }
        });
        me.PotentialPropertylist = {
            xtype: 'grid',
            title: 'Potential Properties'.l('SC61100'),
            store: Ext.getStore('company.PotentialPropertyStore'),
           // store: Ext.create('Regardz.store.company.PotentialPropertyStore'),
            itemid: 'PotentialPropertylist',
            cls: 'gridwhitebackground',
            height: parseInt(me.height * (0.45)),
            selModel: me.sm3,
            width: '100%',
            noResize: true,
            frame: false,
            autoScroll: true,
            columns: [{
                flex: 1,
                header: 'PropertyName'.l('SC61100'),
                renderer: this.PotentialProperty,
                dataIndex: 'PropertyName'
            }
            //            , {
            //                width: 30,
            //                dataIndex: 'Checked',
            //                xtype: 'checkboxrow'
            //            }
            ],
            tbar: [
                '->', {
                    xtype: 'button',
                    iconCls: 'filter',
                    disabled: true
                }, {
                    xtype: 'textfield',
                    id: 'searchString',
                    itemid: 'searchString',
                    name: 'searchString',
                    enableKeyEvents: false
                }, {
                    xtype: 'button',
                    iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
                    action: 'clearPotentialProperty',
                    hidden: true
                },
                 {
                     xtype: 'button',
                     action: 'searchPotentialProperty',
                     iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
                 }
            ]
        };


        me.sm4 = Ext.create('Ext.selection.CheckboxModel', {
            checkOnly: false,
            injectCheckbox: "last",            
            listeners: {
                deselect: function (model, record, index) {
                    record.data.Checked = false;
                    //    Ext.getStore('company.PotentialMeetingtypeStore').commitChanges();
                },
                select: function (model, record, index) {
                    record.data.Checked = true;
                    //   Ext.getStore('company.PotentialMeetingtypeStore').commitChanges();
                }
            }
        })

        me.PotentialMeetingtypelist = {
            xtype: 'grid',
            title: 'Potential Meeting types'.l('SC61100'),
            store: Ext.getStore('company.PotentialMeetingtypeStore'),
            //store: Ext.create('Regardz.store.company.PotentialMeetingtypeStore'),
            itemid: 'PotentialMeetingtypelist',
            cls: 'gridwhitebackground',
            width: '100%',
            height: parseInt(me.height * (0.45)),
            frame: false,
            selModel: me.sm4,
            noResize: true,
            autoScroll: true,
            columns: [{
                flex: 1,
                header: 'PropertyFeatureName'.l('SC61100'),
                renderer: this.PFeatureName,
                dataIndex: 'Name'
            }
            //            , {
            //                width: 30,
            //                dataIndex: 'Checked',
            //                xtype: 'checkboxrow'
            //            }
            ],
            tbar: ['->', {
                xtype: 'button',
                iconCls: 'filter',
                disabled: true
            }, {
                xtype: 'textfield',
                id: 'searchString1',
                itemid: 'searchString1',
                name: 'searchString1',
                enableKeyEvents: false
            }, {
                xtype: 'button',
                iconCls: Ext.baseCSSPrefix + 'form-clear-trigger',
                action: 'clearPotentialMeetingtype',
                hidden: true
            },
                 {
                     xtype: 'button',
                     action: 'searchPotentialMeetingtype',
                     iconCls: Ext.baseCSSPrefix + 'form-search-trigger'
                 }
            ]

        };

        me.items = [
        {
            xtype: 'form',
            border: false,
            id: 'Sales_Generic',
            margin: 5,
            height: parseInt(me.height * (0.97)),
            width: '97%',
            items: [{
                xtype: 'panel',
                border: false,
                layout: 'hbox',
                items: [
                {
                    xtype: 'fieldset',
                    title: 'Genric'.l('SC61100'),
                    width: '40%',
                    autoScroll: true,
                    height: parseInt(me.height * (0.97)),
                    defaults: {
                        padding: '0 10px 0 0'
                    },
                    items: [{
                        xtype: 'container',
                        layout: 'hbox',
                        flex: 0.9,
                        items: [{
                            xtype: 'displayfield',
                            fieldLabel: 'Sales manager'.l('SC61100'),
                            name: 'SalesManagerName',
                            flex: 0.9
                        },
                        {
                            xtype: 'hidden',
                            name: 'CompanyId',
                            value: me.companyId
                        },
                        {
                            xtype: 'button',
                            action: 'searchSalesUsers',
                            itemId: 'SaleManager',
                            iconCls: 'searchIcon',
                            margin: '0',
                            tooltip: 'Click here for Select User'.l('SC61140')
                        }]
                    }, {
                        xtype: 'container',
                        layout: 'hbox',
                        flex: 0.9,
                        items: [{
                            xtype: 'displayfield',
                            fieldLabel: 'Sales manager assistent'.l('SC61100'),
                            name: 'SalesManagerAssistantName',
                            flex: 0.9
                        }, {
                            xtype: 'button',
                            hidden: true,
                            text: 'Clear'.l('SC61140'),
                            action: 'ClearSMAN',
                            tooltip: 'Clear sales manager assistent'.l('SC61140'),
                            itemid: 'btnClearSMAN',
                            style: 'background:none;text-decoration: underline;border:0px;color: #0000FF;' //#0000FF,  -webkit-link
                        },
                        {
                            xtype: 'button',
                            action: 'searchSalesUsers',
                            itemId: 'SaleManagerAssist',
                            iconCls: 'searchIcon',
                            margin: '0',
                            tooltip: 'Click here for Select User'.l('SC61140')
                        }]
                    }, {
                        xtype: 'combo',
                        name: 'LeadSourceId',
                        fieldLabel: 'Lead source'.l('SC61100'),
                        displayField: 'Name',
                        forceSelection: true,
                        queryMode: 'local',
                        valueField: 'LeadSourceId',
                        itemid: 'leadSourceComboSMG',
                        anchor: '100%',
                        emptyText: "Select Lead Source".l('SC61100'),
                        store: Ext.getStore('common.LeadSourceStore')
                    }, {
                        xtype: 'combo',
                        name: 'StatusId',
                        fieldLabel: 'Company status'.l('SC61000') + '*',
                        displayField: 'Status',
                        forceSelection: true,
                        queryMode: 'local',
                        allowBlank: false,
                        valueField: 'CompanyStatusId',
                        anchor: '100%',
                        emptyText: "Select Company status".l('SC61000'),
                        store: Ext.getStore('common.CompanyStatusComboStore'),
                        itemid: 'genericCompanyStatus'
                    }, {
                        xtype: 'combo',
                        name: 'QualityRating',
                        fieldLabel: 'Quality rating'.l('SC61100'),
                        displayField: 'Description',
                        itemid: 'qualityRatingComboSMG',
                        forceSelection: true,
                        queryMode: 'local',
                        valueField: 'QualityRatingId',
                        //action: 'getQualityRating',
                        anchor: '100%',
                        emptyText: "Select Quality rating".l('SC61100'),
                        store: 'common.QualityRatingStore'
                    }, {
                        xtype: 'combo',
                        name: 'BusinessTypeId',
                        fieldLabel: 'Business type'.l('SC61100'),
                        displayField: 'BusinessTypeName',
                        valueField: 'BusinessTypeId',
                        itemid: 'businessTypeComboSMG',
                        action: 'getBusinessType',
                        anchor: '100%',
                        emptyText: 'Select Business type'.l('SC61170'),
                        store: Ext.getStore('common.BusinessTypeStore')
                    }, {
                        xtype: 'combo',
                        name: 'CreditStatusId',
                        fieldLabel: 'Credit status'.l('SC61100'),
                        anchor: '100%',
                        displayField: 'CreditStatus',
                        valueField: 'Value',
                        store: 'configuration.CreditStatusStore',
                        listeners: {
                            afterrender: function () {
                                var obj = Ext.ComponentQuery.query('customersearch [itemid="creditStatusCombo"]')[0];
                                if (obj != null) {
                                    var store = obj.getStore();
                                    var index = store.findExact('Value', -2);

                                    if (index == -1) {
                                        store.add({
                                            Value: -2,
                                            CreditStatus: 'Select Credit status'.l('SC61000')
                                        });

                                        store.sort('Value', 'ASC');
                                        store.commitChanges();
                                        store.loadData(store.data.items);
                                    }

                                    obj.setValue(-2);
                                }
                            }
                        }
                    }, {
                        xtype: 'textfield',
                        name: 'NoOfEmployees',
                        vtype: 'numeric',
                        maxLength: 10,
                        anchor: '100%',
                        fieldLabel: 'Number of employees'.l('SC61100')
                    }, {
                        xtype: 'numberfield',
                        name: 'RevenueTotalInNL',
                        decimalPrecision: 3,
                        minValue: 0.00,
                        anchor: '100%',
                        maxValue: 10000000000,
                        fieldLabel: 'Company revenue NL'.l('SC61100')
                    }, {
                        xtype: 'numberfield',
                        name: 'PotentialRevenue',
                        decimalPrecision: 3,
                        minValue: 0.00,
                        maxValue: 10000000000,
                        anchor: '100%',
                        fieldLabel: 'Potential revenue Regardz'.l('SC61100')
                    }, {
                        xtype: 'textfield',
                        name: 'NoOfBookingAYear',
                        vtype: 'numeric',
                        anchor: '100%',
                        maxLength: 5,
                        fieldLabel: 'Bookings per year'.l('SC61100')
                    }, {
                        xtype: 'container',
                        //frame: true,
                        width: '100%',
                        border: false,
                        style: 'background:none; border:0px;',
                        layout: 'hbox',
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: 'Group size'.l('SC61100'),
                            emptyText: 'Min'.l('SC61100'),
                            vtype: 'numeric',
                            maxLength: 5,
                            name: 'GroupSizeMin',
                            width: '67%'
                        }, {
                            xtype: 'tbspacer',
                            width: '1%'
                        }, {
                            xtype: 'textfield',
                            labelStyle: 'padding-left:15px',
                            emptyText: 'Max'.l('SC61100'),
                            width: '32%',
                            vtype: 'numeric',
                            maxLength: 5,
                            name: 'GroupSizeMax'
                        }]
                    }, {
                        xtype: 'textfield',
                        name: 'NoOfRoomNightsAYear',
                        vtype: 'numeric',
                        maxLength: 5,
                        anchor: '100%',
                        fieldLabel: 'Roomnights per year'.l('SC61100')
                    }, {
                        xtype: 'combo',
                        name: 'LeadStatusId',
                        fieldLabel: 'Lead status'.l('SC61100'),
                        itemid: 'leadStatusComboSMG',
                        displayField: 'Name',
                        valueField: 'LeadStatusId',
                        anchor: '100%',
                        emptyText: "Select Lead status".l('SC61100'),
                        store: Ext.getStore('common.LeadStatusStore')
                    }, {
                        xtype: 'textfield',
                        name: 'Clientpagelink',
                        maxLength: 512,
                        //vtype: 'numeric',
                        anchor: '100%',
                        fieldLabel: 'Client page link'.l('SC61100')
                    }, {
                        xtype: 'container',
                        width: '100%',
                        border: false,
                        style: 'background:none; border:0px;',
                        layout: 'hbox',
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: 'Client page login'.l('SC61100'),
                            emptyText: 'UserName'.l('SC61100'),
                            width: '67%',
                            name: 'ClientpageLogin',
                            maxLength: 512
                        }, {
                            xtype: 'tbspacer',
                            width: '1%'
                        }, {
                            xtype: 'textfield',
                            labelStyle: 'padding-left:15px',
                            width: '32%',
                            emptyText: 'Password'.l('SC61100'),
                            maxLength: 100,
                            name: 'ClientpagePwd'
                        }]
                    }, {
                        xtype: 'combo',
                        name: 'PaymentMode',
                        fieldLabel: 'Payment'.l('SC61100') + '*',
                        displayField: 'Mode',
                        valueField: 'PaymentModeId',
                        action: 'getPayment',
                        emptyText: "Select Payment".l('SC61100'),
                        anchor: '100%',
                        allowBlank: false,
                        store: me.PaymentStore,
                        listeners: {
                            afterrender: function (combo) {
                                if (combo.value == undefined || combo.value == null)
                                    combo.setValue(1);
                            }
                        }
                    }, {
                        xtype: 'hidden',
                        name: 'SalesManagerId'
                    }, {
                        xtype: 'hidden',
                        name: 'SalesManagerAssistantId'
                    }]
                }
                , {
                    xtype: 'tbspacer',
                    width: 10
                }, {
                    xtype: 'panel',
                    // border: false,
                    width: '30%',
                    //style: 'background:none; border:0px;',
                    layout: 'vbox',
                    padding: '0 0 5 0',
                    height: parseInt(me.height * (0.98)),
                    items: [{
                        xtype: "container",
                        items: me.BuyingReasonList,
                        padding: '10px 0 0 0',
                        width: '100%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Other Reason'.l('SC61100'),
                        padding: '10px 0 0 0',
                        name: 'BuyingReasonOther',
                        //disabled: true,
                        maxLength: 512,
                        anchor: '100%'
                    }, {
                        xtype: "panel",
                        items: me.PotentialPropertylist,
                        padding: '10px 0 0 0',
                        width: '100%'

                    }]
                }, {
                    xtype: 'tbspacer',
                    width: 10
                }, {
                    xtype: 'panel',
                    border: false,
                    width: '28%',
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    padding: '0 0 5 0',
                    items: [{
                        xtype: "container",
                        items: me.CompetitorsList,
                        padding: '10px 0 0 0',
                        width: '100%'
                    }, {
                        xtype: 'textfield',
                        fieldLabel: 'Other competitor'.l('SC61100'),
                        padding: '10px 0 0 0',
                        name: 'CompetitorsOther',
                        //disabled: true,
                        maxLength: 512,
                        anchor: '100%'
                    }, {
                        xtype: "container",
                        items: me.PotentialMeetingtypelist,
                        padding: '10px 0 0 0',
                        width: '100%'
                    }]
                }]
            }]
        }];
        me.callParent(arguments);
    }
,
    BuyingReasons: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value.substring(0, 4) == "SPC_")
            value = value.l("SP_DynamicCode");
        return value
    },
    Competitors: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value.substring(0, 4) == "SPC_")
            value = value.l("SP_DynamicCode");
        return value
    },
    PotentialProperty: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value.substring(0, 4) == "SPC_")
            value = value.l("SP_DynamicCode");
        return value
    },
    PFeatureName: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value.substring(0, 4) == "SPC_")
            value = value.l("SP_DynamicCode");
        return value
    }
});
