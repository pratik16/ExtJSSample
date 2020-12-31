Ext.define('Regardz.view.property.RoomPhotoManageLang', {
    extend: 'Ext.window.Window',
    alias: 'widget.roomphotomanagelang',    
	autoShow: true,
	width: 400,
	//height: parseInt(Ext.getBody().getViewSize().height * (0.50)),
    border: false,
    title: 'Room Photo Language',
	store: 'common.LanguageListStore',
    initComponent: function () {
        var me = this;
        
        me.items = [{
            xtype: 'form',
            border: false,
            bodyStyle: 'background: none',
            itemid: 'roomphotomanagelang',
            style: "padding:10px;",        
            items: [{
                xtype: 'hidden',
                name: 'RoomId',
                value: me.RoomId
            }, {
                xtype: 'hidden',
                name: 'RoomPhotosId',
                value: 0
            }, 
            {
                xtype: 'hidden',
                name: 'LangRoomPhotosId',
                value: 0
            }, 
            
			{
				xtype : 'combo',
				name : 'LanguageId',
				fieldLabel: 'Lang. for content',
				displayField : 'Name',
				valueField : 'LanguageId',
				emptyText : "Language for content",
				anchor : '100%',
				allowBlank : false,
				store : Ext.getStore('common.LanguageListStore'),
                labelWidth: 150
				//value: user_language
			},
			{
                xtype: 'textfield',
                fieldLabel: 'Photo Title',
                name: 'PhotoTitle',
                allowBlank: false,
                labelWidth: 150,
                selectOnFocus: true,
                anchor: '100%'
            },
					{
					    xtype: 'hidden',
					    name: 'CreatedBy'
					},
					{
					    xtype: 'hidden',
					    name: 'CreatedDate'
					},
					{
					    xtype: 'hidden',
					    name: 'UpdatedBy'
					},
					{
					    xtype: 'hidden',
					    name: 'UpdatedDate'
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
                action: 'roomPhotoLangMang'
            }
				]
        }
		];
        //console.log('end form');
        me.callParent(arguments);
    }
});