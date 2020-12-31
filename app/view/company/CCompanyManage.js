Ext.define('Regardz.view.company.CCompanyManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.ccompanymanage',
    modal: true,
    border: false,
    width: 400,
    title: 'Add Company'.l('SC51100'),
    autoShow: true,

    initComponent: function () {
        /*This Screen is under development, Interface will TBD - MM*/
        var me = this;

        me.items = [{
            xtype: 'form',
            id: 'manageCompany',
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
                xtype: 'hidden',
                name: 'CompanyId',
                value: me.companyId
            }, {
                xtype: 'hidden',
                name: 'ParentCompanyId',
                value: me.parentCompanyId
            }, {
                xtype: 'hidden',
                name: 'SalesManagerId',
                value: me.salesManagerId
            }, {
                xtype: 'hidden',
                name: 'StatusId',
                value: me.statusId
            }, {
                xtype: 'textfield',
                fieldLabel: 'Company Name'.l('SC51100'),
                name: 'CompanyName',
                allowBlank: false,
                selectOnFocus: true
            }, {
                xtype: 'textfield',
                fieldLabel: 'Company Domain'.l('SC51100'),
                name: 'CompanyDomain',
                allowBlank: false,
                selectOnFocus: true
            }, {
                xtype: 'filefield',
                name: 'postedFile',
                labelAlign: 'left',
                fieldLabel: 'Upload Logo'.l('SC51100'),
                vtype: 'imgFile',
                blankText: 'Select the image file for upload'.l('SC51100'),
                typeAhead: true,
                selectOnFocus: true,
                buttonText: 'Browse...'.l('g')
            }, {
                xtype: 'combo',
                name: 'QualityRating',
                fieldLabel: 'Quality Rating',
                forceSelection: true,
                queryMode: 'local',
                displayField: 'Description',
                valueField: 'QualityRatingId',
                emptyText: "Select property".l('SC51100'),
                store: 'common.QualityRatingStore'
            }, {
                xtype: 'hidden',
                name: 'CreatedDate'
            }, {
                xtype: 'hidden',
                name: 'CreatedBy'
            }, {
                xtype: 'hidden',
                name: 'UpdatedDate'
            }, {
                xtype: 'hidden',
                name: 'UpdatedBy'
            }],
            buttons: [{
                text: 'Save'.l('w'),
                action: 'saveCompany'
            }, {
                text: 'Cancel'.l('w'),
                scope: me,
                handler: function () {
                    this.close();
                }
            }]
        }];
        me.callParent(arguments);
    }
});