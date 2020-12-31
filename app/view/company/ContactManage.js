Ext.define('Regardz.view.company.ContactManage', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.contactmanage',
    modal: true,
    border: false,
    height: parseInt(Ext.getBody().getViewSize().height * (0.90)),
    //windowWidth: parseInt(Ext.getBody().getViewSize().width * (0.90)),
    width: '100%',
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('contactManage'))
            Ext.getCmp('contactManage').destroy();

        var me = this;
        me.frame = true;
        me.IndividualRoomClassification = {
            xtype: 'grid',
            title: 'Preferences'.l('SC61300'),
            store: Ext.getStore('customer.IndividualRoomClassificationStore'),
            itemid: 'IndividualRoomClassification',
            cls: 'gridwhitebackground',
            height: 200,
            frame: false,
            hideHeaders: true,
            autoScroll: true,
            border: true,
            columns: [{
                flex: 1,
                dataIndex: 'Classification'
            }, {
                width: 30,
                dataIndex: 'Checked',
                xtype: 'checkboxrow'
            }]
            //            tbar: ['->', {
            //                xtype: 'button',
            //                iconCls: 'filter',
            //                disabled: true
            //            }, {
            //                xtype: 'searchfield',
            //                store: Ext.getStore('customer.IndividualRoomClassificationStore'),
            //                iconCls: 'filter',
            //                paramName: 'searchString'
            //            }]
        };

        me.items = [{
            xtype: 'form',
            layout: 'fit',
            id: 'contactManage',
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
                width: '100%',
                style: 'background:none; border:0px;',
                layout: 'hbox',
                padding: '0 0 5 0',
                items: [{
                    xtype: 'panel',
                    width: '30%',
                    //frame: true,
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    padding: '0 0 5 0',
                    items: [{
                        xtype: 'fieldset',
                        title: 'Personal Information'.l('SC61300'),
                        width: '100%',
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
                            allowBlank: false,
                            maxLength: 50,
                            name: 'Prefix'
                        }, {
                            fieldLabel: 'First name'.l('SC61300'),
                            name: 'FirstName',
                            maxLength: 225,
                            allowBlank: true
                        }, {
                            xtype: 'radiogroup',
                            fieldLabel: 'Gender'.l('SC61200') + '*',
                            columns: 1,
                            allowBlank: false,
                            vertical: false,
                            items: [
                                { boxLabel: 'Male'.l('SC61300'), name: 'Gender', inputValue: '1' },
                                { boxLabel: 'Female'.l('SC61300'), name: 'Gender', inputValue: '2'}]
                        }, {
                            fieldLabel: 'Pronunciation'.l('SC61300'),
                            allowBlank: true,
                            maxLength: 200,
                            name: 'ContactNamePronunication'
                        }, {
                            xtype: 'datefield',
                            name: 'DOB',
                            fieldLabel: 'Birthdate'.l('SC61300'),
                            format: usr_dateformat,
                            submitFormat: 'Y-m-d',
                            minDate: new Date(),
                            anchor: '100%'
                        }, {
                            fieldLabel: 'Function'.l('SC61300'),
                            name: 'Function',
                            allowBlank: true
                        }, {
                            fieldLabel: 'Department'.l('SC61300'),
                            allowBlank: true,
                            maxLength: 200,
                            name: 'Department'
                        }, {
                            xtype: 'hidden',
                            name: 'CreatedDate'
                        }, {
                            xtype: 'hidden',
                            name: 'CompanyId',
                            value: me.CompanyId
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
                            name: 'IndividualId',
                            value: me.IndividualId
                        }, {
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
                            name: 'Notes'
                        }, {
                            xtype: 'hidden',
                            name: 'LocationNotes'
                        }]
                    }, {
                        xtype: 'fieldset',
                        title: 'Web Information'.l('SC61100'),
                        width: '100%',
                        defaultType: 'textfield',
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },
                        items: [, {
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
                            itemid: 'contactMainEmail',
                            maxLength: 500,
                            allowBlank: true,
                            name: 'Email'
                        }, { fieldLabel: 'Secondary'.l('SC61300'),
                            maxLength: 500,
                            vtype: 'email',
                            allowBlank: true,
                            name: 'SecondaryEmail'
                        }, { fieldLabel: 'LinkedIn'.l('SC61100'),
                            maxLength: 150,
                            name: 'LinkedIn'
                        }, { fieldLabel: 'Twitter'.l('SC61100'),
                            maxLength: 150,
                            name: 'Twitter'
                        }, { fieldLabel: 'Facebook'.l('SC61100'),
                            maxLength: 150,
                            name: 'Facebook'
                        }]
                    }]
                },
                { xtype: 'tbspacer', width: 25 }, {
                    xtype: 'panel',
                    width: '30%',
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    padding: '0 0 5 0',
                    items: [{ xtype: 'fieldset',
                        title: 'Phone numbers'.l('SC61100'),
                        width: '100%',
                        //collapsible: true,
                        defaultType: 'textfield',
                        layout: 'anchor',
                        //style: 'padding-left:30px',
                        defaults: {
                            anchor: '100%'
                        },

                        items: [{ fieldLabel: 'General'.l('SC61300'),
                            labelWidth: 75,
                            maxLength: 50,
                            vtype: 'numeric',
                            disabled: true,
                            name: 'Phone'
                        }, {
                            xtype: 'panel',
                            //frame: true,
                            width: '100%',
                            border: false,
                            style: 'background:none; border:0px;',
                            layout: 'hbox',
                            padding: '0 0 5 0',
                            items: [{ xtype: 'textfield', labelWidth: 75, fieldLabel: 'Direct'.l('SC61300'), width: '50%', vtype: 'customPhoneNumber', maxLength: 50,
                                name: 'Direct'
                            }, { xtype: 'textfield', labelWidth: 50, labelStyle: 'padding-left:15px', fieldLabel: 'Ext'.l('SC61300'), width: '50%', vtype: 'numeric', maxLength: 15,
                                name: 'Extention'
                            }]
                        }, { fieldLabel: 'Mobile'.l('SC61300'),
                            labelWidth: 75,
                            maxLength: 50,
                            vtype: 'customPhoneNumber',
                            name: 'Mobile'
                        }, { fieldLabel: 'Fax'.l('SC61300'),
                            labelWidth: 75,
                            maxLength: 50,
                            vtype: 'customPhoneNumber',
                            name: 'Fax'
                        }]
                    }, {
                        xtype: 'fieldset',
                        title: 'Configurations'.l('SC61300'),
                        width: '100%',
                        //collapsible: true,
                        defaultType: 'textfield',
                        layout: 'anchor',
                        //style: 'padding-left:30px',
                        defaults: {
                            anchor: '100%'
                        },
                        items: [{
                            xtype: 'combo',
                            itemid: 'cmLangCombo',
                            emptyText: 'Select Language'.l('SC61300'),
                            allowBlank: false,
                            forceSelection: true, ///Dont Remove this
                            fieldLabel: 'Language'.l('SC61300') + '*',
                            name: 'LanguageId',
                            store: 'common.AllLanguageListStore',
                            queryMode: 'local',
                            displayField: 'Name',
                            valueField: 'LanguageId'
                            //                            listeners: {
                            //                                afterrender: function (combo) {
                            //                                    if (combo.value == undefined || combo.value == null)
                            //                                        combo.setValue(1043);
                            //                                }
                            //                            }
                        },
                           {
                               xtype: 'radiogroup',
                               fieldLabel: 'Prices'.l('SC61300') + '*',
                               columns: 1,
                               vertical: false,
                               allowBlank: false,
                               items: [{ boxLabel: 'Net'.l('SC61300'), name: 'PricesValue', inputValue: 0 },
                                        { boxLabel: 'Gross'.l('SC61300'), name: 'PricesValue', checked: true, inputValue: 1}]
                           },
                         {
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
                                 itemid: 'isNewsletterSubsCM',
                                 inputValue: 'true',
                                 listeners: {
                                     change: function (checkbox, newValue, oldValue, eOpts) {
                                         if (!newValue)
                                             checkbox.disable(1);
                                         else
                                             checkbox.enable(1);
                                     }
                                 }
                             }]
                         }, { xtype: 'textarea',
                             fieldLabel: 'Signature'.l('SC61300'),
                             grow: true,
                             growMax: 100,
                             maxLength: 1000,
                             name: 'SignatureText'
                         }, {
                             xtype: 'radiogroup',
                             fieldLabel: 'Status'.l('SC61200') + '*',
                             columns: 1,
                             allowBlank: false,
                             vertical: false,
                             items: [
                                { boxLabel: 'Active'.l('SC61300'), name: 'IsActiveValue', inputValue: 1, checked: true },
                                { boxLabel: 'Inactive'.l('SC61300'), name: 'IsActiveValue', inputValue: 0}]
                         }]
                    }]
                },
                { xtype: 'tbspacer', width: 25 }, {
                    xtype: 'panel',
                    width: '30%',
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    padding: '0 0 5 0',
                    items: [{
                        xtype: 'fieldset',
                        width: '100%',
                        title: 'Private address'.l('SC61100'),
                        //collapsible: true,
                        defaultType: 'textfield',
                        layout: 'anchor',
                        //style: 'padding-left:30px',
                        defaults: {
                            anchor: '100%'
                        },

                        items: [{
                            xtype: 'textarea',
                            fieldLabel: 'Address'.l('SC61300'),
                            allowBlank: true,
                            maxLength: 60,
                            name: 'Address1_Postal'
                        }, {
                            fieldLabel: 'Postal code'.l('SC61300'),
                            allowBlank: true,
                            //vtype: 'numeric',
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
                            fieldLabel: 'Country'.l('SC61200'),
                            name: 'CountryId_Postal',
                            emptyText: 'Select Country'.l('SC61200'),
                            allowBlank: true,
                            store: 'common.CountryStore',
                            queryMode: 'local',
                            displayField: 'CountryName',
                            valueField: 'CountryId'
                        }]
                    }, {
                        xtype: "container",
                        width: '100%',
                        items: [me.IndividualRoomClassification],
                        padding: '10px 0 0 0'
                    }]
                }]
            }]
        }];
        me.callParent(arguments);
    }
});