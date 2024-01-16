"use strict";(self.webpackChunksaloon_app=self.webpackChunksaloon_app||[]).push([[568],{3568:(s,e,a)=>{a.r(e),a.d(e,{default:()=>A});a(2791);var r=a(2317),n=a(7022),l=a(9743),o=a(2677),d=a(7689),c=a(1087),t=a(2506),i=a(8007),m=a(184);const A=function(){const s=(0,d.s0)(),e=i.Ry().shape({newPassword:i.Z_().required("Please enter your password").min(8,"Password must be 8 characters long").matches(/[0-9]/,"Password requires a number").matches(/[a-z]/,"Password requires a lowercase letter").matches(/[A-Z]/,"Password requires an uppercase letter").matches(/[^\w]/,"Password requires a symbol"),confirmPassword:i.Z_().oneOf([i.iH("newPassword"),null],"Passwords must match").required("Please confirm your password")}),{values:a,errors:A,touched:h,handleChange:w,handleBlur:p,handleSubmit:x,isValid:j,dirty:P}=(0,t.TA)({initialValues:{newPassword:"",confirmPassword:""},validationSchema:e,onSubmit:(e,a)=>{let{resetForm:r}=a;console.log("Values ::>",e),r(),s("/admin/changed-password")}});return(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(n.Z,{className:"p-0 ",children:(0,m.jsxs)(l.Z,{className:"m-0 p-0 ",children:[(0,m.jsx)(o.Z,{sm:8,className:"p-0 mt-4 ",children:(0,m.jsx)("img",{className:"d-logo",src:r,alt:"d-logo.png"})}),(0,m.jsx)(o.Z,{sm:4,className:"p-0 d-flex justify-content-center align-items-center mt-4",children:(0,m.jsx)("h6",{className:"sign-account back-sign",children:(0,m.jsx)(c.rU,{to:"/admin/login",className:"link-style ",children:"Back to Sign In"})})}),(0,m.jsx)(o.Z,{className:"p-0  mt-4",children:(0,m.jsx)("h2",{className:"for-password ",children:"New Password"})})]})}),(0,m.jsx)("h3",{className:"new-password-para",children:"Set up the New Password for your Account."}),(0,m.jsx)("div",{className:"main-form  d-flex justify-content-center align-items-center",children:(0,m.jsxs)("form",{className:"form",onSubmit:x,children:[(0,m.jsxs)("label",{className:"text mt-3",children:["Enter new password",(0,m.jsx)("br",{}),(0,m.jsx)("input",{className:"input ".concat(A.newPassword&&h.newPassword?"is-invalid":""),type:"password",name:"newPassword",id:"newPassword",placeholder:"8 symbols at least",value:a.newPassword,onChange:w,onBlur:p}),A.newPassword&&h.newPassword&&(0,m.jsx)("div",{className:"invalid-feedback",children:A.newPassword}),(0,m.jsx)("br",{}),(0,m.jsx)("br",{})]}),(0,m.jsx)("br",{}),(0,m.jsxs)("label",{className:"text",children:["Confirm password",(0,m.jsx)("br",{}),(0,m.jsx)("input",{className:"input ".concat(A.confirmPassword&&h.confirmPassword?"is-invalid":""),type:"password",name:"confirmPassword",id:"confirmPassword",placeholder:"8 symbols at least",value:a.confirmPassword,onChange:w,onBlur:p}),A.confirmPassword&&h.confirmPassword&&(0,m.jsx)("div",{className:"invalid-feedback",children:A.confirmPassword})]}),(0,m.jsx)("div",{className:"mt-4 mb-3",children:(0,m.jsx)("button",{className:"forget_btn ".concat(j&&P?"":"disable"),type:"submit",disabled:!j||!P,children:"UPDATE PASSWORD"})})]})})]})}},2317:s=>{s.exports="data:image/png;base64,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"}}]);
//# sourceMappingURL=568.d17d0745.chunk.js.map