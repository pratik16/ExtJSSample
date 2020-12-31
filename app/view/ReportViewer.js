Ext.define('Regardz.view.ReportViewer', {
    extend: 'Ext.window.Window',
    alias: 'widget.reportviewer',
    modal: true,

    initComponent: function () {
        var me = this;
        me.autoScroll = true;
        me.height = parseInt(Ext.getBody().getViewSize().height * (0.75));
        me.windowWidth = parseInt(Ext.getBody().getViewSize().width * (0.70));
        Ext.apply(me, {
            title: '',
            autoShow: true,
            y: 50,
            bodyStyle: 'background: none',
            closable: true,
            resizable: true,
            buttonAlign: 'right',
            width: me.windowWidth,
            border: false,
            items: [{
                        xtype : "component",
                        id: 'iframe-win',
                        width: 1100,
                        height: 530,
                        autoEl : {
                            tag : "iframe",
                            src: "http://localhost:56814/ReportViewer.aspx"
                        }
                    }]
        });

        me.callParent();
    }
});