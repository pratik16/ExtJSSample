Ext.define('Regardz.view.configuration.ReportsCategoryStructureItemManage', {
    extend: 'Ext.window.Window',
    alias: 'widget.reportscategorystructureitemmanage',
    modal: true,
    border: false,
    title: 'Category Structure Add_Title',
    categoryName: null,
    categoryId: null,
    langCategoryId: null,
    editMode: false,
    parentCategoryId: null,
    hideSibling: false,
    initComponent: function () {

        var me = this;

        me.itemid = 'categorystructureaddid';
        me.langClass = 'languagebutton';
        me.width = 400;
        me.items = [{
            xtype: 'panel',
            frame: true,
            padding: 15,
            layout: 'vbox',
            items: [{
                xtype: 'panel',
                frame: false,
                //padding: 15,
                border: false,
                layout: 'hbox',
                items: [{
                    xtype: 'label',
                    text: 'Name' + '*',
                    margin: 10
                },
                 {
                     xtype: 'textfield',
                     name: 'categoryname',
                     value: me.categoryName,
                     itemid: 'categoryStructureTextFieldId',
                     width: 200,
                     margin: 10
                 }]
            },
            {
                xtype: 'radiogroup',
                fieldLabel: 'Type' + '*',
                //defaultType: 'radiofield',
                margin: 10,
                allowBlank: false,
                hidden: me.editMode,
                itemid: "itemRadioGroupCategoryStructure",
                // defaults: { flex: 1 },
                layout: 'vbox',
                items: [{
                    boxLabel: 'Child',
                    name: 'itemType',
                    inputValue: 1,
                    checked: true,
                    itemid: "itemChildId"

                }, {
                    boxLabel: 'Sibling',
                    name: 'itemType',
                    inputValue: 2,
                    hidden: me.hideSibling,
                    itemid: 'itemSibling'
                }]
            },
            {
                xtype: 'hidden',
                itemid: 'langReportCategoryId',
                value: me.langCategoryId
            },
                 {
                     xtype: 'hidden',
                     itemid: 'reportCategoryId',
                     value: me.categoryId
                 },
                 {
                     xtype: 'hidden',
                     itemid: 'parentCategoryId',
                     value: me.parentCategoryId
                 },
                  {
                      xtype: 'hidden',
                      itemid: 'editModeId',
                      value: me.editMode
                  }
            ]
        }];

        me.dockedItems = [{
            dock: 'bottom',
            buttonAlign: 'right',
            buttons: [
                {
                    text: 'Cancel'.l('w'),
                    handler: function () {
                        me.destroy();
                    }
                },
                {
                    text: 'Save'.l('w'),
                    action: 'saveReportCategoryStructure',
                    itemid: 'addReportCategoryStructure'
                }
            ]
        },
        {
            dock: 'top',
            buttonAlign: 'right',
            buttons: [
                {
                    itemid: 'categoryStructureEditLanguageButtonId',
                    action: 'categoryStructureEditLanguageAction',
                    categoryId: me.categoryId,
                    iconCls: me.langClass,
                    hidden: !me.editMode,
                    tooltip: 'Update multilingual contents'.l('g')
                }
            ]
        }];
        me.callParent(arguments);
    }
});