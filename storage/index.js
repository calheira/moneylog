// Read (and possibly write) user data.
// Each driver must implement the necessary stubs and set defaults.

ml.storage = {

	// drivers
	availableDrivers: [
		'html',
		'browser',
	],
	currentDriver: 'html',	// default if not specified in config
	drivers: {},	// driver's implementations

	// properties to be set by each driver (all are required)
	isEditable: false,
	isFileBased: false,
	isReloadable: false,
	loadDataAtSetup: false,

	// stubs to be implemented by each driver (some are optional)
	write: function (contents) { console.log('write'); },
	read: function () { return ''; },

	// module methods, drivers should not reimplement those:

	setDriver: function (driverName) {
		try {
			this.currentDriver = driverName || this.currentDriver;
			this.drivers[this.currentDriver].setup();	// driver-specific setup

			// Show/hide UI elements for each mode
			document.getElementById('source-file'	).style.display		= (this.isFileBased ) ? '' : 'none';
			document.getElementById('editor-open'	).style.visibility = (this.isEditable	) ? 'visible' : 'hidden';
			document.getElementById('source-reload').style.visibility = (this.isReloadable) ? 'visible' : 'hidden';

			if (this.loadDataAtSetup) {
				loadData();
			}
		} catch(error) {
			console.log('ERROR: Cannot setup storage: ' + this.currentDriver);
			console.log(error);
		}
	}
};
