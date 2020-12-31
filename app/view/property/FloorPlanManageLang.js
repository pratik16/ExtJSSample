Ext.define('Regardz.view.property.FloorPlanManageLang', {
    extend: 'Ext.window.Window',
    alias: 'widget.floorplanmanagelang',
    width: parseInt(Ext.getBody().getViewSize().width * (0.45)),
    border: false,
    title: 'Floor Plan_Title'.l('SC31411'),
    autoShow: true,
    initComponent: function () {
        var me = this;

        me.items = [{
            xtype: 'form',
            border: false,
            itemid: 'floorplanmanagelangform',
            buttonAlign: 'end',
            bodyStyle: 'background: none',
            style: "padding:10px;",
            items: [{
                xtype: 'hidden',
                name: 'PropertyId',
                value: me.propertyId
            },
            {
                xtype: 'hidden',
                name: 'LangPropertyFloorPlanId',
                value: 0
            },
			{
				xtype : 'combo',
				name : 'LanguageId',
				fieldLabel: 'Lang. for content'.l('SC31411'),
				displayField : 'Name',
				valueField : 'LanguageId',
				emptyText: "Language for content".l('SC31411'),
				anchor : '100%',
				allowBlank : false,
				store : Ext.getStore('common.LanguageListStore'),
				value : user_language
			},
			{
                xtype: 'hidden',
                name: 'PropertyFloorPlanId',
                value: me.propertyFloorPlanId
            }, {
                xtype: 'textfield',
                name: 'Description',
                anchor: '100%',
                fieldLabel: 'Description*'
            },  {
                xtype: 'hidden',
                name: 'UpdatedDate'
            }, {
                xtype: 'hidden',
                name: 'UpdatedBy'
            }
				],

            buttons: [{
                text: 'Cancel'.l('w'),
                scope: me,
                handler: function () {
                    this.close();
                }
            }, {
                text: 'Save'.l('w'),
                action: 'saveFloorPlanLang'
            }
				]
        }
		];

        me.callParent(arguments);
    }
});