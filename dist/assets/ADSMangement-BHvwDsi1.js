import{r as d,j as e,P as N,ap as b,F as I,aq as E,a as w,I as A,E as v,Q as P,ar as k,as as T,N as S,b as O,W as L,at as B,Y as M,q as F,C,au as R}from"./index-DvAQHZBz.js";import{B as q}from"./index.esm-zdE-Colu.js";import{X as V}from"./index.es-Mzx9QTXI.js";import{R as Y}from"./index.esm-CtgEoWdf.js";import{C as H}from"./CustomTitle-Ba-iC58E.js";import{C as K}from"./CommonImage-CbDTdfkx.js";import"./index.esm-DKblCDgZ.js";const Q=({selectedRow:t,onAddAd:m,onUpdateAd:h,onClearSelectedRow:x})=>{const[p,D]=d.useState(Date.now()),[g,c]=d.useState({name:"",mediaUrl:"",redirectLink:"",city:"",startDate:"",endDate:"",active:!0});d.useEffect(()=>{c(t?{name:t.name||"",mediaUrl:t.mediaUrl||"",redirectLink:t.redirectLink||"",city:t.city||"",startDate:t.startDate?new Date(t.startDate).toISOString().split("T")[0]:"",endDate:t.endDate?new Date(t.endDate).toISOString().split("T")[0]:"",active:t.active||!0}:{name:"",mediaUrl:"",redirectLink:"",city:"",startDate:"",endDate:"",active:!0})},[t]);const j=async(n,{resetForm:l})=>{console.log("Form Submission::",n);try{const r={...n,startDate:n.startDate?new Date(n.startDate).toISOString():null,endDate:n.endDate?new Date(n.endDate).toISOString():null,active:!0};let i;t?(i=await k(r,t.id),h(i.data.data)):(i=await T(r),m(i.data.data)),console.log("Add/Update Advertisement Response:",i),S.success(i.data.message),l(),D(Date.now()),x()}catch(r){S.error(r.message)}},f=()=>{c({name:"",mediaUrl:"",redirectLink:"",city:"",startDate:"",endDate:"",active:!0}),x()};return e.jsxs(N,{className:"ads-add-paper px-3 h-100 rounded",elevation:3,children:[e.jsxs("div",{className:"d-flex align-items-center pt-2",children:[e.jsx(b,{}),e.jsxs("p",{className:"ps-1 fw-bold mb-0",children:[t?"Edit":"Add"," Advertisement"]}),t&&e.jsx(q,{onClick:f,className:"cursor-pointer ms-auto"})]}),e.jsx("hr",{}),e.jsx(I,{enableReinitialize:!0,initialValues:g,validationSchema:E,onSubmit:j,children:({handleChange:n,values:l,setFieldValue:r})=>e.jsxs(w,{className:"d-flex flex-column",children:[e.jsxs("div",{className:"d-flex flex-column mb-2",children:[e.jsx(A,{name:"name",label:"Advertisement Name",type:"text",value:l.name,onChange:n}),e.jsx(v,{name:"name",component:"div",style:{color:"red"}})]}),e.jsxs("div",{className:"d-flex flex-column align-items-center-start mb-2",children:[e.jsx(A,{name:"city",label:"City",type:"text",value:l.city,onChange:n}),e.jsx(v,{name:"city",component:"div",style:{color:"red"}})]}),e.jsxs("div",{className:"d-flex flex-column align-items-center-start mb-2",children:[e.jsx(A,{name:"startDate",label:"Start Date",type:"date",placeholder:"07/07/43",onChange:n,value:l.startDate}),e.jsx(v,{name:"startDate",component:"div",style:{color:"red"}})]}),e.jsxs("div",{className:"d-flex flex-column align-items-center-start mb-2",children:[e.jsx(A,{name:"endDate",label:"End Date",type:"date",onChange:n,value:l.endDate}),e.jsx(v,{name:"endDate",component:"div",style:{color:"red"}})]}),e.jsxs("div",{className:"d-flex flex-column align-items-center-start mb-2 mt-2 position-relative",children:[e.jsx("label",{className:"mb-2 fw-bold",children:"Advertisement Image"}),e.jsx(P,{name:"mediaUrl",buttonName:"Add Image",inputClassName:"form-control input",onImageUpload:i=>{r("mediaUrl",i)}}),e.jsx(v,{name:"mediaUrl",component:"div",style:{color:"red"}})]}),e.jsx("div",{className:"d-flex justify-content-center ",children:e.jsx("button",{type:"submit",className:"submit-ads-btn mt-4",children:t?"Update":"Add"})})]})})]})},W=({adsData:t,onEditRow:m,onDeleteRow:h,searchByText:x,setOption:p})=>{const[D,g]=d.useState(1),c=15,j=a=>{console.log("Edit clicked for row:",a),m(a)},f=async a=>{console.log("Delete clicked for ID:",a);try{const y=await B(a);console.log("Delete API Response:",y),S.success("Advertisement deleted successfully."),h(a)}catch(y){console.error("Delete API Error:",y),S.error("Failed to delete the advertisement.")}},n=a=>{L.fire({title:"Are you sure?",text:"Advertisement deleted successfully",icon:"warning",width:"30%",showCancelButton:!0,confirmButtonColor:"#000000",cancelButtonColor:"#d33",confirmButtonText:"Yes, delete it!",customClass:"custom-swal",allowOutsideClick:!1}).then(y=>{y.isConfirmed&&f(a.id)})},l=a=>{g(a)},r=t.length,i=(D-1)*c,s=Math.min(i+c,r),o=t.slice(i,s),u=[{name:e.jsx("strong",{children:"NAME"}),minWidth:"200px",cell:a=>e.jsxs("div",{className:"mt-1 mb-2 position-relative image-title",children:[a.name,e.jsx("div",{className:"d-flex  align-items-center",children:e.jsx(K,{imageUrl:a.mediaUrl,alt:"Profile",classes:"ads-image"})})]})},{name:e.jsx("strong",{children:"CITY"}),cell:a=>e.jsx("div",{className:"ads-city",children:a.city})},{name:e.jsx("strong",{children:"DURATION"}),cell:a=>e.jsxs("div",{className:"mt-4 ads-duration",children:[e.jsxs("div",{children:["Starts",e.jsx("br",{})," ",new Date(a.startDate).toLocaleDateString()]}),e.jsxs("p",{className:"expire-text",children:["Expire on ",new Date(a.endDate).toLocaleDateString()]})]})},{name:"",cell:a=>e.jsxs("div",{children:[e.jsx(O,{className:"me-2",onClick:()=>j(a),style:{cursor:"pointer"}}),e.jsx(Y,{onClick:()=>n(a),style:{cursor:"pointer"}})]})}],U={rows:{style:{minHeight:"125px"}}};return e.jsx(N,{className:"ads-add-paper h-100",elevation:3,children:e.jsx(V,{title:e.jsx(H,{icon:e.jsx(b,{}),title:"Advertisement",setOption:p,searchByText:x,options:[{text:"Name",value:"name"},{text:"City",value:"city"},{text:"Start Date",value:"startDate"},{text:"End Date",value:"endDate"}]}),columns:u,data:o,pagination:!0,highlightOnHover:!0,customStyles:U,onChangePage:l,paginationServer:!0,paginationTotalRows:r,paginationPerPage:c,paginationRowsPerPageOptions:[15,25,50,100]})})},ee=()=>{const[t,m]=d.useState([]),[h,x]=d.useState(null),[p,D]=d.useState(""),[g,c]=d.useState("name"),j=async()=>{let s=`?${g}=${p}`;console.log("Search URL:",s);try{const u=(await R(s)).data.data.items;m(u)}catch(o){S.error(o.message)}},f=s=>{console.log("Search called ::>",s),D(s)},n=s=>{x(s)},l=s=>{m(o=>[...o,s])},r=s=>{m(o=>o.map(u=>u.id===s.id?s:u)),x(null)},i=s=>{m(o=>o.filter(u=>u.id!==s))};return d.useEffect(()=>{j(),console.log("called ::>",p)},[p]),e.jsx(M,{children:e.jsxs(F,{children:[e.jsx(C,{md:4,children:e.jsx(Q,{selectedRow:h,onAddAd:l,onUpdateAd:r,onClearSelectedRow:()=>x(null)})}),e.jsx(C,{md:8,children:e.jsx(W,{adsData:t,onEditRow:n,onDeleteRow:i,searchByText:f,setOption:c})})]})})};export{ee as default};
