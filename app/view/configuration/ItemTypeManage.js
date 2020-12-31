Ext.define('Regardz.view.configuration.ItemTypeManage', {
	extend : 'Ext.window.Window',
	alias : 'widget.itemtypemanage',
	modal : true,
	width : 500,
	border : false,
	title : 'Add Item Type_Title'.l('SC20510'),
	autoShow : true,
	initComponent : function () {
		if (Ext.getCmp('additemtype'))
			Ext.getCmp('additemtype').destroy();
		var me = this;
		me.disableitems = true;
		if (me.itemTypeId > 0) {
			me.disableitems = false;
		}

    me.VatRateStore = Ext.create('Ext.data.Store', {
        fields: ['VatRateId', 'VatRateName'],
        autoLoad: true,
        proxy: {
            type: 'jsonp',
            url: webAPI_path + 'api/ConfigItem/GetVATRate',
            reader: {
                type: 'json',
                root: 'data'
            },
            extraParams: {
                id: user_language
            }
        }
    });

    me.DepartmentStore = Ext.create('Ext.data.Store', {
        fields: ['DepartmentId', 'DepartmentName'],
        autoLoad: true,
        proxy: {
            type: 'jsonp',
            url: webAPI_path + 'api/ConfigItem/GetDepartment',
            reader: {
                type: 'json',
                root: 'data'
            }
        }
    });

		me.items = [{
				xtype : 'form',
				id : 'additemtype',
				border : false,
				bodyStyle : 'background: none',
				style : "padding:10px;",
				tbar : ['->', {
						xtype : 'button',
						text: 'Language'.l('g'),
						action : 'LanguageContent',
						disabled : me.disableitems
					}
				],
				items : [{
						xtype : 'hidden',
						name : 'LanguageId',
						value : user_language
					}, {
						xtype : 'hidden',
						name : 'ItemTypeId',
						value : me.itemTypeId
					}, {
						xtype : 'textfield',
						fieldLabel : 'Item Type Name'.l('SC20500'),
						name : 'ItemTypeName',
						allowBlank : false,
						selectOnFocus : true,
						anchor : '100%',
						maxLength: 120
					}, {
						xtype : 'textfield',
						fieldLabel : 'Item Type Code'.l('SC20500'),
						name : 'ItemTypeCode',
						allowBlank : false,
						selectOnFocus : true,
						maxLength : 10,
						anchor : '100%'
					}, {
						xtype : 'combo',
						name : 'VatRateId',
						action : 'ItemTypeManage_VatRateId',
						fieldLabel : 'VAT Rate'.l('SC20500'),
						forceSelection : true,
						queryMode : 'local',
						displayField : 'VatRateName',
						valueField : 'VatRateId',
						emptyText : "Select VAT Rate".l('SC20500'),
						store: me.VatRateStore,
						anchor : '100%',
						allowBlank : false
					}, {
						xtype : 'checkboxfield',
						name : 'NoVatRateFlag',
						padding : '0 0 0 105px',
						boxLabel : 'Has VAT Rate'.l('SC20500'),
						inputValue : 'true',
						uncheckedValue : 'false'
					}, {
						xtype : 'combo',
						name : 'DepartmentId',
						action : 'ItemTypeManage_DepartmentId',
						fieldLabel : 'Department'.l('SC20500'),
						forceSelection : true,
						queryMode : 'local',
						displayField : 'DepartmentName',
						valueField : 'DepartmentId',
						emptyText : "Select Department".l('SC20500'),
						store : me.DepartmentStore,
						anchor : '100%',
						allowBlank : false
					}, {
						xtype : 'combo',
						name : 'SubDepartmentId',
						fieldLabel : 'Sub Department'.l('SC20500'),
						forceSelection : true,
						queryMode : 'local',
						displayField : 'SubDepartmentName',
						valueField : 'SubDepartmentId',
						emptyText : "Select Sub Department".l('SC20500'),
						store : Ext.getStore('configuration.SubDepartmentManageStore'),
						anchor : '100%',
						allowBlank : false
					}, {
						xtype : 'checkboxfield',
						name : 'NoVatReimburse',
						padding : '0 0 0 105px',
						boxLabel : 'Is Vat NonDeductible'.l('SC20500'),
						inputValue : 'true',
						uncheckedValue : 'false'
					}, {
						xtype : 'hidden',
						name : 'CreatedDate'
					}, {
						xtype : 'hidden',
						name : 'CreatedBy'
					}, {
						xtype : 'hidden',
						name : 'UpdatedDate'
					}, {
						xtype : 'hidden',
						name : 'UpdatedBy'
					}
				],
				buttons : [{
						text : 'Cancel'.l('w'),
						scope : me,
						handler : function () {
							this.close()
						}
					}, {
						text : 'Save'.l('w'),
						action : 'saveItemType'
					}
				]
			}
		];
		me.callParent(arguments);
	}
});