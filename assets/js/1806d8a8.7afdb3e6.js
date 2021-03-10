(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{68:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return a})),r.d(t,"metadata",(function(){return s})),r.d(t,"toc",(function(){return c})),r.d(t,"default",(function(){return l}));var n=r(3),o=r(7),i=(r(0),r(89)),a={id:"monitoring",title:"Monitoring"},s={unversionedId:"operating/monitoring",id:"operating/monitoring",isDocsHomePage:!1,title:"Monitoring",description:"Infrastructure",source:"@site/docs/operating/monitoring.md",slug:"/operating/monitoring",permalink:"/substrate-playground/docs/operating/monitoring",editUrl:"https://github.com/paritytech/substrate-playground/edit/master/website/docs/operating/monitoring.md",version:"current"},c=[{value:"Monitoring / Probes",id:"monitoring--probes",children:[]}],p={toc:c};function l(e){var t=e.components,r=Object(o.a)(e,["components"]);return Object(i.b)("wrapper",Object(n.a)({},p,r,{components:t,mdxType:"MDXLayout"}),Object(i.b)("h1",{id:"infrastructure"},"Infrastructure"),Object(i.b)("p",null,"kube, docker, backend server\n",Object(i.b)("a",{parentName:"p",href:"https://docs.docker.com/config/thirdparty/prometheus/"},"https://docs.docker.com/config/thirdparty/prometheus/")),Object(i.b)("h1",{id:"theia-and-users"},"Theia and users"),Object(i.b)("h1",{id:"deployed-nodes"},"Deployed nodes"),Object(i.b)("p",null,"Substrate exposes prometeus endpoints\n",Object(i.b)("a",{parentName:"p",href:"https://github.com/paritytech/substrate/pull/4511"},"https://github.com/paritytech/substrate/pull/4511"),"\n",Object(i.b)("a",{parentName:"p",href:"https://forum.parity.io/t/metrics-for-reliability-and-performance-monitoring/356"},"https://forum.parity.io/t/metrics-for-reliability-and-performance-monitoring/356")),Object(i.b)("h1",{id:"resources"},"Resources"),Object(i.b)("p",null,Object(i.b)("a",{parentName:"p",href:"https://mxinden.github.io/static/self-service-monitoring.pdf"},"https://mxinden.github.io/static/self-service-monitoring.pdf")," (",Object(i.b)("a",{parentName:"p",href:"https://github.com/mxinden/self-service-monitoring-workshop"},"https://github.com/mxinden/self-service-monitoring-workshop"),")\n",Object(i.b)("a",{parentName:"p",href:"https://mxinden.github.io/static/metric-driven-performance-optimization/slides.pdf"},"https://mxinden.github.io/static/metric-driven-performance-optimization/slides.pdf")),Object(i.b)("h1",{id:"stackdriver"},"Stackdriver"),Object(i.b)("p",null,Object(i.b)("a",{parentName:"p",href:"https://cloud.google.com/stackdriver/pricing"},"https://cloud.google.com/stackdriver/pricing")),Object(i.b)("h2",{id:"monitoring--probes"},"Monitoring / Probes"),Object(i.b)("ul",null,Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://console.cloud.google.com/marketplace/details/google/prometheus"},"https://console.cloud.google.com/marketplace/details/google/prometheus")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://prometheus.io/docs/visualization/grafana/"},"https://prometheus.io/docs/visualization/grafana/")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://grafana.com/docs/grafana/latest/features/datasources/prometheus/"},"https://grafana.com/docs/grafana/latest/features/datasources/prometheus/")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://itnext.io/kubernetes-monitoring-with-prometheus-in-15-minutes-8e54d1de2e13"},"https://itnext.io/kubernetes-monitoring-with-prometheus-in-15-minutes-8e54d1de2e13")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/"},"https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-startup-probes/")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://medium.com/@AADota/kubernetes-liveness-and-readiness-probes-difference-1b659c369e17"},"https://medium.com/@AADota/kubernetes-liveness-and-readiness-probes-difference-1b659c369e17")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://cloud.google.com/blog/products/gcp/kubernetes-best-practices-setting-up-health-checks-with-readiness-and-liveness-probes"},"https://cloud.google.com/blog/products/gcp/kubernetes-best-practices-setting-up-health-checks-with-readiness-and-liveness-probes")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://blog.octo.com/liveness-et-readiness-probes-mettez-de-lintelligence-dans-vos-clusters/"},"https://blog.octo.com/liveness-et-readiness-probes-mettez-de-lintelligence-dans-vos-clusters/")),Object(i.b)("li",{parentName:"ul"},Object(i.b)("a",{parentName:"li",href:"https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#examples"},"https://kubernetes.io/docs/concepts/workloads/pods/pod-lifecycle/#examples"))))}l.isMDXComponent=!0},89:function(e,t,r){"use strict";r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return d}));var n=r(0),o=r.n(n);function i(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function a(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?a(Object(r),!0).forEach((function(t){i(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):a(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function c(e,t){if(null==e)return{};var r,n,o=function(e,t){if(null==e)return{};var r,n,o={},i=Object.keys(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||(o[r]=e[r]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(n=0;n<i.length;n++)r=i[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(o[r]=e[r])}return o}var p=o.a.createContext({}),l=function(e){var t=o.a.useContext(p),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},u=function(e){var t=l(e.components);return o.a.createElement(p.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},m=o.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,i=e.originalType,a=e.parentName,p=c(e,["components","mdxType","originalType","parentName"]),u=l(r),m=n,d=u["".concat(a,".").concat(m)]||u[m]||b[m]||i;return r?o.a.createElement(d,s(s({ref:t},p),{},{components:r})):o.a.createElement(d,s({ref:t},p))}));function d(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var i=r.length,a=new Array(i);a[0]=m;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:n,a[1]=s;for(var p=2;p<i;p++)a[p]=r[p];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,r)}m.displayName="MDXCreateElement"}}]);