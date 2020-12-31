Ext.define('Regardz.view.company.ContactsList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.contactslist',
    store: 'company.CompanyContactListStore',
    loadMask: true,

    initComponent: function () {

        var me = this;
        //me.autoHeight = true;
        height = 300;
        me.title = "Contacts".l('SC61100');
        me.frame = true;
        me.columns = [
                { header: 'Name'.l('SC61100'), dataIndex: 'IndividualName', flex: 1 },
                { header: 'Title'.l('SC61100'), dataIndex: 'SalesManagerName', flex: 1 }, //SalesManagerId
                {dataIndex: 'IsVerified', align: 'center', width: 25, renderer: this.VerificationMail, name: 'VerificationMail'},
                { dataIndex: 'IndividualId', align: 'center', width: 25, renderer: this.ResetPwd, name: 'ResetPwd' },
                { dataIndex: 'IndividualId', align: 'center', width: 25, renderer: this.ContactEdit, name: 'ContactEdit' },
                { hidden: true, dataIndex: 'ContractId', align: 'center', hideable: false }
        ];

        me.tbar = [{
            xtype: 'button',
            action: 'addContact',
            iconCls: 'new',
            //text: 'Add New'.l('SC61300'),
            tooltip: 'Add Contact'.l('SC61100'),
            handler: function () {
                //Ext.create('widget.contractbedroom', { contractId: me.contractId })
                //Ext.create('widget.contactEdit', { contractId: me.contractId })
            }
        },
                { xtype: 'tbspacer',width:30 },
                {
                    xtype: 'radiogroup',
                    name: 'Status',
                    //itemid: 'rbtn_ContactStatus',
                    // action: 'contactStatusChange',
                    allowBlank: true,
                    vertical: false,
                    items: [
                    { boxLabel: 'Active'.l('SC61300'), name: 'Status', action: 'contactStatusChange', checked: true, inputValue: '1', width: 80 }, //.l('SC61300')
                    // {xtype: 'tbspacer' },
                    {boxLabel: 'All'.l('SC61300'), name: 'Status', inputValue: '0'}//action: 'contactStatusChange',.l('SC61300')
                    ]
                }
                ];

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            displayInfo: true,
            emptyMsg: "No data to display".l("g")
        };

        me.callParent();
    },

    VerificationMail: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value == false) {
            var tooltipText = 'Veification Mail'.l('SC61300');
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
            metadata.tdCls = 'icon-veri-mail';
            //return "<img src='public/icons/lock.png' title='" + tooltip + "' style='cursor:pointer'>";
        }
        else {
            metadata.tdCls = 'icon-veri-mail-disable';
        }
    },
    ResetPwd: function (value, metadata, record, rowIndex, colIndex, store) {
        if (value) {
            var tooltipText = 'Reset Password'.l('SC61300');
            metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
            metadata.tdCls = 'icon-resetPass';            
        }
        else {
            metadata.tdCls = 'icon-resetPass-disable';
        }
    },

    ContactEdit: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Edit Contact".l('SC61300');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-contactEdit';
        //return "<img src='public/icons/pencil.png' title='" + tooltipText + "' style='cursor:pointer'>";        
    }

});