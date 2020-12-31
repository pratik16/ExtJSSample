Ext.define("Regardz.view.operations.Timeline", {
	extend : "Sch.plugin.Lines",
	alias: 'widget.timeline',
	expandToFitView : true,
	init : function (c) {
		var startDate = new Date();
		var endDate = Ext.Date.add(startDate, Sch.util.Date.HOUR, 2);
		
		var b = Ext.create("Ext.data.JsonStore", {
				fields : ["Date", "Cls", "Text"],
				itemid: 'timelinestore'
			});
		var a = b.first();	
		this.store = b;
		this.callParent(arguments)
	}
});

/* 	
data : [{
		Date : startDate,
		Cls : "sch-todayLine",
		Text : this.tooltipText
	},
	{
		Date : endDate,
		Cls : "sch-todayLine",
		Text : this.tooltipText
	}
]


if (this.autoUpdate) {
			this.runner = Ext.create("Ext.util.TaskRunner");
			this.runner.start({
				run : function () {
					a.set("Date", new Date())
				},
				interval : this.updateInterval
			})
		}
		c.on("destroy", this.onHostDestroy, this); */