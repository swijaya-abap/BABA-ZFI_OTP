sap.ui.define([
	"com/baba/ZFI_OTP/controller/BaseController",
	"sap/ui/model/json/JSONModel",
	"sap/m/MessageBox"
], function (BaseController, JSONModel, MessageBox) {
	"use strict";

	return BaseController.extend("com.baba.ZFI_OTP.controller.View1", {
		onInit: function () {
			this._initGlobalModel();
			this.globalModel = this._getGlobalModel();
			this.globalVar = this.globalModel.getData();

			this._initComboBox();
		},

		onGenerate: function () {
			var isValid = this._validateInput("");

			if (isValid) {
				this._setBusy(true, this.globalVar.busy);

				// Create one emtpy Object
				var oEntry1 = {};
				oEntry1.UNAME = this.globalVar.scrInput.comBoxUser;
				oEntry1.VMINS = this.globalVar.scrInput.comBoxMins;
				oEntry1.SGLUS = this.globalVar.scrInput.chkBoxSingle;

				var that = this;

				this.globalVar.oDataModel.create("/ZFIS_OTPSet", oEntry1, {
					success: function (oData, oResponse) {
						sap.m.MessageToast.show(oData.MESSAGE);
						that._setBusy(false, that.globalVar.busy);
					},
					error: function (oResponse) {
						that._setBusy(false, that.globalVar.busy);
						var oMsg = JSON.parse(oResponse.responseText);
						MessageBox.show(
							oMsg, {
								icon: MessageBox.Icon.ERROR,
								title: "Service Error",
								actions: [MessageBox.Action.OK],
							}
						);
					}

				});

			} else {
				MessageBox.show(
					"Please fill in Username and Validity in Minutes", {
						icon: MessageBox.Icon.ERROR,
						title: "Validation Error",
						actions: [MessageBox.Action.OK],
					}
				);
			}
		},

		onAdditional: function () {
			var isValid = this._validateInput("1");

			if (isValid) {
				this._setBusy(true, this.globalVar.busy);

				var that = this;

				this.globalVar.oDataModel.read("/ADDITIONALSet(BNAME='" + this.globalVar.scrInput.comBoxUser + "')", {
					success: function (oData, oResponse) {
						sap.m.MessageToast.show(oData.LAST_OTP);
						that._setBusy(false, that.globalVar.busy);
					},
					error: function (oResponse) {
						that._setBusy(false, that.globalVar.busy);
						var oMsg = JSON.parse(oResponse.responseText);
						MessageBox.show(
							oMsg, {
								icon: MessageBox.Icon.ERROR,
								title: "Service Error",
								actions: [MessageBox.Action.OK],
							}
						);
					}

				});

			} else {
				MessageBox.show(
					"Please fill in Username", {
						icon: MessageBox.Icon.ERROR,
						title: "Validation Error",
						actions: [MessageBox.Action.OK],
					}
				);
			}
		},

		onCancel: function () {

		},

		_validateInput: function (iType) {
			this.globalVar.scrInput = {
				comBoxUser: this.byId("comBoxUser").getSelectedKey(),
				comBoxMins: this.byId("comBoxMins").getSelectedKey(),
				chkBoxSingle: this.byId("chkBoxSingle").getSelected()
			};

			if (this.globalVar.scrInput.chkBoxSingle === true) this.globalVar.scrInput.chkBoxSingle = "X";
			else this.globalVar.scrInput.chkBoxSingle = "";

			if (iType === "" && (this.globalVar.scrInput.comBoxUser === "" || this.globalVar.scrInput.comBoxMins === "")) {
				return false;
			} else if (iType === "1" && this.globalVar.scrInput.comBoxUser === "" ) {
				return false;
			} else {
				return true;
			}
		},

		_initComboBox: function () {
			//User Combo Box
			this.byId("comBoxUser").setModel(this.globalVar.oDataModel); //Get USERSet in backend
			this.byId("comBoxUser").getModel().setSizeLimit('500');

			//Minutes Combo Box
			this.byId("comBoxMins").setModel(this.globalVar.oDataModel); //Get DEFAULT_VALIDITYSet in backend
			this.byId("comBoxMins").getModel().setSizeLimit('500');

			// var oModel = new JSONModel();
			// var lt_mins = [];

			// for (var i = 5; i <= 150; i += 5) {
			// 	var ls_mins = {
			// 		KEY: i
			// 	};
			// 	lt_mins.push(ls_mins);
			// }

			// oModel.setProperty("/PathMinutes", lt_mins);
			// this.getView().setModel(oModel);
		}
	});
});