Ext.define('Regardz.view.company.ContactEdit', {
    extend: 'Ext.window.Window',
    alias: 'widget.contactEdit',
    modal: true,
    width: 1120,
    border: false,
    title: 'ContactEdit'.l('SC61300'), //Edit', //.l('SC61300'),
    autoShow: true,

    initComponent: function () {

        if (Ext.getCmp('contactEdit'))
            Ext.getCmp('contactEdit').destroy();

        var me = this;
        me.items = [{
            xtype: 'form',
            id: 'contactEdit',
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
                    xtype: 'panel',
                    //frame: true,
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    padding: '0 0 5 0',
                    items: [{
                        xtype: 'fieldset',
                        title: 'Personal Information'.l('SC61300'),
                        width: 350,
                        //collapsible: true,
                        defaultType: 'textfield',
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },
                        items: [{
                            fieldLabel: 'Surname'.l('SC61300'),
                            allowBlank: false,
                            name: 'Surname'
                        }, {
                            fieldLabel: 'Initials'.l('SC61300') + '*',
                            allowBlank: false,
                            name: 'Initials'
                        }, {
                            fieldLabel: 'First name'.l('SC61300'),
                            name: 'Firstname'
                        }, {
                            xtype: 'radiofield',
                            name: 'Gender',
                            //value: 'radiovalue1',
                            fieldLabel: 'Gender'.l('SC61300'),
                            boxLabel: 'Male'.l('SC61300'),
                            inputValue: 1
                        }, {
                            xtype: 'radiofield',
                            name: 'Gender',
                            //value: 'radiovalue3',
                            fieldLabel: '',
                            labelSeparator: '',
                            hideEmptyLabel: false,
                            boxLabel: 'Female'.l('SC61300'),
                            inputValue: 0
                        }, { fieldLabel: 'Function'.l('SC61300'),
                            name: 'General'
                        }, {
                            xtype: 'radiofield',
                            name: 'Gender',
                            //value: 'radiovalue1',
                            fieldLabel: 'Status'.l('SC61300'),
                            boxLabel: 'Active'.l('SC61300'),
                            inputValue: 1
                        }, {
                            xtype: 'radiofield',
                            name: 'Gender',
                            //value: 'radiovalue3',
                            fieldLabel: '',
                            labelSeparator: '',
                            hideEmptyLabel: false,
                            boxLabel: 'Inactive'.l('SC61300'),
                            inputValue: 0
                        }]
                    }, {
                        xtype: 'fieldset',
                        title: 'E-mail'.l('SC61300'),
                        width: 350,
                        //collapsible: true,
                        defaultType: 'textfield',
                        layout: 'anchor',
                        style: 'padding-left:30px',
                        defaults: {
                            anchor: '100%'
                        },

                        items: [{
                            xtype: 'checkbox',
                            //labelWidth: 130,
                            hideEmptyLabel: false,
                            boxLabel: 'No e-mail address known'.l('SC61300'),
                            fieldLabel: 'No e-mail'.l('SC61300'),
                            name: 'IsEmailknown',
                            inputValue: 'true'
                        }, { xtype: 'textfield', fieldLabel: 'Main e-mail'.l('SC61300'), allowBlank: false }, { xtype: 'textfield', fieldLabel: 'Secondary'.l('SC61300')}]
                    }
                    ]
                },
                { xtype: 'tbspacer', width: 25 }, {
                    xtype: 'panel',
                    //frame: true,
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    padding: '0 0 5 0',
                    items: [

                         {
                             xtype: 'fieldset',
                             title: 'Phone numbers'.l('SC61300'),
                             width: 350,
                             //collapsible: true,
                             defaultType: 'textfield',
                             layout: 'anchor',
                             style: 'padding-left:30px',
                             defaults: {
                                 anchor: '100%'
                             },

                             items: [{
                                 fieldLabel: 'General'.l('SC61300'),
                                 allowBlank: false,
                                 disabled: true,
                                 name: 'General'
                             }, {
                                 xtype: 'panel',
                                 //frame: true,
                                 border: false,
                                 style: 'background:none; border:0px;',
                                 layout: 'hbox',
                                 padding: '0 0 5 0',
                                 items: [{ xtype: 'textfield',
                                     fieldLabel: 'Direct'.l('SC61200'),
                                     vtype: 'customPhoneNumber',
                                     name: 'Direct',
                                     width: 175
                                 }, { xtype: 'textfield',
                                     fieldLabel: 'Ext'.l('SC61200'),
                                     labelStyle: 'padding-left:15px',
                                     labelWidth: 80,
                                     width: 150,
                                     name: 'Extention'
                                 }]
                             }, { fieldLabel: 'Mobile'.l('SC61200'),
                                 vtype: 'customPhoneNumber',
                                 name: 'Mobile'
                             }]
                         }, {
                             xtype: 'fieldset',
                             title: 'Configurations'.l('SC61300'),
                             width: 350,
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
                                 fieldLabel: 'Language'.l('SC61300'),
                                 name: 'Country',
                                 listeners: {
                                     afterrender: function (combo) {
                                         if (combo.value == undefined || combo.value == null)
                                             combo.setValue(1043);
                                     }
                                 }
                             }, {
                                 xtype: 'radiofield',
                                 name: 'Gender',
                                 //value: 'radiovalue1',
                                 fieldLabel: 'Prices'.l('SC61300'),
                                 boxLabel: 'Net'.l('SC61300'),
                                 inputValue: 1
                             }, {
                                 xtype: 'radiofield',
                                 name: 'Gender',
                                 //value: 'radiovalue3',
                                 fieldLabel: '',
                                 labelSeparator: '',
                                 hideEmptyLabel: false,
                                 boxLabel: 'Gross'.l('SC61300'),
                                 inputValue: 0
                             }, {
                                 xtype: 'checkbox',
                                 //labelWidth: 130,
                                 hideEmptyLabel: false,
                                 boxLabel: 'Yes, user participates'.l('SC61300'),
                                 fieldLabel: 'Extraaz'.l('SC61300'),
                                 name: 'IsEmailknown',
                                 inputValue: 'true'
                             }, {
                                 xtype: 'checkbox',
                                 //labelWidth: 130,
                                 hideEmptyLabel: false,
                                 boxLabel: 'Yes, user would like to receive newsletters'.l('SC61300'),
                                 fieldLabel: 'Newsletter'.l('SC61300'),
                                 name: 'IsEmailknown',
                                 inputValue: 'true',
                                 itemid: 'isNewsletterSubsCE',
                                 listeners: {
                                     afterrender: function () {
                                         var checkbox = Ext.ComponentQuery.query('edit checkbox[itemid=isNewsletterSubsCE]')[0];
                                         if (checkbox.value == false)
                                             checkbox.disable(1);
                                     },
                                     change: function (checkbox, newValue, oldValue, eOpts) {
                                         if (newValue == false)
                                             checkbox.disable(1);
                                     }
                                 }
                             }, { xtype: 'textarea',
                                 fieldLabel: 'Signature'.l('SC61300'),
                                 allowBlank: false,
                                 name: 'Signature'
                             }]
                         }
                    ]
                },
                { xtype: 'tbspacer', width: 25 }, {
                    xtype: 'panel',
                    //frame: true,
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    padding: '0 0 5 0',
                    items: [{
                        xtype: 'fieldset',
                        title: 'Private address'.l('SC61300'),
                        width: 350,
                        //collapsible: true,
                        defaultType: 'textfield',
                        layout: 'anchor',
                        style: 'padding-left:30px',
                        defaults: {
                            anchor: '100%'
                        },

                        items: [{ xtype: 'textarea',
                            fieldLabel: 'Address'.l('SC61300'),
                            allowBlank: false,
                            maxLength: 60,
                            name: 'Address'
                        }, {
                            fieldLabel: 'Postal code'.l('SC61300'),
                            allowBlank: false,
                            maxLength: 50,
                            name: 'PostalCode'
                        }, {
                            fieldLabel: 'City'.l('SC61300'),
                            maxLength: 100,
                            name: 'City'
                        }, {
                            xtype: 'combo',
                            fieldLabel: 'Country'.l('SC61300'),
                            name: 'CountryId',
                            emptyText: 'Select Country'.l('SC61300'),
                            allowBlank: false,
                            store: 'common.CountryStore',
                            queryMode: 'local',
                            displayField: 'CountryName',
                            valueField: 'CountryId'
                        }]
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
                    //me.destroy();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveContact'
            }]
        }];
        me.callParent(arguments);
    }
});