Ext.define('Regardz.view.bookingwizard.RightSide.IntakeNotes', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.rightintakenotes',
    localObject: {},
    initComponent: function () {
        var me = this;
        //        this.localObject.CompanyName = "NINtec B.V.";
        //        this.localObject.Contact = "Ted Koch";
        //        this.localObject.Email = "ted.koch@nintec.com";
        //        this.localObject.Telephone = "079-2300980";
        //this.localObject.Color = "Green";
        //this.localObject.CompanyRate = "AA";
        this.localObject.CompanyRateValue = "80 K";


        me.height = 250;

        me.buttonAdd = Ext.create('Ext.Button', {
            scale: 'small',
            itemid: 'intakeNoteCompanyContractId',
            action: 'openCompanyContract',
            iconCls: 'contract',
            //margin: '10 0 5 10',
            border: true,
            disabled: true,
            iconAlign: 'left',
            tooltip: 'Contract information'.l('SC50000')
        });

        me.buttonContractEdit = Ext.create('Ext.Button', {
            scale: 'small',
            itemid: 'intakeNoteContractEditId',
            action: 'openCompanyContractEdit',
            iconCls: 'Add_Individual',
            //margin: '10 0 5 10',
            border: true,
            disabled: false,
            iconAlign: 'left',
            tooltip: 'Contact Search'.l('SC50000')
        });

        me.buttonAgencySettings = Ext.create('Ext.Button', {
            scale: 'small',
            itemid: 'intakeNoteCompanyAgencyId',
            action: 'openCompanyAgency',
            iconCls: 'company_Agency',
            //margin: '10 0 5 10',
            border: true,
            disabled: true,
            iconAlign: 'left',
            tooltip: 'Agency Settings'.l('SC50000')
        });


        me.tbar = [
            me.buttonAdd, me.buttonContractEdit, me.buttonAgencySettings
        ];
        me.CompanyInformation = {
            xtype: 'form',
            itemid: 'intakeNoteCompDetails',
            border: false,
            bodyStyle: 'background: none',
            layout: 'hbox',
            margin: '5',
            items: [{
                xtype: 'fieldcontainer',
                layout: 'vbox',
                width: '68%',
                defaults: {
                    labelWidth: 80
                },
                items: [{
                    xtype: 'fieldcontainer',
                    fieldLabel: '<b>'+'Company name'.l('SC50000')+'</b>',
                    labelWidth: 100,
                    margin: 0,
                    layout: 'hbox',
                    items: [{
                        xtype: 'displayfield',
                        name: 'CompanyName',
                        style: 'word-wrap:break-word;',
                        width: 100,
                        value: '<a href="#" onclick=""> - </a>'
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: '<b>' + 'Contact'.l('SC50000') + '</b>',
                    labelWidth: 100,
                    margin: 0,
                    items: [{
                        xtype: 'displayfield',
                        name: 'IndividualName',
                        style: 'word-wrap:break-word;',
                        width: 100
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: '<b>' + 'Email'.l('SC50000') + '</b>',
                    labelWidth: 100,
                    items: [{
                        xtype: 'displayfield',
                        name: 'Email',
                        style: 'word-wrap:break-word;',
                        width: 100
                    }]
                }, {
                    xtype: 'fieldcontainer',
                    fieldLabel: '<b>' + 'Telephone'.l('SC50000') + '</b>',
                    labelWidth: 100,
                    items: [{
                        xtype: 'displayfield',
                        name: 'Phone',
                        style: 'word-wrap:break-word;',
                        width: 100
                    }]
                }, {
                    xtype: 'hidden',
                    name: 'CompanyId'
                }, {
                    xtype: 'hidden',
                    name: 'IndividualId'
                }, {
                    xtype: 'hidden',
                    name: 'HasParent'
                }, {
                    xtype: 'hidden',
                    name: 'HasChild'
                }, {
                    xtype: 'hidden',
                    name: 'CompanyNameDisplay'
                }, {
                    xtype: 'hidden',
                    name: 'ContractId'
                }]
            },
                {
                xtype: 'panel',
                itemid: 'colorPanel',
                height: 50,
                width: '30%',
                textAlign: 'center',
                align: 'center',
                border: false,
                items: [{
                    xtype: 'displayfield',
                    //minHeight: 40,
                    //minWidth: 40,
                    margin: '8px 10px 0px 10px',
                    name: 'QualityRatingName'
                }]
            }]
        };

        me.preferencesPanel = Ext.create('Ext.grid.Panel', {
            store: 'bookingwizard.RightSide.INCompanyPreferencesStore',
            itemid: "preferencesGridIntakeNote",
            title: "Preferences".l('SC50000'),
            height: 200,
            loadMask: false,
            margin: '10',
            width: '100%',
            noResize: true,            
            viewConfig: {
                loadMask: false
            },
            columns: [
                    { baseCls: '', header: 'Preferences'.l('SC50000'), width: '98%', dataIndex: 'Classification' },
                    { hidden: true, dataIndex: 'RoomClassificationId', hideable: false }
            ]
        });
        me.items = [{
            layout: 'fit',
            xtype: 'fieldcontainer',
            width: '100%',
            autoScroll: true,
            items: [
            //    me.buttonAdd,
                    me.CompanyInformation,
                    {
                        xtype: 'textareafield',
                        itemid: 'intakeNoteSave',
                        rows: 10,
                        width: '100%',
                        margin: '10'
                    },
                    me.preferencesPanel
            ]
        }
        ];
        me.callParent();
    }
});