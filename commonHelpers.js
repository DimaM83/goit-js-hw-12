import{a as b,S as w,i as p}from"./assets/vendor-f736e62a.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const l of s.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&c(l)}).observe(document,{childList:!0,subtree:!0});function a(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function c(e){if(e.ep)return;e.ep=!0;const s=a(e);fetch(e.href,s)}})();async function h(t,r){return await b({url:"https://pixabay.com/api/",params:{key:"16991331-df0a6792d36af314f174a3b15",q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,per_page:15,page:r}})}function m(t){return t.hits.map(({webformatURL:a,largeImageURL:c,tags:e,likes:s,views:l,comments:y,downloads:v})=>`
        <li class="card">
            <div class="place-for-image">
                <a href="${c}">
                    <img src="${a}" alt="${e}" class="picture"/>
                </a>
            </div>
            <div class="info-text">
                <div class="description">
                    <span class="bold-text">Likes</span>
                    <span class="info-value">${s}</span>
                </div>
                <div class="description">
                    <span class="bold-text">Views</span>
                    <span class="info-value">${l}</span>
                </div>
                <div class="description">
                    <span class="bold-text">Comments</span>
                    <span class="info-value">${y}</span>
                </div>
                <div class="description">
                    <span class="bold-text">Downloads</span>
                    <span class="info-value">${v}</span>
                </div>
            </div>
        </li>`).join("")}function n({title:t="Oops!",message:r="",color:a="red"}){p.show({title:t,titleColor:"white",message:r,messageColor:"white",color:a,position:"topCenter",timeout:5e3})}const L=document.querySelector(".form"),d=document.querySelector(".loader-text"),i=document.querySelector(".gallery"),o=document.querySelector(".buttonMore"),g=new w(".card .place-for-image a",{captionsData:"alt",captionDelay:250});L.addEventListener("submit",x);o.addEventListener("click",C);let u=1,f;async function x(t){if(t.preventDefault(),o.hidden=!0,i.innerHTML="",d.hidden=!1,f=t.currentTarget.elements.inputSearch.value.trim(),f===""){n({message:"No images found. Try another query."}),d.hidden=!0;return}u=1;try{const r=await h(f,u);if(r.total===0){p.show({title:"Oops!",titleColor:"white",message:"No images found. Try another query.",messageColor:"white",color:"red",position:"topCenter",timeout:5e3});return}o.hidden=!1,i.insertAdjacentHTML("beforeend",m(r.data)),g.refresh(),t.target.reset(),u+=1,i.children.length>=r.data.totalHits&&(o.hidden=!0,n({title:"Info",message:"You've reached the end of search results.",color:"blue"}))}catch(r){o.hidden=!0,n({title:"Error!",message:r.message})}finally{d.hidden=!0}}async function C(){o.hidden=!0,d.hidden=!1;try{const t=await h(f,u);if(t.total===0){n({message:"No more images found."});return}i.insertAdjacentHTML("beforeend",m(t.data)),g.refresh(),u+=1;const{height:r}=i.firstElementChild.getBoundingClientRect();window.scrollBy({top:r*2,behavior:"smooth"}),i.children.length>=t.data.totalHits?(o.hidden=!0,n({title:"Info",message:"You've reached the end of search results.",color:"blue"})):o.hidden=!1}catch(t){o.hidden=!0,n({title:"Error!",message:t.message})}finally{d.hidden=!0}}
//# sourceMappingURL=commonHelpers.js.map
