
var matcherModel = {
	size: 4,
	cards: [],
	cardValues: [ "A", "B", "C", "D", "E", "F", "G", "H" ],
	numGuesses: 0,
	totalCards: 0,
	matchedCards: 0,
	currentId: 1,

	gameStateText: "You haven't won yet, choose a card.",

	selectedCard: null,
	
	init: function(size) {
		this.size = size || this.size;
		var totalPairs = Math.pow( this.size, 2 ) / 2;
		for (var i = 0; i < totalPairs; i++ ) this.addPair();
		this.shuffle();
	},

	addPair: function() {
		var value = this.randomValue();
		this.cards.push( new this.Card( this.getId(), value ) );
		this.cards.push( new this.Card( this.getId(), value ) );
		this.totalCards += 2;
	},

	shuffle: function() {
		var currentIndex = this.cards.length, temp, rand;
		while( currentIndex > 0 ){
			rand = Math.floor( Math.random( ) * currentIndex );
			currentIndex--;

			temp = this.cards[currentIndex];
			this.cards[currentIndex] = this.cards[rand];
			this.cards[rand] = temp;
		}
	},

	Card: function( id, value ){
		this.id = id;
		this.value = value;

		this.matches = function( otherCard ) { 
			console.log(this.value, otherCard.value);
			return this.value === otherCard.value;
		}
	},

	getId: function( cardId ) {
		id = this.currentId;
		this.currentId++;
		return id;	
	},

	randomValue: function(){
		return this.cardValues[ Math.floor( Math.random() * this.cardValues.length ) ];
	},


	sameCard: function( cardId ) {
		return this.selectedCard && this.selectedCard.id === cardId;
	},


	checkGuess: function( cardId ) {
		this.numGuesses++;

		var thisCard = this.getCard( cardId );
		var correct = false;
		if( this.selectedCard ) 
			correct = this.selectedCard.matches( thisCard );
		
		if(correct) this.matchedCards += 2;
		this.selectedCard = null;
		
		if( this.matchedCards === this.totalCards ) 
			this.gameStateText = "Congratulations, you win!";

		return correct;
	},
	
	getCard: function( cardId ) {
		for( var index in this.cards ){
			if( this.cards[index].id === cardId ) return this.cards[index];
		}
		return null;
	},
	
	setSelectedCard: function( id  ) {
		this.selectedCard = this.getCard(id);
	},

};



