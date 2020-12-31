Ext.define('Regardz.view.company.GeneralInfo', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.generalinfo',
    itemid: 'generalInfo',
    modal: true,
    width: '100%',    
    autoScroll: true,
    autoShow: true,
    initComponent: function () {

        if (Ext.getCmp('generalInfo'))
            Ext.getCmp('generalInfo').destroy();
       
        var me = this;        
        me.items = [{
            xtype: 'form',
            id: 'generalInfo',
            border: false,
            bodyStyle: 'padding:5px 5px 0',            
            fieldDefaults: {
                msgTarget: 'side',
                labelWidth: 100
            },          
            fileUpload: true,
            items: [{
                xtype: 'panel',
                border: false,
                style: 'background:none; border:0px;',
                layout: 'hbox',
                items: [{
                    xtype: 'panel',
                    border: false,
                    width: '33%',                   
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    defaults: {
                        margin: '0 5 0 0'
                    },
                    items: [
                    {
                        xtype: 'fieldset',
                        title: 'General Information'.l('SC61100'),
                        width: '96%',                        
                        height: parseInt(me.height * (0.70)),
                        autoScroll: true,
                        defaultType: 'textfield',
                        layout: 'anchor',
                        defaults: {
                            anchor: '95%'
                        },
                        items: [
                        { xtype: 'hidden', name: 'CompanyId', value: me.CompanyId },
                        { xtype: 'hidden', name: 'ParentCompanyId' },
                        { xtype: 'hidden', name: 'SalesManagerId' },
                        { xtype: 'hidden', name: 'StatusId' },
                        { xtype: 'hidden', name: 'QualityRating' },
                        { xtype: 'hidden', name: 'Extras' },
                        { xtype: 'hidden', name: 'Logo' },
                        { xtype: 'hidden', name: 'CreatedDate' },
                        { xtype: 'hidden', name: 'CreatedBy' },
                        { xtype: 'hidden', name: 'UpdatedDate' },
                        { xtype: 'hidden', name: 'UpdatedBy' },
                        { xtype: 'hidden', name: 'CreditStatusId' },
                        { xtype: 'hidden', name: 'LeadSourceId' },
                        { xtype: 'hidden', name: 'LongTermCommitmentId' },
                        { xtype: 'hidden', name: 'Debiteurennr' },
                        { xtype: 'hidden', name: 'FirstYear' },
                        { xtype: 'hidden', name: 'CompanyStatusCode' },
                        {
                            fieldLabel: 'Name'.l('SC61100') + '*',
                            allowBlank: false,
                            maxLength: 400,
                            name: 'CompanyName'
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Abbreviation'.l('SC61100'), allowBlank: true,
                            maxLength: 50,
                            name: 'Abbreviation'
                        }, {
                            xtype: 'checkbox',
                            fieldLabel: 'Agency'.l('SC61100'),
                            action: 'Agency_GI',
                            name: 'IsAgency',
                            inputValue: 'true'
                        }, {
                            fieldLabel: 'Account ID'.l('SC61100'),
                            name: 'AccountId',
                            xtype: 'displayfield',
                            value: me.AccountId,
                            allowBlank: true
                        }, {
                            fieldLabel: 'Phone'.l('SC61300'),
                            allowBlank: true,
                            vtype: 'customPhoneNumber',
                            maxLength: 50,
                            name: 'Phone'
                        }, {
                            fieldLabel: 'Fax'.l('SC61300'),
                            allowBlank: true,
                            maxLength: 50,
                            vtype: 'customPhoneNumber',
                            name: 'Fax'
                        }, {
                            xtype: 'combo',
                            name: 'MarketSourceId',
                            fieldLabel: 'Market segment'.l('SC61100'),
                            emptyText: 'Select Market segment'.l('SC61100'),
                            allowBlank: true,
                            store: 'mastervalues.MarketSourceStore',
                            queryMode: 'local',
                            displayField: 'Name',
                            valueField: 'MarketSourceId'
                        }, {
                            xtype: 'combo',
                            fieldLabel: 'SICC'.l('SC61100'),
                            name: 'SicId',
                            emptyText: 'Select Industry-SIC'.l('SC61100'),
                            allowBlank: true,
                            store: 'mastervalues.SicCodeStore',
                            queryMode: 'local',
                            displayField: 'Name',
                            valueField: 'SicId'
                        }, {
                            fieldLabel: 'Web address'.l('SC61100'),
                            allowBlank: true,
                            maxLength: 400,
                            name: 'Website'
                        }, { fieldLabel: 'Twitter'.l('SC61100'),
                            maxLength: 150,
                            name: 'Twitter'
                        }, { fieldLabel: 'Facebook'.l('SC61100'),
                            maxLength: 150,
                            name: 'Facebook'
                        }, { fieldLabel: 'LinkedIn'.l('SC61100'),
                            maxLength: 150,
                            name: 'LinkedIn'
                        },
                         {
                             xtype: 'radiogroup',
                             fieldLabel: 'Invoice Pref'.l('SC61100'),
                             width: '100%',
                             columns: 2,
                             vertical: false,
                             allowBlank: true,
                             items: [{
                                 boxLabel: 'Regular mail'.l('SC61110'),
                                 name: 'InvoicedBy',
                                 inputValue: 0
                             }, {
                                 boxLabel: 'E-mail'.l('SC61110'),
                                 name: 'InvoicedBy',
                                 inputValue: 1,
                                 padding: '0 0 0 10'
                             }],
                             listeners: {
                                 change: function (field, newValue, oldValue) {
                                     var InvoiceEmailTextField = Ext.ComponentQuery.query('textfield[itemid="InvoiceEmailTextField"]')[0];
                                     InvoiceEmailTextField.setValue(null);
                                     if (newValue.InvoicedBy == 0) {
                                         InvoiceEmailTextField.disable(1);
                                         
                                     }
                                     else {
                                         InvoiceEmailTextField.enable(1);
                                       
                                     }
                                 }
                             }
                         }, {
                             xtype: 'textfield',
                             fieldLabel: 'E-mail'.l('SC61110'),
                             itemid: 'InvoiceEmailTextField',
                             vtype: 'email',
                             name: 'InvoiceEmail',
                             
                         }, {
                             xtype: 'hidden',
                             name: 'BusinessTypeId'
                         }, {
                             xtype: 'hidden',
                             name: 'NoOfEmployees'
                         }, {
                             xtype: 'hidden',
                             name: 'NoOfBookingAYear'
                         }, {
                             xtype: 'hidden',
                             name: 'GroupSizeMin'
                         }, {
                             xtype: 'hidden',
                             name: 'GroupSizeMax'
                         }, {
                             xtype: 'hidden',
                             name: 'NoOfRoomNightsAYear'
                         }, {
                             xtype: 'hidden',
                             name: 'LeadStatusId'
                         }, {
                             xtype: 'hidden',
                             name: 'Clientpagelink'
                         }, {
                             xtype: 'hidden',
                             name: 'ClientpageLogin'
                         }, {
                             xtype: 'hidden',
                             name: 'ClientpagePwd'
                         }, {
                             xtype: 'hidden',
                             name: 'SalesManagerAssistantId'
                         }, {
                             xtype: 'hidden',
                             name: 'BuyingReasonIds'
                         }, {
                             xtype: 'hidden',
                             name: 'CompetitorsIds'
                         }, {
                             xtype: 'hidden',
                             name: 'PotentialPropertyIds'
                         }, {
                             xtype: 'hidden',
                             name: 'PotentialMeetingtypeIds'
                         }, {
                             xtype: 'hidden',
                             name: 'BuyingReasonOther'
                         }, {
                             xtype: 'hidden',
                             name: 'CompetitorsOther'
                         }, {
                             xtype: 'hidden',
                             name: 'PaymentMode'
                         }, {
                             xtype: 'hidden',
                             name: 'IsAllProperties'
                         }, {
                             xtype: 'hidden',
                             name: 'IsAllMeetingTypes'
                         }, {
                             xtype: 'hidden',
                             name: 'PotentialRevenue'
                         }, {
                             xtype: 'hidden',
                             name: 'RevenueTotalInNL'
                         }]
                     }, 
                    {
                        xtype: 'fieldset',
                        title: 'Relations'.l('SC61100'),
                        width: '98%',
                        height: parseInt(me.height * (0.28)),
                        defaultType: 'textfield',
                        items: [{
                            xtype: 'panel',
                            border: false,
                            style: 'background:none; border:0px;',
                            layout: 'hbox',
                            padding: '0 0 5 0',
                            items: [{
                                xtype: 'displayfield',
                                fieldLabel: 'Parent Company'.l('SC61100'),
                                labelWidth: 120,
                                name: 'ParentCompanyName',
                                width: '90%',
                                value: me.ParentCompany
                            }, {
                                xtype: 'button',
                                labelWidth: 120,
                                itemid: 'btnParentCompany',
                                action: 'btnParentCompany',
                                iconCls: 'searchIcon',
                                margin: '0'
                            }]
                        }, {
                            xtype: 'panel',
                            border: false,
                            style: 'background:none; border:0px;',
                            layout: 'hbox',
                            padding: '0 0 3 0',
                            items: [{
                                xtype: 'displayfield',
                                fieldLabel: 'Agency'.l('SC61100'),
                                width: '90%',
                                name: 'AgencyName',
                                value: me.Agency
                            }, {
                                xtype: 'button',
                                itemid: 'btnAgency',
                                action: 'btnAgency',
                                iconCls: 'searchIcon',
                                margin: '0'
                            }]
                        }, {
                            xtype: 'tbspacer',
                            height: 1
                        }, {
                            fieldLabel: 'Delphi ID'.l('SC61100'),
                            maxLength: 150,
                            name: 'DelphiID'
                        }]
                    }]
                }, {
                    xtype: 'tbspacer',
                    width: 10
                }, {
                    xtype: 'panel',
                    //frame: true,
                    border: false,
                    width: '33%',
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    padding: '0 0 5 0',
                    items: [{
                        xtype: 'domainlistforcompany',
                        height: parseInt(me.height * (0.41)),
                        width: '100%',
                        autoScroll: true
                    }, {
                        xtype: 'tbspacer',
                        height: 10
                    }, {
                        xtype: 'childcompanylist',
                        height: parseInt(me.height * (0.55)),
                        width: '100%',
                        autoScroll: true
                    }]
                }, {
                    xtype: 'tbspacer',
                    width: 10
                }, {
                    xtype: 'panel',
                    border: false,
                    width: '33%',
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    padding: '0 0 5 0',
                    items: [{
                        xtype: 'fieldset',
                        title: 'Comments'.l('SC61300'),
                        width: '90%',
                        height: parseInt(me.height * (0.41)),
                        defaultType: 'textfield',
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },

                        items: [{
                            xtype: 'textarea',
                            height: 160,
                            name: 'Notes'
                        }]
                    }, {
                        xtype: 'globaldistributionsystem',
                        itemid: 'globaldistributionsystem',
                        width: '90%',
                        height: parseInt(me.height * (0.55)),
                        autoScroll: true
                    }]
                }]
            }]
        }];
        me.callParent(arguments);
    }
});