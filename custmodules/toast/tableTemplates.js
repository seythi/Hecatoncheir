const sql = require('mssql/msnodesqlv8');
exports.createOrdersTable = function(){ //HAS MANY checks
	let orders = new sql.Table();//HAS deliveryInfoy
		orders.create = true;
		orders.columns.add('orderID', sql.NVarChar(37), {nullable: false, primary: true}); //GUID
		orders.columns.add('storeID', sql.NVarChar(37), {nullable: true});
		orders.columns.add('openedDate', sql.NVarChar(37), {nullable: true});
		orders.columns.add('modifiedDate', sql.NVarChar(37), {nullable: true});
		orders.columns.add('promisedDate', sql.NVarChar(37), {nullable: true});
		orders.columns.add('diningOption', sql.NVarChar(37), {nullable: true});
		orders.columns.add('table', sql.NVarChar(37), {nullable: true});
		orders.columns.add('serviceArea', sql.NVarChar(37), {nullable: true});
		orders.columns.add('restaurantService', sql.NVarChar(37), {nullable: true});
		orders.columns.add('revenueCenter', sql.NVarChar(37), {nullable: true});
		orders.columns.add('source', sql.NVarChar(37), {nullable: true});
		orders.columns.add('duration', sql.Int, {nullable: true});
		orders.columns.add('estimatedFulfillmentDate', sql.NVarChar(37), {nullable: true});
		orders.columns.add('numberOfGuests', sql.Int, {nullable: true});
		orders.columns.add('voided', sql.Bit, {nullable: true});
		orders.columns.add('voidDate', sql.NVarChar(37), {nullable: true});
		orders.columns.add('voidBusinessDate', sql.Int, {nullable: true});
		orders.columns.add('paidDate', sql.NVarChar(37), {nullable: true});
		orders.columns.add('closedDate', sql.NVarChar(37), {nullable: true});
		orders.columns.add('deletedDate', sql.NVarChar(37), {nullable: true});
		orders.columns.add('deleted', sql.Bit, {nullable: true});
		orders.columns.add('businessDate', sql.Int, {nullable: true});
		orders.columns.add('server', sql.NVarChar(37), {nullable: true});
	return orders;
}

exports.createChecksTable = function (){//HAS MANY payments, HAS MANY appliedDiscounts, HAS MANY appliedServiceCharges, HAS MANY selections
	let checks = new sql.Table();// HAS customer, HAS appliedLoyaltyInfo
		checks.columns.add('checkID', sql.NVarChar(37), {nullable: true, primary: true});
		checks.columns.add('orderFK', sql.NVarChar(37), {nullable: true}); //ORDER FK
		checks.columns.add('storeID', sql.NVarChar(37), {nullable: true});
		checks.columns.add('openedDate', sql.NVarChar(37), {nullable: true});
		checks.columns.add('modifiedDate', sql.NVarChar(37), {nullable: true});
		checks.columns.add('deletedDate', sql.NVarChar(37), {nullable: true});
		checks.columns.add('deleted', sql.Bit, {nullable: true});
		checks.columns.add('taxExempt', sql.Bit, {nullable: true});
		checks.columns.add('displayNumber', sql.NVarChar(37), {nullable: true}); //yes this is supposed to be NVarChar(37), {nullable: true}
		checks.columns.add('amount', sql.Float, {nullable: true});
		checks.columns.add('taxAmount', sql.Float, {nullable: true});
		checks.columns.add('totalAmount', sql.Float, {nullable: true});
		checks.columns.add('tabName', sql.NVarChar(256), {nullable: true});
		checks.columns.add('paymentStatus', sql.NVarChar(37), {nullable: true});
		checks.columns.add('voided', sql.Bit, {nullable: true});
		checks.columns.add('voidDate', sql.NVarChar(37), {nullable: true});
		checks.columns.add('voidBusinessDate', sql.Int, {nullable: true});
		checks.columns.add('paidDate', sql.NVarChar(37), {nullable: true});
	return checks;
}

exports.createPaymentsTable = function (){ //HAS refund HAS voidInfo
	let payment = new sql.Table();
		payment.columns.add('paymentID', sql.NVarChar(37), {nullable: true, primary: true}); //GUID
		payment.columns.add('checkFK', sql.NVarChar(37), {nullable: true}); //CHECK FK
		payment.columns.add('storeID', sql.NVarChar(37), {nullable: true});
		payment.columns.add('paidDate', sql.NVarChar(37), {nullable: true});
		payment.columns.add('paidBusinessDate', sql.Int, {nullable: true});
		payment.columns.add('type', sql.NVarChar(37), {nullable: true});
		payment.columns.add('cardEntryMode', sql.NVarChar(37), {nullable: true});
		payment.columns.add('amount', sql.Float, {nullable: true});
		payment.columns.add('tipAmount', sql.Float, {nullable: true});
		payment.columns.add('amountTendered', sql.Float, {nullable: true});
		payment.columns.add('cardType', sql.NVarChar(37), {nullable: true});
		payment.columns.add('last4Digits', sql.NVarChar(37), {nullable: true}); //yes supposed to be NVarChar(37), {nullable: true}
		payment.columns.add('originalProcessingFee', sql.Float, {nullable: true});
		payment.columns.add('cashDrawer', sql.NVarChar(37), {nullable: true});
		payment.columns.add('refundStatus', sql.NVarChar(37), {nullable: true});
		payment.columns.add('paymentStatus', sql.NVarChar(37), {nullable: true});
		payment.columns.add('houseAccount', sql.NVarChar(37), {nullable: true});
		payment.columns.add('otherPayment', sql.NVarChar(37), {nullable: true});
	return payment;
}

exports.createRefundsTable = function (){
	let refunds = new sql.Table();
		refunds.columns.add('paymentFK', sql.NVarChar(37), {nullable: true}); //PAYMENT FK
		refunds.columns.add('refundAmount', sql.Float, {nullable: true});
		refunds.columns.add('tipRefundAmount', sql.Float, {nullable: true});
		refunds.columns.add('refundDate', sql.NVarChar(37), {nullable: true});
		refunds.columns.add('refundBusinessDate', sql.Int, {nullable: true});
	return refunds
}

exports.createVoidInfoTable = function (){
	let voidInfo = new sql.Table();
		voidInfo.columns.add('paymentFK', sql.NVarChar(37), {nullable: true}); // CHECK FK
		voidInfo.columns.add('voidUser', sql.NVarChar(37), {nullable: true});
		voidInfo.columns.add('voidApprover', sql.NVarChar(37), {nullable: true});
		voidInfo.columns.add('voidDate', sql.NVarChar(37), {nullable: true});
		voidInfo.columns.add('voidBusinessDate', sql.Int, {nullable: true});
		voidInfo.columns.add('voidReason', sql.NVarChar(37), {nullable: true});
	return voidInfo
}

exports.createSelectionsTable = function (){//HAS MANY selections, HAS MANY appliedDiscounts, HAS MANY appliedTaxes
	let selections = new sql.Table();
		selections.columns.add('SelectionID', sql.NVarChar(37), {nullable: true, primary: true}); //GUID
		selections.columns.add('checkSelFK', sql.NVarChar(37), {nullable: true}); // CHECK or SELECTION FK
		selections.columns.add('storeID', sql.NVarChar(37), {nullable: true});
		selections.columns.add('isModifier', sql.Bit, {nullable: true}); //FLAG to add when flattening
		selections.columns.add('item', sql.NVarChar(37), {nullable: true});
		selections.columns.add('itemGroup', sql.NVarChar(37), {nullable: true});
		selections.columns.add('optionGroup', sql.NVarChar(37), {nullable: true});
		selections.columns.add('preModifier', sql.NVarChar(37), {nullable: true});
		selections.columns.add('quantity', sql.Float, {nullable: true});
		selections.columns.add('selectionType', sql.NVarChar(37), {nullable: true});
		selections.columns.add('salesCategory', sql.NVarChar(37), {nullable: true});
		selections.columns.add('deferred', sql.Bit, {nullable: true});
		selections.columns.add('preDiscountPrice', sql.Float, {nullable: true});
		selections.columns.add('price', sql.Float, {nullable: true});
		selections.columns.add('tax', sql.Float, {nullable: true});
		selections.columns.add('voided', sql.Bit, {nullable: true});
		selections.columns.add('voidDate', sql.NVarChar(37), {nullable: true});
		selections.columns.add('voidBusinessDate', sql.Int, {nullable: true});
		selections.columns.add('voidReason', sql.NVarChar(37), {nullable: true});
		selections.columns.add('displayName', sql.NVarChar(255), {nullable: true});
		selections.columns.add('createdDate', sql.NVarChar(37), {nullable: true});
		selections.columns.add('modifiedDate', sql.NVarChar(37), {nullable: true});
		selections.columns.add('fulfillmentStatus', sql.NVarChar(37), {nullable: true});
	return selections
}

exports.createASCsTable = function (){ //HAS MANY appliedTaxRates
	let asc = new sql.Table();
		asc.columns.add('appliedServiceChargeID', sql.NVarChar(37), {nullable: true, primary: true}); //GUID
		asc.columns.add('checkFK', sql.NVarChar(37), {nullable: true}); // CHECK FK
		asc.columns.add('chargeAmount', sql.Float, {nullable: true});
		asc.columns.add('serviceCharge', sql.NVarChar(37), {nullable: true});
		asc.columns.add('chargeType', sql.NVarChar(37), {nullable: true});
		asc.columns.add('name', sql.NVarChar(37), {nullable: true});
		asc.columns.add('delivery', sql.Bit, {nullable: true});
		asc.columns.add('gratuity', sql.Bit, {nullable: true});
		asc.columns.add('taxable', sql.Bit, {nullable: true});
	return asc
}

exports.createATsTable = function (){
	let aT = new sql.Table();
		aT.columns.add('selectionServiceChargeFK', sql.NVarChar(37), {nullable: true}); // FK to selection or service charge FK
		aT.columns.add('entityType', sql.NVarChar(37), {nullable: true});
		aT.columns.add('taxRate', sql.NVarChar(37), {nullable: true});
		aT.columns.add('rate', sql.Float, {nullable: true});
		aT.columns.add('taxAmount', sql.Float, {nullable: true});
		aT.columns.add('type', sql.NVarChar(37), {nullable: true});
	return aT
}

exports.createAppliedDiscountsTable = function (){ //HAS loyaltyDetails
	let aDisc = new sql.Table();
		aDisc.columns.add('discountID', sql.NVarChar(37), {nullable: true, primary: true}); //GUID to add
		aDisc.columns.add('checkItemFK', sql.NVarChar(37), {nullable: true}); // FK for either check or item
		aDisc.columns.add('name', sql.NVarChar(37), {nullable: true});
		aDisc.columns.add('discountAmount', sql.Float, {nullable: true});
		aDisc.columns.add('discount', sql.NVarChar(37), {nullable: true});
		aDisc.columns.add('approver', sql.NVarChar(37), {nullable: true});
		aDisc.columns.add('processingState', sql.NVarChar(37), {nullable: true});
		aDisc.columns.add('comboItems', sql.NVarChar(37), {nullable: true}); // stringify, unlikely to use
		aDisc.columns.add('appliedPromoCode', sql.NVarChar(37), {nullable: true});
	return aDisc
}

exports.createDeliveryInfoTable = function(){
	let deliveryInfo = new sql.Table();
	deliveryInfo.columns.add('orderFK', sql.NVarChar(37), {nullable: true});
	deliveryInfo.columns.add('address1', sql.NVarChar(37), {nullable: true});
	deliveryInfo.columns.add('address2', sql.NVarChar(37), {nullable: true});
	deliveryInfo.columns.add('city', sql.NVarChar(37), {nullable: true});
	deliveryInfo.columns.add('state', sql.NVarChar(37), {nullable: true});
	deliveryInfo.columns.add('zipCode', sql.NVarChar(37), {nullable: true});
	deliveryInfo.columns.add('latitude', sql.Float, {nullable: true});
	deliveryInfo.columns.add('longitude', sql.Float, {nullable: true});
	deliveryInfo.columns.add('deliveredDate', sql.NVarChar(37), {nullable: true});
	deliveryInfo.columns.add('dispatchedDate', sql.NVarChar(37), {nullable: true});
	deliveryInfo.columns.add('deliveryEmployee', sql.NVarChar(37), {nullable: true});
	return deliveryInfo;
}
exports.createCustomerTable = function(){
	let customer = new sql.Table();
		customer.columns.add('checkFK', sql.NVarChar(37), {nullable: true});
		customer.columns.add('firstName', sql.NVarChar(37), {nullable: true});
		customer.columns.add('lastName', sql.NVarChar(37), {nullable: true});
		customer.columns.add('phone', sql.NVarChar(37), {nullable: true});
		customer.columns.add('email', sql.NVarChar(37), {nullable: true});
	return customer;
}
exports.createAppliedLoyaltyInfoTable = function(){
	let aL = new sql.Table();
		aL.columns.add('appliedLoyaltyID', sql.NVarChar(37), {nullable: true, primary: true});
		aL.columns.add('checkFK', sql.NVarChar(37), {nullable: true});
		aL.columns.add('loyaltyIdentifier', sql.NVarChar(37), {nullable: true});
		aL.columns.add('vendor', sql.NVarChar(37), {nullable: true});
		aL.columns.add('accrualFamilyGuid', sql.NVarChar(37), {nullable: true});
		aL.columns.add('accrualText', sql.NVarChar(37), {nullable: true});
	return aL;
}
exports.createLoyaltyDetailsTable = function(){
	let lD = new sql.Table();
		lD.columns.add('appliedDiscountFK', sql.NVarChar(37), {nullable: true});
		lD.columns.add('vendor', sql.NVarChar(37), {nullable: true});
		lD.columns.add('referenceId', sql.NVarChar(37), {nullable: true});
	return lD;
}