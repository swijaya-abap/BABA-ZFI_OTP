/* global QUnit*/

sap.ui.define([
	"sap/ui/test/Opa5",
	"com/baba/ZFI_OTP/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"com/baba/ZFI_OTP/test/integration/pages/View1",
	"com/baba/ZFI_OTP/test/integration/navigationJourney"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "com.baba.ZFI_OTP.view.",
		autoWait: true
	});
});