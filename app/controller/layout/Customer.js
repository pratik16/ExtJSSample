Ext.define('Regardz.controller.layout.Customer', {
    extend: 'Ext.app.Controller',
    views: ['layout.Customer'],
    contractManageController: false,
    customersManageController: false,
    init: function () {

        var me = this;

        this.control({
            'treepanel[name=customerManagement]': {
                itemclick: function (t, r, i) {
                    try {
                        //Load desktop if login successed
                        if (r.raw.itemId == 'contractManagement') {
                            var c = me.getController('customer.ContractManage');
                            var cv = me.getView('customer.ContractManageList');
                            if (this.contractManageController == false) {
                                c.init();
                                this.contractManageController = true;
                            }
                        } else if (r.raw.itemId == 'customersManagement') {

                            var c = me.getController('customer.CustomerManage');
                            var cv = me.getView('customer.CustomerSearch');
                            if (this.customersManageController == false) {
                                c.init();  
                                this.customersManageController = true;
                            }
                        }

                        var ws = Ext.getCmp('right_regionCustomer');

                        ws.removeAll();
                        ws.add(cv);
                        ws.doLayout();

                    } catch (e) {
                        console.log(e);
                        throw new Error('[' + Ext.getDisplayName(e.callee) + '] controller');
                    }
                }

            }
        });
    }
});