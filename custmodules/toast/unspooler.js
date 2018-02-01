const eo = {};
exports.toXML = function(storeSet)
{
	let orders = ''
	let checks = ''
	let selections = ''
	let payments = ''
	let refunds = ''
	let appliedTaxes = ''
	let voidInfos = ''
	let appliedServiceCharges = ''
	let appliedDiscounts = ''
	let deliveryInfos = ''
	let customers = ''
	let appliedLoyaltyInfos = ''
	let loyaltyDetails = ''
	for(let istore in storeSet)
	{
		let storeID = istore
		let orderSet = storeSet[istore]
		for (let iorder in orderSet)
		{

			let order = orderSet[iorder]
			if(order.checks.length = 0)
			{
				log.warning({order: order}, 'order has no checks');
			}
			//console.log(order.guid);
			//populate orders table
			orders += '<order>' + 
			'<orderID>' + order.guid + '</orderID>' + '<storeID>' + storeID + '</storeID>' + '<openedDate>' + order.openedDate + '</openedDate>' + '<modifiedDate>' + order.modifiedDate + '</modifiedDate>' + '<promisedDate>' + order.promisedDate + '</promisedDate>' + 
			'<diningOption>' + ((order||eo).diningOption||eo).guid + '</diningOption>' + '<table>' + ((order||eo).table||eo).guid + '</table>' + '<serviceArea>' + ((order||eo).serviceArea||eo).guid + '</serviceArea>' + '<restaurantService>' + ((order||eo).restaurantService||eo).guid + '</restaurantService>' + 
			'<revenueCenter>' + ((order||eo).revenueCenter||eo).guid + '</revenueCenter>' + '<source>' + order.source + '</source>' + '<duration>' + order.duration + '</duration>' + '<estimatedFulfillmentDate>' + order.estimatedFulfillmentDate + '</estimatedFulfillmentDate>' + 
			'<numberOfGuests>' + order.numberOfGuests + '</numberOfGuests>' + '<voided>' + order.voided + '</voided>' + '<voidDate>' + order.voidDate + '</voidDate>' + '<voidBusinessdate>' + order.voidBusinessdate + '</voidBusinessdate>' + 
			'<paidDate>' + order.paidDate + '</paidDate>' + '<closedDate>' + order.closedDate + '</closedDate>' + '<deletedDate>' + order.deletedDate + '</deletedDate>' + '<deleted>' + order.deleted + '</deleted>' + 
			'<businessDate>' + order.businessDate + '</businessDate>' + '<server>' + ((order||eo).server||eo).guid + '</server>' + 
			'</order>\n'

			if(order.deliveryInfo)
			{
				let dInfo = order.deliveryInfo;
				deliveryInfos += '<deliveryInfo>' +
				'<orderFK>' + order.guid + '</orderFK>' + '<address1>' + dInfo.address1 + '</address1>' + '<address2>' + dInfo.address2 + '</address2>' + '<city>' + dInfo.city + '</city>' + '<state>' + dInfo.state + '</state>' + 
				'<zipCode>' + dInfo.zipCode + '</zipCode>' + '<latitude>' + dInfo.latitude + '</latitude>' + '<longitude>' + dInfo.longitude + '</longitude>' + '<deliveredDate>' + dInfo.deliveredDate + '</deliveredDate>' + 
				'<dispatchedDate>' + dInfo.dispatchedDate + '</dispatchedDate>' + '<deliveryEmployee>' + ((dInfo||eo).deliveryEmployee||eo).guid + '</deliveryEmployee>' +
				'</deliveryInfo>\n'
			}

			for (let icheck in order['checks'])
			{
				//populate checks
				let check = order['checks'][icheck]
				if (check.payments.length = 0)
				{
					log.warning({order: order}, 'check has no payments');
				}
				if (check.customer)
				{
					let cust = check.customer;
					customers += '<customer>' +
					'<checkFK>' + check.guid + '</checkFK>' + //'<customerID>' + cust.guid + '</customerID>' + 
					'<firstName>' + cust.firstName + '</firstName>' + '<lastName>' + cust.lastName + '</lastName>' + '<phone>' + cust.phone + '</phone>' + '<email>' + cust.email + '</email>' +
					'</customer>\n'
				}
				if (check.appliedLoyaltyInfo)
				{
					let aLI = check.appliedLoyaltyInfo;
					appliedLoyaltyInfos += '<appliedLoyaltyInfo>' +
					'<appliedLoyaltyID>' + aLI.guid + '</appliedLoyaltyID>' + '<checkFK>' + check.guid + '</checkFK>' + '<loyaltyIdentifier>' + aLI.loyaltyIdentifier + '</loyaltyIdentifier>' + '<vendor>' + aLI.vendor + '</vendor>' + 
					'<accrualFamilyGuid>' + aLI.accrualFamilyGuid + '</accrualFamilyGuid>' + '<accrualText>' + aLI.accrualText + '</accrualText>' +
					'</appliedLoyaltyInfo>\n'
				}
				checks += '<check>' +
				'<checkID>' + check.guid + '</checkID>' + '<orderFK>' + order.guid + '</orderFK>' + '<storeID>' + storeID + '</storeID>' + '<openedDate>' + check.openedDate + '</openedDate>' + '<modifiedDate>' + check.modifiedDate + '</modifiedDate>' + 
				'<deletedDate>' + check.deletedDate + '</deletedDate>' + '<deleted>' + check.deleted + '</deleted>' + '<taxExempt>' + check.taxExempt + '</taxExempt>' + '<displayNumber>' + check.displayNumber + '</displayNumber>' + 
				'<amount>' + check.amount + '</amount>' + '<taxAmount>' + check.taxAmount + '</taxAmount>' + '<totalAmount>' + check.totalAmount + '</totalAmount>' + '<tabName>' + check.tabName + '</tabName>' + 
				'<paymentStatus>' + check.paymentStatus + '</paymentStatus>' + '<voided>' + check.voided + '</voided>' + '<voidDate>' + check.voidDate + '</voidDate>' + '<voidBusinessdate>' + check.voidBusinessdate + '</voidBusinessdate>' + 
				'<paidDate>' + check.paidDate + '</paidDate>' +
				'</check>\n'

				for(let ipayment in check['payments'])
				{
					let payment = check['payments'][ipayment]
					if (payment.refund)
					{
						let refund = payment.refund;
						refunds += '<refund>'+
						'<paymentFK>' + payment.guid + '</paymentFK>' + '<refundAmount>' + refund.refundAmount + '</refundAmount>' + '<tipRefundAmount>' + refund.tipRefundAmount + '</tipRefundAmount>' + 
						'<refundDate>' + refund.refundDate + '</refundDate>' + '<refundBusinessDate>' + refund.refundBusinessDate + '</refundBusinessDate>' +
						'</refund>\n'
					}
					if (payment.voidInfo)
					{
						let voidinf = payment.voidInfo;
						voidInfos += '<voidInfo>' +
						'<paymentFK>' + payment.guid + '</paymentFK>' + '<voidUser>' + ((voidinf||eo).voidUser||eo).guid + '</voidUser>' + '<voidApprover>' + ((voidinf||eo).voidApprover||eo).guid + '</voidApprover>' + 
						'<voidDate>' + voidinf.voidDate + '</voidDate>' + '<voidBusinessdate>' + voidinf.voidBusinessdate + '</voidBusinessdate>' + '<voidReason>' + ((voidinf||eo).voidReason||eo).guid + '</voidReason>' +
						'</voidInfo>\n'
					}
					payments += '<payment>' +
					'<paymentID>' + payment.guid + '</paymentID>' + '<checkFK>' + check.guid + '</checkFK>' + '<storeID>' + storeID + '</storeID>' + '<paidDate>' + payment.paidDate + '</paidDate>' + '<paidBusinessDate>' + payment.paidBusinessDate + '</paidBusinessDate>' + 
					'<type>' + payment.type + '</type>' + '<cardEntryMode>' + payment.cardEntryMode + '</cardEntryMode>' + '<amount>' + payment.amount + '</amount>' + '<tipAmount>' + payment.tipAmount + '</tipAmount>' + 
					'<amountTendered>' + payment.amountTendered + '</amountTendered>' + '<cardType>' + payment.cardType + '</cardType>' + '<last4Digits>' + payment.last4Digits + '</last4Digits>' + 
					'<originalProcessingFee>' + payment.originalProcessingFee + '</originalProcessingFee>' + '<cashDrawer>' + ((payment||eo).cashDrawer||eo).guid + '</cashDrawer>' + 
					'<refundStatus>' + payment.refundStatus + '</refundStatus>' + '<paymentStatus>' + payment.paymentStatus + '</paymentStatus>' + '<houseAccount>' + ((payment||eo).houseAccount||eo).guid + '</houseAccount>' + '<otherPayment>' + ((payment||eo).otherPayment||eo).guid + '</otherPayment>' +
					'</payment>\n'
				}
				for(let iaD in check['appliedDiscounts'])
				{
					let aD = check['appliedDiscounts'][iaD]
					appliedDiscounts += '<appliedDiscount>' +
					'<appliedDiscountID>' + aD.guid + '</appliedDiscountID>' + '<checkSelectionFK>' + check.guid + '</checkSelectionFK>' + '<name>' + aD.name + '</name>' + '<discountAmount>' + aD.discountAmount + '</discountAmount>' + 
					'<discount>' + ((aD||eo).discount||eo).guid + '</discount>' + '<approver>' + ((aD||eo).approver||eo).guid + '</approver>' + '<processingState>' + aD.processingState + '</processingState>' + 
					'<comboItems>' + JSON.stringify(aD.comboItems) + '</comboItems>' + '<appliedPromoCode>' + aD.appliedPromoCode + '</appliedPromoCode>' +
					'</appliedDiscount>\n'
						if(aD.loyaltyDetails)
					{
						let lD = aD.loyaltyDetails;
						loyaltyDetails += '<loyaltyDetail>' +
						'<appliedDiscountFK>' + aD.guid + '</appliedDiscountFK>' + '<vendor>' + lD.vendor + '</vendor>' + '<referenceId>' + lD.referenceId + '</referenceId>' +
						'</loyaltyDetail>\n'
					}
				}
				for(let iaSC in check['appliedServiceCharges'])
				{
					let aSC = check['appliedServiceCharges'][iaSC]
					appliedServiceCharges += '<appliedServiceCharge>' +
					'<appliedServiceChargeID>' + aSC.guid + '</appliedServiceChargeID>' + '<checkFK>' + check.guid + '</checkFK>' + '<chargeAmount>' + aSC.chargeAmount + '</chargeAmount>' + 
					'<serviceCharge>' + ((aSC||eo).serviceCharge||eo).guid + '</serviceCharge>' + '<chargeType>' + aSC.chargeType + '</chargeType>' + '<name>' + aSC.name + '</name>' + '<delivery>' + aSC.delivery + '</delivery>' + 
					'<gratuity>' + aSC.gratuity + '</gratuity>' + '<taxable>' + aSC.taxable + '</taxable>' +
					'</appliedServiceCharge>\n'
					for(let iaT in aSC['appliedTaxes'])
					{
						let aT = aSC['appliedTaxes'][iaT]
						appliedTaxes += '<appliedTaxes>' +
						'<selectionServiceChargeFK>' + aSC.guid + '</selectionServiceChargeFK>' + '<entityType>' + aT.entityType + '</entityType>' + '<taxRate>' + ((aT||eo).taxRate||eo).guid + '</taxRate>' + '<rate>' + aT.rate + '</rate>' + 
						'<taxAmount>' + aT.taxAmount + '</taxAmount>' + '<type>' + aT.type + '</type>' +
						'</appliedTaxes>\n'
					}
				}
				for(let iselection in check['selections'])//field 3 is whether the selection is a modifier or not, for our internal use
				{
					let selection = check['selections'][iselection]
					selections += '<selection>' +
					'<selectionID>' + selection.guid + '</selectionID>' + '<checkSelectionFK>' + check.guid + '</checkSelectionFK>' + '<storeID>' + storeID + '</storeID>' + '<isModifier>false</isModifier>' + '<item>' + ((selection||eo).item||eo).guid + '</item>' + 
					'<itemGroup>' + ((selection||eo).itemGroup||eo).guid + '</itemGroup>' + '<optionGroup>' + ((selection||eo).optionGroup||eo).guid + '</optionGroup>' + 
					'<preModifier>' + ((selection||eo).preModifier||eo).guid + '</preModifier>' + '<quantity>' + selection.quantity + '</quantity>' + '<selectionType>' + selection.selectionType + '</selectionType>' + 
					'<salesCategory>' + ((selection||eo).salesCategory||eo).guid + '</salesCategory>' + '<deferred>' + selection.deferred + '</deferred>' + '<preDiscountPrice>' + selection.preDiscountPrice + '</preDiscountPrice>' + 
					'<price>' + selection.price + '</price>' + '<tax>' + selection.tax + '</tax>' + '<voided>' + selection.voided + '</voided>' + '<voidDate>' + selection.voidDate + '</voidDate>' + 
					'<voidBusinessDate>' + selection.voidBusinessDate + '</voidBusinessDate>' + '<voidReason>' + ((selection||eo).voidReason||eo).guid + '</voidReason>' + '<displayName>' + selection.displayName + '</displayName>' + 
					'<createdDate>' + selection.createdDate + '</createdDate>' + '<modifiedDate>' + selection.modifiedDate + '</modifiedDate>' + '<fulfillmentStatus>' + selection.fulfillmentStatus + '</fulfillmentStatus>' +
					'</selection>\n'
					for(let iaD in selection['appliedDiscounts'])
					{
						let aD = selection['appliedDiscounts'][iaD]
						appliedDiscounts += '<appliedDiscount>' +
						'<appliedDiscountID>' + aD.guid + '</appliedDiscountID>' + '<checkSelectionFK>' + selection.guid + '</checkSelectionFK>' + '<name>' + aD.name + '</name>' + '<discountAmount>' + aD.discountAmount + '</discountAmount>' + 
						'<discount>' + ((aD||eo).discount||eo).guid + '</discount>' + '<approver>' + ((aD||eo).approver||eo).guid + '</approver>' + '<processingState>' + aD.processingState + '</processingState>' + 
						'<comboItems>' + JSON.stringify(aD.comboItems) + '</comboItems>' + '<appliedPromoCode>' + aD.appliedPromoCode + '</appliedPromoCode>' +
						'</appliedDiscount>\n'
	 					if(aD.loyaltyDetails)
						{
							let lD = aD.loyaltyDetails;
							loyaltyDetails += '<loyaltyDetail>' +
							'<appliedDiscountFK>' + aD.guid + '</appliedDiscountFK>' + '<vendor>' + lD.vendor + '</vendor>' + '<referenceId>' + lD.referenceId + '</referenceId>' +
							'</loyaltyDetail>\n'
						}
					}
					for(let iaT in selection['appliedTaxes'])
					{
						let aT = selection['appliedTaxes'][iaT]
						appliedTaxes += '<appliedTaxes>' +
						'<selectionServiceChargeFK>' + selection.guid + '</selectionServiceChargeFK>' + '<entityType>' + aT.entityType + '</entityType>' + '<taxRate>' + ((aT||eo).taxRate||eo).guid + '</taxRate>' + '<rate>' + aT.rate + '</rate>' + 
						'<taxAmount>' + aT.taxAmount + '</taxAmount>' + '<type>' + aT.type + '</type>' +
						'</appliedTaxes>\n'
					}
					for(let imodifier in selection['modifiers']) //modifiers are selections
					{
						let modifier = selection['modifiers'][imodifier]
						selections += '<selection>' +
						'<selectionID>' + modifier.guid + '</selectionID>' + '<checkSelectionFK>' + selection.guid + '</checkSelectionFK>' + '<storeID>' + storeID + '</storeID>' +'<isModifier>true</isModifier>' + '<item>' + ((modifier||eo).item||eo).guid + '</item>' + 
						'<itemGroup>' + ((modifier||eo).itemGroup||eo).guid + '</itemGroup>' + '<optionGroup>' + ((modifier||eo).optionGroup||eo).guid + '</optionGroup>' + 
						'<preModifier>' + ((modifier||eo).preModifier||eo).guid + '</preModifier>' + '<quantity>' + modifier.quantity + '</quantity>' + '<selectionType>' + modifier.selectionType + '</selectionType>' + 
						'<salesCategory>' + ((modifier||eo).salesCategory||eo).guid + '</salesCategory>' + '<deferred>' + modifier.deferred + '</deferred>' + '<preDiscountPrice>' + modifier.preDiscountPrice + '</preDiscountPrice>' + 
						'<price>' + modifier.price + '</price>' + '<tax>' + modifier.tax + '</tax>' + '<voided>' + modifier.voided + '</voided>' + '<voidDate>' + modifier.voidDate + '</voidDate>' + 
						'<voidBusinessDate>' + modifier.voidBusinessDate + '</voidBusinessDate>' + '<voidReason>' + ((modifier||eo).voidReason||eo).guid + '</voidReason>' + '<displayName>' + modifier.displayName + '</displayName>' + 
						'<createdDate>' + modifier.createdDate + '</createdDate>' + '<modifiedDate>' + modifier.modifiedDate + '</modifiedDate>' + '<fulfillmentStatus>' + modifier.fulfillmentStatus + '</fulfillmentStatus>' +
						'</selection>\n'
						for(let iaD in modifier['appliedDiscounts'])
						{
							let aD = selection['appliedDiscounts'][iaD]
							appliedDiscounts += '<appliedDiscount>' +
							'<appliedDiscountID>' + aD.guid + '</appliedDiscountID>' + '<checkSelectionFK>' + modifier.guid + '</checkSelectionFK>' + '<name>' + aD.name + '</name>' + '<discountAmount>' + aD.discountAmount + '</discountAmount>' + 
							'<discount>' + ((aD||eo).discount||eo).guid + '</discount>' + '<approver>' + ((aD||eo).approver||eo).guid + '</approver>' + '<processingState>' + aD.processingState + '</processingState>' + 
							'<comboItems>' + JSON.stringify(aD.comboItems) + '</comboItems>' + '<appliedPromoCode>' + aD.appliedPromoCode + '</appliedPromoCode>' +
							'</appliedDiscount>\n'
		 					if(aD.loyaltyDetails)
							{
								let lD = aD.loyaltyDetails;
								loyaltyDetails += '<loyaltyDetail>' +
								'<appliedDiscountFK>' + aD.guid + '</appliedDiscountFK>' + '<vendor>' + lD.vendor + '</vendor>' + '<referenceId>' + lD.referenceId + '</referenceId>' +
								'</loyaltyDetails>\n'
							}
						}
						for(let iaT in modifier['appliedTaxes'])
						{
							let aT = modifier['appliedTaxes'][iaT]
							appliedTaxes += '<appliedTaxes>' +
							'<selectionServiceChargeFK>' + modifier.guid + '</selectionServiceChargeFK>' + '<entityType>' + aT.entityType + '</entityType>' + '<taxRate>' + ((aT||eo).taxRate||eo).guid + '</taxRate>' + '<rate>' + aT.rate + '</rate>' + 
							'<taxAmount>' + aT.taxAmount + '</taxAmount>' + '<type>' + aT.type + '</type>' +
							'</appliedTaxes>\n'
						}
					}
				}
			}
		}
	}
let XML={
	orders: inpFormat('<orders>' + orders + '</orders>'),
	checks: inpFormat('<checks>' + checks + '</checks>'),
	selections: inpFormat('<selections>' + selections + '</selections>'),
	payments: inpFormat('<payments>' + payments + '</payments>').replace(/<originalProcessingFee>null<\/originalProcessingFee>/g, '<originalProcessingFee>0</originalProcessingFee>'),
	refunds: inpFormat('<refunds>' + refunds + '</refunds>'),
	appliedTaxes: inpFormat('<appliedTaxes>' + appliedTaxes + '</appliedTaxes>'),
	voidInfos: inpFormat('<voidInfos>' + voidInfos + '</voidInfos>'),
	appliedDiscounts: inpFormat('<appliedDiscounts>' + appliedDiscounts + '</appliedDiscounts>'),
	deliveryInfos: inpFormat('<deliveryInfos>' + deliveryInfos + '</deliveryInfos>'),
	customers: inpFormat('<customers>' + customers + '</customers>'),
	appliedLoyaltyInfos: inpFormat('<appliedLoyaltyInfos>' + appliedLoyaltyInfos + '</appliedLoyaltyInfos>'),
	loyaltyDetails: inpFormat('<loyaltyDetails>' + loyaltyDetails + '</loyaltyDetails>'),
	}
	return XML;
}
function inpFormat(str)
{
	return str.replace(/undefined/g,'null').replace(/((\d{4})-?(\d{2})-?(\d{2})T?(\d{2}):?(\d{2}):?(\d{2})\.?(\d{3}))\+?(\d{2})(?::?00|Z)/g,'$1').replace(/[&'"]/g,
	 c=>{
		switch (c) {
			case '&': return '&amp;';
            case '\'': return '&apos;';
            case '"': return '&quot;';
		}
	})
}