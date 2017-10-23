// import SuperAgent from 'superagent';


const GOOD_CDN = 'http://wizardpoker.martinmenneske.no/hs/img/'; //'https://cdn.rawgit.com/schmich/hearthstone-card-images/7af5/rel/';
var goodData;


export default class HSData {
    constructor(){

    }

    makeData ( massiveChunkOfJson ) {        
        let betterData = this.getSensibleStartingPoint ( massiveChunkOfJson );
            betterData = this.stripOriginalHeroCards ( betterData );
            betterData = this.stripHeroSkinsCardSet ( betterData );
            betterData = this.addMostImportantCard ( betterData ); // Stupid joke
            betterData = this.embellishEveryCardWithUsefulData ( betterData );            
            goodData = betterData;                
        return goodData;
    }

    getSensibleStartingPoint ( data ) {
        let everything = data.body;
        let somethings = [];
        for (var key in everything) {
            if (everything.hasOwnProperty(key)) {
                var obj = everything[key];
                    for (var prop in obj) {
                         if (obj.hasOwnProperty(prop)) {
                                somethings.push(obj[prop]);
                     }
                }
           }
        }
        if( somethings )
            return somethings;	
        else 
            return new Error('Shit went wonky when trying to process JSON.');
    }

    stripOriginalHeroCards ( data ) {       // -> Get rid of original Hero Cards
        let betterData = data;              // ^^ the first 9 cards of the classic 
            betterData.splice(0,9);         // ^^ set are uncollectible hero cards
        return betterData;                  // ^^ so... KILL IT WITH FIRE!
    }

    stripHeroSkinsCardSet ( data ) {        // -->  Get rid of promo Hero Skins
        let betterData = data.filter((card) => { 
            return (card.cardSet !==  "Hero Skins"); 
        });
        return betterData;
    }

    embellishEveryCardWithUsefulData( data ) {
        let betterData = [];
        for (var i = 0, len = data.length; i < len; i++) {
            let card = data[i];
                card.key = card.cardId;
                card.value = card.name.toLowerCase();   // Apparently important for select sort. Or...?
                card.label = card.name;                 // ^^ What she said.
                card.format = decideFormat(card.cardSet);
                card.imgAlt = GOOD_CDN + card.dbfId + '.png';
            betterData.push(card);
        }
        function decideFormat( cardSet ) {              // Feels bad man...
            let set = cardSet;
            if( set == "Basic"                          ||
                set == "Classic"                        ||
                set == "Whispers of the Old Gods"       ||
                set == "One Night in Karazhan"          || 
                set == "Mean Streets of Gadgetzan"      ||
                set == "Journey to Un'Goro"             ||
                set == "Knights of the Frozen Throne") {
                    return "Standard";
                } else {
                    return "Wild";
            }
        }
        return betterData;
    }

    getRandomCard ( ) { 
        let rng = Math.floor(Math.random() * goodData.length);
            return goodData[rng];
    }

    step( fromCard, direction='next' ) {        
        function compareID (card) {
            return card.cardId == fromCard.cardId;
        }
        if(!fromCard) {
            console.log('step function needs a card object as first param');
            return;
        } else {
            let currentIndex = goodData.findIndex(compareID);
                console.log('Current Index: ' + currentIndex);
                
            switch (direction) {
                case 'next':
                    if( currentIndex >= (goodData.length - 1)) currentIndex = -1;
                        console.log('Upcoming index: ' + (currentIndex + 1));
                    return goodData[currentIndex + 1];
                    break;
                case 'prev':
                    if( currentIndex == 0) currentIndex = goodData.length;
                    console.log('Upcoming index: ' + (currentIndex - 1));
                    return goodData[currentIndex - 1];
                case 'first':
                    return goodData[0];    
                    break;
            }
            
        }
    }

    addMostImportantCard ( data ) {
        let easterEgg = {
            artist: 'Internet Hivemind',
            cardId: 'bloodmanos',
            dbfId: 'bloodmanos',
            cardSet: 'Imaginary',
            name: 'Blood Manos',
            flavor: 'Quanti Canicula Illa En Fenestre',
            classes: 'Cheats,Blackguards,Ne\'erdowells',
            type: 'Utter Bastard',
            rarity: 'Super special',
            howToGet: 'Perform a black mass.',
            text: 'ALL minions!', 
            cost: '6',
            attack: '6',
            health: '0'
        }
        let betterData = data;
            betterData.push( easterEgg );
        
        return betterData;
    }
    // Stubs!

    getCardsByClass () { /* ... */ }

    getCardsBySet () { /* ... */ }

    getCardsByFormat () { /* ... */ }

    getCardsByCost () { /* ... */ }

}