/*This Screen is under development, Interface will TBD - MM*/
Ext.define('Regardz.view.bookingwizard.BookingCompanyManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.bookingcompanymanage',
    modal: true,
    border: false,
    width: 400,
    title: 'Add Company and Contact_Title'.l('SC51110'),
    
    initComponent: function () {

        var me = this;

        me.items = [{
            xtype: 'form',
            //Sergiu:21.05.13//commented because get duplicate id
            itemid:'manageCompanyItem',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:10px;",
            fileUpload: true,
            defaults: {
                xtype: 'textfield',
                labelWidth: 125,
                anchor:'100%'
            },
            items: [
                {
                    xtype: "fieldset",
                    defaults: {
                        anchor: "100%"
                    },
                    title: "Contact Infomration".l('SC51110'),
                    items: [{
                        xtype: "checkbox",
                        name: "NoEmail",
                        fieldLabel: "No e-mail".l('SC51110'),
                        boxLabel: "No e-mail address known".l('SC51110'),
                        inputValue: 'true'
                    }, {
                        xtype: "textfield",
                        fieldLabel: "Main e-mail".l('SC51110')+'*',
                        name: "Email",
                        itemid: 'companyEmail',
                        vtype: "email",
                        allowBlank: false
                    }, {
                        xtype: "textfield",
                        fieldLabel: "Surname".l('SC51110')+'*',
                        name: "LastName",
                        allowBlank: false
                    }, {
                        xtype: "textfield",
                        fieldLabel: "Initials".l('SC51110')+'*',
                        name: "FirstName",
                        allowBlank: false
                    }, {
                        xtype: "textfield",
                        fieldLabel: "Phone number".l('SC51120') + '*',
                        name: "Phone",
                        allowBlank: false
                    }, {
                        xtype: 'radiogroup',
                        fieldLabel: 'Gender'.l('SC51110')+'*',
                        allowBlank: false,
                        columns: [100],
                        items: [{ boxLabel: 'Male'.l('SC61300'), name: 'Gender', inputValue: '1' },
                         { boxLabel: 'Female'.l('SC61300'), name: 'Gender', inputValue: '2'}]
                    }
				]
                }, {
                    xtype: "fieldset",
                    defaults: {
                        anchor: "100%"
                    },
                    title: "Company details".l('SC51110'),
                    items: [{
                        xtype: "textfield",
                        fieldLabel: "Name".l('SC51110') + '*',
                        name: "CompanyName",
                        allowBlank: false
                    }
				]
                }, {
                    xtype: 'hidden',
                    name: 'CreatedDate'
                }, {
                    xtype: 'hidden',
                    name: 'CreatedBy'
                }, {
                    xtype: 'hidden',
                    name: 'languageId'
                },
                {
                    xtype: 'hidden',
                    name: 'StatusId'
                    //value:'1'
                }
            ],
            buttons: [{
                text: 'Cancel'.l('g'),
                scope: me,
                handler: function () {
                    this.close();
                }
            }, {
                text: 'Save'.l('g'),
                action: 'saveCompanyBooking',
                itemid: 'saveCompany',
                formbind: true,
                disabled: false
            }]
        }];
        me.callParent(arguments);
    }
});