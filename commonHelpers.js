import{a as w,S as b,i}from"./assets/vendor-f736e62a.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&l(c)}).observe(document,{childList:!0,subtree:!0});function d(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(e){if(e.ep)return;e.ep=!0;const r=d(e);fetch(e.href,r)}})();async function m(o,t){return await w({url:"https://pixabay.com/api/",params:{key:"16991331-df0a6792d36af314f174a3b15",q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:t}})}function f(o){return o.hits.map(({webformatURL:d,largeImageURL:l,tags:e,likes:r,views:c,comments:g,downloads:C})=>`
        <li class="card">
            <div class="place-for-image">
                <a href="${l}">
                    <img src="${d}" alt="${e}" class="picture"/>
                </a>
            </div>
            <div class="info-text">
                <div class="description">
                    <span class="bold-text">Likes</span>
                    <span class="info-value">${r}</span>
                </div>
                <div class="description">
                    <span class="bold-text">Views</span>
                    <span class="info-value">${c}</span>
                </div>
                <div class="description">
                    <span class="bold-text">Comments</span>
                    <span class="info-value">${g}</span>
                </div>
                <div class="description">
                    <span class="bold-text">Downloads</span>
                    <span class="info-value">${C}</span>
                </div>
            </div>
        </li>`).join("")}const v=document.querySelector(".form"),s=document.querySelector(".loader");s.style.borderColor="white";s.style.borderBottomColor="transparent";const p=document.querySelector(".gallery"),a=document.querySelector(".buttonMore"),y=new b(".card .place-for-image a",{captionsData:"alt",captionDelay:250});v.addEventListener("submit",L);a.addEventListener("click",O);let n=1,h,u;async function L(o){if(o.preventDefault(),a.hidden=!0,p.innerHTML="",s.style.borderColor="black",s.style.borderBottomColor="transparent",u=o.currentTarget.elements.inputSearch.value.trim(),u===""){i.show({title:"Oops!",titleColor:"white",message:"Please enter a valid search query!",messageColor:"white",color:"red",position:"topCenter",timeout:5e3});return}n=1;try{const t=await m(u,n);if(t.total===0){i.show({title:"Oops!",titleColor:"white",message:"No images found. Try another query.",messageColor:"white",color:"red",position:"topCenter",timeout:5e3});return}a.hidden=!1,p.insertAdjacentHTML("beforeend",f(t.data)),y.refresh(),o.target.reset(),n+=1,h=Math.floor(t.data.totalHits/15),n===h&&(i.show({titleColor:"white",message:"You've reached the end of search results.",messageColor:"white",color:"blue",position:"topCenter",timeout:5e3}),a.hidden=!0)}catch(t){a.hidden=!0,i.show({title:"Error!",titleColor:"white",message:t.message,messageColor:"white",color:"red",position:"topCenter",timeout:5e3})}finally{s.style.borderColor="white",s.style.borderBottomColor="transparent"}}async function O(){a.hidden=!0,s.style.borderColor="black",s.style.borderBottomColor="transparent";try{const o=await m(u,n);if(o.total===0){i.show({title:"Oops!",titleColor:"white",message:"No more images found.",messageColor:"white",color:"red",position:"topCenter",timeout:5e3});return}p.insertAdjacentHTML("beforeend",f(o.data)),y.refresh(),n+=1;const{height:t}=p.firstElementChild.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"}),n>h?(i.show({titleColor:"white",message:"You've reached the end of search results.",messageColor:"white",color:"blue",position:"topCenter",timeout:5e3}),a.hidden=!0):a.hidden=!1}catch(o){a.hidden=!0,i.show({title:"Error!",titleColor:"white",message:o.message,messageColor:"white",color:"red",position:"topCenter",timeout:5e3})}finally{s.style.borderColor="white",s.style.borderBottomColor="transparent"}}
//# sourceMappingURL=commonHelpers.js.map
