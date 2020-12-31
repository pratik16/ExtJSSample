Ext.define('Regardz.controller.layout.Administration', {
    extend: 'Ext.app.Controller',
    views: ['layout.Administration'],
    stores: ['property.PropertyListStore'],
    userController: false,
    roleController: false,
    //roomController: false,
    propertyController: false,
    rightsController: false,
    extrazwebshopController: false,
    extrazpointsController: false,
    salestargetController: false,

    init: function () {
        var me = this;
        this.control({


            'treepanel[name=administrationManagement]': {
                itemclick: function (t, r, i) {
                    try {
                        //Load desktop if login successed                                                
                        if (r.raw.itemId == 'propertylist') {

                            var rightList = new Object();
                            rightList.moduleName = 'PROP001';

                            if (Utils.ValidateUserAccess(rightList)) {
                                var c = me.getController('property.PropertyList');
                                var cv = me.getView('property.PropertyList');
                                if (this.propertyController == false) {
                                    c.init();
                                    this.propertyController = true;
                                }
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), "You dont have rights to access this module.".l('g'))
                            }



                        }
                        else if (r.raw.itemId == 'userlist' || r.raw.itemId == 'userhead') {
                            //Load desktop if login successed

                            var rightList = new Object();
                            rightList.moduleName = 'USER001';

                            if (Utils.ValidateUserAccess(rightList)) {
                                var c = me.getController('usermanage.User');
                                var cv = me.getView('usermanage.UserRegistration');
                                if (this.userController == false) {
                                    c.init();
                                    this.userController = true;
                                }
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), "You dont have rights to access this module.".l('g'))
                            }
                        }
                        else if (r.raw.itemId == 'rolesmanagement') {
                            var rightList = new Object();
                            rightList.moduleName = 'USER002';

                            if (Utils.ValidateUserAccess(rightList)) {
                                var c = me.getController('usermanage.User');
                                var cv = me.getView('usermanage.UserOverview');
                                if (this.userController == false) {
                                    c.init();
                                    this.userController = true;
                                }
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), "You dont have rights to access this module.".l('g'))
                            }
                        }
                        else if (r.raw.itemId == 'salestarget') {

                            var rightList = new Object();
                            rightList.moduleName = 'USER003';

                            if (Utils.ValidateUserAccess(rightList)) {
                                var c = me.getController('usermanage.ManageSalesTarget');
                                var cv = me.getView('usermanage.SalesTargetList');
                                if (this.salestargetController == false) {
                                    c.init();
                                    this.salestargetController = true;
                                }
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), "You dont have rights to access this module.".l('g'))
                            }
                        }


                        else if (r.raw.itemId == 'propertyItem') {
                            //Load desktop if login successed

                            var newObj = new Object();
                            newObj.moduleName = 'ITEM001';

                            if (Utils.ValidateUserAccess(newObj)) {

                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), "You dont have rights to access this module.".l('g'))
                            }
                        }
                        else if (r.raw.itemId == 'groupItem') {
                            //Load desktop if login successed

                            var newObj = new Object();
                            newObj.moduleName = 'ITEM002';

                            if (Utils.ValidateUserAccess(newObj)) {

                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), "You dont have rights to access this module.".l('g'))
                            }
                        }
                        else if (r.raw.itemId == 'generalPricing') {
                            //Load desktop if login successed

                            var newObj = new Object();
                            newObj.moduleName = 'ITEM003';

                            if (Utils.ValidateUserAccess(newObj)) {

                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), "You dont have rights to access this module.".l('g'))
                            }
                        }
                        else if (r.raw.itemId == 'contractPricing') {
                            //Load desktop if login successed

                            var newObj = new Object();
                            newObj.moduleName = 'ITEM004';

                            if (Utils.ValidateUserAccess(newObj)) {

                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), "You dont have rights to access this module.".l('g'))
                            }
                        }

                        else if (r.raw.itemId == 'fixedPackages') {
                            //Load desktop if login successed

                            var newObj = new Object();
                            newObj.moduleName = 'PACK001';

                            if (Utils.ValidateUserAccess(newObj)) {

                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), "You dont have rights to access this module.".l('g'))
                            }
                        }
                        else if (r.raw.itemId == 'packageBreakdownManagement') {
                            //Load desktop if login successed

                            var newObj = new Object();
                            newObj.moduleName = 'PACK002';

                            if (Utils.ValidateUserAccess(newObj)) {

                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), "You dont have rights to access this module.".l('g'))
                            }
                        }
                        else if (r.raw.itemId == 'diyPrograms') {
                            //Load desktop if login successed

                            var newObj = new Object();
                            newObj.moduleName = 'PACK003';

                            if (Utils.ValidateUserAccess(newObj)) {

                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), "You dont have rights to access this module.".l('g'))
                            }
                        }
                        else if (r.raw.itemId == 'publicHolidays') {
                            //Load desktop if login successed

                            var newObj = new Object();
                            newObj.moduleName = 'PUBL001';

                            if (Utils.ValidateUserAccess(newObj)) {

                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), "You dont have rights to access this module.".l('g'))
                            }
                        }
                        else if (r.raw.itemId == 'compeditors') {
                            //Load desktop if login successed

                            var newObj = new Object();
                            newObj.moduleName = 'COMP001';

                            if (Utils.ValidateUserAccess(newObj)) {

                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), "You dont have rights to access this module.".l('g'))
                            }
                        }

                        else if (r.raw.itemId == 'extraazwebshop' || r.raw.itemId == 'extraazhead') {
                            //Load desktop if login successed

                            var newObj = new Object();
                            newObj.moduleName = 'EXTR001';

                            if (Utils.ValidateUserAccess(newObj)) {
                                var c = me.getController('extraz.Webshop');
                                var cv = me.getView('extraz.WebshopProductList');
                                if (this.extrazwebshopController == false) {
                                    c.init();
                                    this.extrazwebshopController = true;
                                }
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), "You dont have rights to access this module.".l('g'));
                            }
                        }
                        else if (r.raw.itemId == 'extraazpoint') {
                            //Load desktop if login successed      
                            var newObj = new Object();
                            newObj.moduleName = 'EXTR002';

                            if (Utils.ValidateUserAccess(newObj)) {
                                var c = me.getController('extraz.Points');
                                var cv = me.getView('extraz.WebshopPoints');
                                if (this.extrazpointsController == false) {
                                    c.init();
                                    this.extrazpointsController = true;
                                }
                            }
                            else {
                                Ext.Msg.alert('Error'.l('g'), "You dont have rights to access this module.".l('g'))
                            }
                        }
                        else if (r.raw.itemId == 'rightslist' || r.raw.itemId == 'rightshead') {
                            //Load desktop if login successed
                            var c = me.getController('rightsmanage.ManageRights');
                            var cv = me.getView('rightsmanage.RightsList');
                            if (this.rightsController == false) {
                                c.init();
                                this.rightsController = true;
                            }
                        }

                        var ws = Ext.getCmp('right_regionAdministration');
                        ws.removeAll();
                        ws.add(cv);
                        ws.doLayout();

                    } catch (e) {
                        throw new Error('[' + Ext.getDisplayName(e.callee) + '] controller');
                    }
                }
            }
        });
    },
    validateModule: function (t, n, o) {
        var propRight = new Object();
        propRight.moduleName = 'PROP001';
        if (Utils.ValidateUserAccess(propRight)) {

        }
    },

    disableItem: function () {
        var item = Ext.ComponentQuery.query('[name=administrationManagement]')[0];
        var c = item.getRootNode();
        var d = item.getStore();

        var f = c.data.children[0];
        f.cls = "disabledItem";

        // d.set('cls', 'disabledItem')
        // d.load();
        //      debugger


        // item.store.commitChanges();
        ///debugger
        //item.addCls('disabledItem')
    }

});