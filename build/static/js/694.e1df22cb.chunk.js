/*! For license information please see 694.e1df22cb.chunk.js.LICENSE.txt */
(self.webpackChunksaloon_app=self.webpackChunksaloon_app||[]).push([[694],{4694:(e,n,t)=>{"use strict";t.r(n),t.d(n,{default:()=>f});var s=t(2791),r=t(7022),c=t(9743),o=t(2677),a=t(1087),i=t(2079),l=t(184);const f=function(){const[e,n]=(0,s.useState)(new Array(4).fill(""));return(0,s.useEffect)((()=>{console.log("Updated OTP in useEffect:",JSON.stringify(e))}),[e]),console.log("Outside useEffect:",JSON.stringify(e)),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(r.Z,{className:"p-0",children:(0,l.jsxs)(c.Z,{className:" m-0 p-0",children:[(0,l.jsx)(o.Z,{sm:8,className:"p-0 mt-4",children:(0,l.jsx)("img",{className:"d-logo",src:i,type:"d-logo.png"})}),(0,l.jsx)(o.Z,{sm:4,className:"p-0 d-flex justify-content-center align-items-center mt-4",children:(0,l.jsx)("h6",{className:"sign-account back-sign",children:(0,l.jsx)(a.rU,{to:"/login",className:"link-style",children:"Back to Sign In"})})}),(0,l.jsx)(o.Z,{className:"p-0 mt-4",children:(0,l.jsx)("h2",{className:"for-password",children:"Verification"})})]})}),(0,l.jsx)("div",{className:"main-form d-flex justify-content-center align-items-center",children:(0,l.jsxs)("form",{className:"form  w-100",children:[(0,l.jsxs)("label",{className:"otp-input mt-3 m-auto",children:["Enter the 4 digit code that is send on your ",(0,l.jsx)("br",{}),"registered email address.",(0,l.jsx)("br",{})]}),(0,l.jsx)("div",{className:"otp-box d-flex justify-content-center  my-3",children:e.map(((e,t)=>(0,l.jsx)("input",{className:"otp-field ",maxLength:1,value:e,onChange:e=>((e,t)=>{const s=e.value;if(!/^\d+$/.test(s))return console.log("Invalid input: Please enter numeric values only."),!1;n((e=>{const n=[...e];return n[t]=+s,console.log("Entered Value:",s),console.log("Updated OTP:",n),n})),e.nextSibling&&e.nextSibling.focus()})(e.target,t),onFocus:e=>e.target.select()},t)))}),(0,l.jsx)("div",{className:"d-flex justify-content-center",children:(0,l.jsx)("button",{className:"forget_btn ",type:"button",children:(0,l.jsx)(a.rU,{className:"continue-link link-style",to:"/new-password",children:"VERIFY"})})}),(0,l.jsx)("h5",{className:"resend-text mt-3",children:"If you didn\u2019t receive a code!"})]})})]})}},2677:(e,n,t)=>{"use strict";t.d(n,{Z:()=>l});var s=t(1418),r=t.n(s),c=t(2791),o=t(1349),a=t(184);const i=c.forwardRef(((e,n)=>{const[{className:t,...s},{as:c="div",bsPrefix:i,spans:l}]=function(e){let{as:n,bsPrefix:t,className:s,...c}=e;t=(0,o.vE)(t,"col");const a=(0,o.pi)(),i=(0,o.zG)(),l=[],f=[];return a.forEach((e=>{const n=c[e];let s,r,o;delete c[e],"object"===typeof n&&null!=n?({span:s,offset:r,order:o}=n):s=n;const a=e!==i?"-".concat(e):"";s&&l.push(!0===s?"".concat(t).concat(a):"".concat(t).concat(a,"-").concat(s)),null!=o&&f.push("order".concat(a,"-").concat(o)),null!=r&&f.push("offset".concat(a,"-").concat(r))})),[{...c,className:r()(s,...l,...f)},{as:n,bsPrefix:t,spans:l}]}(e);return(0,a.jsx)(c,{...s,ref:n,className:r()(t,!l.length&&i)})}));i.displayName="Col";const l=i},7022:(e,n,t)=>{"use strict";t.d(n,{Z:()=>l});var s=t(1418),r=t.n(s),c=t(2791),o=t(1349),a=t(184);const i=c.forwardRef(((e,n)=>{let{bsPrefix:t,fluid:s=!1,as:c="div",className:i,...l}=e;const f=(0,o.vE)(t,"container"),u="string"===typeof s?"-".concat(s):"-fluid";return(0,a.jsx)(c,{ref:n,...l,className:r()(i,s?"".concat(f).concat(u):f)})}));i.displayName="Container";const l=i},9743:(e,n,t)=>{"use strict";t.d(n,{Z:()=>l});var s=t(1418),r=t.n(s),c=t(2791),o=t(1349),a=t(184);const i=c.forwardRef(((e,n)=>{let{bsPrefix:t,className:s,as:c="div",...i}=e;const l=(0,o.vE)(t,"row"),f=(0,o.pi)(),u=(0,o.zG)(),d="".concat(l,"-cols"),p=[];return f.forEach((e=>{const n=i[e];let t;delete i[e],null!=n&&"object"===typeof n?({cols:t}=n):t=n;const s=e!==u?"-".concat(e):"";null!=t&&p.push("".concat(d).concat(s,"-").concat(t))})),(0,a.jsx)(c,{ref:n,...i,className:r()(s,l,...p)})}));i.displayName="Row";const l=i},1349:(e,n,t)=>{"use strict";t.d(n,{pi:()=>f,vE:()=>l,zG:()=>u});var s=t(2791);t(184);const r=["xxl","xl","lg","md","sm","xs"],c="xs",o=s.createContext({prefixes:{},breakpoints:r,minBreakpoint:c}),{Consumer:a,Provider:i}=o;function l(e,n){const{prefixes:t}=(0,s.useContext)(o);return e||t[n]||n}function f(){const{breakpoints:e}=(0,s.useContext)(o);return e}function u(){const{minBreakpoint:e}=(0,s.useContext)(o);return e}},2079:e=>{"use strict";e.exports="data:image/png;base64,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"},1418:(e,n)=>{var t;!function(){"use strict";var s={}.hasOwnProperty;function r(){for(var e="",n=0;n<arguments.length;n++){var t=arguments[n];t&&(e=o(e,c(t)))}return e}function c(e){if("string"===typeof e||"number"===typeof e)return e;if("object"!==typeof e)return"";if(Array.isArray(e))return r.apply(null,e);if(e.toString!==Object.prototype.toString&&!e.toString.toString().includes("[native code]"))return e.toString();var n="";for(var t in e)s.call(e,t)&&e[t]&&(n=o(n,t));return n}function o(e,n){return n?e?e+" "+n:e+n:e}e.exports?(r.default=r,e.exports=r):void 0===(t=function(){return r}.apply(n,[]))||(e.exports=t)}()}}]);
//# sourceMappingURL=694.e1df22cb.chunk.js.map