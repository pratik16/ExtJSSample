Ext.define('Regardz.view.property.PropertyMap', {
    extend: 'Ext.window.Window',
    alias: 'widget.propertymap',

    //store: 'property.PropertyListStore',
    requires: [
		'Ext.ux.GMapPanel'
	],

    initComponent: function () {
        var me = this;
        me.title = "GMap_Title".l('SC31200');
       // console.log(me.propertyAddress);
        Ext.applyIf(me, {
            autoShow: true,
            layout: 'fit',
            //title: 'GMap Window',
            closeAction: 'hide',
           
            modal: true,
            width: 450,
            height: 450,
            border: false,
            x: 40,
            y: 60,
            items: {
                xtype: 'gmappanel',
                gmapType: 'map',
                gmapTypeId: google.maps.MapTypeId.ROADMAP,
                center: {
                    geoCodeAddr: me.propertyAddress,
                    marker: {
                        title: me.PropertyName
                    }
                }
            }
        });

        me.callParent();
    }
});