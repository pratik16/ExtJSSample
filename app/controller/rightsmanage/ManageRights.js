Ext.define('Regardz.controller.rightsmanage.ManageRights', {
    extend: 'Ext.app.Controller',
    views: ['rightsmanage.RightsList'],

    stores: ['rightsmanage.RightsListStore'],

    refs: [{
        ref: 'RightsList',
        selector: 'RightsList'
    }],

    init: function () {

        this.control(
        {
            'rightslist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);

                    if (fieldName == 'EditDisplayName')
                        this.EditDisplayName(zRec);

                }
            }
        })

    },
    EditDisplayName: function (rec) {
//        Ext.MessageBox.confirm('Delete', 'Are you sure ?', function (btn) {
//            if (btn === 'yes') {

//                $.ajax({
//                    url: webAPI_path + 'api/ConfigRoomClassification/DeleteRoomClassification',
//                    type: "GET",
//                    data: { id: rec.data.ProgramDefinitionId },
//                    success: function (response) {
//                        Ext.getStore('configuration.ProgramDefinitionStore').reload();
//                    }
//                });
//            }
//        });
    }

});
