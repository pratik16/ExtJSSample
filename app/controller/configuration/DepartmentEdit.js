Ext.define('Regardz.controller.configuration.DepartmentEdit', {
    extend: 'Ext.app.Controller',
    views: ['configuration.DepartmentManageList', 'configuration.DepartmentEdit', 'configuration.SubDepartmentManageList'], //,'configuration.DepartmentEdit'],'configuration.DepartmentManage',
    stores: ['configuration.DepartmentManageStore', 'configuration.SubDepartmentManageStore'],

    refs: [
		{
		    ref: 'configuration.DepartmentEdit',
		    selector: 'departmentedit'
		}
        ],
    DepartmentEditController: false,

    init: function () {
        var me = this;

        this.control(
        {
            'departmentmanagelist': {
                cellclick: function (iView, iCellEl, iColIdx, iRecord, iRowEl, iRowIdx, iEvent) {
                    //var fieldName = iView.getGridColumns()[iColIdx].dataIndex;
                    var fieldName = iView.getGridColumns()[iColIdx].name;

                    var zRec = iView.getRecord(iRowEl);
                    //if (fieldName == 'DepartmentEdit')
                    //this.DepartmentEdit(zRec);

                }
            }


        })
    },



    index: function (departmentId) {
        var me = this;
        if (departmentId > 0) {
            Ext.getStore('configuration.SubDepartmentManageStore').proxy.setExtraParam('id', departmentId);
            Ext.getStore('configuration.SubDepartmentManageStore').proxy.setExtraParam('languageId', user_language);
            Ext.getStore('configuration.SubDepartmentManageStore').load();
            //Ext.create('widget.departmentEdit', { departmentId: departmentId });
            var de = Ext.create('widget.departmentEdit', { departmentId: departmentId });
            de.setTitle('Update Department_Title'.l('SC23100'));
        }
        else {
            var de = Ext.create('widget.departmentEdit');
            de.setTitle('Update Department_Title'.l('SC23100'));
        }
    }

});
