Ext.define('Regardz.controller.configuration.FixedPriceEventItemAddWin', {
    extend: 'Ext.app.Controller',
    views: ['configuration.FixedPriceEventItemGroup', 'configuration.FixedPriceEventItemAddWin', 'configuration.FixedPriceEventItem', 'configuration.FixedPriceEventItemPrice'],
    stores: ['configuration.FixedPriceEventItemStore', 'configuration.FixedPriceEventItemAddStore', 'configuration.FixedPriceEventItemGroupStore'],

    refs: [{
        ref: 'FixedPriceManage',
        selector: 'FixedPriceManage'
    }],

    init: function () {
        this.control({

            'fixedpriceeventitemgroup': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'addItemGroup')
                        this.addItemGroup(zRec);
                }
            },
            'fixedpriceeventitem': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;
                    var zRec = iView.getRecord(iRowEl);
                    if (fieldName == 'addItem')
                        this.addItem(zRec);
                }

            }

        });

    },

    addItemGroup: function (rec) {

        var urlAddFixedPriceEventItem = webAPI_path + 'api/FixedPrice/AddFixedPriceEventItem';
        var fpEventId = Ext.getCmp('addFixedPriceItem').getForm().findField('FixedPriceEventId').getValue();
        var fpId = Ext.getCmp('fixedPriceEventListForm').getForm().findField('FixedPriceId').getValue();
        var FixedPriceDetail = new Object();
        FixedPriceDetail.FixedPriceDetailId = 0;
        FixedPriceDetail.FixedPriceId = fpId;
        FixedPriceDetail.ItemId = null;
        FixedPriceDetail.IsItemOrRoomRent = true;
        FixedPriceDetail.FixedPriceEventId = fpEventId;
        FixedPriceDetail.ItemGroupId = rec.data.ItemGroupId;
        FixedPriceDetail.LanguageId = user_language;
        Ext.Ajax.request({
            url: urlAddFixedPriceEventItem,
            actionMethods: 'POST',
            params: FixedPriceDetail,
            success: function (response) {
                var r = Ext.decode(response.responseText);
                var ResultText = r.result;
                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                    ResultText = ResultText.l("SP_DynamicCode");
                if (r.success == true) {
                    $.ajax({
                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                        success: function () {
                            //Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                        }
                    });
                    display_alert('MG00000');// Ext.Msg.alert('Success'.l('g'), 'Information saved successfully');
                    Ext.getStore('configuration.FixedPriceEventItemStore').reload();

                    var eventId = Ext.getCmp('fixedPriceEventItemListForm').getForm().findField('EventId').getValue();

                    Ext.getStore('configuration.FixedPriceEventItemGroupStore').proxy.setExtraParam('start', fpId);
                    Ext.getStore('configuration.FixedPriceEventItemGroupStore').proxy.setExtraParam('limit', eventId);
                    Ext.getStore('configuration.FixedPriceEventItemGroupStore').proxy.setExtraParam('languageId', user_language);
                    Ext.getStore('configuration.FixedPriceEventItemGroupStore').load({});

                }
                else {
                    Ext.Msg.alert('Error'.l('g'), ResultText);
                }
            },
            failure: function () {
                Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
            }
        });

    },
    addItem: function (rec) {

        var urlAddFixedPriceEventItem = webAPI_path + 'api/FixedPrice/AddFixedPriceEventItem';
        var fpEventId = Ext.getCmp('addFixedPriceItem').getForm().findField('FixedPriceEventId').getValue();
        var fpId = Ext.getCmp('fixedPriceEventListForm').getForm().findField('FixedPriceId').getValue();

        var FixedPriceDetail = new Object();

        FixedPriceDetail.FixedPriceDetailId = 0;
        FixedPriceDetail.FixedPriceId = fpId;
        FixedPriceDetail.ItemId = rec.data.ItemId;
        FixedPriceDetail.IsItemOrRoomRent = true;
        FixedPriceDetail.FixedPriceEventId = fpEventId;
        FixedPriceDetail.ItemGroupId = null;
        FixedPriceDetail.LanguageId = user_language;
        Ext.Ajax.request({
            url: urlAddFixedPriceEventItem,
            actionMethods: 'POST',
            params: FixedPriceDetail,
            success: function (response) {
                var r = Ext.decode(response.responseText);
                var ResultText = r.result;
                if (ResultText && ResultText.length > 0 && ResultText.substring(0, 4) == "SPC_")
                    ResultText = ResultText.l("SP_DynamicCode");
                if (r.success == true) {

                    $.ajax({
                        url: webAPI_path + 'api/ConfigProgramDefinition/BlankRequest',
                        success: function () {
                            //Ext.Msg.alert('Success'.l('g'), 'Information saved successfully.'.l('g'));
                        }
                    });
                    display_alert('MG00000');// Ext.Msg.alert('Success'.l('g'), 'Information saved successfully');
                    Ext.getStore('configuration.FixedPriceEventItemStore').reload();

                    var eventId = Ext.getCmp('fixedPriceEventItemListForm').getForm().findField('EventId').getValue();

                    Ext.getStore('configuration.FixedPriceEventItemAddStore').proxy.setExtraParam('start', fpEventId);
                    Ext.getStore('configuration.FixedPriceEventItemAddStore').proxy.setExtraParam('limit', eventId);
                    Ext.getStore('configuration.FixedPriceEventItemAddStore').proxy.setExtraParam('languageId', user_language);
                    Ext.getStore('configuration.FixedPriceEventItemAddStore').proxy.setExtraParam('id', fpId);
                    Ext.getStore('configuration.FixedPriceEventItemAddStore').load({});
                }
                else {
                    Ext.Msg.alert('Error'.l('g'), ResultText);
                }
            },
            failure: function () {
                Ext.Msg.alert('Error'.l('g'), 'Information not saved.'.l('g'));
            }
        });
    }

});
