Ext.define('Regardz.view.company.CompanyOverview', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.companyoverview',
    modal: true,
    autoScroll: true,
    border: false,
    //title: 'Company Overview', //.l('SC61100'),
    autoShow: true,
    //  height: parseInt(Ext.getBody().getViewSize().height * (0.95)) - 100,
    initComponent: function () {
        var me = this;

        me.editAddressRight = true;

        var editAddress = new Object();
        editAddress.moduleName = 'CUST002';

        if (Utils.ValidateUserAccess(editAddress)) {
            me.editAddressRight = false;
        }

        if (Ext.getCmp('CompanyOverview'))
            Ext.getCmp('CompanyOverview').destroy();

        if (Ext.getCmp('actualLogo'))
            Ext.getCmp('actualLogo').destroy();

        if (Ext.getCmp('imagetempView'))
            Ext.getCmp('imagetempView').destroy();

        if (Ext.getCmp('commentsView'))
            Ext.getCmp('commentsView').destroy();

        if (Ext.getCmp('addressView'))
            Ext.getCmp('addressView').destroy();

        if (Ext.getCmp('imageView'))
            Ext.getCmp('imageView').destroy();

        if (Ext.getCmp('imageThumb'))
            Ext.getCmp('imageThumb').destroy();

        if (Ext.getCmp('CompanyGeneralInfo'))
            Ext.getCmp('CompanyGeneralInfo').destroy();

        var me = this;

        me.generalInfo = {
            xtype: 'fieldset',
            title: 'General Information'.l('SC61100'),
            autoScroll: true,
            defaultType: 'textfield',
            width: '30%',
            height: '100%',
            items: [
                             {
                                 xtype: 'container',
                                 layout: 'hbox',
                                 padding: '0 0 5px 0',
                                 width: '100%',
                                 items: [{
                                     xtype: 'displayfield',
                                     fieldLabel: 'Name'.l('SC61100'),
                                     name: 'CompanyName',
                                     renderer: columnWrap,
                                     width: '80%',
                                     value: me.CompanyName
                                 }, {
                                     xtype: 'button',
                                     action: 'showCompanyComment',
                                     iconCls: 'show_cmp_comment',
                                     margin: '0 5 0 5',
                                     tooltip: 'Click here to show comment'.l('SC61100')
                                 }]
                             },
                            {
                                xtype: 'container',
                                layout: 'hbox',
                                padding: '0 0 5px 0',
                                width: '100%',
                                items: [{
                                    xtype: 'displayfield',
                                    fieldLabel: 'Abbreviation'.l('SC61100'),
                                    name: 'Abbreviation',
                                    width: '80%',
                                    renderer: columnWrap,
                                    value: me.Abbreviation
                                }, {
                                    xtype: 'button',
                                    action: 'showCompanyContract',
                                    itemid: 'showCompanyContractId',
                                    disabled: true,
                                    iconCls: 'show_cmp_contract',
                                    margin: '0 5 0 5',
                                    tooltip: 'Click here to show company contract'.l('SC61100')
                                }]
                            },
                             {
                                 xtype: 'displayfield',
                                 fieldLabel: 'Agency'.l('SC61100'),
                                 name: 'IsAgency',
                                 value: me.IsAgency
                             }, {
                                 xtype: 'displayfield',
                                 fieldLabel: 'Account ID'.l('SC61100'),
                                 name: 'AccountId',
                                 value: me.AccountId
                             }, {
                                 xtype: 'displayfield',
                                 fieldLabel: 'Phone'.l('SC61100'),
                                 name: 'Phone',
                                 value: me.Phone
                             }, {
                                 xtype: 'displayfield',
                                 fieldLabel: 'Fax'.l('SC61100'),
                                 name: 'Fax',
                                 value: me.Fax
                             },
                            {
                                xtype: 'panel',
                                //frame: true,
                                border: false,
                                style: 'background:none; border:0px;',
                                layout: 'hbox',
                                padding: '0 0 5 0',
                                items: [{
                                    xtype: 'label',
                                    width: 100,
                                    text: 'Visiting Address'.l('SC61100')
                                }, {
                                    xtype: 'button',
                                    hidden: true,
                                    text: 'View'.l('SC61100'),
                                    action: 'viewVisitAddr',
                                    tooltip: 'View Visiting Address'.l('SC61100'),
                                    itemid: 'btnViewVisitAddr',
                                    style: 'background:none;text-decoration: underline;border:0px;color: #0000FF;' //#0000FF,  -webkit-link
                                }, {
                                    xtype: 'button',
                                    hidden: true,
                                    text: 'Add'.l('SC61100'),
                                    action: 'addVisitAddr',
                                    style: 'background:none;text-decoration: underline;border:0px;color: #0000FF;',
                                    tooltip: 'Add Visiting Address'.l('SC61100'),
                                    disabled: me.editAddressRight,
                                    itemid: 'btnAddVisitAddr'
                                }]
                            }, {
                                xtype: 'panel',
                                //frame: true,
                                border: false,
                                style: 'background:none; border:0px;',
                                layout: 'hbox',
                                padding: '0 0 5 0',
                                items: [{
                                    xtype: 'label',
                                    width: 100,
                                    text: 'Postal Address'.l('SC61100')
                                }, {
                                    xtype: 'button',
                                    hidden: true,
                                    text: 'View'.l('SC61100'),
                                    style: 'background:none;text-decoration: underline;border:0px;color: -webkit-link',
                                    tooltip: 'View Postal Address'.l('SC61100'),
                                    action: 'viewPostAddr',
                                    itemid: 'btnViewPostAddr'
                                }, {
                                    xtype: 'button',
                                    hidden: true,
                                    text: 'Add'.l('SC61100'),
                                    action: 'addPostAddr',
                                    style: 'background:none;text-decoration: underline;border:0px;color: -webkit-link',
                                    tooltip: 'Add Postal Address'.l('SC61100'),
                                    disabled: me.editAddressRight,
                                    itemid: 'btnAddPostAddr'
                                }]
                            }, {
                                xtype: 'displayfield',
                                name: 'CompanyDomain',
                                labelWidth: 120,
                                fieldLabel: 'CompanyDomain'.l('SC61100'),
                                value: me.CompanyDomain
                            },
                             {
                                 xtype: 'panel',
                                 //frame: true,
                                 border: false,
                                 style: 'background:none; border:0px;',
                                 layout: 'hbox',
                                 padding: '0 0 5 0',
                                 items: [{
                                     xtype: 'label',
                                     width: 100,
                                     text: 'Invoice Address'.l('SC61100')
                                 }, {
                                     xtype: 'button',
                                     hidden: true,
                                     text: 'View'.l('SC61100'),
                                     action: 'viewInvoAddr',
                                     style: 'background:none;text-decoration: underline;border:0px;color: -webkit-link',
                                     tooltip: 'View Invoice Address'.l('SC61100'),
                                     itemid: 'btnViewInvoAddr'
                                 }, {
                                     xtype: 'button',
                                     hidden: true,
                                     text: 'Add'.l('SC61100'),
                                     action: 'addInvoAddr',
                                     style: 'background:none;text-decoration: underline;border:0px;color: -webkit-link',
                                     tooltip: 'Add Invoice Address'.l('SC61100'),
                                     disabled: me.editAddressRight,
                                     itemid: 'btnAddInvoAddr'
                                 }]
                             }, {
                                 xtype: 'displayfield',
                                 name: 'MarketSource',
                                 fieldLabel: 'MarketSource'.l('SC61100'),
                                 value: me.MarketSource
                             }, {
                                 xtype: 'displayfield',
                                 name: 'SicCodeName',
                                 fieldLabel: 'SicCodeName'.l('SC61100'),
                                 value: me.SicCodeName
                             }, {
                                 xtype: 'displayfield',
                                 name: 'Website',
                                 fieldLabel: 'Website'.l('SC61100'),
                                 value: me.Website
                             }, {
                                 xtype: 'displayfield',
                                 name: 'Twitter',
                                 fieldLabel: 'Twitter'.l('SC61100'),
                                 value: me.Twitter
                             }, {
                                 xtype: 'displayfield',
                                 name: 'Facebook',
                                 fieldLabel: 'Facebook'.l('SC61100'),
                                 value: me.Facebook
                             }, {
                                 xtype: 'displayfield',
                                 name: 'LinkedIn',
                                 fieldLabel: 'LinkedIn'.l('SC61100'),
                                 value: me.LinkedIn
                             },
                            {
                                xtype: 'hidden',
                                name: 'CompanyId',
                                value: me.CompanyId
                            }, {
                                xtype: 'hidden',
                                name: 'StatusId',
                                value: me.StatusId
                            }, {
                                xtype: 'hidden',
                                name: 'CompanyStatusCode'
                            }, {
                                xtype: 'hidden',
                                name: 'InvoicedBy'
                            }, {
                                xtype: 'hidden',
                                name: 'ThumbLogo',
                                value: me.ThumbLogo
                            }, {
                                xtype: 'hidden',
                                name: 'PreviewLogo',
                                value: me.PreviewLogo
                            }, {
                                xtype: 'hidden',
                                name: 'OriginalLogo',
                                value: me.OriginalLogo
                            }, {
                                xtype: 'hidden',
                                name: 'VisitingAddress',
                                value: me.VisitingAddress
                            }, {
                                xtype: 'hidden',
                                name: 'PostalAddress',
                                value: me.PostalAddress
                            }, {
                                xtype: 'hidden',
                                name: 'InvoiceAddress',
                                value: me.InvoiceAddress
                            }, {
                                xtype: 'hidden',
                                name: 'HasContract',
                                value: me.HasContract
                            }, {
                                xtype: 'hidden',
                                name: 'ContractId',
                                value: me.ContractId
                            }, {
                                xtype: 'hidden',
                                name: 'IsAgency',
                                value: me.IsAgency
                            }
                            ]
        };

        me.viewSection = {
            xtype: 'fieldset',
            title: 'View'.l('SC61300'),
            width: '30%',
            height: '100%',
            autoScroll: true,
            scrollOffset: 0,
            defaultType: 'textfield',
            layout: 'anchor',
            items: [{
                xtype: 'form',
                border: false,
                style: 'background:none; border:0px;',
                id: 'imagetempView',
                hidden: true,
                padding: 5,
                name: 'imagetempView',
                items: [{ xtype: 'image',
                    itemid: 'actualLogo',
                    id: 'actualLogo',
                    name: 'actualLogo',
                    src: '',
                    width: '100%'
                }]
            }, {
                xtype: 'form',
                //padding: '0 0 0 5',
                border: false,
                style: 'background:none; border:0px;',
                id: 'commentsView',
                htmlEncode: true,
                autoScroll: true,
                //height: 240,
                width: '95%',
                //height: 160,
                name: 'commentsView',
                items: [{ xtype: 'htmldisplayfield', name: 'Notes',
                    fieldLabel: ''//Comments'.l('SC61100')
                }]
            }, {
                xtype: 'panel',
                hidden: true,
                id: 'taskviewid',
                items: [{ xtype: 'companytaskview'}]
            }, {
                xtype: 'panel',
                hidden: true,
                id: 'contactviewid',
                items: [{ xtype: 'contactview'}]
            }, {
                xtype: 'panel',
                hidden: true,
                id: 'bookingviewid',
                itemid: 'bookingViewCmpOverview',
                items: [{
                    xtype: 'rightbookingninformation'
                }]
            }, {
                xtype: 'form',
                padding: '0 0 0 5',
                border: false,
                defaultType: 'displayfield',
                style: 'background:none; border:0px;',
                id: 'addressView',
                hidden: true,
                name: 'addressView',
                items: [{
                    xtype: 'panel',
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'hbox',
                    //padding: '0 0 5 0',
                    items: [{
                        xtype: 'displayfield',
                        fieldLabel: 'Address'.l('SC61300'),
                        allowBlank: false,
                        width: '90%',
                        name: 'Address1'
                    }, {
                        xtype: 'button',
                        name: 'btn_AddrEdit',
                        itemid: 'btn_AddrEdit',
                        action: 'addrEdit',
                        iconCls: 'icon-edit',
                        disabled: me.editAddressRight,
                        //margin: '0',
                        tooltip: 'Edit Address'.l('SC61100')
                    }]
                }, {
                    fieldLabel: 'Postal code'.l('SC61300'),
                    allowBlank: false,
                    name: 'Pincode'
                }, {
                    fieldLabel: 'City'.l('SC61300'),
                    name: 'City'
                }, {
                    fieldLabel: 'Country'.l('SC61100'),
                    name: 'CountryName'
                }, {
                    fieldLabel: 'Type'.l('SC61100'),
                    name: 'AddressType'
                }, {
                    xtype: 'hidden',
                    name: 'AddressId'
                }, {
                    xtype: 'hidden', name: 'AddressTypeId'
                }, {
                    xtype: 'hidden',
                    name: 'Code'
                }]
            }, {
                xtype: 'form',
                hidden: true,
                padding: '0 0 0 5',
                border: false,
                style: 'background:none; border:0px;',
                id: 'imageView',
                name: 'imageView',
                items: [{
                    xtype: 'image', itemid: 'companyLogo', name: 'comapnayLogo', height: 200, width: 200, border: true, src: 'http://www.sencha.com/img/20110215-feat-html5.png'
                }]
            }]
        };
        me.relation = {
            xtype: 'fieldset',
            title: 'Relations'.l('SC61100'),
            autoScroll: true,
            width: '30%',
            height: '100%',
            items: [{
                xtype: 'displayfield',
                fieldLabel: 'Parent Company'.l('SC61100'),
                labelWidth: 120,
                name: 'ParentCompanyName'
            }, {
                xtype: 'displayfield',
                fieldLabel: 'Child companies'.l('SC61100'),
                labelWidth: 120,
                name: 'ChildCompany'
            }, { xtype: 'displayfield',
                fieldLabel: 'Agency'.l('SC61100'),
                labelWidth: 120,
                name: 'IsAgency'
            }]
        };

        me.rightSectionImage = {
            xtype: 'panel',
            width: '10%',
            padding: '10 0 0 0',
            defaultType: 'textfield',
            items: [{
                xtype: 'panel',
                itemid: 'colorPanel',
                height: 50,
                textAlign: 'center',
                align: 'center',
                items: [{
                    xtype: 'displayfield',
                    padding: 10,
                    name: 'QualityRatingName'
                }
			]
            }, {
                xtype: 'tbspacer',
                height: 5
            }, {
                xtype: 'button',
                text: '',
                textAlign: 'left',
                tooltip: 'Upload Logo'.l('SC61160'),
                height: 25,
                iconCls: 'new',
                action: 'UploadLogo'
            }, {
                xtype: 'tbspacer',
                height: 5
            }, {
                xtype: 'image',
                style: 'cursor:pointer',
                itemid: 'imageThumb',
                name: 'imageThumb',
                id: 'imageThumb',
                alias: 'imageThumb',
                width: 50,
                src: ''
            }]
        };

        me.items = [
        {
            xtype: 'form',
            id: 'CompanyGeneralInfo',
            itemid: 'CompanyGeneralInfo',
            fileUpload: true,
            width: '100%',
            // height: me.height,
            items: [
                {
                    xtype: 'container',
                    layout: 'hbox',
                    width: '100%',
                    height: parseInt(me.height * (0.50)),
                    defaults: {
                        margin: '0 10 5 0'
                    },
                    items: [
                        me.generalInfo,
                        me.viewSection,
                        me.relation,
                        me.rightSectionImage
                    ]
                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    width: '100%',
                    height: parseInt(me.height * (0.50)),
                    defaults: {
                        margin: '0 10 5 0'
                    },
                    items: [
                       {
                           xtype: 'contactslist',
                           width: '30%',
                           height: '100%',
                           autoScroll: true
                       },
                       {
                           xtype: 'taskslist',
                           width: '30%',
                           height: '100%',
                           autoScroll: true
                       },
                       {
                           xtype: 'bookingslist',
                           width: '40%',
                           height: '100%',
                           autoScroll: true
                       }
                    ]
                }
            ]
        }];
        me.callParent(arguments);
    }
});
