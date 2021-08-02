let firstRun = false;
window.addEventListener('scroll', function(){
	setTDWidth();
    if ( shouldSticky() ) {
    	if (!firstRun) {
    		firstRun = true;
    		getTDWidth();
    	}
        document.querySelector('.vuetable thead').classList.add('fixedThead');
    } else {
        document.querySelector('.vuetable thead').classList.remove('fixedThead');
    }
});

window.addEventListener('resize', function(){
    getTDWidth();
});


function shouldRunSticky() {
	try {
    	return Array.from( document.querySelectorAll('.vuetable tbody tr') ).length > 10;
	} catch(error) {
		console.log( error );
	}
}

function shouldSticky() {
	try {
		if (shouldRunSticky())
    		return document.querySelector('.vuetable').getBoundingClientRect().top - getNavHeight() <= 0;
    	else return false;
	} catch(error) {
		console.log( error );
	}
}

function getNavHeight() {
    return document.querySelector('.v-toolbar.v-toolbar--fixed').offsetHeight;
}

let tdDimensions = [];
function getTDWidth() {
	let __dinmensions = [];
    let tr = document.querySelectorAll('.vuetable tbody tr')[0];
    Array.from( tr.querySelectorAll('td') ).map(td => {
        __dinmensions.push({
            width:td.offsetWidth
        })
    });
    tdDimensions = __dinmensions;
    return tdDimensions;
}

function setTDWidth() {
    Array.from( document.querySelectorAll('.vuetable thead th') ).map((td, i) => {
        td.style.width = tdDimensions[i]?.width +'px';
    });
}