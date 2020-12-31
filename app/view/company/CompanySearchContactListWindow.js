Ext.define('Regardz.view.company.CompanySearchContactListWindow', {
    extend: 'Ext.window.Window',
    alias: 'widget.companysearchcontactlistwindow',
    modal: true,
    width: 800,
    border: false,
    title: 'Company Search and Contact'.l('SC51100'),

    layout: 'fit',
    viewConfig: {
        forceFit: true
    },

    autoShow: true,

    initComponent: function () {

        var me = this;

        me.padding = '25px';

        me.items = [{
            xtype: 'panel',
            border: false,
            bodyStyle: 'background: none',
            items: [{
                xtype: 'companysearchcontactlist'
            }, {
                xtype: 'companycontactlist'
            }]
        }];



        me.buttons = [{
            text: 'Cancel'.l('g'),
            scope: me,
            handler: function () {
                this.close();
            }
        }, {
            text: 'Select'.l('g'),
            action: 'selectCompanyContact',
            id: 'btnSelectCompanyContact',
            disabled: true
        }];
        /*, {
        xtype: 'hidden',
        name: 'ProgramDefinitionId',
        id: 'programDefinitionID',
        value: me.programDefinitionId
        }*/
        me.callParent(arguments);
    }
});