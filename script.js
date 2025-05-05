// Burger menu toggle
const burger=document.getElementById('burger');
const navLinks=document.getElementById('navLinks');
if(burger){burger.addEventListener('click',()=>{navLinks.classList.toggle('nav__links--open');burger.classList.toggle('burger--open');});}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor=>{anchor.addEventListener('click',function(e){const targetId=this.getAttribute('href').slice(1);const target=document.getElementById(targetId);if(target){e.preventDefault();window.scrollTo({top:target.offsetTop-80,behavior:'smooth'});navLinks.classList.remove('nav__links--open');burger.classList.remove('burger--open');}});});

// Simple form stub
document.getElementById('contactForm')?.addEventListener('submit',e=>{e.preventDefault();alert('Спасибо! Я свяжусь с вами в ближайшее время.');e.target.reset();});
