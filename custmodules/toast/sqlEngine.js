const eo = {}; 
const sql = require('tedious');
const tcol = require('./tableColumnizer.js');
const bunyan = require('bunyan')
const path = require('path')
const promise = require('bluebird')
const cf = require('../../config.js')
const util = require('../util.js')
var log = bunyan.createLogger({
	name:'SQL',
	streams:[{
		level: 'info',
		type: 'rotating-file',
		path: path.resolve(cf.rootD, 'logs\\SQL.log'),
		period: '7d',
		count: 4,
	},{
		level: 'error',
		path: path.resolve(cf.rootD, 'logs\\SQLERROR.log')
	}]
})


const targetServer = 'SMTN-sql14';
const targetDatabase = 'ETL';



exports.getGUIDs = function(){
	return new promise(resolve=>{
	console.log('here');
	const conOPT = {
	userName: 'Hecatoncheir',
	password:'Password1',
	server: targetServer,
	
	options:{database: targetDatabase, trustedConnection: true, rowCollectionOnRequestCompletion: true}
	}
	let conn = new sql.Connection(conOPT)
	conn.on('connect',err=>{
		if(err){
			console.log('failed to connect to SQL')
			console.log(err)
			log.fatal(err, 'failed to connect to SQL');
			util.regenerate()
		}
		else{
			console.log('connected');
			var req = new sql.Request('select ToastGUID from __UTIL.store_metadata WHERE ToastGUID IS NOT NULL',(e,rc,rs)=>{
				let guids = [];
				for(let r in rs)
				{
					guids.push(rs[r][0].value)
				}
				console.log('resolving guids')
				resolve(guids);
			})
			conn.execSql(req)
		}
	})
	})
}

exports.bulkInsert = function(storeSet){
	const conOPT = {
	userName: 'Hecatoncheir',
	password:'Password1',
	server: targetServer,
	
	options:{database: targetDatabase,
		requestTimeout: 300000,
	 trustedConnection: true}
}
	let conn = new sql.Connection(conOPT)
	conn.on('connect', err=>
	{
		if(err)
		{
			console.log('failed to connect to SQL')
			console.log(err)
			log.fatal(err, 'failed to connect to SQL');
			util.regenerate()
		}
		else
		{
			console.log('connection made')
			var Orders = conn.newBulkLoad('toast.Orders_', (err, rc) => //every bulk load is called in a resolution chain starting at orders
				{ if(err){log.error(err, "failed to write to Orders_")} //this is unavoidable as requests must be made in series
				else{console.log('inserted ' + rc + ' rows into Orders')}
					conn.execBulkLoad(Checks);
				})
			tcol.createOrdersTable(Orders)
			var Checks = conn.newBulkLoad('toast.Checks_', (err, rc) =>
				{ if(err){log.error(err, "failed to write to Checks_")}
				else{console.log('inserted ' + rc + ' rows into Checks')}
					conn.execBulkLoad(Selections);
				})
			tcol.createChecksTable(Checks)
			var Selections = conn.newBulkLoad('toast.Selections_', (err, rc) =>
				{ if(err){log.error(err, "failed to write to Selections_")}
				else{console.log('inserted ' + rc + ' rows into Selections')}
					conn.execBulkLoad(Payments)
				})
			tcol.createSelectionsTable(Selections)
			var Payments = conn.newBulkLoad('toast.Payments_', (err, rc) =>
				{ if(err){log.error(err, "failed to write to Payments_")}
				else{console.log('inserted ' + rc + ' rows into Payments')}
					conn.execBulkLoad(Refunds)
				})
			tcol.createPaymentsTable(Payments)
			var Refunds = conn.newBulkLoad('toast.Refunds_', (err, rc) =>
				{ if(err){log.error(err, "failed to write to Refunds_")}
				else{console.log('inserted ' + rc + ' rows into Refunds')}
					conn.execBulkLoad(AppliedTaxes)
				})
			tcol.createRefundsTable(Refunds)
			var AppliedTaxes = conn.newBulkLoad('toast.AppliedTaxes_', (err, rc) =>
				{ if(err){log.error(err, "failed to write to AppliedTaxes_")}
				else{console.log('inserted ' + rc + ' rows into AppliedTaxes')}
					conn.execBulkLoad(VoidInfos)
				})
			tcol.createAppliedTaxesTable(AppliedTaxes)
			var VoidInfos = conn.newBulkLoad('toast.VoidInfos_', (err, rc) =>
				{ if(err){log.error(err, "failed to write to VoidInfos_")}
				else{console.log('inserted ' + rc + ' rows into VoidInfos')}
					conn.execBulkLoad(AppliedServiceCharges)
				})
			tcol.createVoidInfosTable(VoidInfos)
			var AppliedServiceCharges = conn.newBulkLoad('toast.AppliedServiceCharges_', (err, rc) =>
				{ if(err){log.error(err, "failed to write to AppliedServiceCharges_")}
				else{console.log('inserted ' + rc + ' rows into AppliedServiceCharges')}
					conn.execBulkLoad(AppliedDiscounts)
				})
			tcol.createAppliedServiceChargesTable(AppliedServiceCharges)
			var AppliedDiscounts = conn.newBulkLoad('toast.AppliedDiscounts_', (err, rc) =>
				{ if(err){log.error(err, "failed to write to AppliedDiscounts_")}
				else{console.log('inserted ' + rc + ' rows into AppliedDiscounts')}
					conn.execBulkLoad(DeliveryInfos)
				})
			tcol.createAppliedDiscountsTable(AppliedDiscounts)
			var DeliveryInfos = conn.newBulkLoad('toast.DeliveryInfos_', (err, rc) =>
				{ if(err){log.error(err, "failed to write to DeliveryInfos_")}
				else{console.log('inserted ' + rc + ' rows into DeliveryInfos')}
					conn.execBulkLoad(Customers)
				})
			tcol.createDeliveryInfosTable(DeliveryInfos)
			var Customers = conn.newBulkLoad('toast.Customers_', (err, rc) =>
				{ if(err){log.error(err, "failed to write to Customers_")}
				else{console.log('inserted ' + rc + ' rows into Customers')}
					conn.execBulkLoad(AppliedLoyaltyInfos)
				})
			tcol.createCustomersTable(Customers)
			var AppliedLoyaltyInfos = conn.newBulkLoad('toast.AppliedLoyaltyInfos_', (err, rc) =>
				{ if(err){log.error(err, "failed to write to AppliedLoyaltyInfos_")}
				else{console.log('inserted ' + rc + ' rows into AppliedLoyaltyInfos')}
					conn.execBulkLoad(LoyaltyDetails)
				})
			tcol.createAppliedLoyaltyInfosTable(AppliedLoyaltyInfos)
			var LoyaltyDetails = conn.newBulkLoad('toast.AppliedLoyaltyDetails_', (err, rc) =>
				{ if(err){log.error(err, "failed to write to AppliedLoyaltyDetails_")}
				else{console.log('inserted ' + rc + ' rows into LoyaltyDetails')}
					conn.callProcedure(mergeData)
				})
			tcol.createLoyaltyDetailsTable(LoyaltyDetails)

			var mergeData = new sql.Request('toast.mergeAll', err=>{ //after writing data to the toast.t(...) staging tables, merge them to the production tables
				if (err){
					log.error(err, 'failed to execute mergeall')
					console.log('failed mergeAll, consult log file')
					setTimeout(()=>{
						conn.callProcedure(mergeData2);
					},1800000)
				}
				else{
			 	conn.close();
			 }
			})
			var mergeData2 = new sql.Request('toast.mergeAll', err=>{ //after writing data to the toast.t(...) staging tables, merge them to the production tables
				if (err){
					log.fatal(err, 'failed to execute mergeall the second time')
					console.log('failed mergeAll, consult log file')
					util.regenerate()
				}
				
			 	conn.close();
			 
			})

			///////////////////////BEGIN UNSPOOLER///////////////////////////
			//Walks through the received JSON, with limited flattening
			/////////////////////////////////////////////////////////////////
			//Of note: all fields referred to in toast as "[...]Reference" may be either objects or NULL
			//			In these instances the syntax ((parent||eo).child||eo).guid is used to write the related GUID if present, or NULL if not present
			for(let istore in storeSet)
			{
				let storeID = istore
				let orderset = storeSet[istore]
				//log.info({fset:orderset}, 'chunk of orders')
				for (let iorder in orderset)
				{

					let order = orderset[iorder]
					if(order.checks.length == 0)
					{
						log.warn({order: order}, 'order has no Checks');
					}
					//console.log(order.guid);
					//populate Orders table
					Orders.addRow( order.guid , storeID , order.openedDate , order.modifiedDate , order.promisedDate 
					, ((order||eo).diningOption||eo).guid , ((order||eo).table||eo).guid , ((order||eo).serviceArea||eo).guid , ((order||eo).restaurantService||eo).guid 
					, ((order||eo).revenueCenter||eo).guid , order.source , order.duration , order.estimatedFulfillmentDate 
					, order.numberOfGuests , order.voided , order.voidDate , order.voidBusinessdate 
					, order.paidDate , order.closedDate , order.deletedDate , order.deleted 
					, order.businessDate , ((order||eo).server||eo).guid );

					if(order.deliveryInfo)
					{
						let dInfo = order.deliveryInfo;
						DeliveryInfos.addRow(
						 order.guid , dInfo.address1 , dInfo.address2 , dInfo.city , dInfo.state 
						, dInfo.zipCode , dInfo.latitude , dInfo.longitude , dInfo.deliveredDate 
						, dInfo.dispatchedDate , ((dInfo||eo).deliveryEmployee||eo).guid );
						
					}
					for (let icheck in order['checks'])
					{
						//populate Checks
						let check = order['checks'][icheck]
						if (check.payments.length == 0)
						{
							log.debug({order: order}, 'check has no Payments');
						}
						if (check.customer)
						{
							let cust = check.customer;
							Customers.addRow(
							 check.guid  //, cust.guid 
							, cust.firstName , cust.lastName , cust.phone , cust.email );
							
						}
						if (check.appliedLoyaltyInfo)
						{
							let aLI = check.appliedLoyaltyInfo;
							AppliedLoyaltyInfos.addRow( 
							 aLI.guid , check.guid , aLI.loyaltyIdentifier , aLI.vendor 
							, aLI.accrualFamilyGuid , aLI.accrualText );
							
						}
						Checks.addRow(
						 check.guid , order.guid , storeID , check.openedDate , check.modifiedDate 
						, check.deletedDate , check.deleted , check.taxExempt , check.displayNumber 
						, check.amount , check.taxAmount , check.totalAmount , check.tabName 
						, check.Paymentstatus , check.voided , check.voidDate , check.voidBusinessdate 
						, check.paidDate );
						

						for(let ipayment in check['payments'])
						{
							let payment = check['payments'][ipayment]
							if (payment.refund)
							{
								let refund = payment.refund;
								Refunds.addRow(
								 payment.guid , refund.refundAmount , refund.tipRefundAmount 
								, refund.refundDate , refund.refundBusinessDate )
								
							}
							if (payment.voidInfo)
							{
								let voidinf = payment.voidInfo;
								VoidInfos.addRow(
								 payment.guid , ((voidinf||eo).voidUser||eo).guid , ((voidinf||eo).voidApprover||eo).guid 
								, voidinf.voidDate , voidinf.voidBusinessdate , ((voidinf||eo).voidReason||eo).guid )
								
							}
							Payments.addRow(
							 payment.guid , check.guid , storeID , payment.paidDate , payment.paidBusinessDate 
							, payment.type , payment.cardEntryMode , payment.amount , payment.tipAmount 
							, payment.amountTendered , payment.cardType , payment.last4Digits 
							, payment.originalProcessingFee , ((payment||eo).cashDrawer||eo).guid 
							, payment.Refundstatus , payment.Paymentstatus , ((payment||eo).houseAccount||eo).guid , ((payment||eo).otherPayment||eo).guid )
							
						}
						for(let iaD in check['appliedDiscounts'])
						{
							let aD = check['appliedDiscounts'][iaD]
							AppliedDiscounts.addRow(
							 aD.guid , check.guid , aD.name , aD.discountAmount 
							, ((aD||eo).discount||eo).guid , ((aD||eo).approver||eo).guid , aD.processingState 
							, JSON.stringify(aD.comboItems) , aD.appliedPromoCode )
							
								if(aD.loyaltyDetails)
							{
								let lD = aD.loyaltyDetails;
								LoyaltyDetails.addRow(
								 aD.guid , lD.vendor , lD.referenceId )
								
							}
						}
						for(let iaSC in check['appliedServiceCharges'])
						{
							let aSC = check['appliedServiceCharges'][iaSC]
							AppliedServiceCharges.addRow(
							 aSC.guid , check.guid , aSC.chargeAmount 
							, ((aSC||eo).serviceCharge||eo).guid , aSC.chargeType , aSC.name , aSC.delivery 
							, aSC.gratuity , aSC.taxable )
							
							for(let iaT in aSC['appliedTaxes'])
							{
								let aT = aSC['appliedTaxes'][iaT]
								AppliedTaxes.addRow(
								 aSC.guid , aT.entityType , ((aT||eo).taxRate||eo).guid , aT.rate 
								, aT.taxAmount , aT.type )
								
							}
						}
						for(let iselection in check['selections'])//field 3 is whether the selection is a modifier or not, for our internal use
						{
							let selection = check['selections'][iselection]
							Selections.addRow(
							 selection.guid , check.guid , storeID , false , ((selection||eo).item||eo).guid 
							, ((selection||eo).itemGroup||eo).guid , ((selection||eo).optionGroup||eo).guid 
							, ((selection||eo).preModifier||eo).guid , selection.quantity , selection.selectionType 
							, ((selection||eo).salesCategory||eo).guid , selection.deferred , selection.preDiscountPrice 
							, selection.price , selection.tax , selection.voided , selection.voidDate 
							, selection.voidBusinessDate , ((selection||eo).voidReason||eo).guid , selection.displayName 
							, selection.createdDate , selection.modifiedDate , selection.fulfillmentStatus )
							
							for(let iaD in selection['appliedDiscounts'])
							{
								let aD = selection['appliedDiscounts'][iaD]
								AppliedDiscounts.addRow(
								 aD.guid , selection.guid , aD.name , aD.discountAmount 
								, ((aD||eo).discount||eo).guid , ((aD||eo).approver||eo).guid , aD.processingState 
								, JSON.stringify(aD.comboItems) , aD.appliedPromoCode )
								
			 					if(aD.LoyaltyDetails)
								{
									let lD = aD.LoyaltyDetails;
									LoyaltyDetails.addRow(
									 aD.guid , lD.vendor , lD.referenceId )
									
								}
							}
							for(let iaT in selection['appliedTaxes'])
							{
								let aT = selection['appliedTaxes'][iaT]
								AppliedTaxes.addRow(
								 selection.guid , aT.entityType , ((aT||eo).taxRate||eo).guid , aT.rate 
								, aT.taxAmount , aT.type )
								
							}
							for(let imodifier in selection['modifiers']) //modifiers are Selections
							{
								let modifier = selection['modifiers'][imodifier]
								Selections.addRow(
								 modifier.guid , selection.guid , storeID ,true , ((modifier||eo).item||eo).guid 
								, ((modifier||eo).itemGroup||eo).guid , ((modifier||eo).optionGroup||eo).guid 
								, ((modifier||eo).preModifier||eo).guid , modifier.quantity , modifier.selectionType 
								, ((modifier||eo).salesCategory||eo).guid , modifier.deferred , modifier.preDiscountPrice 
								, modifier.price , modifier.tax , modifier.voided , modifier.voidDate 
								, modifier.voidBusinessDate , ((modifier||eo).voidReason||eo).guid , modifier.displayName 
								, modifier.createdDate , modifier.modifiedDate , modifier.fulfillmentStatus )
								
								for(let iaD in modifier['appliedDiscounts'])
								{
									let aD = selection['appliedDiscounts'][iaD]
									AppliedDiscounts.addRow(
									 aD.guid , modifier.guid , aD.name , aD.discountAmount 
									, ((aD||eo).discount||eo).guid , ((aD||eo).approver||eo).guid , aD.processingState 
									, JSON.stringify(aD.comboItems) , aD.appliedPromoCode )
									
				 					if(aD.LoyaltyDetails)
									{
										let lD = aD.LoyaltyDetails;
										LoyaltyDetails.addRow(
										 aD.guid , lD.vendor , lD.referenceId )
										
									}
								}
								for(let iaT in modifier['appliedTaxes'])
								{
									let aT = modifier['appliedTaxes'][iaT]
									AppliedTaxes.addRow(
									 modifier.guid , aT.entityType , ((aT||eo).taxRate||eo).guid , aT.rate 
									, aT.taxAmount , aT.type )
									
								}
							}
						}
					}
				}
			}
			//////////////////END UNSPOOLER//////////////////////////
			conn.execBulkLoad(Orders) //all the other bulkloads are strung together via resolution	
		}
	})
}

// var dataMap = {
// 				Orders:Orders,
// 				Checks:Checks,
// 				Selections:Selections,
// 				Payments:Payments,
// 				Refunds:Refunds,
// 				AppliedTaxes:AppliedTaxes,
// 				VoidInfos:VoidInfos,
// 				AppliedServiceCharges:AppliedServiceCharges,
// 				AppliedDiscounts:AppliedDiscounts,
// 				DeliveryInfos:DeliveryInfos,
// 				Customers:Customers,
// 				AppliedLoyaltyInfos:AppliedLoyaltyInfos,
// 				LoyaltyDetails:LoyaltyDetails
// 			}