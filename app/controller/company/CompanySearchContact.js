Ext.define('Regardz.controller.company.CompanySearchContact', {
    extend: 'Ext.app.Controller',

    views: ['company.CompanySearchContactListWindow', 'company.ContactListWindow', 'company.CompanySearchContactList', 'company.CompanyContactList', 'bookingwizard.BookingWizardStep1'],
    stores: ['company.CompanySearchListStore', 'company.CompanyContactListStore'],
    companyController: false,

    init: function () {

        var me = this;
        //        if (typeof selectedCompnay == undefined) {
        //            var selectedCompnay = null;
        //            var selectedCompnayContact = null;
        //        }
        this.control({

            'companysearchcontactlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                   // console.log(iCellEl);
                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'Checked') {
                        this.SelectCompany(zRec);
                    }
                }
            },
            'companycontactlist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {

                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'Checked')
                        this.SelectCompanyContact(zRec);
                }
            },
            'companysearchcontactlistwindow': {
                afterrender: function () {
                    var c = me.getController('company.Company');

                    if (this.companyController == false) {
                        c.init();
                        this.companyController = true;
                    }
                }
            },
            'companysearchcontactlistwindow button[action="selectCompanyContact"]': {
                click: function (t, e, eo) { //t => this, e => event, eo => Eoptional

                    var win = Ext.WindowManager.getActive();
                    if (win) {
                        win.close();
                    }

                    var selectedCompnay = Ext.getStore('company.CompanySearchListStore').findRecord('Checked', true);
                    var selectedCompnayContact = Ext.getStore('company.CompanyContactListStore').findRecord('Checked', true);

                    if (selectedCompnay != null && typeof selectedCompnay != undefined) {
                        Ext.getCmp('lblSelectedCompany').setValue(selectedCompnay.data.CompanyName);

                        Ext.getCmp('intakeNotes').getForm().findField('company').setValue(selectedCompnay.data.CompanyName);

                        Ext.getCmp('contactInformation').getForm().findField('CompanyId').setValue(selectedCompnay.data.CompanyId);
                        Ext.getCmp('contactInformation').getForm().findField('CompanyName').setValue(selectedCompnay.data.CompanyName);
                    } else {
                        Ext.getCmp('lblSelectedCompany').setValue('');
                        Ext.getCmp('contactInformation').getForm().findField('CompanyId').setValue(0);
                        Ext.getCmp('contactInformation').getForm().findField('CompanyName').setValue('');
                    }

                    if (selectedCompnayContact != null && typeof selectedCompnayContact != undefined) {

                        Ext.getCmp('intakeNotes').getForm().findField('contact').setValue(selectedCompnayContact.data.IndividualName);
                        Ext.getCmp('intakeNotes').getForm().findField('email').setValue(selectedCompnayContact.data.Email);
                        Ext.getCmp('intakeNotes').getForm().findField('phone').setValue(selectedCompnayContact.data.Phone);

                        Ext.getCmp('lblSelectedCompanyContact').setValue(selectedCompnayContact.data.IndividualName);
                        Ext.getCmp('contactInformation').getForm().findField('IndividualId').setValue(selectedCompnayContact.data.IndividualId);
                        Ext.getCmp('contactInformation').getForm().findField('IndividualName').setValue(selectedCompnayContact.data.IndividualName);
                    } else {
                        Ext.getCmp('lblSelectedCompanyContact').setValue('');
                        Ext.getCmp('contactInformation').getForm().findField('IndividualId').setValue(0);
                        Ext.getCmp('contactInformation').getForm().findField('IndividualName').setValue('');
                    }

                }
            },
            'contactlistwindow button[action="selectIndividual"]': {
                click: function (t, e, eo) { //t => this, e => event, eo => Eoptional
                    var win = Ext.WindowManager.getActive();
                    if (win) {
                        win.close();
                    }

                    var selectedCompnayContact = Ext.getStore('company.CompanyContactListStore').findRecord('Checked', true);

                    if (selectedCompnayContact != null && typeof selectedCompnayContact != undefined) {
                        Ext.getCmp('lblSelectedCompany').setValue('');
                        Ext.getCmp('contactInformation').getForm().findField('CompanyName').setValue('');
                        Ext.getCmp('lblSelectedCompanyContact').setValue(selectedCompnayContact.data.IndividualName);
                        Ext.getCmp('contactInformation').getForm().findField('IndividualId').setValue(selectedCompnayContact.data.IndividualId);
                        Ext.getCmp('contactInformation').getForm().findField('IndividualName').setValue(selectedCompnayContact.data.IndividualName);
                    } else {
                        Ext.getCmp('lblSelectedCompanyContact').setValue('');
                        Ext.getCmp('contactInformation').getForm().findField('IndividualId').setValue(0);
                        Ext.getCmp('contactInformation').getForm().findField('IndividualName').setValue('');
                    }

                }
            }
        });
    },
    SelectCompany: function (rec) {
        //        Ext.getCmp('btnSelectCompanyContact').disable();
        //        Ext.getStore('company.CompanyContactListStore').proxy.setExtraParam('id', rec.data.CompanyId);
        //        Ext.getStore('company.CompanyContactListStore').proxy.setExtraParam('languageId', user_language);
        //        Ext.getStore('company.CompanyContactListStore').load();
    },
    SelectCompanyContact: function (rec) { }

});