function popup() {
    document.getElementById('popup').style.cssText = 'display: flex; justify-content: center;';
    document.getElementById('popup').innerHTML = "Well Done🔥💯";
    setTimeout(() => {
        document.getElementById('popup').style.display = 'none';
    }, 1500);
}

function handleChange() {
    popup();
}