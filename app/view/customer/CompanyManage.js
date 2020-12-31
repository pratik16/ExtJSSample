Ext.define('Regardz.view.customer.CompanyManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.companymanage',
    modal: true,
    width: 750,
    y: 0,
    border: false,
    title: 'Add Company_Title'.l('SC61200'),
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('addCompany'))
            Ext.getCmp('addCompany').destroy();

        var me = this;
        me.items = [{
            xtype: 'form',
            id: 'addCompany',
            border: false,
            bodyStyle: 'padding:5px 5px 0',
            //width: 350,
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
                layout: 'hbox',
                padding: '0 0 5 0',
                items: [{
                    xtype: 'hidden',
                    name: 'CompanyId',
                    value: me.companyId
                }, {
                    xtype: 'fieldset',
                    title: 'Contact Information'.l('SC61200'),
                    width: 350,
                    //collapsible: true,
                    defaultType: 'textfield',
                    layout: 'anchor',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [{
                        xtype: 'checkbox',
                        //labelWidth: 120,
                        hideEmptyLabel: false,
                        boxLabel: 'No e-mail address known'.l('SC61200'),
                        fieldLabel: 'No e-mail'.l('SC61200'),
                        name: 'NoEmail',
                        action: 'hasEMail',
                        inputValue: 'true'
                    }, {
                        xtype: 'panel',
                        //frame: true,
                        border: false,
                        style: 'background:none; border:0px;',
                        layout: 'hbox',
                        padding: '0 0 5 0',
                        items: [{
                            xtype: 'label',
                            width: 105,
                            text: 'Main e-mail'.l('SC61300') + '*:'
                        }, {
                            xtype: 'textfield',
                            width: 223,
                            vtype: 'email',
                            allowBlank: true,
                            name: 'Email',
                            itemid: 'emailfield'
                        }
										]
                    }, {
                        fieldLabel: 'Surname'.l('SC61200') + '*',
                        allowBlank: false,
                        maxLength: 225,
                        name: 'LastName'
                    }, {
                        fieldLabel: 'Initials'.l('SC61200') + '*',
                        allowBlank: false,
                        maxLength: 50,
                        name: 'Prefix'
                    }, {
                        fieldLabel: 'First name'.l('SC61200'),
                        allowBlank: true,
                        maxLength: 225,
                        name: 'FirstName'
                    }, {
                        xtype: 'radiogroup',
                        fieldLabel: 'Gender'.l('SC61200') + '*',
                        columns: 1,
                        allowBlank: false,
                        vertical: true,
                        items: [{
                            boxLabel: 'Male'.l('SC61200'),
                            name: 'Gender',
                            inputValue: '1'
                        }, {
                            boxLabel: 'Female'.l('SC61200'),
                            name: 'Gender',
                            inputValue: '0'
                        }
										]
                    }, {
                        fieldLabel: 'Function'.l('SC61200'),
                        maxLength: 200,
                        name: 'Function'
                    }, {
                        xtype: 'panel',
                        //frame: true,
                        border: false,
                        style: 'background:none; border:0px;',
                        layout: 'hbox',
                        padding: '0 0 5 0',
                        items: [{
                            xtype: 'textfield',
                            fieldLabel: 'Direct'.l('SC61200'),
                            name: 'Direct',
                            vtype: 'customPhoneNumber',
                            maxLength: 50,
                            width: 175
                        }, {
                            xtype: 'textfield',
                            fieldLabel: 'Ext'.l('SC61200'),
                            labelStyle: 'padding-left:15px',
                            labelWidth: 80,
                            width: 150,
                            maxLength: 50,
                            name: 'Extention'
                        }
										]
                    }, {
                        fieldLabel: 'Mobile'.l('SC61200'),
                        maxLength: 50,
                        vtype: 'customPhoneNumber',
                        name: 'Mobile'
                    }
								]
                }, {
                    xtype: 'tbspacer',
                    width: 25
                }, {
                    xtype: 'fieldset',
                    title: 'Company details'.l('SC61200'),
                    width: 350,
                    //collapsible: true,
                    defaultType: 'textfield',
                    layout: 'anchor',
                    style: 'padding-left:20px',
                    defaults: {
                        anchor: '100%'
                    },
                    items: [{
                        fieldLabel: 'Name'.l('SC61200') + '*',
                        allowBlank: false,
                        maxLength: 400,
                        name: 'CompanyName'
                    }, {
                        fieldLabel: 'Central phone'.l('SC61200'),
                        maxLength: 50,
                        vtype: 'customPhoneNumber',
                        name: 'Phone'
                    }, {
                        fieldLabel: 'Fax'.l('SC61200'),
                        vtype: 'customPhoneNumber',
                        maxLength: 50,
                        name: 'Fax'
                    }, {
                        fieldLabel: 'Website'.l('SC61200'),
                        maxLength: 400,
                        name: 'Website'
                    }, {
                        xtype: 'textarea',
                        fieldLabel: 'Address'.l('SC61200') + '*',
                        allowBlank: false,
                        maxLength: 60,
                        name: 'Address1'
                    }, {
                        fieldLabel: 'Postal code'.l('SC61200') + '*',
                        allowBlank: false,
                        maxLength: 50,
                        name: 'Pincode'
                    }, {
                        fieldLabel: 'City'.l('SC61200'),
                        maxLength: 100,
                        name: 'City'
                    }, {
                        xtype: 'hidden',
                        name: 'CreatedDate'
                    }, {
                        xtype: 'hidden',
                        name: 'CreatedBy'
                    }, {
                        xtype: 'hidden',
                        name: 'AddressTypeId'
                    }, {
                        xtype: 'hidden',
                        name: 'StatusId'
                    }, {
                        xtype: 'hidden',
                        name: 'LanguageId'
                    }, {
                        xtype: 'combo',
                        fieldLabel: 'Country'.l('SC61200') + '*',
                        name: 'CountryId',
                        emptyText: 'Select Country'.l('SC61200'),
                        allowBlank: false,
                        store: 'common.CountryStore',
                        queryMode: 'local',
                        displayField: 'CountryName',
                        valueField: 'CountryId'
                    }, {

                        xtype: 'form',
                        border: false,
                        style: 'background:none; border:0px;',
                        autoScroll: false,
                        id: 'addressTypes'
                    }, {
                        xtype: 'form',
                        border: false,
                        style: 'background:none; border:0px;',
                        autoScroll: false,
                        id: 'companyStatus',
                        itemid: 'addCompCmpSts'
                    }, {
                        xtype: 'combo',
                        itemid: 'companyStatusComboNewComp',
                        store: 'mastervalues.CompanyStatusStore',
                        queryMode: 'local',
                        displayField: 'Status',
                        valueField: 'CompanyStatusId',
                        hidden: true
                    }
								]
                }
						]
            }
				],
            buttons: [{
                text: 'Cancel'.l('w'),
                handler: function () {
                    me.close();
                }
            }, {
                text: 'Next'.l('w'),
                action: 'saveCompany',
                itemid: 'saveCompany'
            }
				]
        }
		];
        me.callParent(arguments);
    }
});