const btnKick1 = document.getElementById('btn-kick1');
const btnKick2 = document.getElementById('btn-kick2');
let isGameOver = false;
function random(max, min = 0) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function renderHPLife() {
    this.elHP.innerText = this.damageHP + ' / ' + this.defaultHP;
}

function renderProgressbarHP() {
    const percent = (this.damageHP / this.defaultHP) * 100;
    this.elProgressbar.style.width = percent + '%';
    this.elProgressbar.classList.remove('low', 'critical');
    if (percent < 20) {
        this.elProgressbar.classList.add('critical');
    } else if (percent < 60) {
        this.elProgressbar.classList.add('low');
    }
}

function renderHP() {
    this.renderHPLife();
    this.renderProgressbarHP();
}
function changeHP(count) {
    if (isGameOver) return; 

    this.damageHP -= count;
    
    if (this.damageHP <= 0) {
        this.damageHP = 0;
        isGameOver = true;
        
        btnKick1.disabled = true;
        btnKick2.disabled = true;

        setTimeout(() => {
            alert(this.name + ' програв бій!');
        }, 300);
    }
    
    this.renderHP();
}

const character = {
    name: 'Pikachu',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-character'),
    elProgressbar: document.getElementById('progressbar-character'),
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
    renderHP: renderHP,
    changeHP: changeHP
};

const enemy = {
    name: 'Charmander',
    defaultHP: 100,
    damageHP: 100,
    elHP: document.getElementById('health-enemy'),
    elProgressbar: document.getElementById('progressbar-enemy'),
    renderHPLife: renderHPLife,
    renderProgressbarHP: renderProgressbarHP,
    renderHP: renderHP,
    changeHP: changeHP
};

function performAttack(dmgToEnemy, dmgToCharacter) {
    enemy.changeHP(dmgToEnemy);
    if (!isGameOver) {
        character.changeHP(dmgToCharacter);
    }
}

btnKick1.addEventListener('click', function () {
    performAttack(random(20, 10), random(20, 10));
});

btnKick2.addEventListener('click', function () {
    performAttack(random(40, 20), random(35, 15));
});