const verbDatabase = {
    // Verbos irregulares
    irregular: {
        'be': 'was/were',
        'go': 'went',
        'do': 'did',
        'say': 'said',
        'get': 'got',
        'make': 'made',
        'know': 'knew',
        'take': 'took',
        'see': 'saw',
        'come': 'came',
        'think': 'thought',
        'tell': 'told',
        'give': 'gave',
        'find': 'found',
        'put': 'put',
        'show': 'showed',
        'begin': 'began',
        'keep': 'kept',
        'hold': 'held',
        'write': 'wrote',
        'stand': 'stood',
        'hear': 'heard',
        'let': 'let',
        'mean': 'meant',
        'set': 'set',
        'meet': 'met',
        'run': 'ran',
        'pay': 'paid',
        'sit': 'sat',
        'speak': 'spoke',
        'lie': 'lay',
        'lead': 'led',
        'read': 'read',
        'grow': 'grew',
        'lose': 'lost',
        'fall': 'fell',
        'send': 'sent',
        'build': 'built',
        'understand': 'understood',
        'draw': 'drew',
        'break': 'broke',
        'spend': 'spent',
        'cut': 'cut',
        'rise': 'rose',
        'drive': 'drove',
        'buy': 'bought',
        'wear': 'wore',
        'choose': 'chose'
    },
    
    // Verbos que doblan la última consonante
    doubleConsonant: ['stop', 'plan', 'slip', 'shop', 'tap', 'rob', 'permit', 'occur', 'prefer', 'regret'],
    
    // Reglas especiales
    rules: [
        {
            // Verbos que terminan en 'e'
            test: verb => verb.endsWith('e'),
            conjugate: verb => verb + 'd'
        },
        {
            // Verbos que terminan en consonante + y
            test: verb => verb.endsWith('y') && !'aeiou'.includes(verb[verb.length - 2]),
            conjugate: verb => verb.slice(0, -1) + 'ied'
        }
    ]
};

function conjugateVerb() {
    const verbInput = document.getElementById('verbInput');
    const verb = verbInput.value.toLowerCase().trim();
    const resultBox = document.getElementById('resultBox');

    if (verb === '') {
        verbInput.classList.add('shake');
        setTimeout(() => verbInput.classList.remove('shake'), 500);
        return;
    }

    let pastTense;

    // Verificar si es un verbo irregular
    if (verbDatabase.irregular[verb]) {
        pastTense = verbDatabase.irregular[verb];
    } 
    // Verificar si el verbo dobla la última consonante
    else if (verbDatabase.doubleConsonant.includes(verb)) {
        pastTense = verb + verb[verb.length - 1] + 'ed';
    }
    // Aplicar reglas especiales
    else {
        const rule = verbDatabase.rules.find(r => r.test(verb));
        pastTense = rule ? rule.conjugate(verb) : verb + 'ed';
    }

    document.getElementById('presentTense').textContent = verb;
    document.getElementById('pastTense').textContent = pastTense;
    resultBox.classList.add('show');
}

// Permitir el uso de la tecla Enter para conjugar
document.getElementById('verbInput').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        conjugateVerb();
    }
});

// Enfocar el input cuando se carga la página
window.addEventListener('load', function() {
    document.getElementById('verbInput').focus();
});