Ext.define('Regardz.view.bookingwizard.RightSide.Windows.CompanyContract.CompanyContractWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.companycontractwindow',
    modal: true,
    border: false,
    iconCls: 'contract',
    width: '90%',
    initComponent: function () {

        var me = this;

        me.itemid = 'addnewitems';
        me.width = '90%';
        me.title = 'Company Contract_Title'.l('SC50300');

        me.CurrentTab = {
            title: 'Current'.l('SC50300'),
            name: 'currentTab',
            items: [{
                layout: 'vbox',
                xtype: 'fieldcontainer',
                width: '100%',
                frame: true,
                items: [{
                    layout: 'hbox',
                    xtype: 'fieldcontainer',
                    frame: true,
                    margin: "20",
                    defaults: {
                        labelWidth: 50
                    },
                    items: [{
                        xtype: 'button',
                        iconCls: 'wizard_ContractDetails',
                        itemid: 'ContractDocumentIcon',
                        action: 'downloadCompanyContract'
                    },
                     { xtype: 'displayfield', fieldLabel: '<b>' + 'Period'.l('SC50300') + '</b>', padding: '0 5 0 10' }, {
                         xtype: 'displayfield',
                         itemid: 'contractFromDate-0'
                     }, { xtype: 'label', text: '  to  ', padding: '3 10 0 10' },
                    {
                        xtype: 'displayfield',
                        itemid: 'contractToDate-0'
                    }, {
                        xtype: 'displayfield',
                        itemid: 'fromDate',
                        padding: '0 15 0 0'
                    }, { xtype: 'displayfield', fieldLabel: '<b>' + 'Value'.l('SC50300') + '</b>', padding: '0 5 0 0', width: 100 },
                     {
                         xtype: 'displayfield',
                         itemid: 'contractValue-0',
                         padding: '0 20 0 0'
                     }, {
                         xtype: 'displayfield',
                         itemid: 'contactLabel-0',
                         fieldLabel: '<b>' + 'Contact'.l('SC50300') + '</b>',
                         padding: '0 5 0 0',
                         width: 105
                     }, {
                         xtype: 'displayfield',
                         itemid: 'contractContact-0'
                     }, {
                         xtype: 'hidden',
                         name: 'ContractDocumentPath',
                         itemid: 'ContractDocumentPath'
                     }
                     ]
                }, {
                    xtype: 'purchaseconditionslist'
                }, {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    width: '100%',
                    items: [{
                        xtype: 'paymentconditionslist'
                    }, {
                        xtype: 'cancelationconditionslist'
                    }]
                }]
            }]
        };

        me.PreviousTab = {
            title: 'Previous'.l('SC50300'),
            name: 'previousTab',
            items: [{
                layout: 'vbox',
                xtype: 'fieldcontainer',
                width: '100%',
                frame: true,
                items: [{
                    layout: 'hbox',
                    xtype: 'fieldcontainer',
                    frame: true,
                    margin: "20",
                    defaults: {
                        labelWidth: 50
                    },
                    items: [{
                        xtype: 'button',
                        iconCls: 'wizard_ContractDetails'
                    },
                     { xtype: 'displayfield', fieldLabel: '<b>' + 'Period'.l('SC50300') + '</b>', padding: '0 5 0 10' }, {
                         xtype: 'displayfield',
                         itemid: 'contractFromDate--1'
                     }, { xtype: 'label', text: '  to  ', padding: '3 10 0 10' },
                    {
                        xtype: 'displayfield',
                        itemid: 'contractToDate--1'
                    }, {
                        xtype: 'displayfield',
                        itemid: 'fromDate--1',
                        padding: '0 15 0 0'
                    }, { xtype: 'displayfield', fieldLabel: '<b>' + 'Value'.l('SC50300') + '</b>', padding: '0 5 0 0', width: 100 },
                     {
                         xtype: 'displayfield',
                         itemid: 'contractValue--1',
                         padding: '0 20 0 0'
                     }, {
                         xtype: 'displayfield',
                         itemid: 'contactLabel--1',
                         fieldLabel: '<b>' + 'Contact'.l('SC50300') + '</b>',
                         padding: '0 5 0 0',
                         width: 105
                     }, {
                         xtype: 'displayfield',
                         itemid: 'contractContact--1'
                     }]
                }, {
                    xtype: 'purchaseconditionslist'
                }, {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    width: '100%',
                    items: [{
                        xtype: 'paymentconditionslist'
                    }, {
                        xtype: 'cancelationconditionslist'
                    }]
                }]
            }]
        };

        me.NextTab = {
            title: 'Next'.l('SC50300'),
            name: 'nextTab',
            items: [{
                layout: 'vbox',
                xtype: 'fieldcontainer',
                width: '100%',
                frame: true,
                items: [{
                    layout: 'hbox',
                    xtype: 'fieldcontainer',
                    itemid: 'contractDetailsPan',
                    frame: true,
                    margin: "20",
                    defaults: {
                        labelWidth: 50
                    },
                    items: [{
                        xtype: 'button',
                        iconCls: 'wizard_ContractDetails'
                    },
                     { xtype: 'displayfield', fieldLabel: '<b>' + 'Period'.l('SC50300') + '</b>', padding: '0 5 0 10' }, {
                         xtype: 'displayfield',
                         itemid: 'contractFromDate-1'
                     }, { xtype: 'label', text: '  to  ', padding: '3 10 0 10' },
                    {
                        xtype: 'displayfield',
                        itemid: 'contractToDate-1'
                    }, {
                        xtype: 'displayfield',
                        itemid: 'fromDate',
                        padding: '0 15 0 0'
                    }, { xtype: 'displayfield', fieldLabel: '<b>' + 'Value'.l('SC50300') + '</b>', padding: '0 5 0 0', width: 100 },
                     {
                         xtype: 'displayfield',
                         itemid: 'contractValue-1',
                         padding: '0 20 0 0'
                     }, {
                         xtype: 'displayfield',
                         itemid: 'contactLabel-1',
                         fieldLabel: '<b>' + 'Contact'.l('SC50300') + '</b>',
                         padding: '0 5 0 0',
                         width: 105
                     }, {
                         xtype: 'displayfield',
                         itemid: 'contractContact-1'
                     }
                    ]
                }, {
                    xtype: 'purchaseconditionslist'
                }, {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    width: '100%',
                    items: [{
                        xtype: 'paymentconditionslist'
                    }, {
                        xtype: 'cancelationconditionslist'
                    }]
                }]
            }]
        }; // me.CurrentTab;

        me.ContractTabs = {
            xtype: 'tabpanel',
            itemid: 'contractAllTab',
            activeTab: 0,
            width: '100%',
            plain: false,
            border: false,
            //frame: true,
            bodyPadding: 1,
            padding: 5,
            layout: 'form',
            style: 'background:none; border:0px;',
            items: [
                   me.CurrentTab, //end tab 1
                   me.PreviousTab,
                   me.NextTab
            ]
        };
        me.items = [me.ContractTabs];
        me.dockedItems = [{
            dock: 'bottom',
            buttonAlign: 'right',
            buttons: [{
                text: 'Close'.l('w'),
                handler: function () {
                    me.destroy();
                }
            }]
        }];
        me.callParent(arguments);
    }
});