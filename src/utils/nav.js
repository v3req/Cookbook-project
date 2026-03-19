export function setNavigationBar(){
    
        if (sessionStorage.getItem('accessToken') != null) {
            document.getElementById('user').style.display = 'inline-block';
            document.getElementById('guest').style.display = 'none';
        } else {
            
            document.getElementById('guest').style.display = 'inline-block';
            document.getElementById('user').style.display = 'none'
        
    }
}

const navBar = document.querySelector('nav');
const links = Array.from(navBar.querySelectorAll('a'));
navBar.addEventListener('click', (e) => {
    if(e.target.tagName !== 'A'){
        return;
    }
    const links = Array.from(navBar.querySelectorAll('a'));
    links.forEach(a => a.classList.remove('active'));

    e.target.classList.add('active');
    
})