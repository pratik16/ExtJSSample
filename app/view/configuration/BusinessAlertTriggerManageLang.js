Ext.define('Regardz.view.configuration.BusinessAlertTriggerManageLang', {
    extend: 'Ext.window.Window',
    alias: 'widget.businessalerttriggermanagelang',    
	autoShow: true,
	width: parseInt(Ext.getBody().getViewSize().width * (0.30)),
	height: parseInt(Ext.getBody().getViewSize().height * (0.35)),
    border: false,
    store: 'common.LanguageListStore',
    title: "Business Alert Trigger Language_Title".l('SC21011'),
    initComponent: function () {
        var me = this;
        
        me.items = [{
            xtype: 'form',
            border: false,
            bodyStyle: 'background: none',
            itemid: 'businessalerttriggermanagelang',
            style: "padding:10px;",        
            items: [{
                xtype: 'hidden',
                name: 'AlertId',
                value: me.AlertId
            }, 
            {
                xtype: 'hidden',
                name: 'LangAlertId',
                value: 0
            }, 
            
			{
				xtype : 'combo',
				name : 'LanguageId',
				fieldLabel: 'Lang. for content'.l('SC21011'),
				displayField : 'Name',
				valueField : 'LanguageId',
				emptyText: "Language for content".l('SC21011'),
				anchor : '100%',
				allowBlank : false,
				store : Ext.getStore('common.LanguageListStore')
				//value: user_language
			},
			{
                xtype: 'textfield',
                fieldLabel: 'Message'.l('SC21011'),
                name: 'AlertMessage',
                allowBlank: false,
                selectOnFocus: true,
                anchor: '100%'
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
                action: 'businessAlertLangMang'
            }
				]
        }
		];
        //console.log('end form');
        me.callParent(arguments);
    }
});