Ext.define('Regardz.view.bookingwizard.RightSide.Windows.CompanyAgencyWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.companyagencywindow',
    modal: true,
    border: false,
    title: 'Agency Settings_Title'.l('SC51000'),
    iconCls: 'info_icon',
    width: '100%',
    initComponent: function () {

        var me = this;

        me.itemid = 'competitorinfo';
        me.width = '40%';


        if (Ext.getCmp('agencySettingsWin')) {
            Ext.getCmp('agencySettingsWin').destroy();
        }

        me.agencySettings = {
            xtype: 'form',
            border: false,
            bodyStyle: 'background: none',
            cls: 'propertyEdit',
            padding: '25px',
            id: 'agencySettingsWin',
            itemid: 'agencySettingsWin',
            width: '100%',
            //  defaults: { style: "padding: 0 0 45px 0" },
             

            items: [{
                xtype: 'hidden',
                name: 'AgencyIndividualId',
                value: 0
            }, {
                xtype: 'hidden',
                name: 'AgencyCompanyId',
                value: 0
            }, {
                xtype: 'hidden',
                name: 'ReservationId',
                value: 0
            }, {
                xtype: 'panel',
                items: [{
                    layout: 'hbox',
                    flex: 1,
                    items: [{
                        xtype: 'textfield',
                        name: 'accountName',
                        fieldLabel: 'Account Name'.l('SC51000') + '*',
                        allowBlank: false,
                        layout: 'form',
                        flex: 1
                    }]
                }, {
                    layout: 'hbox',
                    items: [{
                        xtype: 'fieldcontainer',
                        fieldLabel: 'Invoce to'.l('SC51000'),
                        defaultType: 'radiofield',
                        allowBlank: false,
                        anchor: '100%',
                        //width: '96%',
                        defaults: { flex: 1 },
                        layout: 'vbox',
                        itemid: 'agencyRadioFieldSet',
                        items: [{
                            boxLabel: 'Agency'.l('SC51000'),
                            name: 'color',
                            inputValue: 'agency',
                            checked: true,
                            //id: 'radioagency',
                            itemid: 'radioAgency'
                        }, {
                            boxLabel: '-',
                            name: 'color',
                            inputValue: 'grey',
                            width: 200,
                            //id: 'radio-',
                            itemid: 'radioAgencySelectCompany'
                        }]
                    }, {
                        xtype: 'tbfill'
                    }, {
                        xtype: 'button',
                        action: 'searchCompany2',
                        iconCls: 'icon-company',
                        itemid: 'btnSearchCompanyAgency',
                        tooltip: 'Search/Add company'.l('SC51000'),
                        margin: '15 0 0 0',
                        disabled: true
                    }]
                }]
            }]
        };


        me.items = [
           me.agencySettings
        ];
        me.buttons = [{
            text: 'Close'.l('w'),
            handler: function () {
                me.close();
            }
        }, {
            text: 'Save'.l('w'),
            action: 'saveAgencyDetailsFromIntakeNote'
        }];


        me.callParent(arguments);
    }
});