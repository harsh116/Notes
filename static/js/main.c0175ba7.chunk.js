(this.webpackJsonptest=this.webpackJsonptest||[]).push([[0],{122:function(e,t,n){},123:function(e,t,n){},124:function(e,t,n){"use strict";n.r(t);var c=n(2),s=n(38),i=n.n(s),r=(n(46),n(15)),o=n(4),a=(n(47),n(48),n(39)),l=n.n(a),d=n(0);var u=function(e){var t=e.note,n=e.setIsEditorActive,c=e.setEditingNote,s=e.deleteNote;return Object(d.jsxs)("div",{onClick:function(){n(!0);var e={id:t.id,fmtext:t.fmtext,isEncrypted:t.isEncrypted};c(e)},className:"Note",children:[Object(d.jsx)("button",{className:"deleteCross",onClick:function(e){e.stopPropagation(),s(t.id)},children:"\xd7"}),l()(t.fmtext)]})},j=function(e){var t=e.notes,n=e.setIsEditorActive,c=e.setEditingNote,s=e.deleteNote,i=t.map((function(e){return Object(d.jsx)(u,{setIsEditorActive:n,note:e,setEditingNote:c,deleteNote:s},function(e){for(var t="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split(""),n=[],c=0;c<e;c++){var s=(Math.random()*(t.length-1)).toFixed(0);n[c]=t[s]}return n.join("")}(5))}));return Object(d.jsx)("div",{className:"Notes",children:i&&i.length>0?i:Object(d.jsx)("div",{className:"emptyMessage",children:"No notes here"})})},b=n(6),f=(n(92),n(40)),O=n.n(f),h=n(16),v=n.n(h),p=(n(122),function(e){var t=Object(c.useState)(""),n=Object(o.a)(t,2),s=n[0],i=n[1],r=e.Encrypting,a=e.setIsoverlayActive,l=e.encryptionState;return Object(d.jsx)("div",{className:"PasswordOverlay",children:Object(d.jsxs)("div",{className:"passwordBox",children:[Object(d.jsxs)("div",{className:"passwordSection",children:[Object(d.jsx)("label",{children:"Password: "}),Object(d.jsx)("input",{type:"text",onChange:function(e){i(e.target.value)}})]}),"encrypt"===l?Object(d.jsxs)("div",{className:"passwordNote",children:[Object(d.jsx)("span",{children:"Note: "})," Make sure to remember the password. Only this password will be able to decrypt the current note."]}):Object(d.jsx)("div",{className:"passwordNote",children:"Type the password which you have used to encrypt this before to decrypt it."}),Object(d.jsxs)("div",{className:"passwordButtons",children:[Object(d.jsx)("button",{onClick:function(){0!==s.length&&r(s)},className:"select",children:"OK \u2713"}),Object(d.jsx)("button",{onClick:function(){a(!1)},className:"close",children:"Cancel \xd7"})]})]})})}),x=function(e){var t=Object(c.useRef)(),n=Object(c.useState)(!1),s=Object(o.a)(n,2),i=s[0],a=s[1],l=Object(c.useState)(!1),u=Object(o.a)(l,2),j=u[0],f=u[1],h=e.setIsEditorActive,x=e.isEditorActive,m=e.editingNote,N=e.setEditingNote,g=e.setNotes,y=e.notes,E=e.deleteNote,S=Object(c.useState)("encrypt"),w=Object(o.a)(S,2),I=w[0],C=w[1];Object(c.useEffect)((function(){Object.keys(m).length>0&&C(m.isEncrypted?"decrypt":"encrypt")}),[m.isEncrypted]);var k=function(){var e,t,n=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"null",c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",s=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"",i=/<\/*[a-z]+>/g,o=Object(r.a)(y),a=o.findIndex((function(e){return e.id===m.id}));"encrypt"===n?(e="",t={id:m.id,fmtext:c,rawtext:e,isEncrypted:"decrypt"===s}):(e=m.fmtext.split(i).join(" "),t={id:m.id,fmtext:m.fmtext,rawtext:e,isEncrypted:"decrypt"===s}),-1===a?o.push(t):o[a]=t,g(o)};return Object(d.jsx)("div",{className:"EditorContainer ".concat(x?"active":""),children:Object(d.jsxs)("div",{className:"Editor ".concat(x?"active":""),children:[j?Object(d.jsx)(p,{encryptionState:I,Encrypting:function(e){var t,n,c=m.fmtext;if(console.log("editingnote: ",c),"encrypt"===I){n="decrypt";var s=function(e,t){return v.a.AES.encrypt(e,t)}(c,e).toString();t=s,N(Object(b.a)(Object(b.a)({},m),{},{fmtext:s}))}else{var i=function(e,t){return v.a.AES.decrypt(e,t).toString(v.a.enc.Utf8)}(c,e);if(0===i.length)return void alert("Wrong Password.Try again");n="encrypt",t=i,N(Object(b.a)(Object(b.a)({},m),{},{fmtext:i}))}f(!1),C(n),k("encrypt",t,n)},setIsoverlayActive:f}):"",Object(d.jsxs)("header",{className:"options",children:[Object(d.jsx)("button",{title:"Close current note",onClick:function(){h(!1),N({}),a(!1)},className:"close",children:"\xd7"}),Object(d.jsxs)("div",{className:"rightButtons",children:[Object(d.jsx)("button",{title:"Current note is in ".concat("decrypt"===I?"encrypted":"decrypted"," form. Click to ").concat(I," it."),onClick:function(){0===m.fmtext.length&&alert("Type something first"),f(!0)},className:"encrypt",children:Object(d.jsx)("i",{class:"fa fa-".concat("encrypt"===I?"lock-open":"lock"),"aria-hidden":"true"})}),Object(d.jsx)("button",{title:"Delete the current note",onClick:function(){h(!1),a(!1),E(m.id)},className:"deleteBtn",children:Object(d.jsx)("i",{class:"fa fa-trash","aria-hidden":"true"})}),Object(d.jsx)("button",{title:"Save current note",onClick:i?k:null,className:"save ".concat(i?"active":""),children:"\u2713"})]})]}),Object(d.jsx)("div",{className:"article",children:Object(d.jsx)(O.a,{className:"edit",html:m.fmtext?m.fmtext:"",innerRef:t,onChange:function(e){N(Object(b.a)(Object(b.a)({},m),{},{fmtext:e.target.value})),a(!0)}})})]})})},m=n(41),N=(n(123),function(e){var t=e.setIsSearching,n=e.notes,s=e.setSearchedNotes,i=Object(c.useState)(""),r=Object(o.a)(i,2),a=r[0],l=r[1];Object(c.useEffect)((function(){if(0!==n.length){if(0===a.length)return t(!1),void s([]);if(a.includes(" ")){var e=n.filter((function(e){return null===e||void 0===e?void 0:e.rawtext.toLowerCase().includes(a.toLowerCase())}));return t(!0),void s(e)}var c,i=[],r=Object(m.a)(n);try{var o=function(){var e=c.value,t=e.rawtext.split(" "),n=a.length;if(-1===t.findIndex((function(e){return e.substr(0,n).toLowerCase()===a.toLowerCase()})))return"continue";i.push(e)};for(r.s();!(c=r.n()).done;)o()}catch(l){r.e(l)}finally{r.f()}t(!0),s(i)}}),[a]);return Object(d.jsx)("div",{className:"search",children:Object(d.jsx)("input",{className:"searchInput",type:"text",placeholder:"Search notes",onChange:function(e){l(e.target.value)}})})});var g=function(){var e=Object(c.useState)([]),t=Object(o.a)(e,2),n=t[0],s=t[1],i=Object(c.useState)([]),a=Object(o.a)(i,2),l=a[0],u=a[1],b=Object(c.useState)(!1),f=Object(o.a)(b,2),O=f[0],h=f[1],v=Object(c.useState)(!1),p=Object(o.a)(v,2),m=p[0],g=p[1],y=Object(c.useState)({}),E=Object(o.a)(y,2),S=E[0],w=E[1],I=Object(c.useState)(0),C=Object(o.a)(I,2),k=C[0],A=C[1],B=function(e){var t=Object(r.a)(n),c=t.findIndex((function(t){return t.id===e}));t.splice(c,1),s(t)};return Object(c.useEffect)((function(){var e=localStorage.getItem("notes");if(e&&e.length>0){var t=JSON.parse(e);s(t)}var n=localStorage.getItem("noteID");n?A(Number(n)):localStorage.setItem("noteID","0")}),[]),Object(c.useEffect)((function(){var e=JSON.stringify(n);localStorage.setItem("notes",e),console.log("notes: ",n)}),[n]),Object(d.jsxs)("div",{className:"App",children:[Object(d.jsx)(N,{setIsSearching:h,notes:n,setSearchedNotes:u}),Object(d.jsx)(j,{setIsEditorActive:g,notes:O?l:n,setEditingNote:w,deleteNote:B}),Object(d.jsx)("button",{onClick:function(){g(!0),w({id:k,fmText:"",isEncrypted:!1}),A(k+1),localStorage.setItem("noteID",(k+1).toString())},className:"addNew",children:"+"}),Object(d.jsx)(x,{editingNote:S,setEditingNote:w,isEditorActive:m,setIsEditorActive:g,notes:n,setNotes:s,deleteNote:B})]})};i.a.render(Object(d.jsx)(g,{}),document.getElementById("root"))},46:function(e,t,n){},47:function(e,t,n){},48:function(e,t,n){},73:function(e,t){},92:function(e,t,n){},97:function(e,t){}},[[124,1,2]]]);
//# sourceMappingURL=main.c0175ba7.chunk.js.map