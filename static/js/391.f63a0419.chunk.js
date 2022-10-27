"use strict";(self.webpackChunkmadchad_staking=self.webpackChunkmadchad_staking||[]).push([[391],{40391:function(r,t,n){n.r(t),n.d(t,{Edition:function(){return l}});var e=n(74165),a=n(15861),c=n(15671),u=n(43144),i=n(97326),o=n(60136),s=n(92572),p=n(41739),f=n(82832),h=n(68624),l=(n(80518),n(25025),n(70332),n(8455),n(97143),n(84255),n(62555),n(26219),n(61303),n(49242),n(94317),n(13670),n(79120),n(97604),n(8187),n(19362),n(54730),n(36250),n(85725),n(38730),n(237),n(65609),n(77208),n(86841),n(49561),n(40553),n(26),n(69392),n(31583),n(61156),n(82037),n(20737),n(78262),n(34161),n(50266),n(98839),n(51375),n(43320),n(65815),n(59189),n(18281),n(24601),n(46878),n(20583),n(92355),n(84194),n(51121),n(32484),n(78435),function(r){(0,o.Z)(n,r);var t=(0,s.Z)(n);function n(r,e,a){var u;(0,c.Z)(this,n);var o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:{},s=arguments.length>4?arguments[4]:void 0,h=arguments.length>5?arguments[5]:void 0,l=arguments.length>6&&void 0!==arguments[6]?arguments[6]:new f.cm(r,e,s,o);return u=t.call(this,l,a,h),(0,p._)((0,i.Z)(u),"abi",void 0),(0,p._)((0,i.Z)(u),"metadata",void 0),(0,p._)((0,i.Z)(u),"roles",void 0),(0,p._)((0,i.Z)(u),"sales",void 0),(0,p._)((0,i.Z)(u),"platformFees",void 0),(0,p._)((0,i.Z)(u),"encoder",void 0),(0,p._)((0,i.Z)(u),"estimator",void 0),(0,p._)((0,i.Z)(u),"events",void 0),(0,p._)((0,i.Z)(u),"royalties",void 0),(0,p._)((0,i.Z)(u),"signature",void 0),(0,p._)((0,i.Z)(u),"interceptor",void 0),(0,p._)((0,i.Z)(u),"erc1155",void 0),(0,p._)((0,i.Z)(u),"owner",void 0),u.abi=s,u.metadata=new f.ag(u.contractWrapper,f.co,u.storage),u.roles=new f.ah(u.contractWrapper,n.contractRoles),u.royalties=new f.ai(u.contractWrapper,u.metadata),u.sales=new f.aj(u.contractWrapper),u.encoder=new f.af(u.contractWrapper),u.estimator=new f.aQ(u.contractWrapper),u.events=new f.aR(u.contractWrapper),u.platformFees=new f.aT(u.contractWrapper),u.interceptor=new f.aS(u.contractWrapper),u.signature=new f.aJ(u.contractWrapper,u.storage,u.roles),u.erc1155=new f.aF(u.contractWrapper,u.storage,h),u.owner=new f.aV(u.contractWrapper),u}return(0,u.Z)(n,[{key:"onNetworkUpdated",value:function(r){this.contractWrapper.updateSignerOrProvider(r)}},{key:"getAddress",value:function(){return this.contractWrapper.readContract.address}},{key:"getAll",value:function(){var r=(0,a.Z)((0,e.Z)().mark((function r(t){return(0,e.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",this.erc1155.getAll(t));case 1:case"end":return r.stop()}}),r,this)})));return function(t){return r.apply(this,arguments)}}()},{key:"getOwned",value:function(){var r=(0,a.Z)((0,e.Z)().mark((function r(t){return(0,e.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",this.erc1155.getOwned(t));case 1:case"end":return r.stop()}}),r,this)})));return function(t){return r.apply(this,arguments)}}()},{key:"getTotalCount",value:function(){var r=(0,a.Z)((0,e.Z)().mark((function r(){return(0,e.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",this.erc1155.totalCount());case 1:case"end":return r.stop()}}),r,this)})));return function(){return r.apply(this,arguments)}}()},{key:"isTransferRestricted",value:function(){var r=(0,a.Z)((0,e.Z)().mark((function r(){var t;return(0,e.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.next=2,this.contractWrapper.readContract.hasRole((0,f.br)("transfer"),h.d);case 2:return t=r.sent,r.abrupt("return",!t);case 4:case"end":return r.stop()}}),r,this)})));return function(){return r.apply(this,arguments)}}()},{key:"mint",value:function(){var r=(0,a.Z)((0,e.Z)().mark((function r(t){return(0,e.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",this.erc1155.mint(t));case 1:case"end":return r.stop()}}),r,this)})));return function(t){return r.apply(this,arguments)}}()},{key:"mintTo",value:function(){var r=(0,a.Z)((0,e.Z)().mark((function r(t,n){return(0,e.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",this.erc1155.mintTo(t,n));case 1:case"end":return r.stop()}}),r,this)})));return function(t,n){return r.apply(this,arguments)}}()},{key:"mintAdditionalSupply",value:function(){var r=(0,a.Z)((0,e.Z)().mark((function r(t,n){return(0,e.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",this.erc1155.mintAdditionalSupply(t,n));case 1:case"end":return r.stop()}}),r,this)})));return function(t,n){return r.apply(this,arguments)}}()},{key:"mintAdditionalSupplyTo",value:function(){var r=(0,a.Z)((0,e.Z)().mark((function r(t,n,a){return(0,e.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",this.erc1155.mintAdditionalSupplyTo(t,n,a));case 1:case"end":return r.stop()}}),r,this)})));return function(t,n,e){return r.apply(this,arguments)}}()},{key:"mintBatch",value:function(){var r=(0,a.Z)((0,e.Z)().mark((function r(t){return(0,e.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",this.erc1155.mintBatch(t));case 1:case"end":return r.stop()}}),r,this)})));return function(t){return r.apply(this,arguments)}}()},{key:"mintBatchTo",value:function(){var r=(0,a.Z)((0,e.Z)().mark((function r(t,n){return(0,e.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",this.erc1155.mintBatchTo(t,n));case 1:case"end":return r.stop()}}),r,this)})));return function(t,n){return r.apply(this,arguments)}}()},{key:"burn",value:function(){var r=(0,a.Z)((0,e.Z)().mark((function r(t,n){return(0,e.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:return r.abrupt("return",this.erc1155.burn(t,n));case 1:case"end":return r.stop()}}),r,this)})));return function(t,n){return r.apply(this,arguments)}}()},{key:"call",value:function(){var r=(0,a.Z)((0,e.Z)().mark((function r(t){var n,a,c,u,i=arguments;return(0,e.Z)().wrap((function(r){for(;;)switch(r.prev=r.next){case 0:for(a=i.length,c=new Array(a>1?a-1:0),u=1;u<a;u++)c[u-1]=i[u];return r.abrupt("return",(n=this.contractWrapper).call.apply(n,[t].concat(c)));case 2:case"end":return r.stop()}}),r,this)})));return function(t){return r.apply(this,arguments)}}()}]),n}(f.aM));(0,p._)(l,"contractRoles",["admin","minter","transfer"])}}]);
//# sourceMappingURL=391.f63a0419.chunk.js.map