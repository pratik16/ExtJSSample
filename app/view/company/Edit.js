Ext.define('Regardz.view.company.Edit', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.edit',
    modal: true,
    width: '100%',
    border: false,
    title: 'Individual'.l('SC61300'),
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('addIndividual'))
            Ext.getCmp('addIndividual').destroy();

        var me = this;
        me.items = [{
            xtype: 'form',
            id: 'addIndividual',
            border: false,
            bodyStyle: 'padding:5px 5px 0',
            fieldDefaults: {
                msgTarget: 'side',
                labelWidth: 100
            },
            defaults: {
                anchor: '100%'
            },

            fileUpload: true,
            items: [{
                xtype: 'panel',
                //frame: true,
                border: false,
                style: 'background:none; border:0px;',
                width: '30%',
                layout: 'hbox',
                padding: '0 0 5 0',
                items: [{
                    xtype: 'fieldset',
                    title: 'Personal Information'.l('SC61300'),
                    width: '30%',
                    //collapsible: true,
                    defaultType: 'textfield',
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [{
                        fieldLabel: 'Surname'.l('SC61300') + '*',
                        allowBlank: false,
                        maxLength: 225,
                        name: 'LastName'
                    }, {
                        fieldLabel: 'Initials'.l('SC61300') + '*',
                        maxLength: 50,
                        name: 'Prefix',
                        allowBlank: false
                    }, {
                        fieldLabel: 'First name'.l('SC61300'),
                        name: 'FirstName',
                        maxLength: 225,
                        allowBlank: true
                    }, {
                        xtype: 'radiogroup',
                        fieldLabel: 'Gender'.l('SC61200'),
                        columns: 1,
                        vertical: false,
                        items: [{ boxLabel: 'Male'.l('SC61300'), name: 'Gender', inputValue: '1' },
                         { boxLabel: 'Female'.l('SC61300'), name: 'Gender', inputValue: '2'}]
                    }, {
                        xtype: 'datefield',
                        name: 'DOB',
                        fieldLabel: 'Birthdate'.l('SC61300'),
                        format: usr_dateformat,
                        submitFormat: 'Y-m-d',
                        minDate: new Date(),
                        anchor: '100%'
                    }, {
                        xtype: 'checkbox',
                        //labelWidth: 130,
                        hideEmptyLabel: false,
                        boxLabel: 'No e-mail address known'.l('SC61300'),
                        fieldLabel: 'No e-mail'.l('SC61300'),
                        name: 'NoEmail',
                        action: 'hasEMail',
                        inputValue: 'true',
                        value: false
                    }, {
                        fieldLabel: 'Main e-mail'.l('SC61300') + '*',
                        vtype: 'email',
                        maxLength: 500,
                        allowBlank: false,
                        name: 'Email'
                    }, {
                        fieldLabel: 'Secondary e-mail'.l('SC61300') + '*',
                        vtype: 'email',
                        maxLength: 500,
                        allowBlank: true,
                        name: 'SecondaryEmail'
                    }, { fieldLabel: 'General'.l('SC61300'),
                        maxLength: 50,
                        vtype: 'customPhoneNumber',
                        name: 'Direct'
                    }, { fieldLabel: 'Mobile'.l('SC61300'),
                        vtype: 'customPhoneNumber',
                        maxLength: 50,
                        name: 'Mobile'
                    }, { fieldLabel: 'Fax'.l('SC61300'),
                        vtype: 'customPhoneNumber',
                        maxLength: 50,
                        name: 'Fax'
                    }, {
                        xtype: 'hidden',
                        name: 'CreatedDate'
                    }, {
                        xtype: 'hidden',
                        name: 'CreatedBy'
                    }, {
                        xtype: 'hidden',
                        name: 'UpdatedDate'
                    }, {
                        xtype: 'hidden',
                        name: 'UpdatedBy'
                    }, {
                        xtype: 'hidden',
                        name: 'IndividualId'
                    }, {
                        xtype: 'hidden',
                        //name: 'IndividualIdV',
                        value: me.IndividualId,
                        id: 'IndividualIdUpdate'
                    }, {
                        xtype: 'radiogroup',
                        fieldLabel: 'Invoice by'.l('SC61300') + '*',
                        columns: 1,
                        vertical: true,
                        allowBlank: false,
                        itemid: 'radiogroupEmail',
                        items: [{ boxLabel: 'Regular mail'.l('SC61300'), name: 'InvoicedBy', itemid: 'RadioButtonRegularMail', inputValue: 0 },
                         { boxLabel: 'E-mail'.l('SC61300'), name: 'InvoicedBy', itemid: 'RadioButtonEmail', inputValue: 1, checked: true}]
                    } /*{
                        xtype: 'radiofield',
                        name: '',
                        //value: 'radiovalue1',
                        fieldLabel: 'Invoice by'.l('SC61300') + '*',
                        
                        boxLabel: 'Regular mail'.l('SC61300'),
                        inputValue: 0
                    }, {
                        xtype: 'radiofield',
                        name: 'InvoicedBy',
                        //value: 'radiovalue3',
                        fieldLabel: '',
                        labelSeparator: '',
                        hideEmptyLabel: false,
                        boxLabel: 'E-mail'.l('SC61300'),
                        inputValue: 1
                    }*/, {
                        xtype: 'hidden',
                        name: 'SalesManagerId'
                    }, {
                        xtype: 'hidden',
                        name: 'SalesManagerName'
                    }, {
                        xtype: 'hidden',
                        name: 'BusinessTypeId'
                    }, {
                        xtype: 'hidden',
                        name: 'BehaviouralTypeId'
                    }, {
                        xtype: 'datefield',
                        name: 'WeddingAnniversary',
                        fieldLabel: '',
                        format: usr_dateformat,
                        submitFormat: 'Y-m-d',
                        hidden: true
                    }, {
                        xtype: 'hidden',
                        name: 'Interests'
                    }, {
                        xtype: 'hidden',
                        name: 'RegardzGimmickReceived'
                    }, {
                        xtype: 'hidden',
                        name: 'DelphiID'
                    }, {
                        xtype: 'hidden',
                        name: 'ChildrenName'
                    }, {
                        xtype: 'hidden',
                        name: 'Hobbies'
                    }, {
                        xtype: 'hidden',
                        name: 'FavoriteHoliday'
                    }, {
                        xtype: 'hidden',
                        name: 'ContactRoleIds'
                    }, {
                        xtype: 'hidden',
                        name: 'MailingCodeIds'
                    }, {
                        xtype: 'hidden',
                        name: 'RoomClassificationIds'
                    }, {
                        xtype: 'datefield',
                        name: 'JoinedTheCompany',
                        fieldLabel: '',
                        format: usr_dateformat,
                        submitFormat: 'Y-m-d',
                        hidden: true
                    }, {
                        xtype: 'hidden',
                        name: 'Department'
                    }, {
                        xtype: 'hidden',
                        name: 'ContactNamePronunication'
                        //                    }, {
                        //                        xtype: 'hidden',
                        //                        name: 'Notes'
                    }, {
                        xtype: 'hidden',
                        name: 'LocationNotes'
                    }]
                },
                { xtype: 'tbspacer', width: 25 }, {
                    xtype: 'panel',
                    //frame: true,
                    border: false,
                    width: '30%',
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    padding: '0 0 5 0',
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Postal address'.l('SC61300'),
                            width: '100%',
                            //collapsible: true,
                            defaultType: 'textfield',
                            layout: 'anchor',
                            style: 'padding-left:30px',
                            defaults: {
                                anchor: '100%'
                            },

                            items: [{ xtype: 'textarea',
                                fieldLabel: 'Address'.l('SC61300') + '*',
                                maxLength: 60,
                                allowBlank: false,
                                name: 'Address1_Postal'
                            }, {
                                fieldLabel: 'Postal code'.l('SC61300') + '*',
                                allowBlank: false,
                                vtype: 'alphanum',
                                maxLength: 50,
                                name: 'Pincode_Postal'
                            }, {
                                fieldLabel: 'City'.l('SC61300'),
                                maxLength: 100,
                                name: 'City_Postal'
                            }, {
                                xtype: 'hidden',
                                name: 'AddressTypeId_Postal',
                                value: 4
                            }, {
                                xtype: 'combo',
                                fieldLabel: 'Country'.l('SC61200') + '*',
                                name: 'CountryId_Postal',
                                emptyText: 'Select Country'.l('SC61200'),
                                allowBlank: false,
                                store: 'common.CountryStore',
                                queryMode: 'local',
                                displayField: 'CountryName',
                                valueField: 'CountryId'
                            }]
                        }, {
                            xtype: 'fieldset',
                            title: 'Invoice address'.l('SC61300'),
                            width: '100%',
                            //collapsible: true,
                            defaultType: 'textfield',
                            layout: 'anchor',
                            style: 'padding-left:30px',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [{
                                xtype: 'container',
                                layout: 'hbox',
                                padding: '0 0 5px 0',
                                items: [{
                                    xtype: 'displayfield',
                                    fieldLabel: 'Copy address'.l('SC61300') + ':',
                                    name: 'SalesManagerName'
                                }, {
                                    xtype: 'button',
                                    id: 'copyAddress',
                                    action: 'copyAddress',
                                    anchor: '',
                                    iconCls: 'icon-copy',
                                    margin: '0',
                                    tooltip: 'Copy address'.l('SC61300')
                                }]
                            }, /* {
                                xtype: 'button',
                                iconCls: 'icon-copy',
                                hideEmptyLabel: false,
                                boxLabel: 'Copy address'.l('SC61300') + ':',
                                id: 'copyAddress',
                                action: 'copyAddress',
                                anchor: ''
                            },*/{xtype: 'textarea',
                            fieldLabel: 'Address'.l('SC61300') + '*',
                            maxLength: 60,
                            allowBlank: false,
                            name: 'Address1_Invoice'
                        }, {
                            fieldLabel: 'Postal code'.l('SC61300') + '*',
                            maxLength: 50,
                            vtype: 'alphanum',
                            allowBlank: false,
                            name: 'Pincode_Invoice'
                        }, { fieldLabel: 'City'.l('SC61300'),
                            maxLength: 100,
                            name: 'City_Invoice'
                        }, {
                            xtype: 'hidden',
                            name: 'AddressTypeId_Invoice',
                            value: 5
                        }, {
                            xtype: 'combo',
                            fieldLabel: 'Country'.l('SC61200') + '*',
                            name: 'CountryId_Invoice',
                            emptyText: 'Select Country'.l('SC61200'),
                            allowBlank: false,
                            store: 'common.CountryStore',
                            queryMode: 'local',
                            displayField: 'CountryName',
                            valueField: 'CountryId'
                        }]
                    }
                    ]
                },
                { xtype: 'tbspacer', width: 25 }, {
                    xtype: 'panel',
                    //frame: true,
                    width: '33%',
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    padding: '0 0 5 0',
                    items: [
                        {
                            xtype: 'fieldset',
                            title: 'Configurations'.l('SC61300'),
                            width: '100%',
                            //collapsible: true,
                            defaultType: 'textfield',
                            layout: 'anchor',
                            style: 'padding-left:30px',
                            defaults: {
                                anchor: '100%'
                            },
                            items: [{
                                xtype: 'combo',
                                emptyText: 'Select Language'.l('SC61300'),
                                allowBlank: false,
                                fieldLabel: 'Language'.l('SC61300') + '*',
                                name: 'LanguageId',
                                store: 'common.AllLanguageListStore',
                                queryMode: 'local',
                                displayField: 'Name',
                                valueField: 'LanguageId',
                                listeners: {
                                    afterrender: function (combo) {
                                        if (combo.value == undefined || combo.value == null)
                                            combo.setValue(1043);
                                    }
                                }
                            },
                            {
                                xtype: 'radiogroup',
                                fieldLabel: 'Prices'.l('SC61300') + '*',
                                columns: 1,
                                vertical: false,
                                allowBlank: false,
                                items: [{ boxLabel: 'Net'.l('SC61300'), name: 'PricesValue', inputValue: 0 },
                                        { boxLabel: 'Gross'.l('SC61300'), checked: true, name: 'PricesValue', inputValue: 1}]
                            }, /*
                            {
                                xtype: 'radiofield',
                                name: 'PricesValue',
                                //value: 'radiovalue1',
                                fieldLabel: 'Prices'.l('SC61300') + '*',
                                allowBlank: false,
                                boxLabel: 'Net'.l('SC61300'),
                                inputValue: 0
                            }, {
                                xtype: 'radiofield',
                                name: 'PricesValue',
                                allowBlank: false,
                                //value: 'radiovalue3',
                                fieldLabel: '',
                                labelSeparator: '',
                                hideEmptyLabel: false,
                                boxLabel: 'Gross'.l('SC61300'),
                                inputValue: 1
                            },*/{
                            xtype: 'checkbox',
                            //labelWidth: 130,
                            hideEmptyLabel: false,
                            boxLabel: 'Yes, user participates'.l('SC61300'),
                            fieldLabel: 'Extraaz'.l('SC61300'),
                            name: 'IsExtraasSaved',
                            checked: true,
                            inputValue: 'true'
                        }, {
                            xtype: 'fieldcontainer',
                            fieldLabel: 'Newsletter'.l('SC61300'),
                            //labelWidth: 100,
                            items: [{
                                xtype: 'checkbox',
                                //hideEmptyLabel: false,
                                boxLabel: 'Yes, user would like to receive newsletters'.l('SC61300'),
                                //fieldLabel: 'Newsletter'.l('SC61300'),
                                name: 'IsNewsletterSubscribed',
                                itemid: 'isNewsletterSubs',
                                inputValue: 'true',
                                listeners: {
                                    afterrender: function () {
                                        var checkbox = Ext.ComponentQuery.query('edit checkbox[itemid=isNewsletterSubs]')[0];
                                        if (!checkbox.value)
                                            checkbox.disable(1);
                                        else
                                            checkbox.enable(1);
                                    },
                                    change: function (checkbox, newValue, oldValue, eOpts) {
                                        if (!newValue)
                                            checkbox.disable(1);
                                        else
                                            checkbox.enable(1);
                                    }
                                }
                            }]
                        }, {
                            xtype: 'textarea',
                            fieldLabel: 'Signature'.l('SC61300'),
                            maxLength: 1000,
                            name: 'SignatureText'
                        }, /* {
                            xtype: 'radiofield',
                            name: 'IsActiveValue',
                            //value: 'radiovalue1',
                            fieldLabel: 'Status'.l('SC61300'),
                            boxLabel: 'Active'.l('SC61300'),
                            inputValue: 1,
                            checked: true
                        }, {
                            xtype: 'radiofield',
                            name: 'IsActiveValue',
                            //value: 'radiovalue3',
                            fieldLabel: '',
                            labelSeparator: '',
                            hideEmptyLabel: false,
                            boxLabel: 'Inactive'.l('SC61300'),
                            inputValue: 0
                        },*/
                        {
                        xtype: 'radiogroup',
                        fieldLabel: 'Status'.l('SC61300'),
                        columns: 1,
                        vertical: false,
                        items: [{ boxLabel: 'Active'.l('SC61300'), name: 'IsActiveValue', inputValue: 1, checked: true },
                         { boxLabel: 'Inactive'.l('SC61300'), name: 'IsActiveValue', inputValue: 0}]
                    }]
                }, {
                    xtype: 'tbspacer',
                    width: 25,
                    height: 10
                }, {
                    xtype: 'fieldset',
                    title: 'Comments'.l('SC61300'),
                    width: '100%',
                    //collapsible: true,
                    defaultType: 'textarea',
                    layout: 'anchor',
                    maxLength: 500,
                    style: 'padding-left:30px',
                    defaults: {
                        anchor: '100%'
                    }, items: [{ xtype: 'textarea',
                        name: 'Notes'
                    }]
                }]
                }]
            }]
            //            buttons: [{
            //                text: 'Cancel'.l('w'),

            //                handler: function () {
            //                    me.close();
            //                    //me.destroy();
            //                }
            //            }, {
            //                text: 'Next', //.l('w'),
            //                action: 'saveIndividual'
            //            }]
        }];
        me.callParent(arguments);
    }
});