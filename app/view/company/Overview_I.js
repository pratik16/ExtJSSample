Ext.define('Regardz.view.company.Overview_I', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.overview_I',
    modal: true,
    border: false,
    autoShow: true,
    width: '100%',
    initComponent: function () {

        if (Ext.getCmp('Overview_I'))
            Ext.getCmp('Overview_I').destroy();

        var me = this;
        me.items = [{
            xtype: 'form',
            id: 'Overview_I',
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
                    //frame: true,
                    width: '30%',
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    padding: '0 0 3 0',
                    items: [{
                        xtype: 'fieldset',
                        title: 'General Information'.l('SC61300'),
                        //collapsible: true,
                        width: '100%',
                        defaultType: 'textfield',
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },
                        items: [{
                            xtype: 'container',
                            layout: 'hbox',
                            padding: '0 0 3px 0',
                            width: '100%',
                            flex: 1,
                            items: [{
                                xtype: 'displayfield',
                                fieldLabel: 'Name'.l('SC61300'),
                                width: '90%',
                                renderer: columnWrap,
                                name: 'IndividualName'
                            }, {
                                xtype: 'button',
                                action: 'showIndiComment',
                                iconCls: 'show_cmp_comment',
                                margin: '0 5 0 5',
                                tooltip: 'Click here to show comment'.l('SC61100')
                            }]
                        }, {
                            xtype: 'container',
                            layout: 'hbox',
                            padding: '0 0 3px 0',
                            width: '100%',
                            flex: 1,
                            items: [{
                                xtype: 'displayfield',
                                fieldLabel: 'First name'.l('SC61300'),
                                width: '90%',
                                renderer: columnWrap,
                                name: 'FirstName'
                            }, {
                                xtype: 'button',
                                action: 'sendVeriMailtoIndi',
                                iconCls: 'icon-veri-mail',
                                margin: '0 5 0 5',
                                tooltip: 'Click here to send verification email'.l('SC61300')
                            }]
                        }, {
                            xtype: 'container',
                            layout: 'hbox',
                            padding: '0 0 3px 0',
                            width: '100%',
                            flex: 1,
                            items: [{
                                xtype: 'displayfield',
                                fieldLabel: 'E-mail'.l('SC61300'),
                                width: '90%',
                                vtype: 'email',
                                renderer: columnWrap,
                                name: 'Email'
                            }, {
                                xtype: 'button',
                                action: 'sendMailforResetPassToIndi',
                                iconCls: 'icon-resetPass',
                                margin: '0 5 0 5',
                                tooltip: 'Click here reset password'.l('SC61300')
                            }]
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'Phone'.l('SC61300'),
                            name: 'Direct'
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'Mobile'.l('SC61300'),
                            name: 'Mobile'
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'Fax'.l('SC61300'),
                            name: 'Fax'
                        }, {
                            xtype: 'displayfield',
                            name: 'ActiveText',
                            //value: 'radiovalue1',
                            fieldLabel: 'Status'.l('SC61300')
                        }]
                    }, {
                        xtype: 'fieldset',
                        title: 'Postal address'.l('SC61300'),
                        width: '100%',
                        defaultType: 'textfield',
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },

                        items: [{
                            xtype: 'displayfield',
                            fieldLabel: 'Address'.l('SC61300'),
                            name: 'Address1_Postal'
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'Postal code'.l('SC61300'),
                            name: 'Pincode_Postal'
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'City'.l('SC61300'),
                            name: 'City_Postal'
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'Country'.l('SC61300'),
                            name: 'Country_Postal'
                        }
										]
                    }, {
                        xtype: 'fieldset',
                        title: 'Invoice address'.l('SC61300'),
                        width: '100%',
                        defaultType: 'textfield',
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },
                        items: [{
                            xtype: 'displayfield',
                            fieldLabel: 'Address'.l('SC61300'),
                            name: 'Address1_Invoice'
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'Postal code'.l('SC61300'),
                            name: 'Pincode_Invoice'
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'City'.l('SC61300'),
                            name: 'City_Invoice'
                        }, {
                            xtype: 'displayfield',
                            fieldLabel: 'Country'.l('SC61300'),
                            name: 'Country_Invoice'
                        }]
                    }]
                }, {
                    xtype: 'tbspacer',
                    width: 25
                }, {
                    xtype: 'panel',
                    //frame: true,
                    width: '30%',
                    border: false,
                    style: 'background:none; border:0px;',
                    layout: 'vbox',
                    padding: '0 0 5 0',
                    items: [{
                        xtype: 'tbspacer',
                        width: 25,
                        height: 10
                    }, {
                        xtype: 'bookingslist',
                        width: '100%',
                        height: parseInt(Ext.getBody().getViewSize().height * (0.35))

                    }, {
                        xtype: 'tbspacer',
                        width: 25,
                        height: 10
                    }, {
                        xtype: 'taskslist',
                        width: '100%',
                        height: parseInt(Ext.getBody().getViewSize().height * (0.35))
                    }]
                }, {
                    xtype: 'tbspacer',
                    width: 25
                }, {
                    xtype: 'panel',
                    //frame: true,
                    border: false,
                    autoScroll: true,
                    style: 'background:none; border:0px;verticle-align:top;',
                    layout: 'vbox',
                    width: '34%',
                    padding: '0 0 5 0',
                    items: [{
                        xtype: 'fieldset',
                        title: 'View'.l('SC61300'),
                        width: '90%',
                        autoScroll: true,
                        height: parseInt(Ext.getBody().getViewSize().height * (0.75)),
                        defaultType: 'textfield',
                        layout: 'anchor',
                        defaults: {
                            anchor: '100%'
                        },
                        items: [{
                            xtype: 'displayfield',
                            allowBlank: false,
                            renderer: newlineDisplay,
                            //height: 250,
                            name: 'Notes',
                            style: 'verticle-align:top;'
                        }, {
                            xtype: 'panel',
                            hidden: true,
                            id: 'taskviewid',
                            items: [{ xtype: 'companytaskview'}]
                        }, {
                            xtype: 'panel',
                            hidden: true,
                            id: 'bookingviewid',
                            itemid: 'bookingViewIndiOverview',
                            items: [{
                                xtype: 'rightbookingninformation'
                            }]
                        }]
                    }]
                }]
            }]
        }];
        me.callParent(arguments);
    }

});
