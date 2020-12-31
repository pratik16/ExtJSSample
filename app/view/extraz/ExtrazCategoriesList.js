Ext.define('Regardz.view.extraz.ExtrazCategoriesList', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.extrazcategorieslist',
    store: 'extraz.ExtrazCategoriesListStore',
    itemid: 'extrazcategorieslistgrid',
    requires: [
		'Ext.ux.form.SearchField'
	],

    loadMask: true,

    initComponent: function () {

        var me = this;
        me.autoHeight = true;
        me.title = 'Categories'.l('SC37110');
        me.columns = [{
            header: 'Name'.l('SC37110'),
            dataIndex: 'Name',
            flex: 1
        }, {
            dataIndex: 'WebShopCategoryId',
            renderer: this.editWebShopCategory,
            align: 'center',
            width: 25,
            name: 'WebShopCategoryEdit',
            hideable: false
        }, {
            dataIndex: 'WebShopCategoryId',
            renderer: this.deteleWebShopCategory,
            align: 'center',
            width: 25,
            name: 'WebShopCategoryDelete',
            hideable: false
        },{
            hidden: true,
            dataIndex: 'WebShopCategoryId',            
            hideable: false
        }];

        me.tbar = [{
            xtype: 'button',
            action: 'addNewWebshopCategory',
            iconCls: 'new',
            text: '',
            tooltip: 'Add new category'.l('SC37110')
        }, '->', {
            xtype: 'button',
            iconCls: 'filter',
            disabled: true
        }, {
            xtype: 'searchfield',
            store: Ext.getStore('extraz.ExtrazCategoriesListStore'),
            iconCls: 'filter',
            paramName: 'searchString'
        }];

        me.bbar = {
            xtype: 'pagingtoolbar',
            store: this.store,
            displayInfo: true,
            emptyMsg: "No data to display".l("g")
        };

        me.callParent();
    },

    editWebShopCategory: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Edit Category".l('SC37110');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-edit';
    },

    deteleWebShopCategory: function (value, metadata, record, rowIndex, colIndex, store) {
        var tooltipText = "Delete Category".l('SC37110');
        metadata.tdAttr = 'data-qtip="' + tooltipText + '"';
        metadata.tdCls = 'icon-delete';
    }

});