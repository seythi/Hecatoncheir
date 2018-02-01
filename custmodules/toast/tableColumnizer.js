const sql = require('tedious');
var TYPES = sql.TYPES;
exports.createOrdersTable = function(orders){ 
		orders.addColumn('orderID', TYPES.NVarChar, {length: 37, nullable: false}); //GUID
		orders.addColumn('storeID', TYPES.NVarChar, {length: 37, nullable: true});
		orders.addColumn('openedDate', TYPES.NVarChar, {length: 37, nullable: true});
		orders.addColumn('modifiedDate', TYPES.NVarChar, {length: 37, nullable: true});
		orders.addColumn('promisedDate', TYPES.NVarChar, {length: 37, nullable: true});
		orders.addColumn('diningOption', TYPES.NVarChar, {length: 37, nullable: true});
		orders.addColumn('table', TYPES.NVarChar, {length: 37, nullable: true});
		orders.addColumn('serviceArea', TYPES.NVarChar, {length: 37, nullable: true});
		orders.addColumn('restaurantService', TYPES.NVarChar, {length: 37, nullable: true});
		orders.addColumn('revenueCenter', TYPES.NVarChar, {length: 37, nullable: true});
		orders.addColumn('source', TYPES.NVarChar, {length: 37, nullable: true});
		orders.addColumn('duration', TYPES.Int, {nullable: true});
		orders.addColumn('estimatedFulfillmentDate', TYPES.NVarChar, {length: 37, nullable: true});
		orders.addColumn('numberOfGuests', TYPES.Int, {nullable: true});
		orders.addColumn('voided', TYPES.Bit, {nullable: true});
		orders.addColumn('voidDate', TYPES.NVarChar, {length: 37, nullable: true});
		orders.addColumn('voidBusinessDate', TYPES.Int, {nullable: true});
		orders.addColumn('paidDate', TYPES.NVarChar, {length: 37, nullable: true});
		orders.addColumn('closedDate', TYPES.NVarChar, {length: 37, nullable: true});
		orders.addColumn('deletedDate', TYPES.NVarChar, {length: 37, nullable: true});
		orders.addColumn('deleted', TYPES.Bit, {nullable: true});
		orders.addColumn('businessDate', TYPES.Int, {nullable: true});
		orders.addColumn('server', TYPES.NVarChar, {length: 37, nullable: true});
	return orders;
}

exports.createChecksTable = function (checks){
		checks.addColumn('checkID', TYPES.NVarChar, {length: 37, nullable: false});
		checks.addColumn('orderFK', TYPES.NVarChar, {length: 37, nullable: false}); //ORDER FK
		checks.addColumn('storeID', TYPES.NVarChar, {length: 37, nullable: true});
		checks.addColumn('openedDate', TYPES.NVarChar, {length: 37, nullable: true});
		checks.addColumn('modifiedDate', TYPES.NVarChar, {length: 37, nullable: true});
		checks.addColumn('deletedDate', TYPES.NVarChar, {length: 37, nullable: true});
		checks.addColumn('deleted', TYPES.Bit, {nullable: true});
		checks.addColumn('taxExempt', TYPES.Bit, {nullable: true});
		checks.addColumn('displayNumber', TYPES.NVarChar, {length: 37, nullable: true}); //yes this is supposed to be NVarChar, {length: 37, nullable: true}
		checks.addColumn('amount', TYPES.Float, {nullable: true});
		checks.addColumn('taxAmount', TYPES.Float, {nullable: true});
		checks.addColumn('totalAmount', TYPES.Float, {nullable: true});
		checks.addColumn('tabName', TYPES.NVarChar, {length: 256, nullable: true});
		checks.addColumn('paymentStatus', TYPES.NVarChar, {length: 37, nullable: true});
		checks.addColumn('voided', TYPES.Bit, {nullable: true});
		checks.addColumn('voidDate', TYPES.NVarChar, {length: 37, nullable: true});
		checks.addColumn('voidBusinessDate', TYPES.Int, {nullable: true});
		checks.addColumn('paidDate', TYPES.NVarChar, {length: 37, nullable: true});
	return checks;
}

exports.createPaymentsTable = function (payment){
		payment.addColumn('paymentID', TYPES.NVarChar, {length: 37, nullable: false}); //GUID
		payment.addColumn('checkFK', TYPES.NVarChar, {length: 37, nullable: false}); //CHECK FK
		payment.addColumn('storeID', TYPES.NVarChar, {length: 37, nullable: true});
		payment.addColumn('paidDate', TYPES.NVarChar, {length: 37, nullable: true});
		payment.addColumn('paidBusinessDate', TYPES.Int, {nullable: true});
		payment.addColumn('type', TYPES.NVarChar, {length: 37, nullable: true});
		payment.addColumn('cardEntryMode', TYPES.NVarChar, {length: 37, nullable: true});
		payment.addColumn('amount', TYPES.Float, {nullable: true});
		payment.addColumn('tipAmount', TYPES.Float, {nullable: true});
		payment.addColumn('amountTendered', TYPES.Float, {nullable: true});
		payment.addColumn('cardType', TYPES.NVarChar, {length: 37, nullable: true});
		payment.addColumn('last4Digits', TYPES.NVarChar, {length: 37, nullable: true}); //yes supposed to be NVarChar, {length: 37, nullable: true}
		payment.addColumn('originalProcessingFee', TYPES.Float, {nullable: true});
		payment.addColumn('cashDrawer', TYPES.NVarChar, {length: 37, nullable: true});
		payment.addColumn('refundStatus', TYPES.NVarChar, {length: 37, nullable: true});
		payment.addColumn('paymentStatus', TYPES.NVarChar, {length: 37, nullable: true});
		payment.addColumn('houseAccount', TYPES.NVarChar, {length: 37, nullable: true});
		payment.addColumn('otherPayment', TYPES.NVarChar, {length: 37, nullable: true});
	return payment;
}

exports.createRefundsTable = function (refunds){
		refunds.addColumn('paymentFK', TYPES.NVarChar, {length: 37, nullable: false}); //PAYMENT FK
		refunds.addColumn('refundAmount', TYPES.Float, {nullable: true});
		refunds.addColumn('tipRefundAmount', TYPES.Float, {nullable: true});
		refunds.addColumn('refundDate', TYPES.NVarChar, {length: 37, nullable: true});
		refunds.addColumn('refundBusinessDate', TYPES.Int, {nullable: true});
	return refunds
}

exports.createVoidInfosTable = function (voidInfo){
		voidInfo.addColumn('paymentFK', TYPES.NVarChar, {length: 37, nullable: false}); // CHECK FK
		voidInfo.addColumn('voidUser', TYPES.NVarChar, {length: 37, nullable: true});
		voidInfo.addColumn('voidApprover', TYPES.NVarChar, {length: 37, nullable: true});
		voidInfo.addColumn('voidDate', TYPES.NVarChar, {length: 37, nullable: true});
		voidInfo.addColumn('voidBusinessDate', TYPES.Int, {nullable: true});
		voidInfo.addColumn('voidReason', TYPES.NVarChar, {length: 37, nullable: true});
	return voidInfo
}

exports.createSelectionsTable = function (selections){
		selections.addColumn('SelectionID', TYPES.NVarChar, {length: 37, nullable: false}); //GUID
		selections.addColumn('checkSelFK', TYPES.NVarChar, {length: 37, nullable: false}); // CHECK or SELECTION FK
		selections.addColumn('storeID', TYPES.NVarChar, {length: 37, nullable: true});
		selections.addColumn('isModifier', TYPES.Bit, {nullable: true}); //FLAG to add when flattening
		selections.addColumn('item', TYPES.NVarChar, {length: 37, nullable: true});
		selections.addColumn('itemGroup', TYPES.NVarChar, {length: 37, nullable: true});
		selections.addColumn('optionGroup', TYPES.NVarChar, {length: 37, nullable: true});
		selections.addColumn('preModifier', TYPES.NVarChar, {length: 37, nullable: true});
		selections.addColumn('quantity', TYPES.Float, {nullable: true});
		selections.addColumn('selectionType', TYPES.NVarChar, {length: 37, nullable: true});
		selections.addColumn('salesCategory', TYPES.NVarChar, {length: 37, nullable: true});
		selections.addColumn('deferred', TYPES.Bit, {nullable: true});
		selections.addColumn('preDiscountPrice', TYPES.Float, {nullable: true});
		selections.addColumn('price', TYPES.Float, {nullable: true});
		selections.addColumn('tax', TYPES.Float, {nullable: true});
		selections.addColumn('voided', TYPES.Bit, {nullable: true});
		selections.addColumn('voidDate', TYPES.NVarChar, {length: 37, nullable: true});
		selections.addColumn('voidBusinessDate', TYPES.Int, {nullable: true});
		selections.addColumn('voidReason', TYPES.NVarChar, {length: 37, nullable: true});
		selections.addColumn('displayName', TYPES.NVarChar, {length: 255, nullable: true});
		selections.addColumn('createdDate', TYPES.NVarChar, {length: 37, nullable: true});
		selections.addColumn('modifiedDate', TYPES.NVarChar, {length: 37, nullable: true});
		selections.addColumn('fulfillmentStatus', TYPES.NVarChar, {length: 37, nullable: true});
	return selections
}

exports.createAppliedServiceChargesTable = function (asc){
		asc.addColumn('appliedServiceChargeID', TYPES.NVarChar, {length: 37, nullable: false}); //GUID
		asc.addColumn('checkFK', TYPES.NVarChar, {length: 37, nullable: false}); // CHECK FK
		asc.addColumn('chargeAmount', TYPES.Float, {nullable: true});
		asc.addColumn('serviceCharge', TYPES.NVarChar, {length: 37, nullable: true});
		asc.addColumn('chargeType', TYPES.NVarChar, {length: 37, nullable: true});
		asc.addColumn('name', TYPES.NVarChar, {length: 37, nullable: true});
		asc.addColumn('delivery', TYPES.Bit, {nullable: true});
		asc.addColumn('gratuity', TYPES.Bit, {nullable: true});
		asc.addColumn('taxable', TYPES.Bit, {nullable: true});
	return asc
}

exports.createAppliedTaxesTable = function (aT){
		aT.addColumn('selectionServiceChargeFK', TYPES.NVarChar, {length: 37, nullable: false}); // FK to selection or service charge FK
		aT.addColumn('entityType', TYPES.NVarChar, {length: 37, nullable: true});
		aT.addColumn('taxRate', TYPES.NVarChar, {length: 37, nullable: true});
		aT.addColumn('rate', TYPES.Float, {nullable: true});
		aT.addColumn('taxAmount', TYPES.Float, {nullable: true});
		aT.addColumn('type', TYPES.NVarChar, {length: 37, nullable: true});
	return aT
}

exports.createAppliedDiscountsTable = function (aDisc){
		aDisc.addColumn('discountID', TYPES.NVarChar, {length: 37, nullable: false}); //GUID to add
		aDisc.addColumn('checkItemFK', TYPES.NVarChar, {length: 37, nullable: false}); // FK for either check or item
		aDisc.addColumn('name', TYPES.NVarChar, {length: 37, nullable: true});
		aDisc.addColumn('discountAmount', TYPES.Float, {nullable: true});
		aDisc.addColumn('discount', TYPES.NVarChar, {length: 37, nullable: true});
		aDisc.addColumn('approver', TYPES.NVarChar, {length: 37, nullable: true});
		aDisc.addColumn('processingState', TYPES.NVarChar, {length: 37, nullable: true});
		aDisc.addColumn('comboItems', TYPES.NVarChar, {length: 37, nullable: true}); // stringify, unlikely to use
		aDisc.addColumn('appliedPromoCode', TYPES.NVarChar, {length: 37, nullable: true});
	return aDisc
}

exports.createDeliveryInfosTable = function(deliveryInfo){
	deliveryInfo.addColumn('orderFK', TYPES.NVarChar, {length: 37, nullable: false});
	deliveryInfo.addColumn('address1', TYPES.NVarChar, {length: 37, nullable: true});
	deliveryInfo.addColumn('address2', TYPES.NVarChar, {length: 37, nullable: true});
	deliveryInfo.addColumn('city', TYPES.NVarChar, {length: 37, nullable: true});
	deliveryInfo.addColumn('state', TYPES.NVarChar, {length: 37, nullable: true});
	deliveryInfo.addColumn('zipCode', TYPES.NVarChar, {length: 37, nullable: true});
	deliveryInfo.addColumn('latitude', TYPES.Float, {nullable: true});
	deliveryInfo.addColumn('longitude', TYPES.Float, {nullable: true});
	deliveryInfo.addColumn('deliveredDate', TYPES.NVarChar, {length: 37, nullable: true});
	deliveryInfo.addColumn('dispatchedDate', TYPES.NVarChar, {length: 37, nullable: true});
	deliveryInfo.addColumn('deliveryEmployee', TYPES.NVarChar, {length: 37, nullable: true});
	return deliveryInfo;
}
exports.createCustomersTable = function(customer){
		customer.addColumn('checkFK', TYPES.NVarChar, {length: 37, nullable: false});
		customer.addColumn('firstName', TYPES.NVarChar, {length: 37, nullable: true});
		customer.addColumn('lastName', TYPES.NVarChar, {length: 37, nullable: true});
		customer.addColumn('phone', TYPES.NVarChar, {length: 37, nullable: true});
		customer.addColumn('email', TYPES.NVarChar, {length: 37, nullable: true});
	return customer;
}
exports.createAppliedLoyaltyInfosTable = function(aL){
		aL.addColumn('appliedLoyaltyID', TYPES.NVarChar, {length: 37, nullable: false});
		aL.addColumn('checkFK', TYPES.NVarChar, {length: 37, nullable: false});
		aL.addColumn('loyaltyIdentifier', TYPES.NVarChar, {length: 37, nullable: true});
		aL.addColumn('vendor', TYPES.NVarChar, {length: 37, nullable: true});
		aL.addColumn('accrualFamilyGuid', TYPES.NVarChar, {length: 37, nullable: true});
		aL.addColumn('accrualText', TYPES.NVarChar, {length: 37, nullable: true});
	return aL;
}
exports.createLoyaltyDetailsTable = function(lD){
		lD.addColumn('appliedDiscountFK', TYPES.NVarChar, {length: 37, nullable: false});
		lD.addColumn('vendor', TYPES.NVarChar, {length: 37, nullable: true});
		lD.addColumn('referenceId', TYPES.NVarChar, {length: 37, nullable: true});
	return lD;
}