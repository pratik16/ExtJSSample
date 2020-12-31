/*This Screen is under development, Interface will TBD - MM*/
Ext.define('Regardz.view.bookingwizard.CompanyContactManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.companycontactmanage',
    modal: true,
    border: false,
    width: 400,
    title: 'Add Company Contact_Title'.l('SC51120'),

    initComponent: function () {
        var me = this;
        me.items = [{
            xtype: 'form',
            //Sergiu:21.05.13//commented because get duplicate id
            //id: 'manageCompanyContacts',
            itemid: 'manageCompanyContacts',
            border: false,
            bodyStyle: 'background: none',
            style: "padding:10px;",
            fileUpload: true,
            defaults: {
                xtype: 'textfield',
                labelWidth: 125,
                anchor: '100%'
            },
            items: [{
                xtype: "checkbox",
                name: "NoEmail",
                fieldLabel: "No e-mail".l('SC51110'),
                boxLabel: "No e-mail address known".l('SC51110')
            }, {
                xtype: "textfield",
                fieldLabel: "Main e-mail".l('SC51110') + '*',
                name: "Email",
                vtype: 'email',
                allowBlank: false,
                itemid: 'companyEmail'
            }, {
                xtype: "textfield",
                fieldLabel: "Surname".l('SC51110') + '*',
                name: "LastName",
                allowBlank: false
            }, {
                xtype: "textfield",
                fieldLabel: "Initials".l('SC51110') + '*',
                name: "FirstName",
                allowBlank: false
            },
             {
                 xtype: "textfield",
                 fieldLabel: "Phone number".l('SC51120') + '*',
                 vtype: 'customPhoneNumber',
                 name: "Phone",
                 allowBlank: false
             }, {
                 xtype: 'hidden',
                 name: 'CreatedDate'
             }, {
                 xtype: 'hidden',
                 name: 'CreatedBy'
             }, {
                 xtype: 'hidden',
                 name: 'languageId'
             }, {
                 xtype: 'radiogroup',
                 fieldLabel: 'Gender'.l('SC51110') + '*',
                 allowBlank: false,
                 columns: [100],
                 name: 'Gender',
                 items: [{
                     boxLabel: 'Male'.l('SC51110'),
                     inputValue: 'M',
                     name: 'usr_gen_code'
                 }, {
                     boxLabel: 'Female'.l('SC51110'),
                     inputValue: 'F',
                     name: 'usr_gen_code'
                 }
                 ]
             }],
            buttons: [{
                text: 'Cancel'.l('g'),
                scope: me,
                handler: function () {
                    this.close();
                }
            }, {
                text: 'Save'.l('g'),
                action: 'saveIndividual',
                itemid: 'saveIndividual',
                formbind: true
            }]
        }];
        me.callParent(arguments);
    }
});