let likeList = document.querySelectorAll('.elements__like');
likeList.forEach((el)=>{
    el.addEventListener('click', ()=>{
        console.log(el);
    el.classList.toggle('elements__like_active');
    })
});