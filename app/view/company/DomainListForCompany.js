Ext.define('Regardz.view.company.DomainListForCompany', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.domainlistforcompany',
    store: 'company.DomainListStore',
    id: 'domainlistforcompany',
    loadMask: true,
    itemid: 'domainlistforcompanygrid',
    columnLines: false,
    cls: 'gridwhitebackground',
    selType: 'rowmodel',
    viewConfig: {
        forceFit: true,
        markDirty: false
    },
    plugins: [
		Ext.create('Ext.grid.plugin.RowEditing', {
		    clicksToEdit: 2
		})
	],

    initComponent: function () {

        var me = this;
        me.autoHeight = true;
        me.title = "E-mail domains".l('SC61100');
        me.columns = [{
            header: 'Domain Name'.l('SC61100'),
            dataIndex: 'DomainName',
            flex: 1,
            editor: {
                allowBlank: false,
                vtype: 'validDomain',
                maxLength: 200
            }
        }, {
            dataIndex: 'CompanyDomainId',
            renderer: this.deteleDomain,
            align: 'center',
            width: 25,
            name: 'CompDomainDelete',
            hideable: false
        }];

        me.tbar = [{
            xtype: 'button',
            action: 'addCompanyDomain',
            iconCls: 'new',
            text: 'Add New'.l('SC61100'),
            tooltip: 'Add Domain'.l('SC61100')
        }];

        me.callParent();
    },
    deteleDomain: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Delete Domain".l('SC61100');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-dele';
    }
});